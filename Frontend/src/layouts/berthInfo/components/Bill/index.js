import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import linearGradient from "assets/theme/functions/linearGradient";
import colors from "assets/theme/base/colors";

function Bill({ name, company, email, vat, noGutter }) {
  const { gradients } = colors;
  const { bill } = gradients;

  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{ background: linearGradient(bill.main, bill.state, bill.deg) }}
      borderRadius="lg"
      p="24px"
      mb={noGutter ? "0px" : "24px"}
      mt="20px"
    >
      <Box width="100%" display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb="5px"
        >
          <Typography
            variant="button"
            color="white"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {name}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
            sx={({ breakpoints }) => ({
              [breakpoints.only("sm")]: {
                flexDirection: "column",
              },
            })}
          >
            <Box mr={1}>
              <Button variant="text" color="error">
                <Icon sx={{ mr: "4px" }}>delete</Icon>&nbsp;DELETE
              </Button>
            </Box>
            <Button variant="text" color="text">
              <Icon sx={{ mr: "4px" }}>edit</Icon>&nbsp;EDIT
            </Button>
          </Box>
        </Box>
        <Box mb={1} lineHeight={0}>
          <Typography variant="caption" color="text">
            Company Name:&nbsp;&nbsp;&nbsp;
            <Typography
              variant="caption"
              color="text"
              fontWeight="regular"
              textTransform="capitalize"
            >
              {company}
            </Typography>
          </Typography>
        </Box>
        <Box mb={1} lineHeight={0}>
          <Typography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <Typography variant="caption" fontWeight="regular" color="text">
              {email}
            </Typography>
          </Typography>
        </Box>
        <Typography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <Typography variant="caption" fontWeight="regular" color="text">
            {vat}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
