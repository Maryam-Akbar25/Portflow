import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import ReportItem from "./ReportItem";
import api from "utils/api";

function Report_Analysis() {
  const reportHandlers = {
    "All Ships": api.downloadShipsCSV,
    "All Berths": api.downloadBerthsCSV,
    "Ship to Berth Assignment Reports": api.downloadAssignmentsCSV,
    "Ship Schedule Reports": api.downloadSchedulesCSV,
    "Manual Override Reports": api.downloadOverridesCSV,
  };

  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <Box mb="28px" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="medium" color="white">
          Report Analysis
        </Typography>
      </Box>
      <Box>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <ReportItem reportName="All Ships" onDownload={reportHandlers["All Ships"]} />
          <ReportItem reportName="All Berths" onDownload={reportHandlers["All Berths"]} />
          <ReportItem
            reportName="Ship to Berth Assignment Reports"
            onDownload={reportHandlers["Ship to Berth Assignment Reports"]}
          />
          <ReportItem
            reportName="Ship Schedule Reports"
            onDownload={reportHandlers["Ship Schedule Reports"]}
          />
          <ReportItem
            reportName="Manual Override Reports"
            onDownload={reportHandlers["Manual Override Reports"]}
          />
        </Box>
      </Box>
    </Card>
  );
}

export default Report_Analysis;
