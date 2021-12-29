import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import SigninForm from './components/SigninForm/SigninForm'
import Navbar from './components/Navbar/Navbar'
import UserBlog from './components/UserBlog/UserBlog'
import SignupForm from './components/SignupForm/SignupForm'
import Footer from './components/Footer/Footer'
import SinglePost from './components/SinglePost/SinglePost'
import ErrorPage from './components/ErrorPage/ErrorPage'
import "./App.css"

function App() {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path ="/" element={<Navigate to="/signin"/>}></Route>
        <Route path = "/signin" element= {<SigninForm/>}></Route>
        <Route path = "/signup" element= {<SignupForm/>}></Route>

        <Route path = "/blog/:username" element={<UserBlog/>}></Route>

        {/* For seeing and editing posts */}
        <Route path = "/blog/:username/:postId/:purpose" element={<SinglePost/>}></Route>
        {/* For creating posts */}
        <Route path = "/blog/:username/:purpose" element={<SinglePost/>}></Route>

        <Route path = "/:errorNum" element={<ErrorPage/>}></Route>

        <Route path = "*" element={<Navigate to="/404"/>}></Route>

      </Routes>

      <Footer/>
    </Router>
  );
}

export default App
