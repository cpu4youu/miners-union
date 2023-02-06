import { Box, Button, Tabs, Tab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
  index: number;
  value: number;
  profileIcon: string;
  mobile: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { value, index, profileIcon, mobile, ...other } = props;
  let navigate = useNavigate();
  const handleClickMenu = (link: string) => {
    navigate(link);
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box paddingTop="24px">
          <Typography
            color="white"
            fontSize="20px"
            paddingBottom="20px"
            style={{ fontFamily: "Oxanium Medium" }}
          >
            Candidate Spotlight
          </Typography>
          <Box
            display="flex"
            flexGrow="1"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <img src={profileIcon} width={mobile ? "48px" : "64px"} alt="" />
              <Box marginLeft="12px">
                <Typography
                  color="white"
                  fontSize="14px"
                  style={{ fontFamily: "Oxanium Light" }}
                >
                  Candidate Name
                </Typography>
                <Typography
                  color="white"
                  fontSize="14px"
                  style={{ fontFamily: "Oxanium Light" }}
                >
                  Power to the Miners Union!
                </Typography>
              </Box>
            </Box>
            <Button
              style={{
                fontFamily: "Oxanium Medium",
                color: "white",
                fontSize: "18px",
                border: "1px solid white",
                borderRadius: "20px",
                padding: "4px 32px",
                marginLeft: mobile? "24px" : "48px",
                textTransform: 'none',                
                background:
                  "linear-gradient(176.22deg, #FF01FF -60.52%, rgba(33, 33, 33, 0.8) -24.61%, rgba(33, 33, 33, 0.5) 59.39%, #FFFFFF 123.24%)",
              }}
              onClick={() => handleClickMenu("/votingdetail")}
            >
              More
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
