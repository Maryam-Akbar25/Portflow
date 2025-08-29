import { Link } from "react-router-dom";
import PropTypes from "prop-types";
 import Tooltip from "@mui/material/Tooltip";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import Avatar from "components/Avatar";

function DefaultProjectCard({ image, label, title, description, action, authors }) {
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <Avatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { dark }, functions: { rgba } }) => ({
          border: `${borderWidth[2]} solid ${rgba(dark.focus, 0.5)}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Box
        component="img"
        src={image}
        mb="8px"
        borderRadius="15px"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            height: "200px",
          },
        })}
      />

      <Box
        sx={({ breakpoints }) => ({
          [breakpoints.only("xl")]: {
            minHeight: "200px",
          },
        })}
      >
        <Box>
          <Typography variant="xxs" color="text" fontWeight="medium" textTransform="capitalize">
            {label}
          </Typography>
        </Box>
        <Box mb={1}>
          {action.type === "internal" ? (
            <Typography
              component={Link}
              to={action.route}
              variant="h5"
              color="white"
              textTransform="capitalize"
            >
              {title}
            </Typography>
          ) : (
            <Typography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              color="white"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </Typography>
          )}
        </Box>
        <Box mb={3} lineHeight={0}>
          <Typography variant="button" fontWeight="regular" color="text">
            {description}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <Button
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </Button>
          ) : (
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </Button>
          )}
          <Box display="flex">{renderAuthors}</Box>
        </Box>
      </Box>
    </Box>
  );
}

// Setting default values for the props of DefaultProjectCard
DefaultProjectCard.defaultProps = {
  authors: [],
};

// Typechecking props for the DefaultProjectCard
DefaultProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "white",
      "text",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default DefaultProjectCard;
