import PropTypes from "prop-types";
import { useState } from "react";
import Box from "components/Box";
import Typography from "components/Typography";
import { IoDocumentText } from "react-icons/io5";

function ReportItem({ reportName, description, icon, onDownload }) {
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
      mb={2}
      p={2}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        cursor: isDownloading ? "wait" : "pointer",
        opacity: isDownloading ? 0.7 : 1,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        },
      }}
      onClick={handleDownload}
    >
      <Box display="flex" alignItems="center">
        <Box
          mr={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            color: "#3498db",
          }}
        >
          {icon || <IoDocumentText size="24px" />}
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" fontWeight="medium" color="white" sx={{ fontSize: "1rem" }}>
            {reportName}
          </Typography>
          {description && (
            <Typography variant="caption" color="text" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
      <Box 
        display="flex" 
        alignItems="center" 
        sx={{
          backgroundColor: "rgba(52, 152, 219, 0.1)",
          padding: "8px 16px",
          borderRadius: "8px",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "rgba(52, 152, 219, 0.2)",
          }
        }}
      >
        <IoDocumentText color="#3498db" size="16px" />
        <Typography variant="button" fontWeight="bold" color="white" ml={1} sx={{ color: "#3498db" }}>
          {isDownloading ? "Downloading..." : "Download"}
        </Typography>
      </Box>
    </Box>
  );
}

// Setting default values for the props of ReportItem
ReportItem.defaultProps = {
  reportName: "Report",
  description: "",
  icon: null,
};

// Typechecking props for the ReportItem
ReportItem.propTypes = {
  reportName: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  onDownload: PropTypes.func,
};

export default ReportItem;
