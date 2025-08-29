import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import ReportItem from "layouts/berthInfo/components/ReportItem";

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
          <ReportItem date="Daily Delay Summary" />
          <ReportItem date="OverRide Frequency" />
          <ReportItem date="Summary of Berth Utilization" />
          <ReportItem date="Ship Timings Report" />
          <ReportItem date="ReBuild Reports" />
        </Box>
      </Box>
    </Card>
  );
}

export default Report_Analysis;
