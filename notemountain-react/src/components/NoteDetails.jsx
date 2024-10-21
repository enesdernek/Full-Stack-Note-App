import { Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getNoteById, removeNote, updateNote } from '../redux/slices/noteSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import * as yup from "yup"
import { useFormik } from "formik"
import { auth } from "../Firebase"

const validationSchema = yup.object({
    header: yup.string("Enter your header").required("Header is required"),
    content: yup.string("Enter your content").required("content is required")
})

function NoteDetails() {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);


    const { id } = useParams()

    const dispatch = useDispatch()

    const note = useSelector((state) => state.note.note)

    const navigate = useNavigate()

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const [open, setOpen] = useState(false)

    const user = auth.currentUser


    useEffect(() => {
        dispatch(getNoteById(id))
    }, [id])

    const closeDeleteNoteDialog = () => {
        setDeleteDialogOpen(false)
    }

    const openDeleteNoteDialog = () => {
        setDeleteDialogOpen(true)
    }

    const deleteNote = () => {
        dispatch(removeNote(id))
        navigate(-1)
    }

    const formik = useFormik({


        initialValues: {
            header: note ? note.header : "",
            content: note ? note.content : "",
            startDate: note ? note.startDate : "",
            backgroundColor: note ? note.backgroundColor : "White",
            userName: user ? user.userName : "",

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            const body = {
                id: id,
                userName: user ? user.userName : "",
                header: values.header,
                content: values.content,
                startDate: new Date(),
                backgroundColor: values.backgroundColor,
                noteList: {
                    noteListId: note.noteList.noteListId
                }
            }
            dispatch(updateNote(body))
            navigate(-1)

        }

    })

    const handleCloseEvent = () => {
        handleClose()
    }

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Grid container sx={{ marginTop: "20px" }}>
            <Grid item xs={12} md={12}>
                {
                    note &&

                    <Card sx={{ width: "100%", backgroundColor: `${note.backgroundColor}` }}>
                        <CardContent>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h4">{note.header}</Typography>
                                <Box>
                                    <IconButton onClick={() => setOpen(true)}>
                                        <EditIcon sx={{ color: "#3d5afe" }} />
                                    </IconButton>
                                    <IconButton onClick={openDeleteNoteDialog}>
                                        <DeleteIcon sx={{ color: "#d32f2f" }} />
                                    </IconButton>

                                </Box>
                            </Box>
                            <Divider />
                            <Typography variant="h5">{note.content}</Typography>
                            <Typography variant="h6">Create Date: {note.startDate}</Typography>
                            <Typography variant="h6">Note List Name: {note.noteList.noteListName}</Typography>
                        </CardContent>

                    </Card>
                }

            </Grid>

            <React.Fragment>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={closeDeleteNoteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="remove-dialog-title">
                        {"Do you really want to delete this note ?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>Disagree</Button>
                        <Button onClick={deleteNote} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Dialog fullWidth
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={handleClose}
            >
                <DialogTitle id="add-note-header">
                    {"Update note"}
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
                                </Select>
                            </FormControl>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEvent} type='submit' variant='contained'>UPDATE</Button>

                    </DialogActions>
                </form>
            </Dialog>
        </Grid>
    )
}

export default NoteDetails