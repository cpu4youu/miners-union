import { useCallback, useState, useEffect } from "react";
import { NavLink, useLocation  } from "react-router-dom";
// import Social from "./social";
import { Button, Box } from "@mui/material";
import classnames from "classnames";
import "./drawer-content.scss";

interface IHoverableSocialLinkButton {
  link: string;
  mobileOpen: boolean;
  icon: string;
  text: string;
}

const HoverableSocialLinkButton = ({
  link,
  mobileOpen,
  icon,
  text,
}: IHoverableSocialLinkButton) => {


  return (
    <Button
      href={link}
      className={classnames("button-dapp-menu")}
      sx={{ color: 'white' }}
      target="_blank"
    >
        <img
          alt=""
          src={(icon)}
          style={{ marginRight: mobileOpen ? 10 : 0 }}
        />
        {mobileOpen && <p>{text}</p>}
    </Button>
  );
};

export default HoverableSocialLinkButton;
