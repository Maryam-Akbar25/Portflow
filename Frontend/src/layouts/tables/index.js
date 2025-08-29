import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import shipScheduleData from "layouts/tables/data/ShipScheduleTable";

function Tables() {
  const { columns, rows } = shipScheduleData;

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