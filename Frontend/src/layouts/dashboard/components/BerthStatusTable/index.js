import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import Box from "components/Box";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import { api } from "utils/api";

const columns = [
  { name: "BerthName_Number", align: "left" },
  { name: "status", align: "center" },
];

function getStatusBox(status) {
  // backend sends: "available" | "occupied" | "maintenance" | "out_of_order"
  let emoji = "✅";
  let color = "green";
  let label = "Available";

  if (status === "occupied") {
    emoji = "🟡";
    color = "gold";
    label = "Occupied";
  } else if (status === "maintenance") {
    emoji = "🟠";
    color = "orange";
    label = "Maintenance";
  } else if (status === "out_of_order") {
    emoji = "⚫";
    color = "white";
    label = "Out of Order";
  }

  return (
    <Typography
      variant="button"
      fontWeight="bold"
      sx={{ color, display: "flex", alignItems: "center" }}
    >
      {emoji} {label}
    </Typography>
  );
}

function BerthStatusTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const berths = await api.getBerths(); // GET /api/v1/berths/
        if (!isMounted) return;

        const mappedRows = berths.map((b) => ({
          BerthName_Number: (
            <Box display="flex" alignItems="center">
              <Typography pl="16px" color="white" variant="button" fontWeight="medium">
                {b.berthName}
              </Typography>
            </Box>
          ),
          status: getStatusBox(b.availabilityStatus),
        }));

        setRows(mappedRows);
      } catch (e) {
        setErr(e.message || "Failed to load berths");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card sx={{ height: "100% !important" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <Box mb="auto">
          <Typography color="white" variant="lg" mb="6px" gutterBottom>
            Berth Status Table
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Typography color="text" px={2} pb={2}>
          Loading...
        </Typography>
      ) : err ? (
        <Typography color="error" px={2} pb={2}>
          {err}
        </Typography>
      ) : (
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
      )}
    </Card>
  );
}

export default BerthStatusTable;
