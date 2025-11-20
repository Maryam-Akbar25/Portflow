import Box from "components/Box";
import Footer from "examples/Footer";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Header from "layouts/Admin/components/Header";
import DataTables from "./components/DataTables";

function Admin() {
  return (
    <DashboardLayout>
      <Header />
      <Box mt={5} mb={3}>
        <DataTables />
      </Box>
      <Footer />
    </DashboardLayout>
  );
}

export default Admin;
