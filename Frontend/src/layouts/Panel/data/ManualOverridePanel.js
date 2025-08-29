import React, { useState } from "react"; // Required for dropdown functionality
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "components/Box";
import Typography from "components/Typography";

function BerthStatus({ status }) {
  let icon
  let text
  let color

  if (status === "available") {
    icon = "✅";
    text = "Available";
    color = "green";
  } else if (status === "occupied") {
    icon = "🟡";
    text = "Occupied - 10m"; // Simulated timer
    color = "yellow";
  } else if (status === "Conflict") {
    icon = "🔴";
    text = "Conflict";
    color = "red";
  }
  else if (status==="Out Of Order"){
   icon = "⚫"; 
   color = "white";
   text = "Out of Order";
  } 

  return (
    <Typography variant="button" style={{ color }} fontWeight="medium">
      {icon} {text}
    </Typography>
  );
}

// Reusable component: Manual Override Dropdown
function ManualOverrideDropdown({ selected, onChange }) {
  const options = ["Berth1", "Berth2", "Berth3", "Berth4", "Berth5"];

  return (
    <Select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      variant="standard"
      sx={{
        color: "white",
        borderBottom: "1px solid white",
        "& .MuiSelect-icon": { color: "white" },
      }}
    >
      <MenuItem value="" disabled>
        Select Berth
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}

// Table Data
export default {
  columns: [
    { name: "ship name", align: "left" },            
    { name: "berth assigned", align: "left" },        
    { name: "berth status", align: "left" },          
    { name: "manual override", align: "center" },     
  ],

  // Rows
  rows: [
    {
      "ship name": (
        <Box display="flex" alignItems="center">
          <Typography pl="16px" color="white" variant="button" fontWeight="medium">
            Oceanic Star
          </Typography>
        </Box>
      ),
      "berth assigned": (
        <Typography variant="button" color="white" fontWeight="medium">
          Berth2
        </Typography>
      ),
      "berth status": <BerthStatus status="occupied" />,
      "manual override": <ManualOverrideDropdown selected="Berth2" onChange={() => {}} />,
    },
    {
      "ship name": (
        <Box display="flex" alignItems="center">
          <Typography pl="16px" color="white" variant="button" fontWeight="medium">
            Blue Horizon
          </Typography>
        </Box>
      ),
      "berth assigned": (
        <Typography variant="button" color="white" fontWeight="medium">
          Berth3
        </Typography>
      ),
      "berth status": <BerthStatus status="available" />,
      //completion: <Progress value={100} color="info" sx={{ background: "#2D2E5F" }} label={false} />,
      "manual override": <ManualOverrideDropdown selected="Berth3" onChange={() => {}} />,
    },
    {
      "ship name": (
        <Box display="flex" alignItems="center">
          <Typography pl="16px" color="white" variant="button" fontWeight="medium">
            -
          </Typography>
        </Box>
      ),
      "berth assigned": (
        <Typography variant="button" color="white" fontWeight="medium">
          Berth 1
        </Typography>
      ),
      "berth status": <BerthStatus status="Out Of Order" />,
      //completion: <Progress value={30} color="info" sx={{ background: "#2D2E5F" }} label={false} />,
      "manual override": <ManualOverrideDropdown selected="Berth1" onChange={() => {}} />,
    },
    {
      "ship name": (
        <Box display="flex" alignItems="center">
          <Typography pl="16px" color="white" variant="button" fontWeight="medium">
            Neptune Cargo
          </Typography>
        </Box>
      ),
      "berth assigned": (
        <Typography variant="button" color="white" fontWeight="medium">
          Berth5
        </Typography>
      ),
      "berth status": <BerthStatus status="available" />,
      "manual override": <ManualOverrideDropdown selected="Berth5" onChange={() => {}} />,
    },
    {
      "ship name": (
        <Box display="flex" alignItems="center">
          <Typography pl="16px" color="white" variant="button" fontWeight="medium">
            Crimson Wave
          </Typography>
        </Box>
      ),
      "berth assigned": (
        <Typography variant="button" color="white" fontWeight="medium">
          Berth4
        </Typography>
      ),
      "berth status": <BerthStatus status="Conflict" />,
      "manual override": <ManualOverrideDropdown selected="Berth4" onChange={() => {}} />,
    },
  ],
};
