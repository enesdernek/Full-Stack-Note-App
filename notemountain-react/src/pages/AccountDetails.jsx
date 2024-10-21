import { Box, Button, Card, Grid, IconButton, Link, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { auth } from "../Firebase"
import { useNavigate } from 'react-router-dom';
import { deleteUser, sendEmailVerification } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { deleteAllNoteListsByDisplayName } from '../redux/slices/noteListSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import DoneIcon from '@mui/icons-material/Done';
import GoogleIcon from '@mui/icons-material/Google';
import { Google } from '@mui/icons-material';



function AccountDetails() {

    const [open, setOpen] = React.useState(false);

    const [currentUser, setCurrentUser] = useState(null);


    const user = auth.currentUser

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [openVarification, setOpenVarification] = React.useState(false);

    const handleClickOpenVarification = () => {
        setOpenVarification(true);
    };

    const handleCloseVarification = () => {
        setOpenVarification(false);
    };



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAccountAlertDialog = () => {
        handleClickOpen()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);


    const deleteAccount = async () => {
        if (user) {
            try {
                deleteUserDatas()
                await deleteUser(user)
                handleClose()
                navigate("/login")
            } catch (error) {
                console.log(error.message)
            }
        }
    }


    const deleteUserDatas = () => {
        if (user) {
            dispatch(deleteAllNoteListsByDisplayName(user.displayName))
        }
    }

    const verifyEmail = async () => {
        try {
            await sendEmailVerification(auth.currentUser)
            handleClickOpenVarification()
        } catch (error) {
            console.log(error.message)
        }
    }





    return (
        <Grid container sx={{ marginTop: "20px", paddingX: "20px" }}>
            <Grid item md={2} xs={0}>

            </Grid>

            <Grid item md={8} xs={12} >

                {
                    user &&
                    <Card sx={{ fontSize: "30px", backgroundColor: "orange" }} fullWidth variant='contained'>
                        <Box sx={{ width: '100%', bgcolor: 'orange' }}>
                            <nav aria-label="main mailbox folders">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <BadgeIcon />
                                                <span style={{ fontSize: "20px", marginLeft: "10px", marginRight: "10px" }}>Display Name:</span>
                                            </ListItemIcon>
                                            <ListItemText primary={user.displayName} />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <EmailIcon />
                                                <span style={{ fontSize: "20px", marginLeft: "10px", marginRight: "10px" }}>Email:</span>
                                            </ListItemIcon>
                                            <ListItemText primary={user.email} />
                                            {
                                                user && user.providerData[0].providerId === "google.com"

                                                    ?
                                                    <>
                                                        <GoogleIcon sx={{ color: "red", marginRight: "5px" }} />

                                                        <span style={{ fontSize: "20px" }}>Google Account</span>
                                                    </>
                                                    :
                                                    user && user.emailVerified ? <> <DoneIcon sx={{ color: "green" }} />


                                                        <span style={{ fontSize: "20px" }}>Email Verified</span> </>
                                                        :
                                                        <Link onClick={verifyEmail} sx={{ fontSize: "20px" }} >Verify Email</Link>
                                            }


                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </nav>

                        </Box>

                    </Card>
                }

                <div style={{ marginTop: "20px" }}>
                    <Stack
                        direction={{ xs: 'column', md: 'row', sm: "column" }}

                        spacing={{ xs: 6, sm: 6, md: 3 }}
                    >
                        {
                            user && user.providerData[0].providerId === "google.com" ? <></>
                                :
                                <Button onClick={() => navigate("/updateprofile")} color="primary" sx={{ height: "300px", fontSize: "30px" }} fullWidth variant='contained'>
                                    <ManageAccountsIcon sx={{ fontSize: "100px" }} />
                                    UPDATE PROFILE</Button>

                        }

                        <Button onClick={deleteAccountAlertDialog} color="error" sx={{ height: "300px ", fontSize: "30px" }} fullWidth variant='contained'>
                            <PersonRemoveIcon sx={{ fontSize: "100px" }} />
                            DELETE ACCOUNT</Button>

                    </Stack>
                </div>

            </Grid>

            <React.Fragment>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Your account and all of the notes that you have will be deleted. Are you sure ?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button variant='contained' color="error" onClick={handleClose}>Disagree</Button>
                        <Button variant='contained' color="success" onClick={deleteAccount} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <React.Fragment>
                <Dialog
                    open={openVarification}
                    onClose={handleCloseVarification}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Varification email sent."}
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={handleCloseVarification} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

        </Grid>
    )
}

export default AccountDetails