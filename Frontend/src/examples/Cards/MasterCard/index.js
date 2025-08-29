import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";

// Rewritten component to show only title and a simple bar chart 
function BerthUtilizationCard() {
  const data = [
    { label: "Berth 1", used: 60 },
    { label: "Berth 2", used: 90 },
    { label: "Berth 3", used: 45 },
    { label: "Berth 4", used: 80 },
    { label: "Berth 5", used: 40 },
    { label: "Berth 6", used: 30 },
  ];

  return (
    <Card sx={{ backgroundColor: "#1e1e2f", padding: "16px" }}>
      <Box mb={2}>
        {/* Chart Title */}
        <Typography color="white" variant="lg" fontWeight="bold">
          Berth Utilization
        </Typography>
      </Box>

      {/* Bar Chart */}
      <Box>
        {data.map((bar, index) => (
          <Box key={index} mb={1}>
            {/* Label */}
            <Typography
              variant="button"
              color="white"
              fontWeight="medium"
              sx={{ mb: "4px" }}
            >
              {bar.label}
            </Typography>

            {/* Bar */}
            <div
              style={{
                background: "#2e2e3f",
                borderRadius: "4px",
                height: "12px",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#f96d00",
                  height: "100%",
                  width: `${bar.used}%`,
                }}
              />
            </div>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default BerthUtilizationCard;