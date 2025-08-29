import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";
import Switch from "components/Switch";
import GradientBorder from "examples/GradientBorder";

import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState("Manager");
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "Admin") {
      navigate("/admin-panel");
    } else if (role === "Manager" || role === "Operator") {
      navigate("/dashboard");
    }
  };

  return (
    <CoverLayout color="white" image={bgSignIn}>
      <Box component="form" role="form" onSubmit={handleSubmit}>
        {/* Email Field */}
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </Typography>
          </Box>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <Input type="email" placeholder="Your email..." fontWeight="500" />
          </GradientBorder>
        </Box>

        {/* Password Field */}
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </Typography>
          </Box>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <Input
              type="password"
              placeholder="Your password..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
            />
          </GradientBorder>
        </Box>

        {/* Role Selection Dropdown */}
        <Box mb={2}>
          <Box mb={1} ml={0.5}>
            <Typography component="label" variant="button" color="white" fontWeight="medium">
              Select Role
            </Typography>
          </Box>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                color: "white",
                padding: "10px",
                border: "none",
                outline: "none",
                fontSize: "14px",
              }}
            >
              <option value="Manager" style={{ color: "black" }}>
                Manager
              </option>
              <option value="Admin" style={{ color: "black" }}>
                Admin
              </option>
              <option value="Operator" style={{ color: "black" }}>
                Operator
              </option>
            </select>
          </GradientBorder>
        </Box>

        {/* Remember Me */}
        <Box display="flex" alignItems="center">
          <Switch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <Typography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </Typography>
        </Box>

        {/* Submit Button */}
        <Box mt={4} mb={1}>
          <Button color="info" fullWidth type="submit">
            SIGN IN
          </Button>
        </Box>

        {/* Sign Up Link */}
        <Box mt={3} textAlign="center">
          {/* Uncomment if needed */}
          {/* <Typography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <Typography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </Typography>
          </Typography> */}
        </Box>
      </Box>
    </CoverLayout>
  );
}

export default SignIn;
