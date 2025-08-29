import { useState } from "react";
import { useNavigate } from "react-router-dom"; // added for routing
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "components/Box";
import Typography from "components/Typography";
import Table from "examples/Tables/Table";
import data from "layouts/dashboard/components/BerthStatusTable/data";

function BerthStatusTable() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate(); // hook for navigation

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const handleNavigate = (path) => {
    closeMenu();
    navigate(path); // navigate to selected route
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handleNavigate("/ManualOverride")}>Manual Overide</MenuItem>
      <MenuItem onClick={() => handleNavigate("/BerthUtilization")}>Berth Utilization</MenuItem>
    </Menu>
  );

  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <Box mb="auto">
          <Typography color="white" variant="lg" mb="6px" gutterBottom>
            Berth Status Table
          </Typography>
          <Box display="flex" alignItems="center" lineHeight={0}>
          </Box>
        </Box>
        <Box color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </Box>
        {renderMenu}
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
  );
}

export default BerthStatusTable;
