import React, { useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import {
  GetStarted,
  Signup,
  ViewBase,
  Voting,
  VotingDetail,
  Missions,
  MissionDetails,
  Information,
  Contributions,
  Proposals,
  ProposalDetails,
  CreateProposal,
  JoinRequests,
  CandidateScreen,
} from "./views";
import { checkLogin, Login } from "./plugins/chain";

export const WalletContext = React.createContext({
  wallet : {
    chainId:  null, //WCW is only for wax so we hardcode that
    name: null,
    authorization: {
    actor: null
  }},
  setWallet : (wallet: any) => {},
  loggedIn : false,
  setLoggedIn : (loggedIn: boolean) => {},
  claimed: false,
  setClaimed : (claimed: boolean) => {},
  tlmPower : 0,
  setTLMPower : (tlmPower: number) => {},
  votePower: 0,
  setVotePower: (votePower: number) => {},
  planet: "eyeke",
  setPlanet: (planet: string) => {}
});


function App() {
  const [wallet, setWallet] = React.useState({
    chainId:  null, //WCW is only for wax so we hardcode that
    name: null,
    authorization: {
      actor: null
    }});
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [claimed, setClaimed] = React.useState(false)
  const [votePower, setVotePower] = React.useState(0)
  const [tlmPower, setTLMPower] = React.useState(0)
  const [planet, setPlanet] = React.useState("eyeke")

  function getInitialStateWallet() {
    const wallet = localStorage.getItem('wallet')
    return wallet ? JSON.parse(wallet) : []
  }
  function getInitialStateLoggedIn() {
    const loggedIn = localStorage.getItem('loggedIn')
    return loggedIn ? JSON.parse(loggedIn) : []
  }

  useEffect(() => {
    if(wallet.name != null){
      localStorage.setItem('wallet', JSON.stringify(wallet))
    }
  }, [wallet]);

   useEffect(()=>{
    if(loggedIn){
      localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
    }
  }, [loggedIn])

  useEffect(() => {
    console.log(planet + " hier")
    localStorage.setItem('planet', JSON.stringify(planet))
  },[planet])



  useEffect(() => {
    const x = getInitialStateWallet()
    const y = getInitialStateLoggedIn()
    if(x != wallet){
      setWallet(x)
    }
    if(y){
      setLoggedIn(y)
      checkLogin()
      
    }
  },[])
  

  return (
    <>

    <WalletContext.Provider value={
        {wallet: wallet, 
        setWallet: setWallet, 
        loggedIn: loggedIn, 
        setLoggedIn: setLoggedIn,
        claimed: claimed,
        setClaimed: setClaimed,
        tlmPower: tlmPower,
        setTLMPower: setTLMPower,
        votePower: votePower,
        setVotePower: setVotePower,
        planet: planet,
        setPlanet: setPlanet


        }}>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/voting"
          element={
            <ViewBase>
              <Voting />
            </ViewBase>
          }
        />
        <Route
          path="/votingdetail"
          element={
            <ViewBase>
              <VotingDetail />
            </ViewBase>
          }
        />
        <Route
          path="/missions"
          element={
            <ViewBase>
              <Missions />
            </ViewBase>
          }
        />
        <Route
          path="/missiondetails"
          element={
            <ViewBase>
              <MissionDetails />
            </ViewBase>
          }
        />
        <Route
          path="/information"
          element={
            <ViewBase>
              <Information />
            </ViewBase>
          }
        />
        <Route
          path="/contributions"
          element={
            <ViewBase>
              <Contributions />
            </ViewBase>
          }
        />
        <Route
          path="/proposals"
          element={
            <ViewBase>
              <Proposals />
            </ViewBase>
          }
        />
        <Route
          path="/proposaldetails"
          element={
            <ViewBase>
              <ProposalDetails />
            </ViewBase>
          }
        />
        <Route
          path="/createproposal"
          element={
            <ViewBase>
              <CreateProposal />
            </ViewBase>
          }
        />
        <Route
          path="/joinrequests"
          element={
            <ViewBase>
              <JoinRequests />          
            </ViewBase>
          }
        />
        <Route
          path="/candidatescreen"
          element={
            <ViewBase>
              <CandidateScreen />          
            </ViewBase>
          }
        />
        <Route
          path="/*"
          element={
            <ViewBase>
              <GetStarted />
            </ViewBase>
          }
        />
      </Routes>
    </WalletContext.Provider>  
    </>
  );
}

export default App;
function alertUser(this: Window, ev: BeforeUnloadEvent) {
  throw new Error("Function not implemented.");
}

