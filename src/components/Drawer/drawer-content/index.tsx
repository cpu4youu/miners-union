import { useCallback, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, Button, Box } from "@mui/material";
import classnames from "classnames";
import "./drawer-content.scss";
import DrawerClaimIcon from "../../../assets/icons/drawerclaim.png";
import DrawerVotingIcon from "../../../assets/icons/drawervoting.png";
import DrawerMissionsIcon from "../../../assets/icons/drawermissions.png";
import DrawerInformationIcon from "../../../assets/icons/drawerinformation.png";
import DrawerProposalsIcon from "../../../assets/icons/drawerproposals.png";
import DrawerContributionsIcon from "../../../assets/icons/drawercontributions.png";
import DrawerVotingBlackIcon from "../../../assets/icons/drawervotingblack.png";
import DrawerMissionsBlackIcon from "../../../assets/icons/drawermissionblack.png";
import DrawerInformationBlackIcon from "../../../assets/icons/drawerinformationblack.png";
import DrawerProposalsBlackIcon from "../../../assets/icons/drawerproposalsblack.png";
import DrawerContributionsBlackIcon from "../../../assets/icons/drawercontributionsblack.png";

import HoverableLinkButton from "./HoverableLinkButton";
import HoverableSocialLinkButton from "./HoverableSocialLinkButton";

import DrawerLogoutIcon from "../../../assets/icons/drawerlogout.png";
import DrawerTelegramIcon from "../../../assets/icons/drawertelegram.png";
import DrawerDiscordIcon from "../../../assets/icons/drawerdiscord.png";

import { smartcontract } from "../../../config";
import { fetchTable, transaction } from "../../../plugins/chain";
import { WalletContext } from "../../../App";

const LinkButtonDataInspector = [
  {
    link: "/voting",
    whiteIcon: DrawerVotingIcon,
    darkIcon: DrawerVotingBlackIcon,
    text: "Voting",
  },
  {
    link: "/missions",
    whiteIcon: DrawerMissionsIcon,
    darkIcon: DrawerMissionsBlackIcon,
    text: "Missions",
  },
  {
    link: "/information",
    whiteIcon: DrawerInformationIcon,
    darkIcon: DrawerInformationBlackIcon,
    text: "Information",
  },
  {
    link: "/crowdfundings",
    whiteIcon: DrawerProposalsIcon,
    darkIcon: DrawerProposalsBlackIcon,
    text: "Campaigns",
  },
  {
    link: "/contributions",
    whiteIcon: DrawerContributionsIcon,
    darkIcon: DrawerContributionsBlackIcon,
    text: "Contributions",
  },
  {
    link: "/joinrequests",
    whiteIcon: DrawerProposalsIcon,
    darkIcon: DrawerProposalsBlackIcon,
    text: "Application",
  },
];
const LinkButtonDataNormal = [
  {
    link: "/voting",
    whiteIcon: DrawerVotingIcon,
    darkIcon: DrawerVotingBlackIcon,
    text: "Voting",
  },
  {
    link: "/missions",
    whiteIcon: DrawerMissionsIcon,
    darkIcon: DrawerMissionsBlackIcon,
    text: "Missions",
  },
  {
    link: "/information",
    whiteIcon: DrawerInformationIcon,
    darkIcon: DrawerInformationBlackIcon,
    text: "Information",
  },
  {
    link: "/crowdfundings",
    whiteIcon: DrawerProposalsIcon,
    darkIcon: DrawerProposalsBlackIcon,
    text: "Campaigns",
  },
  {
    link: "/contributions",
    whiteIcon: DrawerContributionsIcon,
    darkIcon: DrawerContributionsBlackIcon,
    text: "Contributions",
  },
];

const LinkButtonDataSocial = [
  {
    link: "https://t.me/minersunion",
    icon: DrawerTelegramIcon,
    text: "Telegram",
  },
  {
    link: "https://discord.gg/9Y6GanVY6r",
    icon: DrawerDiscordIcon,
    text: "Discord",
  },
];

interface INavContent {
  mobileOpen: boolean;
  isSmallerScreen?: boolean;
}

function NavContent({ mobileOpen, isSmallerScreen }: INavContent) {
  const [isActive] = useState();
  const {wallet, setClaimed} = useContext(WalletContext)
  const [isInspector, setInspector] = useState(false)

  const HandleClaim = async () => {
    if(wallet.name != null){
      const x = await transaction({
        actions: [{
          account: smartcontract,
          name: "claimpower",
          authorization: [{
            actor: wallet.name,
            permission: 'active',
          }],
          data: {
            wallet: wallet.name,
            claim_user_cpu : true
          },
        }]
      })
      if(x){  
        setClaimed(true);
        alert("Succesfully claimed Voting Power")
      }
    }
  }

  useEffect(() => {
    async function z(){
      if(wallet.name != null){
        const r = await fetchTable({
          json: true,
          code: smartcontract,
          scope: smartcontract,
          table: "inspectors",
          limit: 1,
          lower_bound: wallet.name,
          upper_bound: wallet.name,
        })
        if(r.rows[0].wallet === wallet.name) {
          setInspector(true);
        } else {
          setInspector(false);
        }
      }
    }
    z()
  }, [])
  
  return (
    <div
      className="dapp-sidebar"
      style={{
        minWidth: mobileOpen ? 240 : 60,
        paddingTop: isSmallerScreen ? 20 : 100,
      }}
    >
      <div className="dapp-menu-links">
        <div className="dapp-nav">
          <Button
            className={classnames("button-dapp-btn", { active: isActive })}
            onClick={() => HandleClaim()}
          >
            <div
              className={classnames(
                "dapp-btn-inner",
                mobileOpen ? "dapp-btn-inner-desktop" : ""
              )}
            >
              <img
                alt=""
                src={DrawerClaimIcon}
                style={{ marginRight: mobileOpen ? 10 : 0 }}
              />
              {mobileOpen && <p>Claim</p>}
            </div>
          </Button>

          {isInspector ? 
          LinkButtonDataInspector.map((value: any, index: any) => {
            const { link, whiteIcon, darkIcon, text } = value;
            return (
              <HoverableLinkButton
                key={index}
                link={link}
                mobileOpen={mobileOpen}
                whiteIcon={whiteIcon}
                darkIcon={darkIcon}
                text={text}
              />
            );
          })
        :
        LinkButtonDataNormal.map((value: any, index: any) => {
          const { link, whiteIcon, darkIcon, text } = value;
          return (
            <HoverableLinkButton
              key={index}
              link={link}
              mobileOpen={mobileOpen}
              whiteIcon={whiteIcon}
              darkIcon={darkIcon}
              text={text}
            />
          );
        })}

          <Link
            component={NavLink}
            to="/"
            marginTop="48px"
            // isActive={(match, location) => {
            //     return checkPage(location, "home");
            // }}
            className={classnames("button-dapp-menu", { active: isActive })}
          >
            <div
              className={classnames(
                "logout-menu-item",
                mobileOpen ? "logout-menu-item-desktop" : ""
              )}
            >
              <img
                alt=""
                src={DrawerLogoutIcon}
                style={{
                  marginRight: mobileOpen ? 10 : 0,
                  marginLeft: mobileOpen ? 50 : 10,
                }}
              />
              {mobileOpen && <p>Logout</p>}
            </div>
          </Link>

          {LinkButtonDataSocial.map((value: any, index: any) => {
            const { link, icon, text } = value;
            return (
              <HoverableSocialLinkButton
                key={index}
                link={link}
                mobileOpen={mobileOpen}
                icon={icon}
                text={text}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NavContent;
