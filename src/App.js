import './App.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import search from "./components/images/search.svg";
import home from "./components/images/home-2.svg";
import database from "./components/images/database.svg";
import chart from "./components/images/line-chart.svg";
import upload from "./components/images/upload.svg";
import users from "./components/images/users.svg";
import settings from "./components/images/settings.svg";
import UserAction from './components/pages/UserAction';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListUsers from './components/pages/ListUsers';

import React, { useState } from 'react';


function App() {
  const [id, setId] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserAction children={{
            nav: <NavBar />,
            side: <SideBar icons={[search,
              home,
              database,
              chart,
              upload,
              users,
              settings]} />,
            editOrNew: "New",
          }} />} />
          <Route path="/edit/:id" element={<UserAction id={id} children={{
            nav: <NavBar />,
            side: <SideBar icons={[search,
              home,
              database,
              chart,
              upload,
              users,
              settings]} />,
            editOrNew: "Edit",

          }} />} />
          <Route path="/list" element={<ListUsers setId={setId} id={id} children={{
            nav: <NavBar />,
            side: <SideBar icons={[search,
              home,
              database,
              chart,
              upload,
              users,
              settings]} />,
          }} />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;
