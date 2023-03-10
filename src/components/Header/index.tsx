import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Link,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { NavLink } from "react-router-dom";

import InfoPopper from "./components/InfoPopper";
import LeftIndentIcon from "../../assets/icons/leftindent.svg";
import RightIndentIcon from "../../assets/icons/rightindent.svg";
import MenuLightningIcon from "../../assets/icons/menulightning.png";
import MenuRocketIcon from "../../assets/icons/menurocket.png";
import MenuTLMIcon from "../../assets/icons/tlm.png";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../App";
import { fetchTable } from "../../plugins/chain";
import { useNavigate } from "react-router-dom";
import { smartcontract } from "../../config";

const useStyles = makeStyles({
  appBar: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "16px",
    paddingRight: "16px",
    background:
      "linear-gradient(180deg, #0F0F0F 0%, #151515 97.92%, rgba(15, 15, 15, 0) 100%) !important",
    backdropFilter: "none",
    zIndex: "1300!important",
  },
  dappTopbar: {
    width: "100%",
    height: "80px",
  },
  addressText: {
    color: "white",
    paddingLeft: "8px",
  },
  titleText: {
    fontFamily: "Montserrat Bold",
    color: "white",
    paddingRight: "8px",
  },
  brandinglogo: {
    marginLeft: "10px",
    display: "flex",
    flexGrow: "1",
    justifyContent: "space-between",
  },
  Iconpanel: {
    display: "flex",
    justifyContent: "space-between",
  },
});

interface IHeader {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface IMenuBoard {
  icon: string;
  menuTitle: string;
  menuText: string;
  width: string;
  color: string;
}

function MenuBoard({ icon, menuTitle, menuText, width, color }: IMenuBoard) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" , padding: "20px"}}>
      <Box>
        <img alt="" width={width} src={icon} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", px: 1 }}>
        <Typography sx={{ fontFamily: "Montserrat Bold", fontSize: "20px" }}>
          {menuTitle}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Montserrat Bold",
            fontSize: "12px",
            color: `${color}`,
          }}
        >
          {menuText}
        </Typography>
      </Box>
    </Box>
  );
}

function getInitialStateWallet() {
  const wallet = localStorage.getItem("wallet");
  return wallet ? JSON.parse(wallet) : [];
}

function Header({ mobileOpen, handleDrawerToggle }: IHeader) {
  const { wallet, claimed, votePower, setVotePower, tlmPower, setTLMPower } = useContext(WalletContext);
  const [tlm, setTLM] = useState("0")
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));

  const classes = useStyles();
  let navigate = useNavigate();
  if (wallet.name === null) {
    navigate("/");
  }

  async function updateData() {
    var name;
    if (wallet.name) {
      name = wallet.name;
    } else {
      const n = getInitialStateWallet();
      name = n.name;
    }

    const x = await fetchTable({
      json: true,
      code: smartcontract,
      scope: smartcontract,
      table: "members",
      limit: 1,

      lower_bound: name,
      upper_bound: name,
    });
    const z = await fetchTable({
      json: true,
      code: "alien.worlds",
      scope: wallet.name,
      table: "accounts",
      limit: 1,
    })
    if (x.rows.length) {
      setTLMPower(x.rows[0].tlm_power);

      const date_string = x.rows[0].last_vote + 'Z'
      const last_vote_date = new Date(date_string)
      const test = new Date().toISOString()
      const now = new Date(test).getTime()
      const days = Math.floor((now - last_vote_date.getTime()) / (60*60*24*1000))
      const vote_power_with_decay = (parseInt(x.rows[0].vote_power) * Math.pow(0.925,days))
      setVotePower(Math.trunc(vote_power_with_decay));
      //setVotePower(10000);

    }
    if(z.rows.length){
      setTLM(z.rows[0].balance.split(" ")[0])
    }
  }

  useEffect(() => {
    if (wallet.name) {
      updateData();
    }
  }, [claimed]);

  useEffect(() => {
    if (wallet.name) {
      updateData();
    }
  }, [wallet.name]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function z(){
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
      if(x.rows.length === 0 ){
        navigate("/")
      } 
    } catch(e){
      console.log("Something went wrong")
    }
  }
  z()
  }, [])

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters className={classes.dappTopbar}>
        <IconButton onClick={handleDrawerToggle}>
          {mobileOpen && (
            <img src={LeftIndentIcon} width={30} height={30} alt="" />
          )}
          {!mobileOpen && (
            <img src={RightIndentIcon} width={30} height={30} alt="" />
          )}
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link component={NavLink} to="/candidatescreen" sx={{textDecoration: "none"}}>
            <Typography
              className={classes.addressText}
              sx={{ fontFamily: "Montserrat Light", fontSize: "20px" }}
            >
              {wallet.name}
            </Typography>
          </Link>
          <Box
            sx={{
              display: desktop ? "flex" : "none",
              justifyContent: "space-between",
              width: "auto",
            }}
          >
            <MenuBoard
              icon={MenuLightningIcon}
              menuTitle={format(votePower)}
              menuText="Voting Power"
              width="20px"
              color="#F1AE02"
            />
            <MenuBoard
              icon={MenuRocketIcon}
              menuTitle={format(tlmPower)}
              menuText="Spacecraft"
              width="24px"
              color="#009DF5"
            />
            <MenuBoard
              icon={MenuTLMIcon}
              menuTitle={format(tlm)}
              menuText="Trilium Balance"
              width="24px"
              color="#CD48CD"
            />
          </Box>
          {desktop && (
            <Typography
              className={classes.titleText}
              sx={{
                fontFamily: "Montserrat Bold",
                fontSize: "24px",
              }}
            >
              MINERS UNION
            </Typography>
          )}
          {!desktop && (
            <InfoPopper
              MenuLightningIcon={MenuLightningIcon}
              MenuRocketIcon={MenuRocketIcon}
              votePower={votePower}
              tlmPower={tlmPower}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function format(num: any) {
  return num.toString().replace(/^[+-]?\d+/, function(int: string) {
    return int.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  });
}


export default Header;
