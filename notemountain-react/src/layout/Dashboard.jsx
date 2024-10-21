import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Footer from './Footer'
import SignIn from '../pages/SignIn'
import Main from './Main'
import Navi from './Navi'
import "../style/dashboard.css"
import { useSelector } from 'react-redux'
import { Route, Routes } from "react-router-dom";
import LogIn from '../pages/LogIn'
import AllNotes from '../components/AllNotes'
import ManageNotes from '../pages/ManageNotes'
import AccountDetails from '../pages/AccountDetails'
import UpdateProfile from '../pages/UpdateProfile'



function Dashboard() {

    const darkTheme = useSelector((state) => state.app.darkTheme)

    useEffect(() => {
        const dashboard = document.querySelector(".dashboard")
        if (darkTheme) {
            dashboard.classList.add("dashboard-dark")
            dashboard.classList.remove("dashboard-light")
        } else {
            dashboard.classList.add("dashboard-light")
            dashboard.classList.remove("dashboard-dark")
        }
    }, [darkTheme])

    return (
        <Box className="dashboard">


            <Navi />


            <Routes>
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="/accountdetails" element={<AccountDetails />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/*" element={<Main />} />
                <Route path="/managenotes" element={<ManageNotes />} />

            </Routes>







        </Box >
    )
}

export default Dashboard