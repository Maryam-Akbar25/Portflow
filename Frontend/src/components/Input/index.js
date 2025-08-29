// React components
import { forwardRef } from "react";
import PropTypes from "prop-types";
// Custom styles for Input
import InputRoot from "components/Input/InputRoot";
import InputWithIconRoot from "components/Input/InputWithIconRoot";
import InputIconBoxRoot from "components/Input/InputIconBoxRoot";
import InputIconRoot from "components/Input/InputIconRoot";
import { usePortflowUIController } from "context";

const Input = forwardRef(({ size, icon, error, success, disabled, ...rest }, ref) => {
  let template;
  const [controller] = usePortflowUIController();
  const { direction } = controller;
  const iconDirection = icon.direction;

  if (icon.component && icon.direction === "left") {
    template = (
      <InputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <InputIconBoxRoot ownerState={{ size }}>
          <InputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </InputIconRoot>
        </InputIconBoxRoot>
        <InputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
      </InputWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <InputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <InputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
        <InputIconBoxRoot ownerState={{ size }}>
          <InputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </InputIconRoot>
        </InputIconBoxRoot>
      </InputWithIconRoot>
    );
  } else {
    template = <InputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled }} />;
  }

  return template;
});

// Setting default values for the props of Input
Input.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the Input
Input.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;
