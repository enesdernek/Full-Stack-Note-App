import { Box, Button, Card, CardActions, CardContent, Container, Divider, Grid, IconButton, Snackbar, Stack, Typography } from '@mui/material'
import React from 'react'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useDispatch } from 'react-redux';
import { auth } from "../Firebase"
import { deleteAllByDisplayName } from '../redux/slices/noteSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteAllNoteListsByDisplayName } from '../redux/slices/noteListSlice';

function ManageNotes() {

    const dispatch = useDispatch()

    const user = auth.currentUser

    const [open, setOpen] = React.useState(false);

    const [open2, setOpen2] = React.useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"

            >

            </IconButton>
        </React.Fragment>
    );

    const handleClick = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const removeAllNotes = () => {
        if (user) {
            dispatch(deleteAllByDisplayName(user.displayName))
            handleClick()
            handleClose()
        }

    }

    const removeAllNoteLists = () => {
        if (user) {
            dispatch(deleteAllNoteListsByDisplayName(user.displayName))
            handleClick()
            handleClose2()
        }
    }



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };


    return (
        <Grid container sx={{ marginTop: "20px", paddingX: "20px" }}>
            <Grid item md={2} xs={0}>

            </Grid>

            <Grid item md={8} xs={12} >

                <div>
                    <Stack
                        direction={{ xs: 'column', md: 'row', sm: "column" }}

                        spacing={{ xs: 6, sm: 6, md: 3 }}
                    >
                        <Button onClick={handleClickOpen} color="error" sx={{ height: "300px", fontSize: "30px" }} fullWidth variant='contained'><DeleteSweepIcon sx={{ fontSize: "100px" }} />DELETE ALL NOTES</Button>
                        <Button onClick={handleClickOpen2} color="error" sx={{ height: "300px ", fontSize: "30px" }} fullWidth variant='contained'><PlaylistRemoveIcon sx={{ fontSize: "100px" }} /> DELETE ALL NOTE LISTS</Button>

                    </Stack>
                </div>

            </Grid>






            <Grid item md={2} xs={0}>

            </Grid>

            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"All of the notes will be deleted. Are you sure ?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button color="error" variant='contained' onClick={handleClose}>Disagree</Button>
                        <Button onClick={removeAllNotes} color="success" variant='contained' autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <React.Fragment>
                <Dialog
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"All of the note lists and notes will be deleted. Are you sure ?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button color="error" variant='contained' onClick={handleClose2}>Disagree</Button>
                        <Button onClick={removeAllNoteLists} color="success" variant='contained' autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackBar}
                message="Process Successfull"
                action={action}
            />

        </Grid >
    )
}

export default ManageNotes