import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "components/Box";
import Typography from "components/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { api } from "utils/api";

const baseColumns = [
  { name: "MMSI NO", align: "left" },
  { name: "Berthing Datetime", align: "left" },
  { name: "Sailing Datetime", align: "left" },
  { name: "Waiting Time", align: "center" },
];

function OptimizeAllocations() {
  const [columns, setColumns] = useState(baseColumns);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatTime = (hours) => {
    if (!hours) return "-";
    const totalSeconds = Math.floor(hours * 3600);
    const days = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);

    return parts.length > 0 ? parts.join(" ") : "0s";
  };

  const mapRows = (data, includePredictions = false) => {
    return data.map((item) => {
      const row = {
        "MMSI NO": (
          <Typography variant="caption" color="white" fontWeight="medium" sx={{ fontSize: "1.1rem" }}>
            {item["MMSI NO"] ? parseInt(item["MMSI NO"]) : "-"}
          </Typography>
        ),
        "Berthing Datetime": (
          <Typography variant="caption" color="white" fontWeight="medium" sx={{ fontSize: "1.1rem" }}>
            {item["Berthing Datetime"] || "-"}
          </Typography>
        ),
        "Sailing Datetime": (
          <Typography variant="caption" color="white" fontWeight="medium" sx={{ fontSize: "1.1rem" }}>
            {item["Sailing Datetime"] || "-"}
          </Typography>
        ),
        "Waiting Time": (
          <Typography variant="caption" color="white" fontWeight="medium" sx={{ fontSize: "1.1rem" }}>
            {formatTime(parseFloat(item["Waiting Time (hrs)"]))}
          </Typography>
        ),
      };

      if (includePredictions) {
        row["Predicted Terminal"] = (
          <Typography variant="caption" color="white" fontWeight="medium" sx={{ fontSize: "1.1rem" }}>
            {item["Predicted_Terminal"] !== null ? item["Predicted_Terminal"] : "-"}
          </Typography>
        );
        row["Predicted Berth"] = (
          <Typography variant="caption" color="white" fontWeight="medium" sx={{ fontSize: "1.1rem" }}>
            {item["Predicted_Berth"] !== null ? item["Predicted_Berth"] : "-"}
          </Typography>
        );
      }

      return row;
    });
  };

  const fetchRawData = async () => {
    setLoading(true);
    try {
      const data = await api.getOptimizeData();
      setRows(mapRows(data, false));
      setColumns(baseColumns);
    } catch (error) {
      console.error("Failed to fetch raw data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const data = await api.getPredictions();
      setRows(mapRows(data, true));
      setColumns([
        ...baseColumns,
        { name: "Predicted Terminal", align: "center" },
        { name: "Predicted Berth", align: "center" },
      ]);
    } catch (error) {
      console.error("Failed to fetch predictions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRawData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Box mb={3}>
          <Card>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <Typography variant="h6"color="white">Optimize Terminal/Berth Allocations</Typography>
              <Button variant="contained" color="primary" onClick={fetchPredictions} disabled={loading} style={{ color: 'white' }}>
                {loading ? "Loading..." : "Get Allocations from AI"}
              </Button>
            </Box>
            <Box>
              <Table columns={columns} rows={rows} />
            </Box>
          </Card>
        </Box>
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default OptimizeAllocations;
