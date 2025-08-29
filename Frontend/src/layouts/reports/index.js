import Grid from "@mui/material/Grid";
import Box from "components/Box";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Report_Analysis from "./components/ReportAnalysis";

function reports() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mt={4} mb={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Report_Analysis />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default reports;
