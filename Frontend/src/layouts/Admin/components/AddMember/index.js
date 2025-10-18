import React, { useState, useEffect } from "react";
import {
  Card,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { api } from "utils/api";

const AddMember = () => {
  // User form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // Role form state
  const [roleFormData, setRoleFormData] = useState({
    roleName: "",
    description: "",
  });

  // Available roles from backend
  const [roles, setRoles] = useState([]);

  // UI state
  const [userLoading, setUserLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roleError, setRoleError] = useState("");
  const [roleSuccess, setRoleSuccess] = useState("");

  // Input styling to match AddShip/AddBerth
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
    // Add specific styling for select fields
    "& .MuiSelect-select": {
      textAlign: "center",
      fontSize: "18px",
    },
    "& .MuiSvgIcon-root": {
      color: "rgba(255,255,255,0.7)",
    },
  };
  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      console.log("Fetching roles from API...");
      const rolesData = await api.getRoles();
      console.log("Raw roles data:", rolesData);

      // Handle different response formats
      let rolesList = [];
      if (Array.isArray(rolesData)) {
        rolesList = rolesData;
      } else if (rolesData.results && Array.isArray(rolesData.results)) {
        rolesList = rolesData.results;
      } else if (rolesData.data && Array.isArray(rolesData.data)) {
        rolesList = rolesData.data;
      }

      console.log("Processed roles list:", rolesList);
      setRoles(rolesList);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setError("Error loading roles. Please refresh the page.");
    }
  };

  // User form handlers
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    console.log(`User form change: ${name} = ${value}`);
    setUserFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  // Role form handlers
  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setRoleFormData((prev) => ({ ...prev, [name]: value }));
    if (roleError) setRoleError("");
  };

  const validateUserForm = () => {
    if (!userFormData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!userFormData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!userFormData.password) {
      setError("Password is required");
      return false;
    }
    if (!userFormData.role) {
      setError("Please select a role");
      return false;
    }
    if (userFormData.password !== userFormData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (userFormData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userFormData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateRoleForm = () => {
    if (!roleFormData.roleName.trim()) {
      setRoleError("Role name is required");
      return false;
    }
    return true;
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateUserForm()) return;

    try {
      setUserLoading(true);
      const userData = {
        username: userFormData.username.trim(),
        email: userFormData.email.trim(),
        passwordHash: userFormData.password,
        role: parseInt(userFormData.role), // Convert back to int for API
      };

      console.log("Submitting user data:", userData);
      await api.createUser(userData);
      setSuccess("Member added successfully!");
      setUserFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
    } catch (err) {
      console.error("Error creating user:", err);
      setError(err.message || "Failed to add member. Please try again.");
    } finally {
      setUserLoading(false);
    }
  };
  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    setRoleError("");
    setRoleSuccess("");

    if (!validateRoleForm()) return;

    try {
      setRoleLoading(true);
      const roleData = {
        roleName: roleFormData.roleName.trim(),
        description: roleFormData.description.trim(),
      };

      await api.createRole(roleData);
      setRoleSuccess("Role created successfully!");
      setRoleFormData({
        roleName: "",
        description: "",
      });

      // Refresh roles list
      await fetchRoles();
    } catch (err) {
      console.error("Error creating role:", err);
      setRoleError(err.message || "Failed to create role. Please try again.");
    } finally {
      setRoleLoading(false);
    }
  };

  // Debug: Log current form state
  console.log("Current userFormData:", userFormData);
  console.log("Current roles:", roles);

  return (
    <Box>
      {/* User Creation Form */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Typography color="white" variant="lg" fontWeight="bold" mb="6px">
          Add New Member
        </Typography>
        <form onSubmit={handleUserSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={userFormData.username}
              onChange={handleUserChange}
              sx={inputStyle}
            />
            <TextField
              name="email"
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={userFormData.email}
              onChange={handleUserChange}
              sx={inputStyle}
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={userFormData.password}
              onChange={handleUserChange}
              sx={inputStyle}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={userFormData.confirmPassword}
              onChange={handleUserChange}
              sx={inputStyle}
            />
            <TextField
              name="role"
              label="Role"
              variant="outlined"
              fullWidth
              required
              select
              value={userFormData.role}
              onChange={handleUserChange}
              sx={inputStyle}
            >
              <MenuItem value="">
                {roles.length === 0 ? "No roles available" : "Select Role"}
              </MenuItem>
              {roles.map((role, index) => {
                const roleId = String(role.roleId); // Convert to string
                const roleName = role.roleName;

                return (
                  <MenuItem key={roleId} value={roleId}>
                    {roleName}
                  </MenuItem>
                );
              })}
            </TextField>
            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 1 }}>
                {success}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={userLoading || roles.length === 0}
              startIcon={userLoading ? <CircularProgress size={20} /> : null}
              sx={{ mt: 2 }}
            >
              {userLoading ? "Adding Member..." : "Add Member"}
            </Button>
          </Box>
        </form>
      </Card>

      {/* Divider */}
      <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Role Creation Form */}
      <Card sx={{ p: 2 }}>
        <Typography color="white" variant="lg" fontWeight="bold" mb="6px">
          Create New Role
        </Typography>
        <form onSubmit={handleRoleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              name="roleName"
              label="Role Name"
              variant="outlined"
              fullWidth
              required
              value={roleFormData.roleName}
              onChange={handleRoleChange}
              sx={inputStyle}
            />
            <TextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={roleFormData.description}
              onChange={handleRoleChange}
              sx={inputStyle}
            />

            {roleError && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {roleError}
              </Alert>
            )}
            {roleSuccess && (
              <Alert severity="success" sx={{ mt: 1 }}>
                {roleSuccess}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={roleLoading}
              startIcon={roleLoading ? <CircularProgress size={20} /> : null}
              sx={{ mt: 2 }}
            >
              {roleLoading ? "Creating Role..." : "Create Role"}
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default AddMember;
