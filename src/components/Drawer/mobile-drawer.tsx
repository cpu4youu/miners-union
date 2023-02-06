import { makeStyles } from "@mui/styles";
import { Drawer } from "@mui/material";
import DrawerContent from "./drawer-content";

const useStyles = makeStyles({
  drawerPaper: {
    width: 240,
    marginTop: 80,
    borderRight: 0,
  },
});

interface INavDrawer {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  isSmallerScreen: boolean;
}
export default function NavDrawer({
  mobileOpen,
  handleDrawerToggle,
  isSmallerScreen,
}: INavDrawer) {
  const classes = useStyles();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      onClick={handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <DrawerContent
        mobileOpen={mobileOpen}
        isSmallerScreen={isSmallerScreen}
      />
    </Drawer>
  );
}
