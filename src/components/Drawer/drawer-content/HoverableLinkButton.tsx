import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
// import Social from "./social";
import { Link, Button, Box } from "@mui/material";
import classnames from "classnames";
import "./drawer-content.scss";

interface IHoverableLinkButton {
  link: string;
  mobileOpen: boolean;
  whiteIcon: string;
  darkIcon: string;
  text: string;
}

const HoverableLinkButton = ({link, mobileOpen, whiteIcon, darkIcon, text }: IHoverableLinkButton) => {
  const [isActive] = useState();
  const [isShown, setIsShown] = useState(false);
  return (
    <Link
      component={NavLink}
      to={link}
      // isActive={(match, location) => {
      //     return checkPage(location, "home");
      // }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={classnames("button-dapp-menu", { active: isActive })}
    >
      <Box
        className={classnames(
          "dapp-menu-item",
          mobileOpen ? "dapp-menu-item-desktop" : ""
        )}
      >
        <img
          alt=""
          src={isShown? darkIcon : whiteIcon}
          style={{ marginRight: mobileOpen ? 10 : 0 }}
        />
        {mobileOpen && <p>{text}</p>}
      </Box>
    </Link>
  );
}

export default HoverableLinkButton;
