import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { GetStarted, Signup, ViewBase, Voting, VotingDetail, Missions } from "./views";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/voting" element={<ViewBase><Voting /></ViewBase>  } />
        <Route path="/votingdetail" element={<ViewBase><VotingDetail /></ViewBase>  } />
        <Route path="/missions" element={<ViewBase><Missions /></ViewBase>  } />
      </Routes>
    </>
  );
}

export default App;
