import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NavBar from "./pages/NavBar";
import LoginRegister from "./pages/LoginRegister";
import MyRecipes from "./pages/MyRecipes";
import ShareRecipes from "./pages/shareRecipes";

function AppRouter(props) {
  return (
    <Routes>
      <Route index element={<LoginRegister {...props} />} />
      <Route path="LoginRegister" element={<LoginRegister {...props} />} />
      <Route
        path="HomePage"
        element={
          <>
            <NavBar />
            <HomePage {...props} />
          </>
        }
      />

      <Route
        path="MyRecipes"
        element={
          <>
            <NavBar />
            <MyRecipes {...props} />
          </>
        }
      />

      <Route
        path="ShareRecipes"
        element={
          <>
            <NavBar />
            <ShareRecipes {...props} />
          </>
        }
      />

      <Route
        path="MyCalories"
        element={
          <>
            <NavBar />
            <HomePage {...props} />
          </>
        }
      />
    </Routes>
  );
}
export default AppRouter;
