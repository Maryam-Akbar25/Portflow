import PropTypes from "prop-types";
import { useState } from "react";
import Box from "components/Box";
import Typography from "components/Typography";
import { IoDocumentText } from "react-icons/io5";

function ReportItem({ reportName, onDownload }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading || !onDownload) return;

    setIsDownloading(true);
    try {
      await onDownload();
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb="24px"
      sx={{ cursor: isDownloading ? "wait" : "pointer", opacity: isDownloading ? 0.6 : 1 }}
      onClick={handleDownload}
    >
      <Box lineHeight={1}>
        <Typography display="block" variant="button" fontWeight="medium" color="white">
          {reportName}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" lineHeight={0}>
        <IoDocumentText color="#fff" size="15px" />
        <Typography variant="button" fontWeight="medium" color="white" ml={1}>
          {isDownloading ? "Downloading..." : "Download"}
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
  onDownload: PropTypes.func,
};

export default ReportItem;
