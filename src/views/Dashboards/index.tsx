import { Box, Button, Typography } from "@mui/material";
import background from "../../assets/imgs/background.jpg";

const backgroundStyle = {
  height: "100vh",
  padding: '0 24px',
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom right",
  backgroundSize: "cover",
};

const Terms = [
  {
    content: 'The Miners Union is striving to bring power to the players. By mining NFT Points in Alien Worlds you will receive Voting Power, Spacecrafts and CPU.',
  },
  {
    content: 'Voting Power can be used to influence elections in Alien Worlds. Spacecrafts can be used to get some TLM from Missions and the CPU can be used however you like.',
  },
  {
    content: 'To ensure that we have a bot and multiaccount free environment our inspectors check each wallet manually before they are accepted as a member in the Miners Union. No matter the outcome, this takes time. Requests are usually processed within 24 hours.',
  },
  {
    content: 'To sign up there is a fee of 50 Trilium. This fee is in place to discourage bots from spamming us with join requests as well as to reward our inspectors for their work. This fee will not be refunded regardless of the outcome.',
  },  
];

function Signup() {
  return (
    <Box style={backgroundStyle}>
      <Box>
        <Typography
          sx={{
            fontFamily: "Montserrat Bold",
            color: "#FFFFFF",
            fontSize: {xs: '36px', sm: '48px', md: '56px'},
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
            pt: 1,
          }}
        >
          Digging deep for a better tomorrow
        </Typography>
        <Box
          sx={{
            maxWidth: '480px',            
            pt: {xs: 3, sm: 4, md: 5, xl: 6},            
          }}
        >
          <Box
            sx={{
              height: {xs: '240px', sm: '420px'},
              overflow: {xs: 'scroll', sm: 'hidden'},
            }}
          >
            {Terms.map((term, index) => (
              <Typography key={index}
                sx={{
                  pb: 2,
                  fontFamily: "Montserrat Light",
                  color: "#FFFFFF",
                  fontSize: '16px',                
                }}
              >
                {term.content}
              </Typography>
            ))
            }
          </Box>
          <Button
            sx={{
              width: '100%',
              mt: {xs: 3, sm: 4, md: 5, xl: 6},
              backgroundColor: "#009DF5",
              '&: hover': {backgroundColor: "#009DF5", opacity: 0.8},
              py: "6px",
              borderRadius: "24px",
              fontFamily: "Montserrat Medium",
              fontSize: {xs: '16px', sm: '20px'},
              color: 'white', 
            }}
          >
            SEND JOIN REQUEST (50 TLM)
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
