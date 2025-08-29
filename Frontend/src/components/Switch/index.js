import { forwardRef } from "react";
import PropTypes from "prop-types";

// Custom styles for Switch
import SwitchRoot from "components/Switch/SwitchRoot";

const Switch = forwardRef(({ color, size, ...rest }, ref) => (
  <SwitchRoot {...rest} ref={ref} color="white" size={size} ownerState={{ color, size }} />
));

// Setting default values for the props of Switch
Switch.defaultProps = {
  size: "medium",
  color: "white",
};

// Typechecking props for the Switch
Switch.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
};

export default Switch;
