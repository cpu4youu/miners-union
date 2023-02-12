import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { GetStarted, Signup, ViewBase, Voting, VotingDetail, Missions, MissionDetails, Information, Contributions } from "./views";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/voting" element={<ViewBase><Voting /></ViewBase>  } />
        <Route path="/votingdetail" element={<ViewBase><VotingDetail /></ViewBase>  } />
        <Route path="/missions" element={<ViewBase><Missions /></ViewBase>  } />
        <Route path="/missiondetails" element={<ViewBase><MissionDetails /></ViewBase>  } />
        <Route path="/information" element={<ViewBase><Information /></ViewBase>  } />
        <Route path="/contributions" element={<ViewBase><Contributions /></ViewBase>  } />
      </Routes>
    </>
  );
}

export default App;
