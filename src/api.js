import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

/**
 * Clears input field for location.
 */
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

/**
 *
 * @param {object} events
 * @returns locations from each event.
 */
const extractLocations = (events) => {
  var extractingLocations = events.map((event) => event.location);
  var locations = [...new Set(extractingLocations)];
  return locations;
};

/**
 * Checks oAuth token.
 * @param {string} accessToken
 * @returns  response in json format.
 */
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

/**
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return { events: mockData, locations: extractLocations(mockData) };
  }
  if (!navigator.onLine) {
    const { events } = await localStorage.getItem("searchedEvents");
    NProgress.done();

    return { events: JSON.parse(events), locations: extractLocations(events) };
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();

    const results = await axios.get(
      `https://jugcqqecm0.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`
    );
    if (results.data) {
      var locations = extractLocations(results.data.events);
      localStorage.setItem("locations", JSON.stringify(locations));
      localStorage.setItem("searchedEvents", JSON.stringify(results.data));
    }
    NProgress.done();
    return { events: results.data.events, locations };
  }
};

/**
 * process to retreive a oauth token.
 * @returns access token from oAuth
 */
const getAccessToken = async () => {
  const accessToken = await localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || !tokenCheck) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const results = await axios.get(
        "https://jugcqqecm0.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

/**
 * Gets access token from local storage.
 * @param {string} code
 * @returns token
 */
const getToken = async (code) => {
  removeQuery();
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    `https://jugcqqecm0.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

export { checkToken, extractLocations, getEvents, getAccessToken, getToken };
