import { useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Typography from "components/Typography";
import Progress from "components/Progress";
import { api } from "utils/api";

function PortPerformance() {
  const [berths, setBerths] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getBerths();
        if (!mounted) return;
        setBerths(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || "Failed to load performance");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = berths.length;
    const occupied = berths.filter((b) => b.availabilityStatus === "occupied").length;
    const maintenance = berths.filter((b) => b.availabilityStatus === "maintenance").length;
    const outOfOrder = berths.filter((b) => b.availabilityStatus === "out_of_order").length;
    const available = berths.filter((b) => b.availabilityStatus === "available").length;
    const utilizationPct = total ? Math.round((occupied / total) * 100) : 0;
    return { total, occupied, maintenance, outOfOrder, available, utilizationPct };
  }, [berths]);
  return (
    <Card>
      <Box p={2} pb={0}>
        <Typography color="white" variant="lg" fontWeight="bold">
          Port Performance
        </Typography>
      </Box>
      {loading ? (
        <Typography color="text" px={2} pb={2}>
          Loading...
        </Typography>
      ) : err ? (
        <Typography color="error" px={2} pb={2}>
          {err}
        </Typography>
      ) : null}
      <Box p={2} pt={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Typography color="text" variant="button" fontWeight="medium" mb="6px">
              Total Berths
            </Typography>
            <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
              {stats.total}
            </Typography>
            <Progress value={100} color="info" sx={{ background: "#2D2E5F" }} />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Typography color="text" variant="button" fontWeight="medium" mb="6px">
              Occupied
            </Typography>
            <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
              {stats.occupied}
            </Typography>
            <Progress
              value={stats.total ? Math.round((stats.occupied / stats.total) * 100) : 0}
              color="info"
              sx={{ background: "#2D2E5F" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Typography color="text" variant="button" fontWeight="medium" mb="6px">
              Available
            </Typography>
            <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
              {stats.available}
            </Typography>
            <Progress
              value={stats.total ? Math.round((stats.available / stats.total) * 100) : 0}
              color="info"
              sx={{ background: "#2D2E5F" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Typography color="text" variant="button" fontWeight="medium" mb="6px">
              Utilization
            </Typography>
            <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
              {stats.utilizationPct}%
            </Typography>
            <Progress value={stats.utilizationPct} color="info" sx={{ background: "#2D2E5F" }} />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={0}>
          <Grid item xs={12} md={6} lg={3}>
            <Typography color="text" variant="button" fontWeight="medium" mb="6px">
              Maintenance
            </Typography>
            <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
              {stats.maintenance}
            </Typography>
            <Progress
              value={stats.total ? Math.round((stats.maintenance / stats.total) * 100) : 0}
              color="info"
              sx={{ background: "#2D2E5F" }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Typography color="text" variant="button" fontWeight="medium" mb="6px">
              Out of Order
            </Typography>
            <Typography color="white" variant="lg" fontWeight="bold" mb="8px">
              {stats.outOfOrder}
            </Typography>
            <Progress
              value={stats.total ? Math.round((stats.outOfOrder / stats.total) * 100) : 0}
              color="info"
              sx={{ background: "#2D2E5F" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default PortPerformance;
