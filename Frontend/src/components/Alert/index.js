// React components
import { useState } from "react";
import PropTypes from "prop-types";
import Fade from "@mui/material/Fade";
import Box from "components/Box";
import AlertRoot from "components/Alert/AlertRoot";
import AlertCloseIcon from "components/Alert/AlertCloseIcon";

function Alert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");
// Alert template
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <AlertRoot ownerState={{ color }} {...rest}>
        <Box display="flex" alignItems="center" color="white">
          {children}
        </Box>
        {dismissible ? (
          <AlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</AlertCloseIcon>
        ) : null}
      </AlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of Alert
Alert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the Alert
Alert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Alert;
