import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";

// Base styles
import colors from "assets/theme/base/colors";

const congestionData = [
  [1, 3, 5, 7, 6],
  [2, 4, 8, 9, 10],
  [3, 2, 5, 6, 7],
  [1, 0, 3, 5, 6],
  [2, 4, 6, 7, 8],
];

const getHeatColor = (value) => {
  const intensity = Math.floor((value / 10) * 255);
  return `rgb(255, ${255 - intensity}, ${255 - intensity})`; // Red scale
};

function CongestionHeatMap() {
  const timeLabels = ["00:00", "06:00", "12:00", "18:00", "24:00"];
  const zoneLabels = ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"];

  return (
    <Card id="congestion-heatmap" sx={{ padding: "20px" }}>
      {/* Title */}
      <Box mb={3}>
        <Typography variant="lg" fontWeight="bold" color="white">
          Congestion HeatMap
        </Typography>
      </Box>

      {/* Heatmap grid */}
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* Time Labels (top) */}
        <Box display="flex" justifyContent="center" width="100%" mb={1} ml={6}>
          {timeLabels.map((time, i) => (
            <Typography
              key={i}
              variant="caption"
              color="white"
              sx={{ width: 50, textAlign: "center" }}
            >
              {time}
            </Typography>
          ))}
        </Box>

        {/* Grid Rows */}
        {congestionData.map((row, rowIndex) => (
          <Box key={rowIndex} display="flex" alignItems="center" mb={1}>
            <Typography
              variant="caption"
              color="white"
              sx={{ width: 60, textAlign: "right", pr: 2 }}
            >
              {zoneLabels[rowIndex]}
            </Typography>

            {/* Heatmap cells */}
            {row.map((value, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  width: 50,
                  height: 30,
                  backgroundColor: getHeatColor(value),
                  borderRadius: "6px",
                  mx: 0.5,
                }}
              />
            ))}
          </Box>
        ))}
      </Box>

      {/* Legend (optional) */}
      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Typography variant="caption" color="white">Low</Typography>
        <Box
          sx={{
            width: 80,
            height: 15,
            background:
              "linear-gradient(to right, rgb(255,255,255), rgb(255,0,0))",
            borderRadius: "10px",
          }}
        />
        <Typography variant="caption" color="white">High</Typography>
      </Box>
    </Card>
  );
}

export default CongestionHeatMap;
