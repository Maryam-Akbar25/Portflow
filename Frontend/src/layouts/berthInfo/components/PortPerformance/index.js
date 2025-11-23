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
  // Card data for the 3-column layout
  const cardData = [
    {
      title: 'Total Berths',
      value: stats.total,
      progress: 100,
      color: 'info',
      icon: 'layers',
      description: 'Total number of berths in the port'
    },
    {
      title: 'Occupied',
      value: stats.occupied,
      progress: stats.total ? Math.round((stats.occupied / stats.total) * 100) : 0,
      color: 'error',
      icon: 'dock',
      description: 'Currently occupied berths'
    },
    {
      title: 'Available',
      value: stats.available,
      progress: stats.total ? Math.round((stats.available / stats.total) * 100) : 0,
      color: 'success',
      icon: 'check_circle',
      description: 'Available berths for docking'
    },
    {
      title: 'Under Maintenance',
      value: stats.maintenance,
      progress: stats.total ? Math.round((stats.maintenance / stats.total) * 100) : 0,
      color: 'warning',
      icon: 'build',
      description: 'Berths under maintenance'
    },
    {
      title: 'Out of Order',
      value: stats.outOfOrder,
      progress: stats.total ? Math.round((stats.outOfOrder / stats.total) * 100) : 0,
      color: 'error',
      icon: 'error',
      description: 'Berths not operational'
    },
    {
      title: 'Utilization',
      value: `${stats.utilizationPct}%`,
      progress: stats.utilizationPct,
      color: 'info',
      icon: 'trending_up',
      description: 'Current berth utilization rate'
    }
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <Box p={3}>
        <Typography variant="h5" fontWeight="bold" color="white" mb={3}>
          Port Performance
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <Typography color="text">Loading port performance data...</Typography>
          </Box>
        ) : err ? (
          <Box display="flex" justifyContent="center" py={4}>
            <Typography color="error">{err}</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{
                    p: 2,
                    height: '100%',
                    background: 'linear-gradient(195deg, #1A1A2E 0%, #16213E 100%)',
                    boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.2)',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.3s ease-in-out',
                      boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.25)'
                    }
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography 
                      variant="button" 
                      color="white" 
                      fontWeight="medium" 
                      textTransform="capitalize"
                      fontSize="0.875rem"
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      color="white" 
                      fontWeight="bold"
                      sx={{ 
                        fontSize: '1.5rem',
                        lineHeight: 1.2
                      }}
                    >
                      {card.value}
                    </Typography>
                  </Box>
                  
                  <Box mt={2}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="caption" color="text" mt={1} display="block">
                    {card.description}
                  </Typography>
                      <Typography variant="caption" color="white" fontWeight="bold">
                        {card.progress}%
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      width: '100%', 
                      height: '8px', 
                      bgcolor: 'rgba(255, 255, 255, 0.1)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <Box 
                        sx={{
                          height: '100%',
                          width: `${card.progress}%`,
                          bgcolor: theme => theme.palette[card.color].main,
                          borderRadius: '4px',
                          transition: 'width 0.5s ease-in-out',
                          boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Card>
  );
}

export default PortPerformance;
