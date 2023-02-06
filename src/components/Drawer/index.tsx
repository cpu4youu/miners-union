import { makeStyles } from "@mui/styles";
import { Drawer } from "@mui/material";
import DrawerContent from "./drawer-content";

const useStyles = makeStyles({
  drawerPaper: {
    borderRight: "none!important",
  },
});

interface ISidebar {
  mobileOpen: boolean;
}
export default function Sidebar({ mobileOpen }: ISidebar) {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerContent mobileOpen={mobileOpen} />
    </Drawer>
  );
}
