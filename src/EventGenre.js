import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const genres = ["React", "Node", "jQuery", "AngularJS", "JavaScript"];
      const data = genres.map((genre) => {
        const value = events.filter(({ summary }) =>
          summary.split(" ").includes(genre)
        ).length;

        return { name: genre, value };
      });
      return data.filter((genre) => genre.value !== 0);
    };
    setData(() => getData());
  }, [events]);

  const colors = ["#003893", "#dd7500", "#e8250c", "#fd9994", "#ffd201"];
  const genreInfo = ({ x, y, cx, cy, name, percent, index }) => {
    return (
      <text
        style={{ fontSize: "15px" }}
        x={x}
        y={y}
        fill={colors[index]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="pieChart-container">
      <ResponsiveContainer height={400}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={genreInfo}
          >
            {data.map((event, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default EventGenre;
