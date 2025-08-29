import Box from "components/Box";
import Typography from "components/Typography";

function Footer() {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      direction="row"
      component="footer"
      py={2}
      pb={0}
    >
      <Box item xs={12} sx={{ textAlign: "center" }}>
        <Typography
          variant="button"
          sx={{ textAlign: "center", fontWeight: "400 !important" }}
          color="white"
        >
          @ 2025, Made &nbsp; by{"  "}
          <Typography
            component="a"
            variant="button"
            href="https://simmmple.com/"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="white"
            mr="2px"
          >
            Maryam,Haleema,Khadeeja
          </Typography>
          
          <Typography
            ml="2px"
            mr="2px"
            component="a"
            variant="button"
            href="https://www.creative-tim.com/"
            sx={{ textAlign: "center", fontWeight: "500 !important" }}
            color="white"
          >
            (FAST,NUCES)
          </Typography>
          
        </Typography>
      </Box>
      <Box item xs={10}>
        <Box display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
          {}
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
