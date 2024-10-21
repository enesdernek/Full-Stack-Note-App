import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, Grid, Stack, TextField } from '@mui/material'
import React from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PasswordIcon from '@mui/icons-material/Password';
import { useFormik } from 'formik';
import * as yup from "yup"
import { sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { auth } from "../Firebase"
import { useNavigate } from 'react-router-dom';



const validationSchemaDisplayName = yup.object({
    displayName: yup.string("Enter your user name")
        .required("User name is required")
        .min(3, "Your user name length must be more than 2 characters.")
        .max(20, "Your user name can not be more than 20 characters.")
})


const validationSchemaEmail = yup.object({
    verifyPassword: yup.string("Enter your password")
        .required("password verification is required")
    ,
    email: yup.string("Enter your email")
        .required("email is required")
})

function UpdateProfile() {

    const navigate = useNavigate()

    const user = auth.currentUser

    const [openDisplayNameDialog, setOpenDisplayNameDialog] = React.useState(false);

    const handleClickOpenDisplayNameDialog = () => {
        setOpenDisplayNameDialog(true);
    };

    const handleCloseDisplayNameDialog = () => {
        setOpenDisplayNameDialog(false);
    };

    const [openEmailDialog, setOpenEmailDialog] = React.useState(false);

    const handleClickOpenEmailDialog = () => {
        setOpenEmailDialog(true);
    };

    const handleCloseEmailDialog = () => {
        setOpenEmailDialog(false);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const formikEmail = useFormik({
        initialValues: {
            verifyPassword: "",
            email: ""
        },
        validationSchema: validationSchemaEmail,
        onSubmit: async (values) => {

            if (user) {

                try {
                    await signInWithEmailAndPassword(auth, user.email, values.verifyPassword)

                    try {
                        await updateEmail(user, values.email)
                        await signOut(auth)
                        navigate("/login")
                    } catch (error) {
                        console.log(error.message);
                    }
                } catch (error) {
                    console.log(error.message)
                }


            }

        }
    })

    const formikPassword = () => {

    }

    const handlePasswordChange = async () => {
        if (user) {
            try {
                await sendPasswordResetEmail(auth, user.email)
                handleClickOpen()
            } catch (error) {
                console.log(error.message)
            }
        }

    }



    const formikDisplayName = useFormik({
        initialValues: {
            displayName: ""
        },
        validationSchema: validationSchemaDisplayName,
        onSubmit: async (values) => {
            try {
                if (auth.currentUser) {
                    await updateEmail(auth.currentUser, values.email)

                    handleCloseDisplayNameDialog(); // Close the dialog
                } else {
                    console.log("No user is signed in.");
                }
            } catch (error) {
                console.log(error.message);
            }

        }
    })


    return (
        <Grid container sx={{ marginTop: "20px" }}>
            <Grid item md={3} xs={0}>

            </Grid>

            <Grid item md={6} xs={12}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ padding: "10px" }}>
                    <Button onClick={handleClickOpenDisplayNameDialog} sx={{ height: "300px", fontSize: "20px" }} fullWidth variant="contained" color="primary">
                        <DriveFileRenameOutlineIcon sx={{ fontSize: "50px" }} />
                        Change Display Name</Button>
                    <Button onClick={handleClickOpenEmailDialog} sx={{ height: "300px", fontSize: "20px" }} fullWidth variant="contained" color="error">
                        <ContactMailIcon sx={{ fontSize: "50px" }} />
                        Change Email Adress</Button>
                    <Button onClick={handlePasswordChange} sx={{ height: "300px", fontSize: "20px" }} fullWidth variant="contained" color="secondary">
                        <PasswordIcon sx={{ fontSize: "50px" }} />
                        Change The Password</Button>
                </Stack>
            </Grid>

            <Grid item md={3} xs={0}>

            </Grid>

            <React.Fragment>
                <Dialog
                    open={openDisplayNameDialog}
                    onClose={handleCloseDisplayNameDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Enter your new display name"}
                    </DialogTitle>
                    <form onSubmit={formikDisplayName.handleSubmit}>
                        <DialogContent>
                            <TextField fullWidth type="text" id="displayName" name="displayName" value={formikDisplayName.values.displayName}
                                onChange={formikDisplayName.handleChange} error={formikDisplayName.touched.displayName && Boolean(formikDisplayName.errors.displayName)}
                            />
                            {formikDisplayName.touched.displayName && formikDisplayName.errors.displayName && (
                                <FormHelperText error>{formikDisplayName.errors.displayName}</FormHelperText>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>


            <React.Fragment>
                <Dialog
                    open={openEmailDialog}
                    onClose={handleCloseEmailDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Change email adress"}
                    </DialogTitle>
                    <form onSubmit={formikEmail.handleSubmit}>
                        <DialogContent>
                            <TextField fullWidth type="verifyPassword" id="verifyPassword" name="verifyPassword" label="password" value={formikEmail.values.verifyPassword}
                                onChange={formikEmail.handleChange} error={formikEmail.touched.email && Boolean(formikEmail.errors.email)}
                            />
                            {formikEmail.touched.verifyPassword && formikEmail.errors.verifyPassword && (
                                <FormHelperText error>{formikEmail.errors.verifyPassword}</FormHelperText>
                            )}
                        </DialogContent>
                        <DialogContent>
                            <TextField fullWidth type="email" id="email" name="email" label="New email adress" value={formikEmail.values.email}
                                onChange={formikEmail.handleChange} error={formikEmail.touched.email && Boolean(formikEmail.errors.email)}
                            />
                            {formikEmail.touched.email && formikEmail.errors.email && (
                                <FormHelperText error>{formikEmail.errors.email}</FormHelperText>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>

            <React.Fragment>

                <Dialog
                    open={open}

                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"A password change email sent."}</DialogTitle>


                    <DialogActions>

                        <Button onClick={handleClose}>OK</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>


        </Grid>
    )
}

export default UpdateProfile