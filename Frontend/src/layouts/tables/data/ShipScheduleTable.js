import Box from "components/Box";
import Typography from "components/Typography";
import Badge from "components/Badge";

function ShipSchedule({ Ship_Name }) {
  return (
    <Box display="flex" alignItems="center" px={1} py={0.5}>
      <Typography variant="button" color="white" fontWeight="medium">
        {Ship_Name}
      </Typography>
    </Box>
  );
}

function Berth_Assigned({ assignedBerth }) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="caption" fontWeight="medium" color="white">
        {assignedBerth}
      </Typography>
    </Box>
  );
}

// Export Ship Schedule Overview Table Data
export default {
  columns: [
    { name: "ShipSchedule", align: "left" }, 
    { name: "Berth_Assigned", align: "left" },   
    { name: "Status", align: "center" },     
    { name: "ETA", align: "center" },        
    { name: "ETD", align: "center" },       
  ],

  rows: [
    {
      ShipSchedule: <ShipSchedule Ship_Name="Alpha" />,
      Berth_Assigned: <Berth_Assigned assignedBerth="Berth 1" />, 
      Status: (
        <Badge
          variant="standard"
          badgeContent="On Time" // Status
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      ETA: (
        <Typography variant="caption" color="white" fontWeight="medium">
          10:00 AM
        </Typography>
      ),
      ETD: (
        <Typography variant="caption" color="white" fontWeight="medium">
          6:00 PM
        </Typography>
      ),
    },
    {
      ShipSchedule: <ShipSchedule Ship_Name="BETA" />,
      Berth_Assigned: <Berth_Assigned assignedBerth="Berth 3" />,
      Status: (
        <Badge
          variant="standard"
          badgeContent="Delayed"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      ETA: (
        <Typography variant="caption" color="white" fontWeight="medium">
          11:30 AM
        </Typography>
      ),
      ETD: (
        <Typography variant="caption" color="white" fontWeight="medium">
          7:30 PM
        </Typography>
      ),
    },
    {
      ShipSchedule: <ShipSchedule Ship_Name="Omricon" />,
      Berth_Assigned: <Berth_Assigned assignedBerth="Berth 4" />,
      Status: (
        <Badge
          variant="standard"
          badgeContent="On Time"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      ETA: (
        <Typography variant="caption" color="white" fontWeight="medium">
          9:45 AM
        </Typography>
      ),
      ETD: (
        <Typography variant="caption" color="white" fontWeight="medium">
          10:00 PM
        </Typography>
      ),
    },
    {
      ShipSchedule: <ShipSchedule Ship_Name="Delta" />,
      Berth_Assigned: <Berth_Assigned assignedBerth="Berth 6" />,
      Status: (
        <Badge
          variant="standard"
          badgeContent="On Time"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      ETA: (
        <Typography variant="caption" color="white" fontWeight="medium">
          8:00 AM
        </Typography>
      ),
      ETD: (
        <Typography variant="caption" color="white" fontWeight="medium">
          11:00 PM
        </Typography>
      ),
    },
    {
      ShipSchedule: <ShipSchedule Ship_Name="Gamma" />,
      Berth_Assigned: <Berth_Assigned assignedBerth="Berth 2" />,
      Status: (
        <Badge
          variant="standard"
          badgeContent="Delayed"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      ETA: (
        <Typography variant="caption" color="white" fontWeight="medium">
          4:00 AM
        </Typography>
      ),
      ETD: (
        <Typography variant="caption" color="white" fontWeight="medium">
          1:00 PM
        </Typography>
      ),
    },
    {
      ShipSchedule: <ShipSchedule Ship_Name="Hexa Marine" />,
      Berth_Assigned: <Berth_Assigned assignedBerth="Berth 5" />,
      Status: (
        <Badge
          variant="standard"
          badgeContent="Delayed"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      ETA: (
        <Typography variant="caption" color="white" fontWeight="medium">
          2:00 PM
        </Typography>
      ),
      ETD: (
        <Typography variant="caption" color="white" fontWeight="medium">
          10:00 PM
        </Typography>
      ),
    },
  ],
};
