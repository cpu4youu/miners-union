import { useCallback, useState, useEffect } from "react";
import { NavLink, useLocation  } from "react-router-dom";
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

const HoverableLinkButton = ({
  link,
  mobileOpen,
  whiteIcon,
  darkIcon,
  text,
}: IHoverableLinkButton) => {
  const [isActive, setIsActive] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    pathname === link ? setIsActive(true) : setIsActive(false);
  }, [link, pathname])


  return (
    <Link
      component={NavLink}
      to={link}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={classnames("button-dapp-menu")}
    >
      <Box
        className={classnames(
          "dapp-menu-item",
          mobileOpen ? "dapp-menu-item-desktop" : "",
          isActive ? "active" : ""
        )}
      >
        <img
          alt=""
          src={(isShown || isActive) ? darkIcon : whiteIcon}
          style={{ marginRight: mobileOpen ? 10 : 0 }}
        />
        {mobileOpen && <p>{text}</p>}
      </Box>
    </Link>
  );
};

export default HoverableLinkButton;
