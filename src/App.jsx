import React from "react";
import './App.css';
import Dashboard from "./Pages/Dashboard";
import Category from "./Pages/Category";
import SubCategory from "./Pages/SubCategory";
import QA from "./Pages/QA";
import { Routes, Route } from "react-router-dom";
import NoFound from "./Pages/NoFound";
import Login from "./Pages/login";
import Signup from "./Pages/Signup";
import Mainpage from "./Components/Mainpage";
import CatagoryData from "./Components/Category1/CatagoryData";
import SubcatagoryData from "./Components/Subcategory1/SubcatagoryData";
import QuestionData from "./Components/Q&A/QuestionData"
import Mainpage1 from "./Mainlogin/Mainpage1/Mainpage1";
import CategoryData1 from "./Mainlogin/CatagoryData1";
import SubcategoryData1 from "./Mainlogin/SubcatagoryData1"
import QuestionData1 from "./Mainlogin/QuestionData1"



const App = () => {
  return (

    <Routes>
    <Route path='/'>
      <Route index element={<Mainpage />} />
      <Route path='Mainpage' element={<Mainpage />} />
      <Route path='Mainpage1' element={<Mainpage1 />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='category' element={<Category />} />
      <Route path='subcategory' element={<SubCategory />} />
      <Route path='qa' element={<QA />} />
      <Route path='catagorydata' element={<CatagoryData />} />
      <Route path='SubcatagoryData' element={<SubcatagoryData />} />
      <Route path='QuestionData' element={<QuestionData />} />
      <Route path='catagorydata1' element={<CategoryData1 />} />
      <Route path='SubcatagoryData1' element={<SubcategoryData1 />} />
      <Route path='QuestionData1' element={<QuestionData1 />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='*' element={<NoFound />} />


    </Route>
    
  </Routes>

  );
};

export default App;
