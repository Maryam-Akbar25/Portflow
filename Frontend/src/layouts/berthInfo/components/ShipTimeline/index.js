import React from "react";
import { Card } from "@mui/material";
import Box from "components/Box";
import Typography from "components/Typography";

// Dummy ship timeline data
const data = [
  { time: "08:00", Arrivals: 3, Departures: 1 },
  { time: "10:00", Arrivals: 5, Departures: 2 },
  { time: "12:00", Arrivals: 4, Departures: 3 },
  { time: "14:00", Arrivals: 6, Departures: 4 },
  { time: "16:00", Arrivals: 2, Departures: 5 },
  { time: "18:00", Arrivals: 1, Departures: 3 },
  { time: "20:00", Arrivals: 3, Departures: 2 },
];

// Utility function to map data points to SVG coordinates
const mapPoints = (dataset, maxVal, height, width) => {
  const gap = width / (dataset.length - 1);
  return dataset.map((d, i) => {
    const y = height - (d / maxVal) * height;
    return `${i * gap},${y}`;
  }).join(" ");
};

const ShipTimeline = () => {
  const width = 600;
  const height = 200;
  const maxY = Math.max(...data.map(d => Math.max(d.Arrivals, d.Departures)));

  const arrivalsPoints = mapPoints(data.map(d => d.Arrivals), maxY, height, width);
  const departuresPoints = mapPoints(data.map(d => d.Departures), maxY, height, width);

  return (
    <Card sx={{ padding: "30px" }}>
      <Box display="flex" flexDirection="column">
        {/* Title */}
        <Typography variant="lg" color="white" fontWeight="bold" mb="16px">
          Ship Timeline
        </Typography>

        {/* SVG Line Graph */}
        <Box>
          <svg width="100%" height={height + 50} viewBox={`0 0 ${width} ${height + 50}`}>
            {/* Axes */}
            <line x1="0" y1={height} x2={width} y2={height} stroke="#ccc" />
            <line x1="0" y1="0" x2="0" y2={height} stroke="#ccc" />

            {/* Arrivals Line */}
            <polyline
              fill="none"
              stroke="#00d09c"
              strokeWidth="2"
              points={arrivalsPoints}
            />
            {/* Departures Line */}
            <polyline
              fill="none"
              stroke="#f96d00"
              strokeWidth="2"
              points={departuresPoints}
            />

            {/* Labels & Data Points */}
            {data.map((d, i) => {
              const x = (i * width) / (data.length - 1);
              const yArrival = height - (d.Arrivals / maxY) * height;
              const yDeparture = height - (d.Departures / maxY) * height;

              return (
                <g key={i}>
                  {/* Time labels */}
                  <text x={x} y={height + 15} fontSize="10" fill="#aaa" textAnchor="middle">
                    {d.time}
                  </text>

                  {/* Circles */}
                  <circle cx={x} cy={yArrival} r="4" fill="#00d09c" />
                  <circle cx={x} cy={yDeparture} r="4" fill="#f96d00" />
                </g>
              );
            })}
          </svg>
        </Box>

        {/* Legend */}
        <Box display="flex" justifyContent="flex-start" mt={2} gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <span style={{ width: "12px", height: "12px", background: "#00d09c", borderRadius: "50%" }}></span>
            <Typography color="text" variant="button">Arrivals</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <span style={{ width: "12px", height: "12px", background: "#f96d00", borderRadius: "50%" }}></span>
            <Typography color="text" variant="button">Departures</Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ShipTimeline;
