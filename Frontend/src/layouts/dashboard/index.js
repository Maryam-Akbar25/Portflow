import { useEffect, useState } from "react";
import { api } from "utils/api";
import Grid from "@mui/material/Grid";
import { Card, LinearProgress, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "components/Box";
import Typography from "components/Typography";
import Progress from "components/Progress";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";
import theme from "assets/theme";

// Dashboard layout components
import BerthStatusTable from "layouts/dashboard/components/BerthStatusTable";
import Ai_Recommendation from "layouts/dashboard/components/Ai_Recommendation";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import { IoBoatOutline, IoMan } from "react-icons/io5";
import { IoBoat } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import liveMapImg from "assets/images/LiveMap.jpg";
import WelcomePortFLow from "./components/WelcomeMark";
import weatherImage from "assets/images/weather.png";

// Extend the existing theme
const extendedTheme = createTheme(theme, {
  typography: {
    ...theme.typography,
    h1: { fontSize: '2.5rem', fontWeight: 600 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.75rem', fontWeight: 600 },
    h4: { fontSize: '1.5rem', fontWeight: 600 },
    h5: { fontSize: '1.25rem', fontWeight: 600 },
    h6: { fontSize: '1.1rem', fontWeight: 600 },
    body1: { fontSize: '1.1rem' },
    body2: { fontSize: '1rem' },
    button: { fontSize: '1rem', textTransform: 'none' },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.1rem',
          padding: '12px 16px',
        },
        head: {
          fontWeight: 600,
          fontSize: '1.1rem',
        },
      },
    },
  }
});

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [summary, setSummary] = useState({
    totalShips: 0,
    occupiedBerths: 0,
    manualOverrides: 0,
    aiAssignmentsMade: 0,
  });
  const [summaryError, setSummaryError] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await api.getDashboardSummary();
        if (!isMounted) return;
        setSummary({
          totalShips: data.totalShips ?? 0,
          occupiedBerths: data.occupiedBerths ?? 0,
          manualOverrides: data.manualOverrides ?? 0,
          aiAssignmentsMade: data.aiAssignmentsMade ?? 0,
        });
      } catch (e) {
        setSummaryError(e.message || "Failed to load summary");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <ThemeProvider theme={extendedTheme}>
      <CssBaseline />
      <DashboardLayout>
        <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Ships", fontWeight: "regular" }}
                count={String(summary.totalShips)}
                //percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoBoat size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Occupied Berths" }}
                count={String(summary.occupiedBerths)}
                //percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoBoatOutline size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "AI Assignments Made" }}
                count={String(summary.aiAssignmentsMade)}
                //percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <FaRobot size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Manual Overrides" }}
                count={String(summary.manualOverrides)}
                //percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <IoMan size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container >
            <Grid item xs={12} lg={6} xl={6}>
              <WelcomePortFLow />
            </Grid>
            
            <Grid item xs={12} lg={6} xl={6}>
              <Card sx={{ height: "100%" }}>
                <Box>
                  <Box
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={weatherImage}
                      alt="Weather Chart"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "20px",
                      }}
                    />
                  </Box>
                  <Typography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Live Weather Report
                  </Typography>
                  <Box display="flex" alignItems="center" mb="40px"></Box>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <Typography color="text" variant="button" fontWeight="medium">
                          UV Index
                        </Typography>
                      </Stack>
                      <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
                        Low
                      </Typography>
                      <Progress value={30} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <Typography color="text" variant="button" fontWeight="medium">
                          Humidity
                        </Typography>
                      </Stack>
                      <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
                        41%
                      </Typography>
                      <Progress value={41} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <Typography color="text" variant="button" fontWeight="medium">
                          Wind
                        </Typography>
                      </Stack>
                      <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
                        14 km/h
                      </Typography>
                      <Progress value={14} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <Typography color="text" variant="button" fontWeight="medium">
                          Pressure
                        </Typography>
                      </Stack>
                      <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
                        1001.0 mb
                      </Typography>
                      <Progress value={20} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={7}>
              <Card>
                <Box sx={{ height: "100%" }}>
                  <Typography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Live Map
                  </Typography>
                  <Box display="flex" alignItems="center" mb="40px"></Box>
                  <Box
                    sx={{
                      height: "500px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={liveMapImg}
                      alt="Live Map"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} lg={5} xl={5}>
              <BerthStatusTable />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default Dashboard;
