import {
  Box,  
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

import { makeStyles } from "@mui/styles";
import MagorProfileIcon from "../../assets/imgs/margoprofile.png";
import VelesProfileIcon from "../../assets/imgs/velesprofile.png";
import NaronProfileIcon from "../../assets/imgs/naronprofile.png";
import SpaceshipIcon from "../../assets/icons/spaceship.png";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function createData(
  icon: string,
  from: string,
  rewards: number,
  spaceships: number,
  timeremaining: string
) {
  return { icon, from, rewards, spaceships, timeremaining };
}

const rows = [
  createData(
    `${MagorProfileIcon}`,
    "magor.dac",
    10000,
    35600,
    "2d 23h 15m 10s"
  ),
  createData(
    `${MagorProfileIcon}`,
    "magor.dac",
    10000,
    23700,
    "4d 08h 12m 05s"
  ),
  createData(
    `${VelesProfileIcon}`,
    "veles.dac",
    15000,
    12645,
    "6d 12h 45m 59s"
  ),
  createData(`${NaronProfileIcon}`, "naron.dac", 75000, 6645, "8d 04h 19m 55s"),
];

function Missions() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  let navigate = useNavigate();
  const handleClickMenu = (link: string) => {
    navigate(link);
  };
  return (
    <Box display="flex" justifyContent="center" py="48px">
      <Box
        className={classnames(
          desktop ? classes.contentWrapper : "",
          mobile ? classes.mobileWrapper : ""
        )}
      >
        <TableContainer
          component={Paper}
          sx={{ background: "transparent", boxShadow: "none" }}
        >
          <Table
            sx={{
              minWidth: 720,
              borderCollapse: "separate",
              borderSpacing: "0 12px",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ borderBottom: "none", background: "transparent" }}
                ></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  From
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Rewards
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Spaceships
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Time Remaining
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.from}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClickMenu("/missiondetails")}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      p: "6px 12px",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <img src={row.icon} alt="" width="72px" />
                    </Box>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "6px 12px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.from}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "6px 12px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.rewards} TLM
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "6px 12px",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    <Box display="flex" justifyContent="flex-start">
                      <img src={SpaceshipIcon} alt="" width="28px" />
                      <Typography
                        px="12px"
                        fontSize="20px"
                        color="white"
                        sx={{ fontFamily: "0xanium Light" }}
                      >
                        {row.spaceships}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      p: "6px 12px",
                      borderTopRightRadius: "12px",
                      borderBottomRightRadius: "12px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      borderRight: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.timeremaining}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Missions;
