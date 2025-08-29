import { Card, TextField, MenuItem, Button, Grid, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import Box from 'components/Box';
import Typography from 'components/Typography';

const Add_Berth_Ship = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: '',
    capacity: '',
    remarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Berth Data:', formData);
  };

  const customInputProps = {
    style: {
      textAlign: 'center', 
    },
  };

  return (
    <Card>
      <Box p={3}>
        <Typography variant='lg' color='white' fontWeight='bold' mb={2}>
          Add New Berth
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Berth Name Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Berth Name" // <-- Changed from label to placeholder
                name="name"
                value={formData.name}
                onChange={handleChange}
                {...customInputProps}
              />
            </Grid>

            {/* Location Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Location" // <-- Changed from label to placeholder
                name="location"
                value={formData.location}
                onChange={handleChange}
                {...customInputProps}
              />
            </Grid>

            {/* Status Dropdown */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                variant="outlined"
                placeholder="Status" // <-- Changed from label to placeholder
                name="status"
                value={formData.status}
                onChange={handleChange}
                SelectProps={{ displayEmpty: true }} // <-- To show placeholder when empty
                {...customInputProps}
              >
                <MenuItem value="" disabled>
                  Status
                </MenuItem>
                <MenuItem value="Available">Available</MenuItem>
                <MenuItem value="Occupied">Occupied</MenuItem>
                <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
              </TextField>
            </Grid>

            {/* Capacity Input */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Capacity (in tons)" // <-- Changed from label to placeholder
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                {...customInputProps}
              />
            </Grid>

            {/* Remarks Input */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Additional Remarks" // <-- Changed from label to placeholder
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                multiline
                rows={3}
                {...customInputProps}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Berth
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Card>
  );
};

export default Add_Berth_Ship;

