import {
  Card,
  TextField,
  MenuItem,
  Button,
  Grid,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "components/Box";
import Typography from "components/Typography";
import { api } from "utils/api";

const Add_Berth_Ship = () => {
  const [loading, setLoading] = useState(false);
  const [ports, setPorts] = useState([]);
  const [formData, setFormData] = useState({
    port: "",
    berthName: "",
    length: "",
    width: "",
    maxDraft: "",
    maxShipCapacity: "",
    availabilityStatus: "available",
    preferredShipType: "",
    loadingRate: "",
    craneCount: "",
    craneCapacity: "",
  });

  // Fetch ports on component mount
  useEffect(() => {
    fetchPorts();
  }, []);

  const fetchPorts = async () => {
    try {
      console.log("Fetching ports from API...");
      const portsData = await api.getPorts();
      console.log("Raw ports data:", portsData);

      // Handle different response formats
      let portsList = [];
      if (Array.isArray(portsData)) {
        portsList = portsData;
      } else if (portsData.results && Array.isArray(portsData.results)) {
        portsList = portsData.results;
      } else if (portsData.data && Array.isArray(portsData.data)) {
        portsList = portsData.data;
      }

      console.log("Processed ports list:", portsList);
      setPorts(portsList);
    } catch (error) {
      console.error("Error fetching ports:", error);
      setError("Error loading ports. Please refresh the page.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.port || !formData.berthName) {
      alert("Please fill in all required fields (Port and Berth Name)");
      return;
    }

    // Prepare data for API
    const berthData = {
      port: parseInt(formData.port), // Convert to integer for foreign key
      berthName: formData.berthName,
      length: formData.length ? parseFloat(formData.length) : null,
      width: formData.width ? parseFloat(formData.width) : null,
      maxDraft: formData.maxDraft ? parseFloat(formData.maxDraft) : null,
      maxShipCapacity: formData.maxShipCapacity ? parseInt(formData.maxShipCapacity) : null,
      availabilityStatus: formData.availabilityStatus,
      preferredShipType: formData.preferredShipType || "",
      loadingRate: formData.loadingRate ? parseFloat(formData.loadingRate) : null,
      craneCount: formData.craneCount ? parseInt(formData.craneCount) : null,
      craneCapacity: formData.craneCapacity ? parseFloat(formData.craneCapacity) : null,
    };

    try {
      setLoading(true);
      console.log("Submitting berth data:", berthData);
      await api.createBerth(berthData);
      alert("Berth Added Successfully!");

      // Reset form
      setFormData({
        port: "",
        berthName: "",
        length: "",
        width: "",
        maxDraft: "",
        maxShipCapacity: "",
        availabilityStatus: "available",
        preferredShipType: "",
        loadingRate: "",
        craneCount: "",
        craneCapacity: "",
      });
    } catch (error) {
      console.error("Error creating berth:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const customInputProps = {
    style: {
      textAlign: "center",
    },
  };

  return (
    <Card>
      <Box p={3}>
        <Typography variant="lg" color="white" fontWeight="bold" mb={2}>
          Add New Berth
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Port Selection */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                variant="outlined"
                label="Port *"
                name="port"
                value={formData.port}
                onChange={handleChange}
                required
                SelectProps={{ displayEmpty: true }}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                // SelectProps={{
                //   style: {
                //     textAlign: "center",
                //     fontSize: "18px",
                //   },
                // }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  {ports.length === 0 ? "Loading ports..." : "Select Port"}
                </MenuItem>
                {ports.map((port, index) => {
                  console.log(`Port ${index}:`, port);
                  const portId = String(port.portId || port.id);
                  const portName = port.portName || port.name;

                  return (
                    <MenuItem key={portId} value={portId} style={{ textAlign: "center" }}>
                      {portName}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>

            {/* Berth Name */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Berth Name *"
                name="berthName"
                value={formData.berthName}
                onChange={handleChange}
                required
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Length */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Length (m)"
                name="length"
                type="number"
                value={formData.length}
                onChange={handleChange}
                inputProps={{ step: "0.01" }}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Width */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Width (m)"
                name="width"
                type="number"
                value={formData.width}
                onChange={handleChange}
                inputProps={{ step: "0.01" }}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Max Draft */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Max Draft (m)"
                name="maxDraft"
                type="number"
                value={formData.maxDraft}
                onChange={handleChange}
                inputProps={{ step: "0.01" }}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Max Ship Capacity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Max Ship Capacity"
                name="maxShipCapacity"
                type="number"
                value={formData.maxShipCapacity}
                onChange={handleChange}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Availability Status */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                variant="outlined"
                label="Availability Status"
                name="availabilityStatus"
                value={formData.availabilityStatus}
                onChange={handleChange}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                SelectProps={{
                  style: {
                    textAlign: "center",
                    fontSize: "18px",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              >
                <MenuItem value="available" style={{ textAlign: "center" }}>
                  Available
                </MenuItem>
                <MenuItem value="occupied" style={{ textAlign: "center" }}>
                  Occupied
                </MenuItem>
                <MenuItem value="maintenance" style={{ textAlign: "center" }}>
                  Maintenance
                </MenuItem>
                <MenuItem value="out_of_order" style={{ textAlign: "center" }}>
                  Out of Order
                </MenuItem>
              </TextField>
            </Grid>

            {/* Preferred Ship Type */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Preferred Ship Type"
                name="preferredShipType"
                value={formData.preferredShipType}
                onChange={handleChange}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Loading Rate */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Loading Rate (tons/hour)"
                name="loadingRate"
                type="number"
                value={formData.loadingRate}
                onChange={handleChange}
                inputProps={{ step: "0.01" }}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Crane Count */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Crane Count"
                name="craneCount"
                type="number"
                value={formData.craneCount}
                onChange={handleChange}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Crane Capacity */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                label="Crane Capacity (tons)"
                name="craneCapacity"
                type="number"
                value={formData.craneCapacity}
                onChange={handleChange}
                inputProps={{ step: "0.01" }}
                {...customInputProps}
                InputLabelProps={{
                  style: {
                    fontSize: "18px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
                sx={{
                  "& .MuiInputLabel-shrink": {
                    left: "0",
                    transform: "none",
                  },
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || ports.length === 0}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{ mt: 2 }}
              >
                {loading ? "Adding Berth..." : "Save Berth"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Card>
  );
};

export default Add_Berth_Ship;
