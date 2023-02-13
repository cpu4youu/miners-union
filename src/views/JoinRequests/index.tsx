import {
  Box,  
  Button,
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
import classnames from "classnames";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

function createData(
  request: string,
  submit: string,  
) {
  return { request, submit };
}

const rows = [
  createData(
    "3adsb.wam",
    "23/01/2023 07:56AM",
  ),
  createData(
    "wasit.wam",
    "23/01/2023 07:59AM",
  ),  
];

function JoinRequests() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  
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
                  align="left"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    fontFamily: "Oxanium Light",
                    borderBottom: "none",
                    background: "transparent",
                  }}
                >
                  Join Request
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
                  Submitted on
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "none", background: "transparent" }}
                ></TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.request}                  
                >
                  <TableCell
                    align="left"
                    sx={{
                      p: "24px 16px",
                      fontSize: "20px",
                      color: "white",
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      borderLeft: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.request}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      p: "24px 16px",
                      fontSize: "20px",
                      color: "white",
                      fontFamily: "0xanium Light",
                      borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                      borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    {row.submit}
                  </TableCell>   
                  <TableCell
                    align="right"
                    sx={{
                      p: "24px 16px",
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
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Button
                        sx={{
                          px: "32px",
                          py: "4px",
                          color: "white",
                          mr: "12px",
                          fontSize: "16px",
                          fontWeight: "700",
                          fontFamily: "Oxanium Light",
                          border: "2px solid #FFB800",
                          boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                          borderRadius: "20px",
                          textTransform: "none",
                          background: "#FFB800",
                        }}                        
                      >
                        Approve
                      </Button>
                      <Button
                        sx={{
                          px: "32px",
                          py: "4px",
                          color: "white",
                          fontSize: "16px",
                          fontWeight: "700",
                          fontFamily: "Oxanium Light",
                          border: "2px solid #BA0000",
                          boxShadow: "inset 0px 0px 36px 1px rgba(54, 0, 206, 0.61)",
                          borderRadius: "20px",
                          textTransform: "none",
                          background: "#BA0000",
                        }}                        
                      >
                        Deny
                      </Button>
                      </Box>                    
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

export default JoinRequests;
