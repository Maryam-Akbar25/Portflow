import PropTypes from "prop-types";
import Box from "components/Box";
import Typography from "components/Typography";
import { IoDocumentText } from "react-icons/io5";

function ReportItem({ reportName }) {
  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="24px"
      sx={{ cursor: "pointer" }}
    >
      <Box lineHeight={1}>
        <Typography display="block" variant="button" fontWeight="medium" color="white">
          {reportName}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" lineHeight={0}>
        <IoDocumentText color="#fff" size="15px" />
        <Typography variant="button" fontWeight="medium" color="white" ml={1}>
          PDF
        </Typography>
      </Box>
    </Box>
  );
}

// Setting default values for the props of ReportItem
ReportItem.defaultProps = {
  reportName: "Report",
};

// Typechecking props for the ReportItem
ReportItem.propTypes = {
  reportName: PropTypes.string.isRequired,
};

export default ReportItem;
