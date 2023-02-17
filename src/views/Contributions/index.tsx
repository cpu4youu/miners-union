import {
  Box,
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
import { makeStyles } from "@mui/styles";
import classnames from "classnames";

import margoprofile from "../../assets/imgs/margoprofile.png";
import velesprofile from "../../assets/imgs/velesprofile.png";
import naronprofile from "../../assets/imgs/naronprofile.png";
import contributorone from "../../assets/imgs/contributorone.png";
import contributortwo from "../../assets/imgs/contributortwo.png";
import contributorthree from "../../assets/imgs/contributorthree.png";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function createData(
  rank: number,
  icon: string,
  contributor: string,
  totalcontribution: number,
  iconSize: number
) {
  return { rank, icon, contributor, totalcontribution, iconSize };
}

const rows = [
  createData(1, `${margoprofile}`, "magor.dac", 100000, 72),
  createData(2, `${velesprofile}`, "veles.dac", 90000, 60),
  createData(3, `${naronprofile}`, "naron.dac", 75000, 60),
  createData(4, `${contributorone}`, "332ab.wam", 5000, 40),
  createData(5, `${contributortwo}`, "ag32a.wam", 3000, 40),
  createData(6, `${contributorthree}`, "4tc.e.wam", 2200, 40),
];

function Contributions() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));

  return (
    <>
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
                    align="center"
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      fontFamily: "Oxanium Light",
                      borderBottom: "none",
                      background: "transparent",
                    }}
                  >
                    Rank
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none", background: "transparent" }}
                  ></TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      fontFamily: "Oxanium Light",
                      borderBottom: "none",
                      background: "transparent",
                    }}
                  >
                    Contributor
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontSize: "24px",
                      color: "white",
                      fontFamily: "Oxanium Light",
                      borderBottom: "none",
                      background: "transparent",
                    }}
                  >
                    Total Contribution
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.rank}>
                    <TableCell
                      align="center"
                      sx={{
                        p: "6px 12px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      {row.rank}
                    </TableCell>
                    <TableCell
                      scope="row"
                      align="center"
                      sx={{
                        p: "6px 12px",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <img src={row.icon} alt="" width={row.iconSize} />
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
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
                      {row.contributor}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        p: "6px 12px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        borderRight: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      {row.totalcontribution} TLM
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default Contributions;
