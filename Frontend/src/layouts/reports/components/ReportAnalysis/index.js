import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import ReportItem from "./ReportItem";
import api from "utils/api";
import { IoBoat, IoCalendar, IoWarning, IoRocket, IoSwapHorizontal } from "react-icons/io5";
import { MdAnchor } from "react-icons/md";

function Report_Analysis() {
  const reports = [
    {
      title: "All Ships",
      description: "Comprehensive list of all registered ships and their details.",
      icon: <IoBoat size="24px" />,
      handler: api.downloadShipsCSV,
    },
    {
      title: "All Berths",
      description: "Overview of all berths, including capacity and specifications.",
      icon: <MdAnchor size="24px" />,
      handler: api.downloadBerthsCSV,
    },
    {
      title: "Ship to Berth Assignment Reports",
      description: "History of ship assignments to specific berths.",
      icon: <IoSwapHorizontal size="24px" />,
      handler: api.downloadAssignmentsCSV,
    },
    {
      title: "Ship Schedule Reports",
      description: "Detailed schedules including ETA, ETD, and status.",
      icon: <IoCalendar size="24px" />,
      handler: api.downloadSchedulesCSV,
    },
    {
      title: "Manual Override Reports",
      description: "Logs of all manual interventions and overrides.",
      icon: <IoWarning size="24px" />,
      handler: api.downloadOverridesCSV,
    },
    {
      title: "AI Allocation Predictions",
      description: "AI-generated predictions for optimal terminal and berth allocations.",
      icon: <IoRocket size="24px" />,
      handler: api.downloadPredictionsCSV,
    },
  ];

  return (
    <Card id="delete-account" sx={{ height: "100%", backgroundColor: "transparent", boxShadow: "none" }}>
      <Box mb="28px" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold" color="white">
          Reports & Logs
        </Typography>
      </Box>
      <Box>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {reports.map((report) => (
            <ReportItem
              key={report.title}
              reportName={report.title}
              description={report.description}
              icon={report.icon}
              onDownload={report.handler}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}

export default Report_Analysis;
