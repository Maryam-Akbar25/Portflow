import Grid from "@mui/material/Grid";
import Box from "components/Box";
import Typography from "components/Typography";

function Footer() {
  return (
    <Box
      component="footer"
      py={6}
      sx={({ breakpoints }) => ({
        maxWidth: "450px",
        [breakpoints.down("xl")]: {
          maxWidth: "400px",
        },
      })}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography
            variant="button"
            sx={{ textAlign: "center", fontWeight: "400 !important" }}
            color="text"
          >
            @ 2025, Made &nbsp; by{"  "}
            <Typography
              component="a"
              variant="button"
              href="#"
              sx={{ textAlign: "center", fontWeight: "500 !important" }}
              color="text"
              mr="2px"
            >
              Maryam,Haleema & Khadeeja
            </Typography>
            
            {/* <Typography
              ml="2px"
              mr="2px"
              component="a"
              variant="button"
              href="#"
              sx={{ textAlign: "center", fontWeight: "500 !important" }}
              color="text"
            >
              FAST,NUCES
            </Typography> */}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Box display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            {/* <Box mr={{ xs: "20px", lg: "46px" }}>
              <Typography component="a" href="#" variant="body2" color="text">
                Services
              </Typography>
            </Box> */}
            {/* <Box mr={{ xs: "20px", lg: "46px" }}>
              <Typography component="a" href="#" variant="body2" color="text">
                About Us
              </Typography>
            </Box> */}
            {/* <Box>
              <Typography component="a" href="#" variant="body2" color="text">
                FAQs
              </Typography>
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
