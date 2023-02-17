import { Box, IconButton, Typography } from "@mui/material";

interface IMenuBoard {
  icon: string;
  menuTitle: string;
  menuText: string;
  width: string;
  color: string;
}

function MenuBoard({ icon, menuTitle, menuText, width, color }: IMenuBoard) {
  return (
    <Box display="flex" alignItems="center" py="4px">
      <Box>
        <img alt="" width={width} src={icon} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", px: 1 }}>
        <Typography fontFamily="Montserrat Bold" fontSize="20px" color="white">
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

export default MenuBoard;
