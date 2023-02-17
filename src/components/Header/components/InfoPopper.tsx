import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  Link,
  Popper,
  Typography,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import MenuBoard from "./MenuBoard";

interface IInfoPopper {
  MenuLightningIcon: string;
  MenuRocketIcon: string;
  votePower: number;
  tlmPower: number;
}

export default function InfoPopper({
  MenuLightningIcon,
  MenuRocketIcon,
  votePower,
  tlmPower,
}: IInfoPopper) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Button aria-describedby={id} type="button" onClick={handleClick}>
        <MoreHorizIcon sx={{ color: "white" }} />
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
        <Box
          sx={{
            border: 1,
            p: "16px 48px",
            bgcolor: "#232323",
            mt: "20px",
          }}
        >
          <Typography
            color="white"
            fontFamily="Montserrat Bold"
            fontSize="24px"
          >
            MINERS UNION
          </Typography>
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
          <Box
            display="flex"
            alignItems="center"
            borderTop="1px solid rgba(255, 255, 255, 0.1)"
            mx="-16px"
            py="12px"
          >
            <Link
              href="https://info.minersunion.io/"
              target="_blank"
              sx={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
                px: "16px",
                cursor: "pointer",
              }}
            >
              Documentation
            </Link>
            <NorthEastIcon sx={{ color: "white", fontSize: "16px" }} />
          </Box>
        </Box>
      </Popper>
    </>
  );
}
