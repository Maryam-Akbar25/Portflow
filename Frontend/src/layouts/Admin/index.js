import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "components/Box";
import Typography from "components/Typography";
import Footer from "examples/Footer";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Header from "layouts/Admin/components/Header";
import PlatformSettings from "layouts/Admin/components/PlatformSettings";
import AddMember from "./components/AddMember/index";
import AddBerth_Ship from "./components/Add_Berth_Ship";



function Admin() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const shipData = {
      name: data.get("shipName"),
      imo: data.get("imoNumber"),
      flag: data.get("flag"),
      type: data.get("shipType"),
      length: data.get("length"),
      width: data.get("width"),
    };
    console.log("New Ship Data:", shipData);
    alert("Ship Added Successfully!");
  };

  const inputStyle = {
    "& .MuiInputBase-input": {
      fontSize: "18px",
      textAlign: "center",
    },
    "& .MuiInputLabel-root": {
      fontSize: "18px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "& .MuiInputLabel-shrink": {
      left: "0",
      transform: "none",
    },
  };

  return (
    <DashboardLayout>
      <Header />
      <Box mt={5} mb={3}>
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
          <Grid
            item
            xs={12}
            xl={4}
            xxl={3}
            sx={({ breakpoints }) => ({
              minHeight: "400px",
              [breakpoints.only("xl")]: {
                gridArea: "1 / 1 / 2 / 2",
              },
            })}
          >
            <AddMember />
          </Grid>
          <Grid
            item
            xs={12}
            xl={5}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            <AddBerth_Ship />
          </Grid>
          <Grid
            item
            xs={12}
            xl={3}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >
            <Card sx={{ p: 2 }}>
              <Typography color="white" variant="lg" fontWeight="bold" mb="6px">
                Add New Ship
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField name="shipName" label="Ship Name" variant="outlined" fullWidth required sx={inputStyle} />
                  <TextField name="imoNumber" label="IMO Number" variant="outlined" fullWidth required sx={inputStyle} />
                  <TextField name="flag" label="Flag" variant="outlined" fullWidth sx={inputStyle} />
                  <TextField name="shipType" label="Ship Type" variant="outlined" fullWidth sx={inputStyle} />
                  <TextField name="length" label="Length (m)" variant="outlined" type="number" fullWidth sx={inputStyle} />
                  <TextField name="width" label="Width (m)" variant="outlined" type="number" fullWidth sx={inputStyle} />
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={3} mb="30px">
        <Grid item xs={12}>
          <PlatformSettings />
        </Grid>
      </Grid>
    <Footer />
    </DashboardLayout>
  );
}

export default Admin;
