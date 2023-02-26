import { useState } from "react";
import {
  Box,
  Button,
  FormHelperText,
  FormControl,
  IconButton,
  Modal,
  OutlinedInput,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import classnames from "classnames";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

import CandidateProfile from "../../assets/imgs/candidatebig.png";
import eyekeprofile from "../../assets/imgs/eyekeprofile.png";
import DescriptiveLine from "../../assets/icons/descriptiveline.png";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "background.paper",
  background: "#1C1C1C",
  borderRadius: "20px",
  border: "1px solid #4D4D4D",
  outline: "transparent solid 2px",
  outlineOffset: "2px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px",
  p: 2,
};

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function CandidateScreen() {
  const [candidateName, setCandidateName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));

  const handleCandidateNameChange = (e: any) => {
    setCandidateName(e.target.value);
  };

  const handleProfileImageChange = (e: any) => {
    setProfileImage(e.target.value);
  };

  const handleSloganChange = (e: any) => {
    setSlogan(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <Box padding={desktop ? "36px 12px" : "24px 0"}>
      <Box
        display="flex"
        justifyContent="center"
        pb={desktop ? "32px" : "20px"}
        borderBottom="1px solid rgba(255, 255, 255, 0.14)"
      >
        <Box
          className={desktop ? classes.contentWrapper : classes.mobileWrapper}
          display="flex"
          justifyContent="space-between"
          flexDirection={desktop ? "row" : "column"}
        >
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={desktop ? "row" : "column"}
            >
              <Box mb={desktop ? "36px" : "16px"}>
                <FormHelperText
                  sx={{
                    color: "#EBB309",
                    fontFamily: "Oxanium Light",
                    marginLeft: "16px",
                  }}
                >
                  Candidate Name
                </FormHelperText>
                <FormControl
                  sx={{ flexGrow: "1", width: desktop ? "200px" : "100%" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={candidateName}
                    onChange={handleCandidateNameChange}
                    aria-describedby="outlined-weight-helper-text"
                    sx={{
                      borderRadius: "20px",
                      color: "white",
                      height: "40px",
                      pr: 1,
                      background: "rgba(121, 121, 121, 0.3)",
                      border: "1px solid #FFFFFF",
                      "& .MuiOutlinedInput-input": { padding: "6px 16px" },
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    }}
                  />
                </FormControl>
              </Box>
              <Box ml={desktop ? "20px" : "0"} mb="40px">
                <FormHelperText
                  sx={{
                    color: "#EBB309",
                    fontFamily: "Oxanium Light",
                    marginLeft: "16px",
                  }}
                >
                  Link to your profile image
                </FormHelperText>
                <FormControl
                  sx={{ flexGrow: "1", width: desktop ? "400px" : "100%" }}
                  variant="outlined"
                >
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    value={profileImage}
                    onChange={handleProfileImageChange}
                    aria-describedby="outlined-weight-helper-text"
                    sx={{
                      borderRadius: "20px",
                      color: "white",
                      height: "40px",
                      background: "rgba(121, 121, 121, 0.3)",
                      border: "1px solid #FFFFFF",
                      "& .MuiOutlinedInput-input": { padding: "6px 16px" },
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                    }}
                  />
                </FormControl>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box position="relative" ml={desktop ? "28px" : "16px"}>
                <img
                  src={CandidateProfile}
                  width={desktop ? "120px" : "72px"}
                  alt=""
                />
                <img
                  src={eyekeprofile}
                  alt=""
                  width={desktop ? "64px" : "40px"}
                  style={{
                    position: "absolute",
                    top: desktop ? "70px" : "44px",
                    left: desktop ? "-24px" : "-16px",
                  }}
                />
                <img
                  src={DescriptiveLine}
                  alt=""
                  width={desktop ? "320px" : "270px"}
                  style={{
                    position: "absolute",
                    top: desktop ? "64px" : "40px",
                    left: desktop ? "100px" : "20px",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    width: desktop ? "320px" : "200px",
                    top: desktop ? "-4px" : "-26px",
                    left: desktop ? "194px" : "100px",
                  }}
                >
                  <FormHelperText
                    sx={{
                      color: "#EBB309",
                      fontFamily: "Oxanium Light",
                      marginLeft: "16px",
                    }}
                  >
                    Your Slogan
                  </FormHelperText>
                  <FormControl
                    sx={{ flexGrow: "1", width: desktop ? "400px" : "100%" }}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      value={slogan}
                      onChange={handleSloganChange}
                      aria-describedby="outlined-weight-helper-text"
                      sx={{
                        borderRadius: "20px",
                        color: "white",
                        height: "40px",
                        pr: 1,
                        background: "rgba(121, 121, 121, 0.3)",
                        border: "1px solid #FFFFFF",
                        "& .MuiOutlinedInput-input": { padding: "6px 16px" },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    />
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            pb={desktop ? "32px" : "20px"}
          >
            <Box
              display="flex"
              flexDirection={desktop ? "column" : "row"}
              pt="16px"
            >
              <Button
                onClick={handleModalOpen}
                sx={{
                  display: "flex",
                  background: "#009DF5",
                  width: desktop ? "180px" : "160px",
                  borderRadius: "20px",
                  textAlign: "center",
                  height: "38px",
                  textTransform: "none",
                  color: "white",
                  lineHeight: "0",
                  mr: desktop ? "0" : "20px",
                  fontSize: "18px",
                  fontFamily: "Oxanium Medium",
                  mt: "6px",
                  alignItems: "center",
                  "&: hover": { opacity: "0.9", background: "#009DF5" },
                }}
              >
                Set Profile
              </Button>
              <Button
                sx={{
                  display: "flex",
                  background: "#009DF5",
                  width: desktop ? "180px" : "160px",
                  borderRadius: "20px",
                  textAlign: "center",
                  height: "38px",
                  textTransform: "none",
                  color: "white",
                  lineHeight: "0",
                  fontSize: "18px",
                  fontFamily: "Oxanium Medium",
                  mt: "6px",
                  alignItems: "center",
                  "&: hover": { opacity: "0.9", background: "#009DF5" },
                }}
              >
                Spotlight
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        pt="24px"
        pb={desktop ? "32px" : "20px"}
      >
        <Box
          className={desktop ? classes.contentWrapper : classes.mobileWrapper}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <FormHelperText
            sx={{
              color: "#EBB309",
              fontFamily: "Oxanium Light",
              marginLeft: "16px",
            }}
          >
            Description
          </FormHelperText>
          <FormControl sx={{ flexGrow: "1", width: "100%" }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              value={description}
              multiline
              minRows={10}
              onChange={handleDescriptionChange}
              aria-describedby="outlined-weight-helper-text"
              sx={{
                borderRadius: "20px",
                color: "white",
                width: "100%",
                pr: 1,
                background: "rgba(121, 121, 121, 0.3)",
                border: "1px solid #FFFFFF",
                "& .MuiOutlinedInput-input": { padding: "8px 16px" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />
          </FormControl>
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box color="white" sx={modalStyle}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton sx={{ padding: "0" }} onClick={handleModalClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Typography
            variant="body1"
            fontSize="16px"
            mt="24px"
            textAlign="center"
            fontFamily="Oxanium Light"
          >
            Activating the Spotlight for your profile means that it will be
            displayed to other players on the voting page. This lasts 30 days
            and will cost you some TLM
          </Typography>
          <Typography
            variant="body1"
            fontSize="24px"
            textAlign="center"
            fontFamily="Oxanium Light"
            mt="24px"
            mb="16px"
            color="#FFB800"
          >
            100 TLM
          </Typography>
          <Button
            sx={{
              display: "flex",
              marginTop: 1,
              background: "#009DF5",
              borderRadius: "24px",
              border: "2px solid #009DF5",
              textAlign: "center",
              height: "44px",
              textTransform: "none",
              color: "white",
              m: "12px auto",
              width: desktop ? "220px" : "100%",
              lineHeight: "0",
              fontSize: "20px",
              fontFamily: "Oxanium Medium",
              alignItems: "center",
              boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
              "&: hover": { opacity: "0.9", background: "#009DF5" },
            }}
          >
            Activate
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default CandidateScreen;
