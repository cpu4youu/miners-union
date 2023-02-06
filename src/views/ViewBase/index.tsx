import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

import background from "../../assets/imgs/background.jpg";
import Header from "../../components/Header";
import Drawer from "../../components/Drawer";
import MobileDrawer from "../../components/Drawer/mobile-drawer";

const backgroundStyle = {
  flexGrow: 1,
  padding: "0 12px",
  display: "flex",
  minHeight: "100vh",
  // height: "100vh", 
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "bottom right",
  backgroundSize: "cover",
};

const useStyles = makeStyles({
  drawer: {
    "@media (min-width: 960px)": {
      width: 240,
      flexShrink: 0,
    },
  },
  content: {
    transition: "margin 969ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    backgroundColor: "transparent",
    marginLeft: 240,
    marginTop: 80,
    width: "100%",
  },
  contentShift: {
    transition: "margin 969ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    marginLeft: 50,
  },
  contentMobile: {
    transition: "margin 969ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    marginLeft: 0,
  },
});


interface IViewBase {
  children: React.ReactNode;
}

function ViewBase({ children }: IViewBase) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(true);
  const isSmallerScreen = useMediaQuery("(max-width: 960px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <Box style={backgroundStyle}>
      <Header mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box>
        {!isSmallerScreen && <Drawer mobileOpen={mobileOpen} />}
        {isSmallerScreen && (
          <MobileDrawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            isSmallerScreen={isSmallerScreen}
          />
        )}
      </Box>
      <div
        className={`${classes.content} ${!mobileOpen && classes.contentShift} ${
          isSmallerScreen && classes.contentMobile
        }`}
      >
        {children}
      </div>
    </Box>
  );
}

export default ViewBase;
