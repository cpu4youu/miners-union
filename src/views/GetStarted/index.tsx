import { Box, Button, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../../App";
import background from "../../assets//imgs/background.jpg";
import { checkLogin, Login, fetchTable } from "../../plugins/chain";
import { smartcontract } from "../../config";



const backgroundStyle = {
  height: "100vh",
  padding: "0 24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom right",
  backgroundSize: "cover",
  // backgroundSize: "100% 100%",
};

const authButton = {
  borderRadius: "24px",
  fontFamily: "Montserrat Medium",
  color: "white",
};



function GetStarted() {
  const {wallet, setWallet, loggedIn, setLoggedIn} = useContext(WalletContext)
  const [log, setLog] = useState(false)
  let navigate = useNavigate();

  function getInitialState() {
    const wallet = localStorage.getItem('wallet')
    return wallet ? JSON.parse(wallet) : []
  }

  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify(wallet))
  }, [log])

  const handleClickMenu = async (link: string) => {
    if(log){
      try {
        const z = await fetchTable({ 
          json: true, 
          code: smartcontract,
          scope: smartcontract,
          table: "blocklist",
          limit: 1,
          lower_bound: wallet.name,
          upper_bound: wallet.name,
        })
        const block = z.rows 
        console.log(block)
        if(block.length > 0){
          alert("Joinrequest denied: Please contact us on Telegram.")
          return
        }
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
        if(rows.length){
          navigate("/voting")
        } else {
          navigate(link);
        }
      } catch(e){
        alert(e)
      }
      
    } else {
      alert("Please log into your wcw first")
    }
   
  };
  
  const handleLogin = async () => {
   
    const respond = await Login()

    if(respond){
      setWallet(respond);
      setLoggedIn(true)
      setLog(true)
      return
    }
    setLoggedIn(false)
  }

  useEffect(() => {
    async function x() {
      const respond =  await checkLogin()
      if(respond){
        setWallet(respond)
        setLoggedIn(true)
        setLog(true)
        
      }
      setLoggedIn(false)
    }
    x()
  }, [log])

  return (
    <Box style={backgroundStyle}>
      <Box>
        <Typography
          sx={{
            fontFamily: "Montserrat Bold",
            color: "#FFFFFF",
            fontSize: { xs: "36px", sm: "48px", md: "56px" },
            textAlign: "center",
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
            textAlign: "center",
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
        >{log
          ? <Button
          style={authButton}
          onClick={() => {handleLogin()}}
          sx={{
            width: { xs: "140px", sm: "180px", md: "220px" },
            py: { xs: "7px", sm: "6px" },
            fontSize: { xs: "16px", sm: "20px" },
            backgroundColor: "#FFB800",
            "&: hover": { backgroundColor: "#FFB800", opacity: 0.8 },
          }}
        >
          {//@ts-ignore
          wallet.name}
        </Button>
        :
        <Button
            style={authButton}
            onClick={() => {handleLogin()}}
            sx={{
              width: { xs: "140px", sm: "180px", md: "220px" },
              py: { xs: "7px", sm: "6px" },
              fontSize: { xs: "16px", sm: "20px" },
              backgroundColor: "#FFB800",
              "&: hover": { backgroundColor: "#FFB800", opacity: 0.8 },
            }}
          >
            Login
          </Button>}
          
          <Button
            style={authButton}
            sx={{
              width: { xs: "140px", sm: "180px", md: "200px" },
              py: { xs: "7px", sm: "6px" },
              fontSize: { xs: "18px", sm: "20px" },
              backgroundColor: "#009DF5",
              "&: hover": { backgroundColor: "#009DF5", opacity: 0.8 },
            }}
            onClick={() => handleClickMenu("/signup")}
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GetStarted;
