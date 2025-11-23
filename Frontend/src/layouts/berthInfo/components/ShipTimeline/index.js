import React from "react";
import { Card } from "@mui/material";
import Box from "components/Box";
import Typography from "components/Typography";
import { useEffect, useState } from "react";
import { api } from "utils/api";

// Utility function to map data points to SVG coordinates
const mapPoints = (dataset, maxVal, height, width) => {
  if (!Array.isArray(dataset) || dataset.length === 0) return "";
  if (maxVal <= 0) maxVal = 1;

  if (dataset.length === 1) {
    const y = height - (dataset[0] / maxVal) * height;
    return `0,${y}`;
  }

  const gap = width / (dataset.length - 1);
  return dataset
    .map((d, i) => {
      const y = height - (d / maxVal) * height;
      return `${i * gap},${y}`;
    })
    .join(" ");
};

const ShipTimeline = () => {
  const width = 600;
  const height = 200;

  // Build chart data from backend schedules without changing layout
  const [chartData, setChartData] = useState([
    // Fallback initial structure to preserve layout if API is slow
    { time: "-", Arrivals: 0, Departures: 0 },
    { time: "-", Arrivals: 0, Departures: 0 },
  ]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const schedules = await api.getSchedules(); // GET /api/v1/schedules/
        if (!mounted) return;

        // Create 8 hourly buckets starting from current hour
        const now = new Date();
        const base = new Date(now);
        base.setMinutes(0, 0, 0);

        const buckets = Array.from({ length: 8 }).map((_, i) => {
          const start = new Date(base);
          start.setHours(base.getHours() + i);
          const end = new Date(start);
          end.setHours(start.getHours() + 1);

          return {
            start,
            end,
            label: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            arrivals: 0,
            departures: 0,
          };
        });

        // Count arrivals by ETA and departures by ETD within each hour bucket
        schedules.forEach((s) => {
          if (s.ETA) {
            const etaMs = Date.parse(s.ETA);
            if (!Number.isNaN(etaMs)) {
              const eta = new Date(etaMs);
              const bucket = buckets.find((b) => eta >= b.start && eta < b.end);
              if (bucket) bucket.arrivals += 1;
            }
          }
          if (s.ETD) {
            const etdMs = Date.parse(s.ETD);
            if (!Number.isNaN(etdMs)) {
              const etd = new Date(etdMs);
              const bucket = buckets.find((b) => etd >= b.start && etd < b.end);
              if (bucket) bucket.departures += 1;
            }
          }
        });

        const data = buckets.map((b) => ({
          time: b.label,
          Arrivals: b.arrivals,
          Departures: b.departures,
        }));

        // Ensure at least 2 points for polyline
        const safeData = data.length >= 2 ? data : data.concat(data);
        setChartData(safeData);
      } catch {
        // Keep the fallback chartData; do not change layout
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const maxY = Math.max(
    ...chartData.map((d) => Math.max(d.Arrivals, d.Departures, 0)),
    1 // avoid division by zero
  );

  const arrivalsPoints = mapPoints(
    chartData.map((d) => d.Arrivals),
    maxY,
    height,
    width
  );
  const departuresPoints = mapPoints(
    chartData.map((d) => d.Departures),
    maxY,
    height,
    width
  );

  return (
    <Card sx={{ p: 3 }}>
      <Box display="flex" flexDirection="column">
        {/* Title */}
        <Typography variant="h5" color="white" fontWeight="bold" mb={3} fontSize="1.4rem">
          Ship Timeline
        </Typography>

        {/* SVG Line Graph */}
        <Box>
          <svg width="100%" height={height + 50} viewBox={`0 0 ${width} ${height + 50}`}>
            {/* Axes */}
            <line x1="0" y1={height} x2={width} y2={height} stroke="#ccc" />
            <line x1="0" y1="0" x2="0" y2={height} stroke="#ccc" />

            {/* Arrivals Line */}
            <polyline fill="none" stroke="#00d09c" strokeWidth="2" points={arrivalsPoints} />
            {/* Departures Line */}
            <polyline fill="none" stroke="#f96d00" strokeWidth="2" points={departuresPoints} />

            {/* Labels & Data Points */}
            {chartData.map((d, i) => {
              const x = (i * width) / (chartData.length - 1 || 1);
              const yArrival = height - (d.Arrivals / maxY) * height;
              const yDeparture = height - (d.Departures / maxY) * height;

              return (
                <g key={i}>
                  {/* Time labels */}
                  <text x={x} y={height + 18} fontSize="12" fill="#aaa" textAnchor="middle" fontFamily="sans-serif">
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
        <Box display="flex" justifyContent="flex-start" mt={3} gap={4}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              width={14}
              height={14}
              bgcolor="#00d09c"
              borderRadius="50%"
              flexShrink={0}
            />
            <Typography color="text" variant="button" fontSize="1rem">
              Arrivals
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              width={14}
              height={14}
              bgcolor="#f96d00"
              borderRadius="50%"
              flexShrink={0}
            />
            <Typography color="text" variant="button" fontSize="1rem">
              Departures
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ShipTimeline;
