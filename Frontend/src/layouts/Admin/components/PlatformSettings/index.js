import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "components/Box";
import Typography from "components/Typography";
import Switch from "components/Switch";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [mails, setMails] = useState(false);

  return (
    <Card sx={{ minHeight: "490px", height: "100%" }}>
      <Box mb="26px">
        <Typography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          Notification Settings
        </Typography>
      </Box>
      <Box lineHeight={1.25}>
        <Typography
          variant="xxs"
          fontWeight="medium"
          mb="20px"
          color="text"
          textTransform="uppercase"
        >
          account
        </Typography>
        <Box display="flex" mb="14px">
          <Box mt={0.25}>
            <Switch color="info" checked={followsMe} onChange={() => setFollowsMe(!followsMe)} />
          </Box>
          <Box width="80%" ml={2}>
            <Typography variant="button" fontWeight="regular" color="text">
              Email when a member is Added/Deleted
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mb="14px">
          <Box mt={0.25}>
            <Switch
              color="info"
              checked={answersPost}
              onChange={() => setAnswersPost(!answersPost)}
            />
          </Box>
          <Box width="80%" ml={2}>
            <Typography variant="button" fontWeight="regular" color="text">
              Email when ship is Added/Deleted
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mb="14px">
          <Box mt={0.25}>
            <Switch
              sx={{ background: "#1B1F3D", color: "#fff" }}
              color="info"
              checked={mentionsMe}
              onChange={() => setMentionsMe(!mentionsMe)}
            />
          </Box>
          <Box width="80%" ml={2}>
            <Typography variant="button" fontWeight="regular" color="text">
              Email when berth is Added/Deleted
            </Typography>
          </Box>
        </Box>
        <Box mb="6px">
          <Typography variant="xxs" fontWeight="medium" color="text" textTransform="uppercase">
            Alerts
          </Typography>
        </Box>
        <Box display="flex" mb="14px">
          <Box mt={0.25}>
            <Switch
              color="info"
              checked={newLaunches}
              onChange={() => setNewLaunches(!newLaunches)}
            />
          </Box>
          <Box width="80%" ml={2}>
            <Typography variant="button" fontWeight="regular" color="text">
              Generate Alert when berth is out of order
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mb="14px">
          <Box mt={0.25}>
            <Switch
              color="info"
              checked={productUpdate}
              onChange={() => setProductUpdate(!productUpdate)}
            />
          </Box>
          <Box width="80%" ml={2}>
            <Typography variant="button" fontWeight="regular" color="text">
              Generate Alert when conflict occurs
            </Typography>
          </Box>
        </Box>
        <Box display="flex" mb="14px">
          <Box mt={0.25}>
            <Switch
              color="info"
              checked={newsletter}
              onChange={() => setNewsletter(!newsletter)}
            />
          </Box>
          <Box width="80%" ml={2}>
            <Typography variant="button" fontWeight="regular" color="text">
              Generate Alert when Ship waiting time morethan 2hours
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box mt={0.25}>
            <Switch color="info" checked={mails} onChange={() => setMails(!mails)} />
          </Box>
          <Box width="80%" ml={2}>
            <Typography variant="button" fontWeight="regular" color="text">
              Generate Alert when any Emergency occurs
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default PlatformSettings;
