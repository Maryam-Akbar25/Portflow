import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";

// Insights-like custom component reused for metric display
import Insights from "layouts/berthInfo/components/Insights";

function PortPerformance() {
  return (
    <Card sx={{ height: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="18px"
        sx={({ breakpoints }) => ({
          [breakpoints.down("lg")]: {
            flexDirection: "column",
          },
        })}
      >
        <Typography
          variant="lg"
          fontWeight="bold"
          textTransform="capitalize"
          color="white"
          sx={({ breakpoints }) => ({
            [breakpoints.only("sm")]: {
              mb: "6px",
            },
          })}
        >
          Key Metrics
        </Typography>
        <Box display="flex" alignItems="flex-start">
          <Box color="white" mr="6px" lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              insights
            </Icon>
          </Box>
          <Typography variant="button" color="text" fontWeight="regular">
            April 2025
          </Typography>
        </Box>
      </Box>

      {/* Metrics List */}
      <Box>
        <Box mb={2}>
          <Typography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="uppercase"
          >
            port performance
          </Typography>
        </Box>

        <Box
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {/* Displaying relevant key metrics */}
          <Insights
            color="info"
            icon="directions_boat"
            name="Total Ships Processed"
            description="Number of ships handled in the current month"
            value="42 Ships"
          />
          <Insights
            color="success"
            icon="schedule"
            name="Average Waiting Time"
            description="Time before berth assignment"
            value="2.5 hrs"
          />
          <Insights
            color="warning"
            icon="hourglass_empty"
            name="Average Turnaround Time"
            description="Total time spent from arrival to departure"
            value="18 hrs"
          />
          <Insights
            color="error"
            icon="report_problem"
            name="Delays Reported"
            description="Unexpected delays due to weather or congestion"
            value="5 Instances"
          />
          <Insights
            color="primary"
            icon="star"
            name="AI Recommended Assignments"
            description="Assignments made through AI decision support"
            value="28 Assignments"
          />
          <Insights
            color="text"
            icon="settings"
            name="Manual Overrides"
            description="Operator-made assignments overriding AI"
            value="14 Assignments"
          />
        </Box>
      </Box>
    </Card>
  );
}

export default PortPerformance;
