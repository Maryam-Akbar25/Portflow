import { useEffect, useState, useMemo } from "react";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import { api } from "utils/api";

const columns = [
  { name: "ship", align: "left" },
  { name: "berth", align: "left" },
  { name: "status", align: "center" },
  { name: "eta", align: "center" },
  { name: "etd", align: "center" },
  { name: "assignedBy", align: "center" },
];

const fmt = (iso) => {
  if (!iso) return "-";
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return "-";
  return new Date(ms).toLocaleString();
};

const StatusTag = ({ status }) => {
  // assigned | in_progress | completed | cancelled
  const map = {
    assigned: { label: "Assigned", color: "info" },
    in_progress: { label: "In Progress", color: "info" },
    completed: { label: "Completed", color: "info" },
    cancelled: { label: "Cancelled", color: "info" },
  };
  const v = map[status] || map.assigned;
  return (
    <Typography variant="button" fontWeight="bold" color="white">
      {v.label}
    </Typography>
  );
};

function BerthAllocationInfo() {
  const [assignments, setAssignments] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getAssignments(); // GET /api/v1/assignments/
        if (!mounted) return;

        // Sort latest first (by updatedAt or createdAt if updatedAt not present)
        const sorted = [...data].sort((a, b) => {
          const aTs = Date.parse(a.updatedAt || a.createdAt || 0) || 0;
          const bTs = Date.parse(b.updatedAt || b.createdAt || 0) || 0;
          return bTs - aTs;
        });

        setAssignments(sorted);
      } catch (e) {
        setErr(e.message || "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const mapped = assignments.map((a) => {
      const shipName = (a.ship && (a.ship.shipName || a.ship.name)) || a.shipName || a.ship || "-";
      const berthName =
        (a.berth && (a.berth.berthName || a.berth.name)) || a.berthName || a.berth || "-";

      return {
        ship: (
          <Typography color="white" variant="button" fontWeight="medium">
            {shipName}
          </Typography>
        ),
        berth: (
          <Typography color="white" variant="button" fontWeight="medium">
            {berthName}
          </Typography>
        ),
        status: <StatusTag status={a.status} />,
        eta: (
          <Typography variant="caption" color="white" fontWeight="medium">
            {fmt(a.ETA)}
          </Typography>
        ),
        etd: (
          <Typography variant="caption" color="white" fontWeight="medium">
            {fmt(a.ETD)}
          </Typography>
        ),
        assignedBy: (
          <Typography variant="caption" color="white" fontWeight="medium">
            {a.assignedBy || "-"}
          </Typography>
        ),
      };
    });

    setRows(mapped);
  }, [assignments]);

  return (
    <Card>
      <Box p={2} pb={0}>
        <Typography color="white" variant="lg" fontWeight="bold">
          Latest Ship → Berth Allocations
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
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />
      </Box>
    </Card>
  );
}

export default BerthAllocationInfo;
