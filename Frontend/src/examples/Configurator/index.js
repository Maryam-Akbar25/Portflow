import { useState, useEffect } from "react";
import GitHubButton from "react-github-btn";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import Switch from "components/Switch";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

import {
  usePortflowUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setFixedNavbar,
  setSidenavColor,
} from "context";

function Configurator() {
  const [controller, dispatch] = usePortflowUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = ["primary", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }
    // event listener 
    window.addEventListener("resize", handleDisabled);
    handleDisabled();
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <Box
        backgroundColor="black"
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <Box>
          <Typography color="white" variant="h5" fontWeight="bold">
            Vision UI Configurator
          </Typography>
          <Typography variant="body2" color="white" fontWeight="bold">
            See our dashboard options.
          </Typography>
        </Box>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { white, dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: `${white.main} !important`,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </Box>

      <Divider light />

      <Box pt={1.25} pb={3} px={3}>
        <Box>
          <Typography variant="h6" color="white">
            Sidenav Colors
          </Typography>

          <Box mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({ borders: { borderWidth }, palette: { white, dark }, transitions }) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${white.main}`,
                  borderColor: sidenavColor === color && dark.main,
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  "&:not(:last-child)": {
                    mr: 1,
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: dark.main,
                  },
                })}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </Box>
        </Box>
        {window.innerWidth >= 1440 && (
          <Box mt={3} lineHeight={1}>
            <Typography variant="h6" color="white">
              Sidenav Type
            </Typography>
            <Typography variant="button" color="text" fontWeight="regular">
              Choose between 2 different sidenav types.
            </Typography>

            <Box
              sx={{
                display: "flex",
                mt: 2,
              }}
            >
              <Button
                color="info"
                variant={transparentSidenav ? "contained" : "outlined"}
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={{
                  mr: 1,
                  ...sidenavTypeButtonsStyles,
                }}
              >
                Transparent
              </Button>
              <Button
                color="info"
                variant={transparentSidenav ? "outlined" : "contained"}
                onClick={handleWhiteSidenav}
                disabled={disabled}
                fullWidth
                sx={sidenavTypeButtonsStyles}
              >
                Opaque
              </Button>
            </Box>
          </Box>
        )}

        <Box mt={3} mb={2} lineHeight={1}>
          <Typography variant="h6" color="white">
            Navbar Fixed
          </Typography>

          {/* <Switch checked={fixedNavbar} onChange={handleFixedNavbar} color="info" /> */}
          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} color="info" />
        </Box>

        <Divider light />

        <Box mt={3} mb={2}>
          <Box mb={2}>
            <Button
              component={Link}
              href="https://www.creative-tim.com/product/PortFLow-dashboard-react"
              target="_blank"
              rel="noreferrer"
              color="info"
              variant="contained"
              fullWidth
            >
              FREE DOWNLOAD
            </Button>
          </Box>
          <Button
            component={Link}
            href="https://www.creative-tim.com/learning-lab/react/quick-start/vision-ui-dashboard/"
            target="_blank"
            rel="noreferrer"
            color="info"
            variant="outlined"
            fullWidth
          >
            VIEW DOCUMENTATION
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <GitHubButton
            href="https://github.com/creativetimofficial/PortFLow-dashboard-react"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star creativetimofficial/PortFLow-dashboard-react on GitHub"
          >
            Star
          </GitHubButton>
        </Box>
        <Box mt={3} textAlign="center">
          <Box mb={0.5}>
            <Typography variant="h6" color="white">
              Thank you for sharing!
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center">
            <Box mr={1.5}>
              <Button
                component={Link}
                href="https://twitter.com/intent/tweet?url=https://www.creative-tim.com/product/PortFLow-dashboard-react&text=Check%20Vision%20UI%20Dashboard%20made%20by%20@simmmple_web%20and%20@CreativeTim%20#webdesign%20#dashboard%20#react"
                target="_blank"
                rel="noreferrer"
                color="dark"
              >
                <TwitterIcon />
                &nbsp; Tweet
              </Button>
            </Box>
            <Button
              component={Link}
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/PortFLow-dashboard-react"
              target="_blank"
              rel="noreferrer"
              color="dark"
            >
              <FacebookIcon />
              &nbsp; Share
            </Button>
          </Box>
        </Box>
      </Box>
    </ConfiguratorRoot>
  );
}

export default Configurator;
