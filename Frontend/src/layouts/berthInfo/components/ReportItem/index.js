import { useEffect, useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import { api } from "utils/api";
import Grid from "@mui/material/Grid";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Card
      sx={{
        p: 2.5,
        height: '100%',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography 
            variant="button" 
            color="white" 
            fontWeight="medium"
            sx={{ 
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              mb: 0.5
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h4" 
            color="white" 
            fontWeight="bold"
            sx={{ 
              fontSize: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={(theme) => ({
            width: 44,
            height: 44,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            color: theme.palette[color].main,
            fontSize: '1.5rem',
          })}
        >
          <span className="material-icons">{icon}</span>
        </Box>
      </Box>
    </Card>
  );
};

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
        setBerths(Array.isArray(b) ? b : []);
        setSchedules(Array.isArray(s) ? s : []);
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
    const upcoming = schedules.filter((x) => x.ETA && new Date(x.ETA) >= new Date()).length;
    return { total, occupied, upcoming };
  }, [berths, schedules]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <Typography color="text">Loading report data...</Typography>
      </Box>
    );
  }

  if (err) {
    return (
      <Box p={2}>
        <Typography color="error">{err}</Typography>
      </Box>
    );
  }

  const stats = [
    {
      title: "Total Berths",
      value: summary.total,
      icon: "layers",
      color: "info"
    },
    {
      title: "Occupied",
      value: summary.occupied,
      icon: "anchor",
      color: "error"
    },
    {
      title: "Upcoming",
      value: summary.upcoming,
      icon: "schedule",
      color: "warning"
    }
  ];

  return (
    <Box>
      <Typography 
        variant="h5" 
        color="white" 
        fontWeight="bold" 
        mb={3}
        sx={{ 
          fontSize: '1.5rem',
          letterSpacing: '0.5px'
        }}
      >
        Quick Report
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <StatCard 
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ReportItem;
