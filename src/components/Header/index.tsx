import {
  AppBar,
  Box,
  Toolbar,
  Link,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import MenuBoard from "./components/MenuBoard";
import InfoPopper from "./components/InfoPopper";
import LeftIndentIcon from "../../assets/icons/leftindent.svg";
import RightIndentIcon from "../../assets/icons/rightindent.svg";
import MenuLightningIcon from "../../assets/icons/menulightning.png";
import MenuRocketIcon from "../../assets/icons/menurocket.png";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../App";
import { checkLogin, fetchTable } from "../../plugins/chain";
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

function Header({ mobileOpen, handleDrawerToggle }: IHeader) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  const { wallet, setWallet, loggedIn, setLoggedIn, claimed } =
    useContext(WalletContext);
  const [votePower, setVotePower] = useState(0);
  const [tlmPower, setTLMPower] = useState(0);
  const classes = useStyles();
  let navigate = useNavigate();
  if (wallet.name === null) {
    navigate("/");
  }
  async function updateData() {
    const x = await fetchTable({
      json: true,
      code: smartcontract,
      scope: smartcontract,
      table: "members",
      limit: 1,
      lower_bound: wallet.name,
      upper_bound: wallet.name,
    });
    const rows = x.rows;
    if (rows.length) {
      setTLMPower(rows[0].tlm_power);
      setVotePower(rows[0].vote_power);
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
          <Typography
            className={classes.addressText}
            sx={{ fontFamily: "Montserrat Light", fontSize: "20px" }}
          >
            {wallet.name}
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              width: "300px",
            }}
          >
            <MenuBoard
              icon={MenuLightningIcon}
              menuTitle={votePower.toString()}
              menuText="Voting Power"
              width="20px"
              color="#F1AE02"
            />
            <MenuBoard
              icon={MenuRocketIcon}
              menuTitle={tlmPower.toString()}
              menuText="Spacecraft"
              width="24px"
              color="#009DF5"
            />
          </Box>
          {!mobile && (
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
          {mobile && (
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

export default Header;
