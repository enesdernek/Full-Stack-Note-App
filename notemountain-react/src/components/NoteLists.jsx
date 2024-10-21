import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useDispatch, useSelector } from "react-redux"
import "../style/noteList.css"
import { addNoteList, getNoteListsByDisplayName } from '../redux/slices/noteListSlice';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import { IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import * as yup from "yup"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { auth } from "../Firebase"
import { Add } from '@mui/icons-material';

const validationSchema = yup.object({
    noteListName: yup.string("Enter your note list name")
        .required("Note list name is required")


});

function NoteLists() {

    const dispatch = useDispatch()

    const noteLists = useSelector((state) => state.notelist.noteLists)

    const user = auth.currentUser

    const darkTheme = useSelector((state) => state.app.darkTheme)

    const [open, setOpen] = React.useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false)


    const navigate = useNavigate()



    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const list = document.querySelector(".list")
        if (darkTheme) {
            list.classList.remove("list-light")
            list.classList.add("list-dark")
        } else {
            list.classList.add("list-light")
            list.classList.remove("list-dark")
        }
    }, [darkTheme])



    useEffect(() => {
        if (user) {
            dispatch(getNoteListsByDisplayName(user.displayName))
        }

    }, [user, navigate])

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);




    const navigateToNotes = (noteListId) => {
        navigate(`notes/${noteListId}`)
    }

    useEffect(() => {

    }, [dispatch])

    const navigateToAllNotes = () => {
        navigate("/allnotes")
    }




    const formik = useFormik({
        initialValues: {
            noteListName: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const noteList = {
                noteListName: values.noteListName,
                displayName: user.displayName
            }
            dispatch(addNoteList(noteList))
            setSnackbarOpen(true)
        }
    })

    const handleCloseEvent = (value) => {
        if (value) {
            handleClose()
        }
    }



    return (
        <Box sx={{ width: '100%', maxWidth: 360, marginTop: "20px", }}>




            <List className='list' component="nav" aria-label="secondary mailbox folder">
                <ListItemButton onClick={navigateToAllNotes}
                >
                    <ListItemText primary={
                        <Box>
                            <Stack direction={{ md: "row", xs: "column" }}>
                                <FeaturedPlayListIcon />
                                <span style={{ marginTop: "2px", marginLeft: "6px" }}> All Notes</span>
                            </Stack>
                        </Box>

                    } />
                </ListItemButton>

                {
                    user && noteLists && noteLists.map((item) => (


                        <ListItemButton key={item.noteListId} onClick={() => navigateToNotes(item.noteListId)}
                            selected={false}

                        >
                            <ListItemText primary={item.noteListName} />
                        </ListItemButton>




                    ))
                }

                {
                    user && <ListItemButton id="add-note-list-button" onClick={() => setOpen(!open)}
                    >
                        <ListItemText primary={
                            <Box>
                                <Stack direction={{ md: "row", xs: "column" }}>
                                    <AddIcon />
                                    <span style={{ marginTop: "2px" }}> Add note list</span>
                                </Stack>
                            </Box>
                        } />
                    </ListItemButton>
                }





            </List>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth

            >
                <DialogTitle id="alert-dialog-title">
                    {"Add note list"}
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                            <TextField fullWidth name="noteListName" label="Note List Name" variant="outlined" type="text" value={formik.values.noteListName}
                                onChange={formik.handleChange}
                                error={formik.touched.noteListName && Boolean(formik.errors.noteListName)}
                                helperText={formik.touched.noteListName && formik.errors.noteListName}
                            />

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "left", paddingLeft: "24px" }}>
                        <Button onClick={() => handleCloseEvent(formik.values.noteListName)} variant='contained' type="submit">ADD</Button>

                    </DialogActions>
                </form>
            </Dialog>


            <div >
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={2000}
                    onClose={() => setSnackbarOpen(false)}
                    message="Note archived"
                />
            </div>
        </Box >
    )
}

export default NoteLists