import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import ReportItem from "./ReportItem";

function Report_Analysis() {
  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <Box mb="28px" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="medium" color="white">
          Report Analysis
        </Typography>
        <Button variant="contained" color="info" size="small">
          VIEW ALL
        </Button>
      </Box>
      <Box>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <ReportItem reportName="Daily Delay Summary" />
          <ReportItem reportName="OverRide Frequency" />
          <ReportItem reportName="Summary of Berth Utilization" />
          <ReportItem reportName="Ship Timings Report" />
          <ReportItem reportName="ReBuild Reports" />
        </Box>
      </Box>
    </Card>
  );
}

export default Report_Analysis;
