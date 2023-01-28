import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../../assets//imgs/background.jpg";

const backgroundStyle = {
  height: "100vh",
  padding: '0 24px',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom right",
  backgroundSize: 'cover',
  // backgroundSize: "100% 100%",
};


const authButton = {    
  borderRadius: "24px",
  fontFamily: "Montserrat Medium",  
  color: 'white',    
}; 


function GetStarted() {  
  let navigate = useNavigate(); 
  const handleClickMenu = (link: string) => {    
    navigate(link);
  };
  return (
    <Box style={backgroundStyle}>
      <Box>
        <Typography
          sx={{
            fontFamily: "Montserrat Bold",
            color: "#FFFFFF",
            fontSize: {xs: '36px', sm: '48px', md: '56px'},
            textAlign: 'center',
            px: {sm: 2},
            borderBottom: "1px solid rgba(255, 255, 255, 0.72)",
          }}
        >
          MINERS UNION
        </Typography>
        <Typography
          sx={{
            fontFamily: "Montserrat Light",
            color: "#FFFFFF",
            fontSize: {xs: '20px', sm: '24px', md: '26px'},
            textAlign: 'center',
            pt: 1,
          }}
        >
          Digging deep for a better tomorrow
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5,
          }}
        >
          <Button style={authButton}
            sx={{
              width: {xs: '140px', sm: '180px', md: '220px'},
              py: {xs: '7px', sm: '6px'},
              fontSize: {xs: '16px', sm: '20px'},
              backgroundColor: "#FFB800",
              '&: hover': {backgroundColor: "#FFB800", opacity: 0.8}
            }}
          >
            Login
          </Button>
          <Button style={authButton}
            sx={{
              width: {xs: '140px', sm: '180px', md: '200px'},
              py: {xs: '7px', sm: '6px'},
              fontSize: {xs: '18px', sm: '20px'},
              backgroundColor: "#009DF5",
              '&: hover': {backgroundColor: '#009DF5', opacity: 0.8}
            }}
            onClick={() => handleClickMenu('/signup')}
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GetStarted;
