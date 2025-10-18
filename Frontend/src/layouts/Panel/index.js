import { useEffect, useState, useMemo } from "react";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { api } from "utils/api";

const columns = [
  { name: "ship name", align: "left" },
  { name: "berth assigned", align: "left" },
  { name: "berth status", align: "left" },
  { name: "manual override", align: "center" },
];

const StatusTag = ({ status }) => {
  let icon = "✅";
  let text = "Available";
  let color = "green";
  if (status === "occupied") {
    icon = "🟡";
    text = "Occupied";
    color = "gold";
  } else if (status === "maintenance") {
    icon = "🟠";
    text = "Maintenance";
    color = "orange";
  } else if (status === "out_of_order") {
    icon = "⚫";
    text = "Out of Order";
    color = "white";
  }
  return (
    <Typography variant="button" style={{ color }} fontWeight="medium">
      {icon} {text}
    </Typography>
  );
};

function Tables() {
  const [ships, setShips] = useState([]);
  const [berths, setBerths] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // load all needed data
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [s, b, a] = await Promise.all([
          api.getShips(),
          api.getBerths(),
          api.getAssignments(),
        ]);
        if (!mounted) return;
        setShips(Array.isArray(s) ? s : []);
        setBerths(Array.isArray(b) ? b : []);
        setAssignments(Array.isArray(a) ? a : []);
      } catch (e) {
        setErr(e.message || "Failed to load manual override data");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const berthIdToBerth = useMemo(() => {
    const m = new Map();
    berths.forEach((b) => m.set(b.berthId, b));
    return m;
  }, [berths]);

  const shipIdToLatestAssignment = useMemo(() => {
    const m = new Map();
    // keep the latest assignment per ship (by updatedAt/createdAt)
    [...assignments]
      .sort((a, b) => {
        const aTs = Date.parse(a.updatedAt || a.createdAt || 0) || 0;
        const bTs = Date.parse(b.updatedAt || b.createdAt || 0) || 0;
        return bTs - aTs;
      })
      .forEach((a) => {
        if (a.ship) {
          const shipId = a.ship.shipId || a.ship;
          if (!m.has(shipId)) {
            m.set(shipId, a);
          }
        }
      });
    return m;
  }, [assignments]);

  const handleOverride = async (ship, newBerthIdStr) => {
    try {
      const newBerthId = parseInt(newBerthIdStr);
      if (!newBerthId) return;

      // Ask for a custom override reason
      const overrideReason = window.prompt("Enter override reason:", "");
      if (overrideReason === null) {
        // User cancelled; do nothing
        return;
      }
      const reasonToSave = (overrideReason || "").trim();
      if (!reasonToSave) {
        alert("Override reason is required.");
        return;
      }

      // Update or create assignment
      const existing = shipIdToLatestAssignment.get(ship.shipId);
      if (existing) {
        await api.updateAssignment(existing.assignmentId, {
          ship: ship.shipId,
          berth: newBerthId,
          assignedBy: "Manual",
          ETA: existing.ETA || null,
          ETD: existing.ETD || null,
          status: "assigned",
        });
      } else {
        await api.createAssignment({
          ship: ship.shipId,
          berth: newBerthId,
          assignedBy: "Manual",
          status: "assigned",
        });
      }

      // Create an override log
      // TODO: replace with real authenticated user id when available
      const currentUserId = 1;
      await api.createOverrideLog({
        user: currentUserId,
        ship: ship.shipId,
        berth: newBerthId,
        overrideReason: reasonToSave,
      });

      // Refresh assignments to reflect the change in the table
      const refreshed = await api.getAssignments();
      setAssignments(Array.isArray(refreshed) ? refreshed : []);
    } catch (e) {
      alert(e.message || "Failed to override berth");
      // Attempt to refresh to restore prior UI state if needed
      try {
        const refreshed = await api.getAssignments();
        setAssignments(Array.isArray(refreshed) ? refreshed : []);
      } catch {}
    }
  };

  const rows = useMemo(() => {
    return ships.map((ship) => {
      const latest = shipIdToLatestAssignment.get(ship.shipId);
      const berthId = (latest && (latest.berth?.berthId || latest.berth)) || null;
      const berthObj = berthId ? berthIdToBerth.get(berthId) : null;

      const currentBerthName = berthObj?.berthName || "-";
      const currentStatus = berthObj?.availabilityStatus || "available";

      return {
        "ship name": (
          <Box display="flex" alignItems="center">
            <Typography pl="16px" color="white" variant="button" fontWeight="medium">
              {ship.shipName}
            </Typography>
          </Box>
        ),
        "berth assigned": (
          <Typography variant="button" color="white" fontWeight="medium">
            {currentBerthName}
          </Typography>
        ),
        "berth status": <StatusTag status={currentStatus} />,
        "manual override": (
          <Select
            value={berthId ? String(berthId) : ""}
            onChange={(e) => handleOverride(ship, e.target.value)}
            displayEmpty
            variant="standard"
            sx={{
              color: "white",
              borderBottom: "1px solid white",
              "& .MuiSelect-icon": { color: "white" },
              minWidth: "120px",
            }}
          >
            <MenuItem value="" disabled>
              Select Berth
            </MenuItem>
            {berths.map((b) => (
              <MenuItem key={b.berthId} value={String(b.berthId)}>
                {b.berthName}
              </MenuItem>
            ))}
          </Select>
        ),
      };
    });
  }, [ships, berths, shipIdToLatestAssignment, berthIdToBerth]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Card>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <Typography variant="lg" color="white">
                Manual Override Panel
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
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
