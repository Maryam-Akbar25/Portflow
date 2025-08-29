import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import { BsCheckCircleFill } from "react-icons/bs";
import TimelineItem from "examples/Timeline/TimelineItem";

function Ai_Recommendation() {
  return (
    <Card className="h-100">
      <Box mb="16px">
        <Typography variant="lg" fontWeight="bold" mb="5px" color="white">
          AI-Driven Recommendations
        </Typography>
        <Box mb={2}>
          <Box display="flex" alignItems="center">
            <BsCheckCircleFill color="green" size="30px" mr="5px" />
          </Box>
        </Box>
      </Box>
      <Box>
        <TimelineItem
          title="Berth 6- Recommended for ship Omicron"
          dateTime="22 March 7:20 PM"
        />
        <TimelineItem
          title="Berth 1- Recommended for ship Alpha"
          dateTime="21 March 11 PM"
        />
        <TimelineItem
          title="Berth 3- Recommended for ship Beta"
          dateTime="21 March 9:34 PM"
        />
        <TimelineItem
          title="Berth 5- Recommended for ship Gamma"
          dateTime="20 March 2:20 AM"
        />
        <TimelineItem
          title="Berth 2- Recommended for ship Delta"
          dateTime="18 March 4:54 AM"
        />
        <TimelineItem 
        title="Berth 4-Recommended for ship Zeta" 
        dateTime="17 March"
         />
      </Box>
    </Card>
  );
}

export default Ai_Recommendation;
