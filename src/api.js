import { mockData } from "./mock-data";
import axios from "axios";
import NProgress from "nprogress";

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

const checkToken = async (accessToken) => {
  console.log("checkToken call", accessToken);
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
    console.log(results);
    if (results.data) {
      var locations = extractLocations(results.data.events);
      localStorage.setItem("locations", JSON.stringify(locations));
      localStorage.setItem("searchedEvents", JSON.stringify(results.data));
    }
    NProgress.done();
    return { events: results.data.events, locations };
  }
};

const extractLocations = (events) => {
  console.log("extractLocations function", events);

  var extractLocations = events.map((events) => events.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

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
