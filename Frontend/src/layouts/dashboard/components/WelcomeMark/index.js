import React from "react";
import { Card, Icon } from "@mui/material";
import Box from "components/Box";
import Typography from "components/Typography";
import gif from "assets/images/WelcomeImage.png";

const WelcomePortFLow = () => {
  return (
    <Card sx={() => ({
      height: "340px",
      py: "32px",
      backgroundImage: `url(${gif})`,
      backgroundSize: "cover",
      backgroundPosition: "50%",
    })}>
      <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
        </Box>
        <Typography
          component="a"
          href="#"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
         </Typography>
      </Box>
    </Card>
  );
};

export default WelcomePortFLow;
