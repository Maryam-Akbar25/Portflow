import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";

//berth assignment box
function BerthAssignment({ ship, berth, method, notes, noGutter }) {
  return (
    <Box
      component="li"
      display="flex"
      flexDirection="column"
      mb={noGutter ? 0 : 2}
      p={2}
      sx={{
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
        listStyle: "none",
      }}
    >
      <Typography variant="button" fontWeight="bold" color="white">
        Ship: {ship}
      </Typography>
      <Typography variant="caption" color="white">
        Berth Number: {berth}
      </Typography>
      <Typography variant="caption" color="white">
        Assigned By: {method}
      </Typography>
      <Typography variant="caption" color="white">
        Notes: {notes}
      </Typography>
    </Box>
  );
}

function BerthAllocationInfo() {
  return (
    <Card id="berth-allocations">
      {/* Card Header */}
      <Box mb={3}>
        <Typography variant="lg" color="white" fontWeight="bold">
          Latest Berth Allocations
        </Typography>
      </Box>

      {/* Allocation List */}
      <Box>
        <Box component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {/* Example Allocation 1 */}
          <BerthAssignment
            ship="MV Horizon Star"
            berth="B-07"
            method="AI Recommendation"
            notes="ETA: 08:00, Container Cargo"
          />

          {/* Example Allocation 2 */}
          <BerthAssignment
            ship="SS Marine Queen"
            berth="B-03"
            method="Manual Override"
            notes="Priority vessel, adjusted manually"
          />

          {/* Example Allocation 3 */}
          <BerthAssignment
            ship="Ocean Voyager"
            berth="B-09"
            method="AI Recommendation"
            notes="Bulk Cargo, ETA: 14:30"
            noGutter
          />
        </Box>
      </Box>
    </Card>
  );
}

export default BerthAllocationInfo;
