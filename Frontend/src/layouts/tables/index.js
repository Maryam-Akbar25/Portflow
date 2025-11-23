import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Badge from "components/Badge";
import { api } from "utils/api";

const columns = [
  { name: "ShipSchedule", align: "left" },
  { name: "Berth_Assigned", align: "left" },
  { name: "Status", align: "center" },
  { name: "ETA", align: "center" },
  { name: "ETD", align: "center" },
];

const ShipScheduleCell = ({ name }) => (
  <Box display="flex" alignItems="center" px={1} py={0.5}>
    <Typography variant="button" color="white" fontWeight="medium">
      {name}
    </Typography>
  </Box>
);

const BerthAssignedCell = ({ berth }) => (
  <Box display="flex" flexDirection="column">
    <Typography variant="caption" fontWeight="medium" color="white">
      {berth}
    </Typography>
  </Box>
);

const StatusBadge = ({ label, kind = "info" }) => (
  <Badge
    variant="standard"
    badgeContent={label}
    size="xs"
    container
    sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
      background: kind === "success" ? success.main : "unset",
      border: `${borderWidth[1]} solid ${kind === "success" ? success.main : white.main}`,
      borderRadius: borderRadius.md,
      color: white.main,
    })}
  />
);

const fmt = (iso) => {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return "-";
  }
};

function Tables() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getSchedules(); // GET /api/v1/schedules/
        if (!mounted) return;

        // Map each schedule item to table row shape
        const mapped = data.map((s) => {
          const shipName =
            (s.ship && (s.ship.shipName || s.ship.name)) || s.shipName || s.ship || "-";

          const berthName =
            (s.berth && (s.berth.berthName || s.berth.name)) || s.berthName || s.berth || "-";

          // Derive a simple status from ETA/ETD timing
          const now = Date.now();
          const etaMs = s.ETA ? Date.parse(s.ETA) : null;
          const etdMs = s.ETD ? Date.parse(s.ETD) : null;

          let statusLabel = "Scheduled";
          let statusKind = "info";
          if (etaMs && now >= etaMs && (!etdMs || now <= etdMs)) {
            statusLabel = "In Port";
            statusKind = "success";
          } else if (etdMs && now > etdMs) {
            statusLabel = "Completed";
            statusKind = "info";
          }

          return {
            ShipSchedule: <ShipScheduleCell name={shipName} />,
            Berth_Assigned: <BerthAssignedCell berth={berthName} />,
            Status: <StatusBadge label={statusLabel} kind={statusKind} />,
            ETA: (
              <Typography variant="caption" color="white" fontWeight="medium">
                {fmt(s.ETA)}
              </Typography>
            ),
            ETD: (
              <Typography variant="caption" color="white" fontWeight="medium">
                {fmt(s.ETD)}
              </Typography>
            ),
          };
        });

        setRows(mapped);
      } catch (e) {
        setErr(e.message || "Failed to load schedules");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Card>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <Typography variant="lg" color="white">
                Ship Schedule Overview
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

            <Box
              sx={{
                '& .MuiTableCell-root': {
                  padding: '16px 24px',
                },
                '& th': {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                  '& .MuiTypography-root': {
                    color: 'white !important',
                    fontWeight: 'bold !important',
                    fontSize: '1.2rem !important',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  },
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '16px 24px',
                },
                '& td': {
                  '& .MuiTypography-root': {
                    fontSize: '1.1rem !important',
                    color: 'rgba(255, 255, 255, 0.9) !important',
                  },
                },
                '& .MuiTableRow-root:not(:last-child)': {
                  '& td': {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                    padding: '14px 24px',
                    fontSize: '1.1rem',
                  },
                },
                '& .MuiTableHead-root': {
                  '& .MuiTableRow-root': {
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.03)'
                    }
                  }
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </Box>
          </Card>
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
