import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";

function Insights({ color, icon, name, description, value }) {
  return (
    <Box key={name} component="li" py={1} pr={2} mb={1}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <Button
              variant="outlined"
              color={color}
              sx={{ fontWeight: "bold", width: "35px", height: "35px" }}
              size="small"
              iconOnly
              circular
            >
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </Button>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="button" color="white" fontWeight="medium" gutterBottom>
              {name}
            </Typography>
            <Typography variant="caption" color="text">
              {description}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="button"
          color={color}
          fontWeight="medium"
          sx={({ breakpoints }) => ({
            [breakpoints.down("lg")]: {
              minWidth: "75px",
              ml: "12px",
            },
          })}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// Typechecking props of the Transaction
Insights.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Insights;
