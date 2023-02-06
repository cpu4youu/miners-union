import { useState } from "react";
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
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import CandidateOneIcon from "../../../assets/imgs/candidateone.png";
import CandidateTwoIcon from "../../../assets/imgs/candidatetwo.png";
import CandidateThreeIcon from "../../../assets/imgs/candidatetwo.png";

interface ICandidatePanelProps {
  desktop: boolean;
}

function createData(
  icon: string,
  rank: number,
  candidate: string,
  wallet: string,
  votes: number
) {
  return { icon, rank, candidate, wallet, votes };
}

const rows = [
  createData(`${CandidateOneIcon}`, 1, "Timothy", "bak2w.wam", 345984),
  createData(`${CandidateTwoIcon}`, 2, "Nina", "daed2.wam", 234221),
  createData(`${CandidateThreeIcon}`, 3, "Jürgen", "4u.2a.wam", 165722),
];

function CandidatePanel(props: ICandidatePanelProps) {
  const { desktop } = props;
  let navigate = useNavigate();
  const handleClickMenu = (link: string) => {
    navigate(link);
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ background: "transparent", boxShadow: "none" }}
      >
        <Table
          sx={{
            minWidth: 720,
            borderCollapse: "separate",
            borderSpacing: "0 8px",
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
                  p: "6px 12px",
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Rank
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Candidate
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Wallet
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  fontSize: "20px",
                  color: "white",
                  fontFamily: "Oxanium Light",
                  borderBottom: "none",
                  background: "transparent",
                }}
              >
                Votes
              </TableCell>
              <TableCell
                align="right"
                sx={{ borderBottom: "none", background: "transparent" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.rank}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    p: "6px 12px",
                    borderTopLeftRadius: "16px",
                    borderBottomLeftRadius: "16px",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <img src={row.icon} alt="" width="64px" />
                  </Box>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {row.rank}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {row.candidate}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {row.wallet}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    p: "6px 12px",
                    fontSize: "16px",
                    color: "white",
                    fontFamily: "0xanium Light",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  {row.votes}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    p: "6px 12px",
                    borderTopRightRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderBottom: "none",
                    background:
                      "radial-gradient(50% 50% at 50% 50%, #009DF5 0%, #0089D7 100%)",
                  }}
                >
                  <Button
                    sx={{
                      px: "32px",
                      py: "4px",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700",
                      fontFamily: "Oxanium Light",
                      border: "1px solid #FFFFFF",
                      borderRadius: "20px",
                      background:
                        "linear-gradient(176.22deg, #FF01FF -60.52%, rgba(33, 33, 33, 0.8) -24.61%, rgba(33, 33, 33, 0.5) 59.39%, #FFFFFF 123.24%)",
                    }}
                    onClick={() => handleClickMenu("/votingdetail")}
                  >
                    More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CandidatePanel;
