import { useState, useEffect } from 'react';
import Box from "components/Box";
import Typography from "components/Typography";
import Badge from "components/Badge";
import { api } from "utils/api";

// Helper component for ship name display
function ShipSchedule({ shipName }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Typography variant="button" color="white" fontWeight="medium">
        {shipName || 'N/A'}
      </Typography>
    </Box>
  );
}

// Helper component for berth assignment display
function BerthAssigned({ berthName }) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" fontWeight="medium" color="white">
        {berthName || 'N/A'}
      </Typography>
    </Box>
  );
}

// Helper component for status badge
function StatusBadge({ status }) {
  const isOnTime = status === 'on_time';
  
  return (
    <Badge
      variant="standard"
      badgeContent={isOnTime ? 'On Time' : 'Delayed'}
      color={isOnTime ? 'success' : 'default'}
      size="xs"
      container
      sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
        background: isOnTime ? success.main : 'unset',
        border: `${borderWidth[1]} solid ${isOnTime ? success.main : white.main}`,
        borderRadius: borderRadius.md,
        color: white.main,
      })}
    />
  );
}

// Format time to HH:MM AM/PM
const formatTime = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'N/A';
  }
};

// Custom hook to fetch and manage ship schedule data
export default function useShipScheduleData() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const data = await api.getSchedules();
      setSchedules(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch schedules:', err);
      setError(err.message || 'Failed to load ship schedules');
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Define table columns
  const columns = [
    { name: 'ShipSchedule', align: 'left' },
    { name: 'Berth_Assigned', align: 'left' },
    { name: 'Status', align: 'center' },
    { name: 'ETA', align: 'center' },
    { name: 'ETD', align: 'center' },
  ];

  // Transform API data to table rows
  const rows = schedules.map((schedule) => ({
    ShipSchedule: <ShipSchedule shipName={schedule.shipName} />,
    Berth_Assigned: <BerthAssigned berthName={schedule.berthName} />,
    Status: <StatusBadge status={schedule.status} />,
    ETA: (
      <Typography variant="caption" color="white" fontWeight="medium">
        {formatTime(schedule.eta)}
      </Typography>
    ),
    ETD: (
      <Typography variant="caption" color="white" fontWeight="medium">
        {formatTime(schedule.etd)}
      </Typography>
    ),
  }));

  return {
    columns,
    rows,
    loading,
    error,
    refetch: fetchSchedules,
  };
}
