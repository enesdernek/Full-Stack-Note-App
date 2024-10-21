import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, InputLabel, ListItemButton, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, getAllByHeaderOrContentContainsAndNoteListId, getNotesByDisplayNameAndNoteListIdDesc } from '../redux/slices/noteSlice';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import "../style/notes.css"
import { useFormik } from "formik"
import * as yup from "yup"

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { deleteNoteListByNoteListId, getNoteListByNoteListId, renameNoteListName } from '../redux/slices/noteListSlice';
import Search from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { auth } from "../Firebase"

const validationSchema = yup.object({
    header: yup.string("Enter your header").required("Header is required"),
    content: yup.string("Enter your content").required("content is required")
})

const validationSchema2 = yup.object({
    renamedNoteList: yup.string("Enter your new note list name")
})




function Notes() {

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const { noteListId } = useParams()

    const user = auth.currentUser

    const notes = useSelector((state) => state.note.notes)

    const noteList = useSelector((state) => state.notelist.noteList)

    const darkTheme = useSelector((state) => state.app.darkTheme)

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [renameDialogOpen, setRenameDialogOpen] = useState(false)

    const [searchInput, setSearchInput] = useState("")

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);




    const navigate = useNavigate()

    /*  const [currentUser, setCurrentUser] = useState(null);
  
       useEffect(() => {
           const unsubscribe = auth.onAuthStateChanged((user) => {
               setCurrentUser(user);
           });
           return () => unsubscribe();
       }, []);
   */


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
            const body = {
                prefix: searchInput,
                displayName: user.displayName,
                noteListId: noteListId
            }
            dispatch(getAllByHeaderOrContentContainsAndNoteListId(body))
        }



    }, [searchInput])

    useEffect(() => {
        if (user) {
            const body = {
                noteListId: noteListId,
                displayName: user.displayName
            }
            dispatch(getNotesByDisplayNameAndNoteListIdDesc(body))
            dispatch(getNoteListByNoteListId(noteListId))
        }


    }, [noteListId, user])

    const formik2 = useFormik({
        initialValues: {
            renamedNoteList: noteList ? noteList.noteListName : ""
        },
        validationSchema: validationSchema2,
        onSubmit: (values) => {
            const noteList = {
                id: noteListId,
                noteListName: values.renamedNoteList,
            }
            dispatch(renameNoteListName(noteList))
            navigate("/")
        }
    })

    const formik = useFormik({


        initialValues: {
            header: "",
            content: "",
            startDate: "",
            backgroundColor: "white",
            displayName: user ? user.displayName : "",

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const note = {
                displayName: user ? user.displayName : "",
                header: values.header,
                content: values.content,
                startDate: new Date(),
                backgroundColor: values.backgroundColor,
                noteList: {
                    noteListId: noteListId
                }
            }
            dispatch(createNote(note))

        }

    })

    const handleCloseEvent = () => {
        handleClose()
    }

    const handleClose = () => {
        setOpen(false);
    };

    const closeDeleteNoteListDialog = () => {
        setDeleteDialogOpen(false)
    }

    const openDeleteNoteListDialog = () => {
        setDeleteDialogOpen(true)
    }


    const removeNoteList = () => {
        dispatch(deleteNoteListByNoteListId(noteListId))
        navigate("/")
    }

    const closeRenameNoteListDialog = () => {
        setRenameDialogOpen(false)
    }

    const openRenameNoteListDialog = () => {
        setRenameDialogOpen(true)
    }

    const handleCloseRename = () => {
        setRenameDialogOpen(false)
    }

    const navigateToNoteDetails = (id) => {
        navigate("/notedetails/" + id)
    }


    return (
        <Grid container sx={{ marginTop: "20px" }}>

            <Grid item xs={12} md={12}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" className='noteListBar'>
                        <Toolbar>
                            {
                                noteList && <Typography variant="h6"
                                    noWrap
                                    component="div"
                                >
                                    {noteList.noteListName}
                                </Typography>
                            }


                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { sm: 'block' }, marginLeft: "20px" }}
                            >
                                <Button sx={{ backgroundColor: "#7c4dff", "&:hover": { backgroundColor: "#673ab7" } }}
                                    onClick={() => setOpen(true)}
                                    variant='contained' >

                                    <AddIcon sx={{ fontSize: "20px", marginRight: "4px" }} />
                                    Add Note

                                </Button>
                                <IconButton onClick={openRenameNoteListDialog} sx={{ marginLeft: "20px" }}>
                                    <EditIcon sx={{ color: "#3d5afe" }} />
                                </IconButton>
                                <IconButton onClick={openDeleteNoteListDialog}>
                                    <DeleteIcon sx={{
                                        color: "#d32f2f"
                                    }} />
                                </IconButton>

                            </Typography>

                            <TextField value={searchInput} onChange={(e) => setSearchInput(e.target.value)} sx={{ backgroundColor: "white", width: "150px" }} id="search-note" label="Search" variant="filled" />

                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>


            {
                notes && notes.map((note) => (
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
            }


            <Grid item md={1} xs={1}>

            </Grid>

            <Dialog fullWidth
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={handleClose}
            >
                <DialogTitle id="add-note-header">
                    {"Add note"}
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <DialogContentText id="dialog-content">
                            <TextField fullWidth name="header" id="header" label="Header" value={formik.values.header} onChange={formik.handleChange}
                                error={formik.touched.header && Boolean(formik.errors.header)}
                                helperText={formik.touched.header && formik.errors.header}
                            />

                            <TextField sx={{ marginTop: "20px" }} fullWidth name="content" id="content" label="Content" value={formik.values.content} onChange={formik.handleChange}
                                error={formik.touched.content && Boolean(formik.errors.content)}
                                helperText={formik.touched.content && formik.errors.content}
                            />

                            <FormControl sx={{ marginTop: "20px" }} fullWidth >
                                <InputLabel id="background-color-label">Background Color</InputLabel>
                                <Select


                                    id="backgroundCOlor"
                                    value={formik.values.backgroundColor}
                                    name="backgroundColor"
                                    label="Background Color"
                                    onChange={formik.handleChange}

                                >
                                    <MenuItem value="white">White</MenuItem>
                                    <MenuItem sx={{ color: "aqua" }} value="aqua">Blue</MenuItem>
                                    <MenuItem sx={{ color: "lightcoral" }} value="lightcoral">Red</MenuItem>
                                    <MenuItem sx={{ color: "orange" }} value="orange">Orange</MenuItem>
                                    <MenuItem sx={{ color: "lightgrey" }} value="lightgrey">Grey</MenuItem>
                                    <MenuItem sx={{ color: "lightgreen" }} value="limegreen">Green</MenuItem>
                                    <MenuItem sx={{ color: "rgb(228, 228, 39)" }} value="yellow">Yellow</MenuItem>
                                    <MenuItem sx={{ color: "blueviolet" }} value="blueviolet">Purple</MenuItem>
                                </Select>
                            </FormControl>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEvent} type='submit' variant='contained'>ADD</Button>

                    </DialogActions>
                </form>
            </Dialog>

            <React.Fragment>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={closeDeleteNoteListDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="remove-dialog-title">
                        {"Do you really want to delete this note list ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            All of the notes this note list contained will be deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
                        <Button onClick={removeNoteList} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <React.Fragment>
                <Dialog fullWidth
                    open={renameDialogOpen}
                    onClose={closeRenameNoteListDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="rename-dialog-title">
                        {"Change list name "}
                    </DialogTitle>
                    <form onSubmit={formik2.handleSubmit}>
                        <DialogContent>

                            <TextField type="text" fullWidth id="renamedNoteList" name="renamedNoteList" label="Rename Note List" variant="outlined"
                                onChange={formik2.handleChange} value={formik2.values.renamedNoteList}
                                error={formik.touched.removeNoteList && Boolean(formik.errors.removeNoteList)}
                                helperText={formik.touched.removeNoteList && formik.errors.removeNoteList}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseRename} type='submit' variant='contained' autoFocus>
                                FINISH
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>


        </Grid >

    )
}

export default Notes