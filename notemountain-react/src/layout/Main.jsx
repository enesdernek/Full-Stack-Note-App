import { Grid } from '@mui/material'
import React from 'react'
import NoteLists from '../components/NoteLists'
import Notes from '../components/Notes'
import { Route, Routes } from "react-router-dom"
import HomePage from '../pages/HomePage'
import NoteDetails from '../components/NoteDetails'
import AllNotes from '../components/AllNotes'


function Main() {
    return (
        <Grid container sx={{ marginTop: "20px" }}>


            <Grid item xs={2} md={2}>
                <NoteLists />
            </Grid>
            <Grid sx={{ marginLeft: "20px" }} item xs={9} md={9}>
                <Routes>

                    <Route path="/allnotes" element={<AllNotes />} />
                    <Route path="/notes/:noteListId" element={<Notes />} />
                    <Route path="/notedetails/:id" element={<NoteDetails />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Grid>

        </Grid>
    )
}

export default Main