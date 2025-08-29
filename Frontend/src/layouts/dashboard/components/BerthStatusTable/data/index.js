import Box from "components/Box";
import Typography from "components/Typography";

export default function data() {
  // helper function for colored status box with emoji
  const getStatusBox = (status) => {
    let emoji = "✅";
    let color = "green";
    let label = "Available";

    if (status === "Occupied") {
      emoji = "🟡";
      color = "gold";
      label = "Occupied";
    } else if (status === "Conflict") {
      emoji = "🔴";
      color = "red";
      label = "Conflict";
    }

    return (
      <Typography
        variant="button"
        fontWeight="bold"
        sx={{ color, display: "flex", alignItems: "center" }}
      >
        {emoji} {label}
      </Typography>
    );
  };

  return {
    columns: [
      { name: "BerthName_Number", align: "left" }, 
      { name: "status", align: "center" }, 
    ],

    rows: [
      {
        BerthName_Number: (
          <Box display="flex" alignItems="center">
            <Typography pl="16px" color="white" variant="button" fontWeight="medium">
              SS Poseidon_3
            </Typography>
          </Box>
        ),
        status: getStatusBox("Available"), 
      },
      {
        BerthName_Number: (
          <Box display="flex" alignItems="center">
            <Typography pl="16px" color="white" variant="button" fontWeight="medium">
              MV Neptune_5
            </Typography>
          </Box>
        ),
        status: getStatusBox("Occupied"), 
      },
      {
        BerthName_Number: (
          <Box display="flex" alignItems="center">
            <Typography pl="16px" color="white" variant="button" fontWeight="medium">
              SS Aurora_2
            </Typography>
          </Box>
        ),
        status: getStatusBox("Conflict"), 
      },
      {
        BerthName_Number: (
          <Box display="flex" alignItems="center">
            <Typography pl="16px" color="white" variant="button" fontWeight="medium">
              SS Star_1
            </Typography>
          </Box>
        ),
        status: getStatusBox("Available"), 
      },
      {
        BerthName_Number: (
          <Box display="flex" alignItems="center">
            <Typography pl="16px" color="white" variant="button" fontWeight="medium">
              MV Light_4
            </Typography>
          </Box>
        ),
        status: getStatusBox("Occupied"), 
      },
      {
        BerthName_Number: (
          <Box display="flex" alignItems="center">
            <Typography pl="16px" color="white" variant="button" fontWeight="medium">
              SS Berth_6
            </Typography>
          </Box>
        ),
        status: getStatusBox("Occupied"), 
      },
    ],
  };
}
