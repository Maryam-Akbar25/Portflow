import React, { useState } from "react";
import { Card, Icon, TextField } from "@mui/material";

import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";

// Background image
import welcome from "assets/images/add-member-bg.jpg";

const AddMember = () => {
  // Form state for member info
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  // Feedback messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form and post to DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add member");
      setSuccess("Member added successfully!");
      setFormData({ name: "", email: "", role: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card
      sx={({ breakpoints }) => ({
        background: `url(${welcome})`,
        backgroundSize: "cover",
        borderRadius: "20px",
        height: "100%",
        p: 4,
        [breakpoints.only("xl")]: {
          gridArea: "1 / 1 / 2 / 2",
        },
      })}
    >
      {/* Form wrapper */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        {/* Header and inputs */}
        <Box>
          {/* Title */}
          <Typography
            color="white"
            variant="h3"
            fontWeight="bold"
            mb="16px"
          >
            Add Member
          </Typography>

          {/* Name field */}
          <TextField
            fullWidth
            variant="filled"
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{ disableUnderline: true }}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
            }}
          />

          {/* Email field */}
          <TextField
            fullWidth
            variant="filled"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ disableUnderline: true }}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
            }}
          />

          {/* Role field */}
          <TextField
            fullWidth
            variant="filled"
            label="Role / Position"
            name="role"
            value={formData.role}
            onChange={handleChange}
            InputProps={{ disableUnderline: true }}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "8px",
              input: { color: "#fff" },
              label: { color: "rgba(255,255,255,0.7)" },
            }}
          />

          {/* Error message */}
          {error && (
            <Typography variant="caption" color="error" mb="2px">
              {error}
            </Typography>
          )}
          {/* Success message */}
          {success && (
            <Typography variant="caption" color="success" mb="2px">
              {success}
            </Typography>
          )}
        </Box>

        {/* Submit button */}
        <Box textAlign="right" mt="auto">
          <Button type="submit" variant="contained" color="info">
            Submit
            <Icon sx={{ fontWeight: "bold", ml: "8px" }}>
              arrow_forward
            </Icon>
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default AddMember;
