import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "components/Box";
import Typography from "components/Typography";
import Footer from "examples/Footer";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { api } from "utils/api";

import Header from "layouts/Admin/components/Header";
//import PlatformSettings from "layouts/Admin/components/PlatformSettings";
import AddMember from "./components/AddMember/index";
import AddBerth_Ship from "./components/Add_Berth_Ship";

function Admin() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const shipData = {
      shipName: data.get("shipName"),
      MMSI: data.get("mmsi") || null,
      callSign: data.get("callSign") || null,
      shipType: data.get("shipType") || "",
      length: data.get("length") ? parseFloat(data.get("length")) : null,
      beam: data.get("beam") ? parseFloat(data.get("beam")) : null,
      draft: data.get("draft") ? parseFloat(data.get("draft")) : null,
      grossTonnage: data.get("grossTonnage") ? parseFloat(data.get("grossTonnage")) : null,
      cargoType: data.get("cargoType") || "",
      nationality: data.get("nationality") || "",
      priorityLevel: parseInt(data.get("priorityLevel")) || 1,
    };

    try {
      setLoading(true);
      console.log("Submitting ship data:", shipData);
      await api.createShip(shipData);
      alert("Ship Added Successfully!");
      event.target.reset();
    } catch (error) {
      console.error("Error creating ship:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
                  {/* Ship Name */}
                  <TextField
                    name="shipName"
                    label="Ship Name"
                    variant="outlined"
                    fullWidth
                    required
                    sx={inputStyle}
                  />

                  {/* MMSI */}
                  <TextField
                    name="mmsi"
                    label="MMSI"
                    variant="outlined"
                    fullWidth
                    sx={inputStyle}
                  />

                  {/* Call Sign */}
                  <TextField
                    name="callSign"
                    label="Call Sign"
                    variant="outlined"
                    fullWidth
                    sx={inputStyle}
                  />

                  {/* Ship Type */}
                  <TextField
                    name="shipType"
                    label="Ship Type"
                    variant="outlined"
                    fullWidth
                    sx={inputStyle}
                  />

                  {/* Length */}
                  <TextField
                    name="length"
                    label="Length (m)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    inputProps={{ step: "0.01" }}
                    sx={inputStyle}
                  />

                  {/* Beam */}
                  <TextField
                    name="beam"
                    label="Beam (m)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    inputProps={{ step: "0.01" }}
                    sx={inputStyle}
                  />

                  {/* Draft */}
                  <TextField
                    name="draft"
                    label="Draft (m)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    inputProps={{ step: "0.01" }}
                    sx={inputStyle}
                  />

                  {/* Gross Tonnage */}
                  <TextField
                    name="grossTonnage"
                    label="Gross Tonnage"
                    variant="outlined"
                    type="number"
                    fullWidth
                    inputProps={{ step: "0.01" }}
                    sx={inputStyle}
                  />

                  {/* Cargo Type */}
                  <TextField
                    name="cargoType"
                    label="Cargo Type"
                    variant="outlined"
                    fullWidth
                    sx={inputStyle}
                  />

                  {/* Nationality */}
                  <TextField
                    name="nationality"
                    label="Nationality"
                    variant="outlined"
                    fullWidth
                    sx={inputStyle}
                  />

                  {/* Priority Level */}
                  <TextField
                    name="priorityLevel"
                    label="Priority Level"
                    variant="outlined"
                    type="number"
                    fullWidth
                    defaultValue={1}
                    inputProps={{ min: 1, max: 10 }}
                    sx={inputStyle}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? "Adding Ship..." : "Submit"}
                  </Button>
                </Box>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      <Footer />
    </DashboardLayout>
  );
}

export default Admin;
