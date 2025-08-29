import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "components/Box";
import Typography from "components/Typography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ProfileInfoCard({ title, description, info, social }) {
  const labels = [];
  const values = [];
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <Box key={label} display="flex" py={1} pr={2}>
      <Typography variant="button" color="text" fontWeight="regular" textTransform="capitalize">
        {label}: &nbsp;
      </Typography>
      <Typography variant="button" fontWeight="regular" color="white">
        &nbsp;{values[key]}
      </Typography>
    </Box>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <Box
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color="white"
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </Box>
  ));

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <Box display="flex" mb="14px" justifyContent="space-between" alignItems="center">
        <Typography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          {title}
        </Typography>
      </Box>
      <Box>
        <Box mb={2} lineHeight={1}>
          <Typography variant="button" color="text" fontWeight="regular">
            {description}
          </Typography>
        </Box>
        <Box opacity={0.3}>
          <Divider />
        </Box>
        <Box>
          {renderItems}
          <Box display="flex" py={1} pr={2} color="white">
            <Typography
              variant="button"
              fontWeight="regular"
              color="text"
              textTransform="capitalize"
            >
              social: &nbsp;
            </Typography>
            {renderSocial}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileInfoCard;