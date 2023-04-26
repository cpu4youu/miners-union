import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Link,
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
import { makeStyles } from "@mui/styles";
import classnames from "classnames";
import { fetchTable } from "../../plugins/chain";
import { smartcontract } from "../../config";

const useStyles = makeStyles({
  contentWrapper: {
    width: "1000px",
  },
  mobileWrapper: {
    width: "100%",
  },
});

interface IProposal {
  business_model: string;
  claimed_funding: string;
  creation_date: string;
  crowdfunding_id: number;
  daorules: number;
  description: string;
  downvotes: number;
  upvotes: number;
  duration: string;
  funding_date: string;
  objective: string;
  overview: string;
  received_funding: string;
  requested_funding: string;
  submitted_by: string;
  teaminfo: string;
  title: string;
  to: string;
}

interface IRow {
  key: number;
  proposalTitle: string;
  score: number;
  funding_percent: string;
  time: string;
}

function createData(
  key: number,
  proposalTitle: string,
  score: number,
  funding_percent: string,
  time: string
) {
  return {
    key,
    proposalTitle,
    score,
    funding_percent,
    time,
  };
}

function Crowdfundings() {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up(1048));
  const mobile = useMediaQuery(theme.breakpoints.down(705));
  const [showOnlyTen, setShowOnlyTen] = useState(10);
  let navigate = useNavigate();
  const [rows, setRows] = useState<IRow[]>([]);

  const handleClickMenu = (link: string, proposal: string | number) => {
    if (link === "/crowdfundingdetails") {
      navigate(link, {
        state: {
          key: proposal,
        },
        replace: true,
      });
    } else {
      navigate(link);
    }
  };
  function handleShowMore() {
    setShowOnlyTen(showOnlyTen + 10);
  }
  function calculateDaysAndHours(dateTimeStr: string) {
    dateTimeStr = dateTimeStr + "Z";
    const targetDateTime = new Date(dateTimeStr);
    const now = new Date();

    const timeDiff: number = targetDateTime.getTime() - now.getTime();
    const daysDiff: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff: number = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    return `${daysDiff} days ${hoursDiff} hours`;
  }

  function calculatePercentage(receivedFunding: string, totalFunding: string) {
    const received = parseFloat(receivedFunding.replace(" TLM", ""));
    const total = parseFloat(totalFunding.replace(" TLM", ""));

    const percentage = Math.round((received / total) * 10000) / 100;

    return percentage.toString() + "%";
  }

  useEffect(() => {
    async function x() {
      let more = false;
      let next = "";
      const proposals: Array<IProposal> = [];
      const data: Array<IRow> = [];
      do {
        const x = await fetchTable({
          json: true,
          code: smartcontract,
          scope: smartcontract,
          table: "crowdfunding",
          limit: 100,
          lower_bound: next,
        });
        next = x.next_key;
        more = x.more;
        x.rows.map((value: any) => {
          proposals.push(value);
        });
      } while (more);
      proposals.map((value: IProposal) => {
        data.push(
          createData(
            value.crowdfunding_id,
            value.title,
            value.upvotes - value.downvotes,
            calculatePercentage(
              value.received_funding,
              value.requested_funding
            ),
            calculateDaysAndHours(value.funding_date)
          )
        );
      });
      setRows(data.sort((a, b) => b.key - a.key));
    }
    x();
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        py={desktop ? "64px" : "32px"}
      >
        <Box
          className={classnames(
            desktop ? classes.contentWrapper : "",
            mobile ? classes.mobileWrapper : ""
          )}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={mobile ? "column" : "row"}
            mb={desktop ? "48px" : "24px"}
          >
            <Typography
              fontFamily="Oxanium Medium"
              fontSize={desktop ? "40px" : "28px"}
              fontWeight={desktop ? "700" : "500"}
              lineHeight="1.1"
              pb={mobile ? "12px" : "0"}
              color="white"
            >
              Campaigns
            </Typography>
            <Link
              py="2px"
              display="flex"
              alignItems="flex-end"
              width={desktop ? "227px" : "12px"}
              sx={{
                textDecoration: "none",
                borderBottom: "1px solid rgba(255, 255, 255, 0.61)",
                cursor: "pointer",
              }}
              onClick={() => handleClickMenu("/createcrowdfundingproposal", "")}
            >
              <Typography
                fontFamily="Oxanium Medium"
                fontSize={desktop ? "28px" : "20px"}
                fontWeight={desktop ? "500" : "400"}
                lineHeight="1.1"
                color="white"
                sx={{ opacity: "0.7" }}
              >
                Create Campaign
              </Typography>
            </Link>
          </Box>
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
                    Proposal
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
                    Scores
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
                    Funding
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
                    Time remaining
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(0, showOnlyTen).map((row) => (
                  <TableRow key={row.key}>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 0 16px 20px",
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
                      <Box
                        pr="12px"
                        height="84px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.31)",
                        }}
                      >
                        <Typography pb="6px">{row.proposalTitle}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 0 16px 20px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <Box
                        pr="12px"
                        height="84px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.31)",
                        }}
                      >
                        {row.score}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 0 16px 20px",
                        fontSize: "20px",
                        color: "Green",
                        fontFamily: "0xanium Light",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      <Box
                        pr="12px"
                        height="84px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          borderRight: "1px solid rgba(255, 255, 255, 0.31)",
                        }}
                      >
                        {row.funding_percent}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        p: "16px 40px 16px 20px",
                        fontSize: "20px",
                        color: "white",
                        fontFamily: "0xanium Light",
                        borderTopRightRadius: "12px",
                        borderBottomRightRadius: "12px",
                        borderTop: "3px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "3px solid rgba(255, 255, 255, 0.1)",
                        borderRight: "3px solid rgba(255, 255, 255, 0.1)",
                        background: "rgba(255, 255, 255, 0.04)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        pr="12px"
                        height="84px"
                        display="flex"
                        alignItems="center"
                      >
                        {row.time.includes("-") ? "Completed" : row.time}

                      </Box>
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
                          textTransform: "none",
                          background:
                            "linear-gradient(176.22deg, #FF01FF -60.52%, rgba(33, 33, 33, 0.8) -24.61%, rgba(33, 33, 33, 0.5) 59.39%, #FFFFFF 123.24%)",
                        }}
                        onClick={() =>
                          handleClickMenu("/crowdfundingdetails", row.key)
                        }
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
              textTransform: "none",
              background:
                "linear-gradient(176.22deg, #FF01FF -60.52%, rgba(33, 33, 33, 0.8) -24.61%, rgba(33, 33, 33, 0.5) 59.39%, #FFFFFF 123.24%)",
            }}
            onClick={() => handleShowMore()}
          >
            Show More
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Crowdfundings;
