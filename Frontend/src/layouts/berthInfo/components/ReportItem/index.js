import PropTypes from "prop-types";
import Box from "components/Box";
import Typography from "components/Typography";
import { IoDocumentText } from "react-icons/io5";

function Invoice({ date, id, price }) {
  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="32px"
    >
      <Box lineHeight={1}>
        <Typography display="block" variant="button" fontWeight="medium" color="white">
          {date}
        </Typography>
        <Typography variant="caption" fontWeight="regular" color="text">
          {id}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="button" fontWeight="regular" color="text">
          {price}
        </Typography>
        <Box display="flex" alignItems="center" lineHeight={0} ml={3} sx={{ cursor: "poiner" }}>
          <IoDocumentText color="#fff" size="15px" />
          <Typography variant="button" fontWeight="medium" color="text">
            &nbsp;PDF
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
