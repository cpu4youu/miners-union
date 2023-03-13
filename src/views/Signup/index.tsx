import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../../assets/imgs/background.jpg";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../App";
import { fetchTable, transaction, Login } from "../../plugins/chain";
import { smartcontract } from "../../config";

const backgroundStyle = {
  minHeight: "100vh",
  padding: "0 24px",
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
    content:
      "The Miners Union is striving to bring power to the players. By mining NFT Points in Alien Worlds you will receive Voting Power, Spacecrafts and CPU.",
  },
  {
    content:
      "Voting Power can be used to influence elections in Alien Worlds. Spacecrafts can be used to get some TLM from Missions and the CPU can be used however you like.",
  },
  {
    content:
      "To ensure that we have a bot and multiaccount free environment our inspectors check each wallet manually before they are accepted as a member in the Miners Union. No matter the outcome, this takes time. Requests are usually processed within 24 hours.",
  },
  {
    content:
      "To sign up there is a fee of Trilium. This fee is in place to discourage bots from spamming us with join requests as well as to reward our inspectors for their work. This fee will not be refunded regardless of the outcome.",
  },
];

function Signup() {
  let navigate = useNavigate();
  const {wallet} = useContext(WalletContext)
  const [pending, setPending] = useState(false)
  const [cost, setCost] = useState("0.0000 TLM")
  
  const handleClickMenu = async () => {
    try {
      const x = await fetchTable({
        json: true, 
        code: smartcontract,
        scope: smartcontract,
        table: "members",
        limit: 1,
        lower_bound: wallet.name,
        upper_bound: wallet.name,
      })
      const rows = x.rows
      console.log(rows)
      if(x.rows.length !== 0 ){
        if(x.rows[0].wallet === wallet.name){
          navigate("/voting")
        } else {
          navigate("/joinrequests")
        }
      } 
    } catch(e){
      alert(e)
    }
  }

  const handleRequest = async () => {
    try {
      if(wallet.name === null){
        await Login()
        return
      }
      const x = await transaction({
        actions: [{
          account: 'alien.worlds',
          name: 'transfer',
          authorization: [{
            actor: wallet.name,
            permission: 'active',
          }],
          data: {
            from: wallet.name,
            to: smartcontract,
            quantity: cost,
            memo: 'signup',
          },
        }]
      })
      if(x){
        setPending(true)
      }
      setPending(false)
    } catch(e){
      setPending(false)
    }
  }
  useEffect(() => {
    if(wallet.name === null){
      navigate("/")
    }
  })

  useEffect(() => {
    async function x() {
      try {
        const x = await fetchTable({
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "joinrequests",
          limit: 1,
          lower_bound: wallet.name,
          upper_bound: wallet.name,
        })
        const rows1 = x.rows
        if(rows1.length){
          setPending(true)
        } else {
          setPending(false)
        }

        const y = await fetchTable({
            json: true, 
            code: smartcontract,
            scope: smartcontract,
            table: "config",
            limit: 1,
            lower_bound: "voting",
            upper_bound: "voting",
          })
        setCost(y.rows[0].signup_cost)

        const z = await fetchTable({
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "members",
          limit: 1,
          lower_bound: wallet.name,
          upper_bound: wallet.name,
        })
        const rows2 = z.rows
        if(rows2.length){
          navigate("/voting");
        }

      } catch(e) {
        alert(e)
      }
    }
    x()

  })
  
  return (
    <Box style={backgroundStyle}>
      <Box
        py="36px"
      >
        <Typography
          sx={{
            fontFamily: "Montserrat Bold",
            color: "#FFFFFF",
            fontSize: { xs: "36px", sm: "48px", md: "56px" },
            px: { sm: 2 },
            borderBottom: "1px solid rgba(255, 255, 255, 0.72)",
          }}
        >
          MINERS UNION
        </Typography>
        <Typography
          sx={{
            fontFamily: "Montserrat Light",
            color: "#FFFFFF",
            fontSize: { xs: "20px", sm: "24px", md: "26px" },
            pt: 1,
          }}
        >
          Digging deep for a better tomorrow
        </Typography>
        <Box
          sx={{
            maxWidth: "480px",
            pt: { xs: 3, sm: 4, md: 5, xl: 6 },
          }}
        >
          <Box
            sx={{
              // height: { xs: "240px", sm: "420px" },
              // overflow: { xs: "scroll", sm: "hidden" },
            }}
          >
            {Terms.map((term, index) => (
              <Typography
                key={index}
                sx={{
                  pb: 2,
                  fontFamily: "Montserrat Light",
                  color: "#FFFFFF",
                  fontSize: "16px",
                }}
              >
                {term.content}
              </Typography>
            ))}
          </Box>
          {pending ?
            <Button
            sx={{
              width: "100%",
              mt: { xs: 3, sm: 4, md: 5, xl: 6 },
              backgroundColor: "#009DF5",
              "&: hover": { backgroundColor: "#009DF5", opacity: 0.8 },
              py: "6px",
              borderRadius: "24px",
              fontFamily: "Montserrat Medium",
              fontSize: { xs: "16px", sm: "20px" },
              color: "white",
            }}
            onClick={() => {handleClickMenu()}}
          >
            YOUR REQUEST IS PENDING!
          </Button> 
          :
            <Button
            sx={{
              width: "100%",
              mt: { xs: 3, sm: 4, md: 5, xl: 6 },
              backgroundColor: "#009DF5",
              "&: hover": { backgroundColor: "#009DF5", opacity: 0.8 },
              py: "6px",
              borderRadius: "24px",
              fontFamily: "Montserrat Medium",
              fontSize: { xs: "16px", sm: "20px" },
              color: "white",
            }}
            onClick={() => handleRequest()}
          >
            {`SEND JOIN REQUEST (${cost})`}
          </Button>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
