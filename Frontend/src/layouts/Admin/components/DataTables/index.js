import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { api } from "utils/api";
import Table from "examples/Tables/Table";

const ENTITY_ORDER = [
  { key: "ships", label: "Ships", singular: "Ship" },
  { key: "berths", label: "Berths", singular: "Berth" },
  { key: "users", label: "Members", singular: "Member" },
  { key: "roles", label: "Roles", singular: "Role" },
];

const AVAILABILITY_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "occupied", label: "Occupied" },
  { value: "maintenance", label: "Maintenance" },
  { value: "out_of_order", label: "Out of Order" },
];

const normalizeList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.results && Array.isArray(payload.results)) return payload.results;
  if (payload?.data && Array.isArray(payload.data)) return payload.data;
  return [];
};

const toFloat = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
};

const toInt = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

const entityConfig = {
  ships: {
    idKey: "shipId",
    columns: [
      { key: "shipName", label: "Ship", align: "left" },
      { key: "shipType", label: "Type", align: "left" },
      { key: "nationality", label: "Flag", align: "center" },
      { key: "priorityLevel", label: "Priority", align: "center" },
    ],
    fields: [
      { name: "shipName", label: "Ship Name", type: "text", required: true },
      { name: "shipType", label: "Ship Type", type: "text" },
      { name: "cargoType", label: "Cargo Type", type: "text" },
      { name: "length", label: "Length (m)", type: "number", step: "0.01" },
      { name: "beam", label: "Beam (m)", type: "number", step: "0.01" },
      { name: "draft", label: "Draft (m)", type: "number", step: "0.01" },
      { name: "grossTonnage", label: "Gross Tonnage", type: "number", step: "0.01" },
      { name: "nationality", label: "Nationality", type: "text" },
      { name: "priorityLevel", label: "Priority Level", type: "number", step: "1" },
    ],
    creator: api.createShip,
    updater: api.updateShip,
    deleter: api.deleteShip,
    fetcher: api.getShips,
    payload: (values) => ({
      ...values,
      length: toFloat(values.length),
      beam: toFloat(values.beam),
      draft: toFloat(values.draft),
      grossTonnage: toFloat(values.grossTonnage),
      priorityLevel: toInt(values.priorityLevel) ?? 1,
    }),
  },
  berths: {
    idKey: "berthId",
    columns: [
      { key: "berthName", label: "Berth", align: "left" },
      { key: "port", label: "Port", align: "left" },
      { key: "availabilityStatus", label: "Status", align: "center" },
      { key: "maxShipCapacity", label: "Capacity", align: "center" },
    ],
    fields: [
      { name: "berthName", label: "Berth Name", type: "text", required: true },
      { name: "port", label: "Port", type: "select", required: true, optionType: "ports" },
      {
        name: "availabilityStatus",
        label: "Availability",
        type: "select",
        options: AVAILABILITY_OPTIONS,
      },
      { name: "length", label: "Length (m)", type: "number", step: "0.01" },
      { name: "width", label: "Width (m)", type: "number", step: "0.01" },
      { name: "maxDraft", label: "Max Draft (m)", type: "number", step: "0.01" },
      { name: "maxShipCapacity", label: "Max Ship Capacity", type: "number", step: "1" },
      { name: "preferredShipType", label: "Preferred Ship Type", type: "text" },
      { name: "loadingRate", label: "Loading Rate (tons/hr)", type: "number", step: "0.01" },
      { name: "craneCount", label: "Crane Count", type: "number", step: "1" },
      { name: "craneCapacity", label: "Crane Capacity (tons)", type: "number", step: "0.01" },
    ],
    creator: api.createBerth,
    updater: api.updateBerth,
    deleter: api.deleteBerth,
    fetcher: api.getBerths,
    payload: (values) => ({
      ...values,
      port: toInt(values.port),
      length: toFloat(values.length),
      width: toFloat(values.width),
      maxDraft: toFloat(values.maxDraft),
      maxShipCapacity: toInt(values.maxShipCapacity),
      loadingRate: toFloat(values.loadingRate),
      craneCount: toInt(values.craneCount),
      craneCapacity: toFloat(values.craneCapacity),
    }),
  },
  users: {
    idKey: "userId",
    columns: [
      { key: "username", label: "Username", align: "left" },
      { key: "email", label: "Email", align: "left" },
      { key: "roleName", label: "Role", align: "center" },
    ],
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "role", label: "Role", type: "select", required: true, optionType: "roles" },
      { name: "newPassword", label: "New Password", type: "password" },
    ],
    creator: api.createUser,
    updater: api.updateUser,
    deleter: api.deleteUser,
    fetcher: api.getUsers,
    payload: (values, isCreate = false) => {
      const payload = {
        username: values.username?.trim(),
        email: values.email?.trim(),
        role: toInt(values.role),
      };
      if (isCreate) {
        // For create, password is required
        payload.passwordHash = values.password || values.newPassword || "";
      } else if (values.newPassword) {
        // For update, password is optional
        payload.passwordHash = values.newPassword;
      }
      return payload;
    },
  },
  roles: {
    idKey: "roleId",
    columns: [
      { key: "roleName", label: "Role", align: "left" },
      { key: "description", label: "Description", align: "left" },
    ],
    fields: [
      { name: "roleName", label: "Role Name", type: "text", required: true },
      { name: "description", label: "Description", type: "text" },
    ],
    creator: api.createRole,
    updater: api.updateRole,
    deleter: api.deleteRole,
    fetcher: api.getRoles,
    payload: (values) => {
      const trimmedRoleName = values.roleName?.trim();
      if (!trimmedRoleName) {
        throw new Error("Role name is required");
      }
      return {
        roleName: trimmedRoleName,
        description: values.description?.trim() || "",
      };
    },
  },
};

const DataTables = () => {
  const [activeEntity, setActiveEntity] = useState("ships");
  const [data, setData] = useState({
    ships: [],
    berths: [],
    users: [],
    roles: [],
    ports: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [editState, setEditState] = useState({
    open: false,
    mode: "edit", // "add" or "edit"
    entity: null,
    record: null,
    values: {},
  });
  const [actionLoading, setActionLoading] = useState(false);

  const portLookup = useMemo(() => {
    const map = new Map();
    data.ports.forEach((port) => map.set(port.portId, port.portName));
    return map;
  }, [data.ports]);

  const roleLookup = useMemo(() => {
    const map = new Map();
    data.roles.forEach((role) => map.set(role.roleId, role.roleName));
    return map;
  }, [data.roles]);

  const loadAll = async () => {
    setError("");
    setLoading(true);
    try {
      const responses = await Promise.all([
        api.getShips(),
        api.getBerths(),
        api.getUsers(),
        api.getRoles(),
        api.getPorts(),
      ]);
      setData({
        ships: normalizeList(responses[0]),
        berths: normalizeList(responses[1]),
        users: normalizeList(responses[2]),
        roles: normalizeList(responses[3]),
        ports: normalizeList(responses[4]),
      });
    } catch (err) {
      console.error("Failed to load admin tables:", err);
      setError(err.message || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const refreshEntity = async (entity) => {
    if (entity === "ports") {
      await loadAll();
      return;
    }
    setError("");
    setRefreshing(true);
    try {
      const response = await entityConfig[entity].fetcher();
      setData((prev) => ({
        ...prev,
        [entity]: normalizeList(response),
      }));
      if (entity === "roles") {
        const portsResponse = await api.getPorts();
        setData((prev) => ({
          ...prev,
          ports: normalizeList(portsResponse),
        }));
      }
    } catch (err) {
      console.error(`Failed to refresh ${entity}:`, err);
      setError(err.message || `Failed to refresh ${entity}`);
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (entity, record) => {
    const config = entityConfig[entity];
    const id = record[config.idKey];
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    if (!confirmed) return;

    setError("");
    setActionLoading(true);
    try {
      await config.deleter(id);
      await refreshEntity(entity);
    } catch (err) {
      console.error(`Delete ${entity} failed:`, err);
      setError(err.message || "Failed to delete record.");
    } finally {
      setActionLoading(false);
    }
  };

  const openEditDialog = (entity, record) => {
    const config = entityConfig[entity];
    const values = {};
    config.fields.forEach((field) => {
      if (field.name === "newPassword") {
        values[field.name] = "";
        return;
      }
      const rawValue = record[field.name];
      if (rawValue === null || rawValue === undefined) {
        values[field.name] = "";
      } else if (field.type === "number") {
        values[field.name] = String(rawValue);
      } else {
        values[field.name] = String(rawValue);
      }
    });
    setEditState({
      open: true,
      mode: "edit",
      entity,
      record,
      values,
    });
  };

  const openAddDialog = (entity) => {
    const config = entityConfig[entity];
    const values = {};
    config.fields.forEach((field) => {
      if (field.name === "newPassword") {
        // For add mode, use "password" instead of "newPassword" for users
        if (entity === "users") {
          values["password"] = "";
        } else {
          values[field.name] = "";
        }
        return;
      }
      values[field.name] = "";
    });
    setEditState({
      open: true,
      mode: "add",
      entity,
      record: null,
      values,
    });
  };

  const closeEditDialog = () => {
    setEditState({
      open: false,
      mode: "edit",
      entity: null,
      record: null,
      values: {},
    });
  };

  const handleFieldChange = (name, value) => {
    setEditState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  const saveEdit = async () => {
    if (!editState.entity) return;
    const config = entityConfig[editState.entity];
    const isCreate = editState.mode === "add";
    setActionLoading(true);
    setError("");
    try {
      let payload = config.payload(editState.values, isCreate);
      // Remove primary key from payload when creating (should be auto-generated)
      if (isCreate && config.idKey) {
        const { [config.idKey]: _, ...payloadWithoutId } = payload;
        payload = payloadWithoutId;
      }
      if (isCreate) {
        await config.creator(payload);
      } else {
        if (!editState.record) return;
        const id = editState.record[config.idKey];
        await config.updater(id, payload);
      }
      closeEditDialog();
      await refreshEntity(editState.entity);
    } catch (err) {
      console.error(isCreate ? "Create failed:" : "Update failed:", err);
      setError(err.message || `Failed to ${isCreate ? "create" : "update"} record.`);
    } finally {
      setActionLoading(false);
    }
  };

  const renderCellValue = (entity, row, column) => {
    if (entity === "berths" && column.key === "port") {
      return portLookup.get(row.port) || row.portName || "—";
    }
    if (entity === "users" && column.key === "roleName") {
      return row.roleName || roleLookup.get(row.role) || "—";
    }
    const value = row[column.key];
    if (value === null || value === undefined || value === "") return "—";
    return value;
  };

  const currentConfig = entityConfig[activeEntity];
  const entityRows = data[activeEntity] || [];

  const tableColumns = useMemo(() => {
    const cols =
      currentConfig?.columns?.map((column) => ({
        name: column.label,
        align: column.align || "left",
      })) || [];
    return [
      ...cols,
      {
        name: "Actions",
        align: "center",
      },
    ];
  }, [currentConfig]);

  const tableRows = useMemo(() => {
    return entityRows.map((row) => {
      const rowData = {};
      currentConfig.columns.forEach((column) => {
        const rendered = renderCellValue(activeEntity, row, column);
        rowData[column.label] = (
          <Typography variant="body1" color="white !important" fontWeight="medium" sx={{ fontSize: '1.05rem', color: 'white !important' }}>
            {rendered}
          </Typography>
        );
      });
      rowData.Actions = (
        <Box display="flex" justifyContent="center" gap={1}>
          <Tooltip title="Edit record">
            <span>
              <IconButton
                size="medium"
                color="primary"
                onClick={() => openEditDialog(activeEntity, row)}
                disabled={actionLoading}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete record">
            <span>
              <IconButton
                size="medium"
                color="error"
                onClick={() => handleDelete(activeEntity, row)}
                disabled={actionLoading}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      );
      return rowData;
    });
  }, [entityRows, currentConfig, activeEntity, actionLoading]);

  return (
    <Card sx={{ 
      p: 3, 
      mt: 4, 
      position: "relative",
      color: 'white',
      '& *': {
        color: 'white !important',
      },
      '& .MuiTypography-root': {
        color: 'white !important',
      },
      '& .MuiTableHead-root .MuiTableCell-root': {
        color: 'white',
        fontSize: '1.3rem',
        fontWeight: 700,
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
      },
      '& .MuiTableCell-root': {
        color: 'white',
        fontSize: '1rem',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      '& .MuiInputBase-root': {
        color: 'white',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        '&.Mui-focused .MuiInputLabel-root': {
          color: 'white',
        },
      },
      '& .MuiSvgIcon-root': {
        color: 'white',
      },
      '& .MuiButton-text': {
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    }}>
      <Box
        sx={{ 
          position: "relative", 
          mb: 3, 
          minHeight: 40, 
          display: "flex", 
          alignItems: "center",
          '& .MuiButton-root': {
            fontSize: '1rem',
            color: 'white',
            '&:hover': {
              color: 'white',
            }
          },
          '& .MuiButton-contained': {
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }
        }}
      >
        <Box sx={{ position: "absolute", left: 0 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openAddDialog(activeEntity)}
            disabled={actionLoading}
          >
            + New {ENTITY_ORDER.find((item) => item.key === activeEntity)?.singular}
          </Button>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <ButtonGroup fullWidth={false} variant="contained" sx={{ flexWrap: "wrap" }}>
            {ENTITY_ORDER.map(({ key, label }) => (
              <Button
                key={key}
                color={key === activeEntity ? "primary" : "secondary"}
                onClick={() => setActiveEntity(key)}
                sx={{ minWidth: 110 }}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box sx={{ position: "absolute", right: 0 }}>
          <Button
            variant="outlined"
            color="info"
            startIcon={<RefreshIcon />}
            onClick={() => refreshEntity(activeEntity)}
            disabled={loading || refreshing || actionLoading}
            sx={{ minWidth: 140 }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : entityRows.length === 0 ? (
        <Typography variant="body1" color="white">
          No records available for {ENTITY_ORDER.find((item) => item.key === activeEntity)?.label}.
        </Typography>
      ) : (
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
          <Table columns={tableColumns} rows={tableRows} />
        </Box>
      )}

      <Dialog 
        open={editState.open} 
        onClose={closeEditDialog} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: 'linear-gradient(195deg, #1a1a2e 0%, #16213e 100%)',
            color: 'white',
            borderRadius: 3,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '& .MuiDialogTitle-root': {
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '24px',
            },
            '& .MuiDialogContent-root': {
              padding: '24px !important',
            },
            '& .MuiDialogActions-root': {
              padding: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            },
            '& .MuiTextField-root': {
              marginBottom: 2.5,
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7) !important',
                top: 0,
                transform: 'translate(14px, 16px) scale(1)',
                '&.Mui-focused': {
                  color: '#3498db !important',
                },
                '&.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -9px) scale(0.75)',
                  backgroundColor: '#1a1a2e',
                  padding: '0 4px',
                },
              },
              '& .MuiOutlinedInput-root': {
                color: 'white !important',
                backgroundColor: 'rgba(255, 255, 255, 0.05) !important',
                borderRadius: 2,
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2) !important',
                  top: 0,
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.4) !important',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3498db !important',
                },
                '& input': {
                  color: 'white !important',
                  backgroundColor: 'transparent !important',
                  padding: '16px 14px !important',
                  height: 'auto',
                },
                '& .MuiSelect-select': {
                  color: 'white !important',
                  padding: '16px 14px !important',
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                }
              },
              '& .MuiInputBase-root': {
                color: 'white !important',
              },
              '& .MuiSelect-icon': {
                color: 'white !important',
              },
            },
          },
        }}
      >
        <DialogTitle>
          {editState.mode === "add" ? "Add" : "Edit"}{" "}
          {ENTITY_ORDER.find((item) => item.key === editState.entity)?.singular}
        </DialogTitle>
        <DialogContent dividers>
          {editState.entity &&
            entityConfig[editState.entity].fields.map((field) => {
              // For users in add mode, show "password" instead of "newPassword"
              const fieldName =
                editState.mode === "add" &&
                field.name === "newPassword" &&
                editState.entity === "users"
                  ? "password"
                  : field.name;
              const value = editState.values[fieldName] ?? "";
              // In add mode, password is required for users
              const isRequired =
                editState.mode === "add" && fieldName === "password" && editState.entity === "users"
                  ? true
                  : field.required;
              if (field.type === "select") {
                let options = field.options || [];
                if (field.optionType === "ports") {
                  options = data.ports.map((port) => ({
                    value: String(port.portId),
                    label: port.portName,
                  }));
                }
                if (field.optionType === "roles") {
                  options = data.roles.map((role) => ({
                    value: String(role.roleId),
                    label: role.roleName,
                  }));
                }
                return (
                  <TextField
                    key={field.name}
                    select
                    fullWidth
                    margin="normal"
                    label={field.label}
                    name={fieldName}
                    value={value}
                    required={isRequired}
                    onChange={(event) => handleFieldChange(fieldName, event.target.value)}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                );
              }

              // Update label for password field in add mode
              const fieldLabel =
                editState.mode === "add" && fieldName === "password" && editState.entity === "users"
                  ? "Password"
                  : field.label;

              return (
                <TextField
                  key={field.name}
                  fullWidth
                  margin="normal"
                  type={field.type === "password" ? "password" : field.type || "text"}
                  label={fieldLabel}
                  name={fieldName}
                  value={value}
                  required={isRequired}
                  inputProps={field.step ? { step: field.step } : undefined}
                  onChange={(event) => handleFieldChange(fieldName, event.target.value)}
                />
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveEdit} variant="contained" color="primary" disabled={actionLoading}>
            {actionLoading
              ? editState.mode === "add"
                ? "Creating..."
                : "Saving..."
              : editState.mode === "add"
              ? "Create"
              : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DataTables;
