import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "components/Box";
import Typography from "components/Typography";
import Input from "components/Input";
import Button from "components/Button";
import Switch from "components/Switch";
import GradientBorder from "examples/GradientBorder";
import { usePortflowUIController, setUser } from "context";
import { authAPI } from "utils/api";

import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/signInImage.png";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [controller, dispatch] = usePortflowUIController();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(email, password);

      if (response.success) {
        // Set user in context first
        setUser(dispatch, response.user);

        // Use setTimeout to ensure context updates before navigation
        setTimeout(() => {
          const userRole = response.user.role;
          if (userRole === "Admin") {
            navigate("/Admin", { replace: true });
          } else if (userRole === "Manager" || userRole === "Operator") {
            navigate("/dashboard", { replace: true });
          } else {
            // Default fallback
            navigate("/dashboard", { replace: true });
          }
        }, 100);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CoverLayout color="white" image={bgSignIn}>
      <Box component="form" role="form" onSubmit={handleSubmit}>
        {error && (
          <Box mb={2}>
            <Typography color="error" variant="caption">
              {error}
            </Typography>
          </Box>
        )}

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
            <Input
              type="email"
              placeholder="Your email..."
              fontWeight="500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
          <Button color="info" fullWidth type="submit" disabled={loading}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </Button>
        </Box>
      </Box>
    </CoverLayout>
  );
}

export default SignIn;
