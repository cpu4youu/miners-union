import {
  AppBar,
  Box,
  Toolbar,
  Link,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import LeftIndentIcon from "../../assets/icons/leftindent.svg";
import RightIndentIcon from "../../assets/icons/rightindent.svg";
import MenuLightningIcon from "../../assets/icons/menulightning.png";
import MenuRocketIcon from "../../assets/icons/menurocket.png";

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
    <Box sx={{ display: "flex", alignItems: "center" }}>
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

function Header({ mobileOpen, handleDrawerToggle }: IHeader) {
  const classes = useStyles();
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
            4u.mu.wam
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
              menuTitle="2,400"
              menuText="Voting Power"
              width="20px"
              color="#F1AE02"
            />
            <MenuBoard
              icon={MenuRocketIcon}
              menuTitle="5,600"
              menuText="Spacecraft"
              width="24px"
              color="#009DF5"
            />
          </Box>
          <Typography
            className={classes.titleText}
            sx={{
              display: { xs: "none", sm: "block" },
              fontFamily: "Montserrat Bold",
              fontSize: "24px",
            }}
          >
            MINERS UNION
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
