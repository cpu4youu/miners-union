import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { GetStarted, Signup, ViewBase, Voting, VotingDetail, Missions } from "./views";

export const WalletContext = React.createContext({
  wallet : {},
  setWallet : (wallet: any) => {},
  loggedIn : false,
  setLoggedIn : (loggedIn: boolean) => {}
});

function App() {
  const [wallet, setWallet] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false)
  return (
    <>
      <WalletContext.Provider value={{wallet: wallet, setWallet: setWallet, loggedIn: loggedIn , setLoggedIn: setLoggedIn}}>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/voting" element={<ViewBase><Voting /></ViewBase>  } />
          <Route path="/votingdetail" element={<ViewBase><VotingDetail /></ViewBase>  } />
          <Route path="/missions" element={<ViewBase><Missions /></ViewBase>  } />
        </Routes>
    </WalletContext.Provider>  
      
    </>
  );
}

export default App;
