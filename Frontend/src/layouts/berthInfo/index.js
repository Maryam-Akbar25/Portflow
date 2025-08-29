import Grid from "@mui/material/Grid";
import Box from "components/Box";
import MasterCard from "examples/Cards/MasterCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// BerthInfo page components
import CongestionHM from "layouts/berthInfo/components/CongestionHeatMap";
import ReportItem  from "layouts/berthInfo/components/ReportItem";
import BerthAllocationInfo from "layouts/berthInfo/components/BerthAllocationInfo";
import ShipTimeline from "./components/ShipTimeline";
import PortPerformance from "./components/PortPerformance";

function berthInfo() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mt={4}>
        <Box mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MasterCard number={7812213908237916} valid="05/24" cvv="09X" />
            </Grid>
            <Grid item xs={12}>
              <ShipTimeline />
            </Grid>
            <Grid item xs={12}>
              <CongestionHM />
            </Grid>
            <Grid item xs={12}>
              <ReportItem />
            </Grid>
          </Grid>
        </Box>
        <Box my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BerthAllocationInfo />
            </Grid>
            <Grid item xs={12}>
              <PortPerformance />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default berthInfo;
