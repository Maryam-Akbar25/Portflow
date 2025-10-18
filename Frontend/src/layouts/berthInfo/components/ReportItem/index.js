import { useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import { api } from "utils/api";

function ReportItem() {
  const [berths, setBerths] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [b, s] = await Promise.all([api.getBerths(), api.getSchedules()]);
        if (!mounted) return;
        setBerths(b);
        setSchedules(s);
      } catch (e) {
        setErr(e.message || "Failed to load report");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const total = berths.length;
    const occupied = berths.filter((x) => x.availabilityStatus === "occupied").length;
    const upcoming = schedules.filter((x) => x.ETA && Date.parse(x.ETA) >= Date.now()).length;
    return { total, occupied, upcoming };
  }, [berths, schedules]);

  return (
    <Card>
      <Box p={2}>
        <Typography color="white" variant="lg" fontWeight="bold" mb="6px">
          Quick Report
        </Typography>
        {loading ? (
          <Typography color="text">Loading...</Typography>
        ) : err ? (
          <Typography color="error">{err}</Typography>
        ) : (
          <>
            <Typography color="text" variant="button" display="block" mb="6px">
              Total Berths:{" "}
              <Typography component="span" color="white" fontWeight="bold">
                {summary.total}
              </Typography>
            </Typography>
            <Typography color="text" variant="button" display="block" mb="6px">
              Occupied Berths:{" "}
              <Typography component="span" color="white" fontWeight="bold">
                {summary.occupied}
              </Typography>
            </Typography>
            <Typography color="text" variant="button" display="block" mb="6px">
              Upcoming Arrivals:{" "}
              <Typography component="span" color="white" fontWeight="bold">
                {summary.upcoming}
              </Typography>
            </Typography>
          </>
        )}
      </Box>
    </Card>
  );
}

export default ReportItem;
