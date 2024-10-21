import { Alert, AppBar, Box, Card, CardContent, Divider, Grid, IconButton, Pagination, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "../style/AllNotes.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllByDisplayName, getAllByHeaderOrContentContains } from '../redux/slices/noteSlice'
import { auth } from "../Firebase"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';



function AllNotes() {

    const darkTheme = useSelector((state) => state.app.darkTheme)

    const notes = useSelector((state) => state.note.notes)

    const user = auth.currentUser

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")

    const [currentUser, setCurrentUser] = useState(null);

    const navigateToNoteDetails = (id) => {
        navigate("/notedetails/" + id)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user) {
            const body = {
                prefix: searchInput,
                displayName: user.displayName
            }
            dispatch(getAllByHeaderOrContentContains(body))
        }
    }, [searchInput])

    useEffect(() => {
        const noteListBar = document.querySelector(".noteListBar")
        if (darkTheme) {
            noteListBar.classList.add("noteListBar-dark")
            noteListBar.classList.remove("noteListBar-light")
        } else {
            noteListBar.classList.remove("noteListBar-dark")
            noteListBar.classList.add("noteListBar-light")
        }
    }, [darkTheme])

    useEffect(() => {
        if (user) {
            dispatch(getAllByDisplayName(user.displayName))
        }
    }, [user])



    return (
        <Box >
            <Grid container sx={{ marginTop: "20px" }}>

                <Grid item xs={12} md={12}>
                    <AppBar position="static" className='noteListBar'>
                        <Toolbar>

                            <Typography variant="h6"
                                noWrap
                                component="div" sx={{ marginTop: "6px" }}
                            >
                                <DensitySmallIcon />
                            </Typography>



                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { sm: 'block' }, marginLeft: "20px" }}
                            >

                                All Notes

                            </Typography>

                            <Box>



                                <TextField value={searchInput} onChange={(e) => setSearchInput(e.target.value)} sx={{ backgroundColor: "white", width: "150px" }} id="search-note" label="Search" variant="filled" />
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Grid>

                {
                    notes && notes.length > 0 ? notes.map((note) => (
                        <React.Fragment key={note.id}>
                            <Grid key={note.id} item md={2} xs={6} sx={{ marginTop: "20px" }}>
                                <Card className='note' sx={{ minWidth: 300, backgroundColor: `${note.backgroundColor}`, color: "black" }}>
                                    <CardContent >
                                        <Typography variant="h5" component="div">
                                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                                {note.header}
                                                <IconButton onClick={() => navigateToNoteDetails(note.id)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </Box>
                                            <Divider />
                                        </Typography>
                                        <Typography variant="body2">
                                            {note.content}

                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid >

                            <Grid item md={1} xs={1}>

                            </Grid>
                        </React.Fragment>
                    ))
                        :
                        darkTheme ?
                            <Box sx={{ marginTop: "20px", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Alert color="warning" severity="info"> You do not have any notes.</Alert>

                            </Box>
                            :
                            <Box sx={{ marginTop: "20px", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Alert variant='filled' color="warning" severity="info"> You do not have any notes.</Alert>

                            </Box>

                }




            </Grid>





        </Box>


    )
}

export default AllNotes