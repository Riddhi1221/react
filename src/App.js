import React from "react";
import Drawer from "./Components/Drawer";
import Dashboard from "./Pages/Dashboard";
import Category from "./Pages/Category";
import SubCategory from "./Pages/SubCategory";
import QA from "./Pages/QA";
import { Routes, Route } from "react-router-dom";
import NoFound from "./Pages/NoFound";
import Login from "./Pages/login";
import Signup from "./Pages/Signup";
import Mainpage from "./Components/Mainpage";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Mainpage />} />
        <Route path="category" element={<Category />} />
        <Route path="subcategory" element={<SubCategory />} />
        <Route path="qa" element={<QA />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NoFound />} />
      </Route>
    </Routes>
  );
};

export default App;
