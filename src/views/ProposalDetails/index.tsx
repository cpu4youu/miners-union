import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

import { makeStyles } from "@mui/styles";
import PlanetSelect from "./components/PlanetSelect";

import BackButtonIcon from "../../assets/icons/backbutton.png";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  contentTabletWrapper: {
    width: "580px",
  },
});

const listPlanet = ["Planet1", "Planet2"];

function ProposalDetails() {
  const [selectedPlanet, setSelectedPlanet] = useState("None");
  const classes = useStyles();
  const theme = useTheme();
  let navigate = useNavigate();
  const handleClickMenu = (link: string) => {
    navigate(link);
  };
  const desktop = useMediaQuery(theme.breakpoints.up(1300));
  const mobile = useMediaQuery(theme.breakpoints.down(603));
  return (
    <>
      <Button onClick={() => handleClickMenu("/proposals")}>
        <img
          src={BackButtonIcon}
          alt=""
          width="30px"
          style={{
            marginLeft: desktop ? "48px" : "12px",
            marginTop: desktop ? "36px" : "12px",
          }}
        />
      </Button>
      <Box
        display="flex"
        justifyContent={!mobile ? "center" : ""}
        pt={desktop ? "36px" : "12px"}
      >
        <Box
          className={
            desktop ? classes.contentWrapper : classes.contentTabletWrapper
          }
          color="white"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                fontSize={desktop ? "40px" : "28px"}
                lineHeight="1.1"
                fontWeight={600}
              >
                Proposal: Miners Union Extension
              </Typography>
              <Typography variant="h6">by 4dadw.wam</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: desktop ? "220px" : "100%",
                flexDirection: desktop ? "column" : mobile ? "column" : "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: desktop ? "100%" : mobile ? "100%" : "45%" }}>
                <FormHelperText
                  sx={{
                    color: "#EBB309",
                    fontFamily: "Oxanium Light",
                    marginLeft: "16px",
                  }}
                >
                  Planet
                </FormHelperText>
                <PlanetSelect
                  listPlanet={listPlanet}
                  selectedPlanet={selectedPlanet}
                  setSelectedPlanet={setSelectedPlanet}
                  desktop={desktop}
                />
              </Box>
              <Button
                sx={{
                  display: "flex",
                  marginTop: 1,
                  background: "#FFB800",
                  mt: desktop ? "8px" : mobile ? "8px" : "24px",
                  width: desktop ? "220px" : mobile ? "100%" : "45%",
                  border: "2px solid #FFB800",
                  borderRadius: "24px",
                  textAlign: "center",
                  height: "44px",
                  textTransform: "none",
                  color: "white",
                  lineHeight: "0",
                  fontSize: "20px",
                  fontFamily: "Oxanium Medium",
                  alignItems: "center",
                  boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                  "&: hover": { opacity: "0.9", background: "#FFB800" },
                }}
              >
                Copy to Planet
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 2,
              width: "100%",
            }}
          >
            <Typography color="#FFB800" fontSize={desktop ? "36px" : "20px"}>
              200,000 TLM
            </Typography>
            <Button
              sx={{
                display: "flex",
                marginTop: 1,
                background: "#009DF5",
                borderRadius: "24px",
                border: "2px solid #009DF5",
                width: desktop ? "220px" : mobile ? "100%" : "45%",
                textAlign: "center",
                height: "44px",
                textTransform: "none",
                color: "white",
                lineHeight: "0",
                fontSize: "20px",
                fontFamily: "Oxanium Medium",
                alignItems: "center",
                boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                "&: hover": { opacity: "0.9", background: "#009DF5" },
              }}
            >
              Vote
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              mt: 2,
            }}
          >
            <Typography variant="h6">
              Submission Date: 23/01/2023 06:00AM
            </Typography>
            <Typography variant="h6">Receiving Wallet: tas3.a3.wam</Typography>
          </Box>
          <Divider
            sx={{
              marginTop: "24px",
              border: "1px solid rgba(154, 154, 154, 0.61)",
            }}
          />
          <Box>
            <Typography fontSize={desktop? "20px" : "18px"} mt={3}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet.
            </Typography>
            <Typography fontSize={desktop? "20px" : "18px"} mt={3}>
              Duis autem veleum iriure dolor in hendrerit in vulputate velit
              esse molestie consequat, vel illum dolore eu feugiat nulla
              facilisis at vero eros et accumsan et iusto odio dignissim qui
              blandit praesent luptatum zzril delenit augue duis dolore te
              feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer
              adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. sanctus est Lorem ised
              diam voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum. Stet clita
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProposalDetails;
