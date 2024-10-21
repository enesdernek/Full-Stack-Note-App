import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup"
import { Alert, Box, Button, Checkbox, FormControlLabel, FormHelperText, Grid, IconButton, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import "../style/LogIn.css"
import { useDispatch, useSelector } from 'react-redux';
import { auth } from "../Firebase"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const googleAuthProvider = new GoogleAuthProvider();

const validationSchema = yup.object({
    email: yup.string("Enter your email")
        .required("Email is required")
    ,
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

const validationSchemaForResettingPassword = yup.object({
    email: yup.string("Enter your email")
        .required("Email is required")
})


function LogIn() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = auth.currentUser

    const [open, setOpen] = React.useState(false);

    const [openSb, setOpenSb] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    const handleClickSb = () => {
        setOpenSb(true);
    };

    const handleCloseSb = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSb(false);
    };

    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSb}
            >
            </IconButton>
        </React.Fragment>
    );





    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const registerWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, googleAuthProvider)
            const user = response.user
            if (user) {
                navigate("/")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const resetPasswordFormik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: validationSchemaForResettingPassword,
        onSubmit: async (values) => {
            resetPassword(values.email)

        },
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await signInWithEmailAndPassword(auth, values.email, values.password)
                if (response.user) {
                    navigate("/")
                }
            } catch (error) {
                setErrorMessage(error.message)
                showBadCredentialsAlert()

            }


        },

    })

    const showBadCredentialsAlert = () => {
        const alert = document.querySelector("#errorBadCredentials")
        alert.style.display = "block";
        setTimeout(() => {
            alert.style.display = "none";
        }, 5000);
    }


    const resetPassword = async (email) => {
        try {
            console.log("worked " + email)
            await sendPasswordResetEmail(auth, email)
            handleClose()
            handleClickSb()
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user])

    return (
        <Box >
            <Grid container >
                <Grid item md={3}  >

                </Grid>

                <Grid item xs={11} md={6}>
                    <Box sx={{ marginTop: "20px", backgroundColor: "white", color: "black", width: "100%", padding: "20px", borderRadius: "20px" }}>

                        <Typography sx={{ textAlign: "center", marginBottom: "10px", }} variant="h4" component="h4">
                            Log In To Notemountain
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField sx={{ width: "100%" }} id="email" name='email' label="Email" type="email" value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}

                            />
                            {formik.touched.email && formik.errors.email && (
                                <FormHelperText error>{formik.errors.email}</FormHelperText>
                            )}



                            <TextField sx={{ width: "100%", marginTop: "20px" }} id="password" name='password' label="Password" type="password" value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <FormHelperText error>{formik.errors.password}</FormHelperText>
                            )}
                            <Box>
                                <Alert id="errorBadCredentials" severity="none" color="error" sx={{ marginTop: "10px", display: "none" }} >
                                    <Stack direction="row" >
                                        <ErrorOutlineIcon sx={{ marginRight: "10px", marginBottom: "10px" }} />
                                        <span style={{ fontSize: "16px", paddingTop: "2px" }}>{errorMessage}</span>
                                    </Stack>
                                </Alert>
                            </Box>


                            <Button sx={{ marginTop: "20px" }} type="submit" color="success" variant="contained">Log In</Button>

                            <Button onClick={registerWithGoogle} sx={{ marginTop: "20px", marginLeft: "15px" }} color="error" variant="contained"><GoogleIcon sx={{ marginRight: "5px" }} /> Continue with Google</Button>

                        </form>

                        <Box sx={{ paddingTop: "20px" }} >
                            <Link onClick={handleClickOpen} className='sign-in-navigate-link' style={{ color: "red" }} href="">I forgot my password</Link>
                        </Box>


                        <Box sx={{ paddingTop: "20px" }} >
                            <Link to="/signin" className='sign-in-navigate-link' style={{ color: "blue" }} href="">Don't you have an account ? Click here for sign in</Link>
                        </Box>

                    </Box>
                </Grid>

                <Grid item md={3} xs={1}>

                </Grid>

                <React.Fragment>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle>
                            A password reset email will be send to your email adress
                        </DialogTitle>
                        <form onSubmit={resetPasswordFormik.handleSubmit}>
                            <DialogContent>
                                <TextField fullWidth name="email" id="email" variant="outlined" label="Email" type="email" value={resetPasswordFormik.values.email}
                                    onChange={resetPasswordFormik.handleChange}
                                    error={resetPasswordFormik.touched.email && Boolean(resetPasswordFormik.errors.email)}
                                />
                                {resetPasswordFormik.touched.email && resetPasswordFormik.errors.email && (
                                    <FormHelperText error>{resetPasswordFormik.errors.email}</FormHelperText>
                                )}
                            </DialogContent>
                            <DialogActions>

                                <Button type='submit' variant='contained' color="success" autoFocus>
                                    SEND PASSWORD RESET EMAIL
                                </Button>

                            </DialogActions>
                        </form>
                    </Dialog>
                </React.Fragment>

                <div>

                    <Snackbar
                        open={openSb}
                        autoHideDuration={2000}
                        onClose={handleCloseSb}
                        message="Password Reset Mail Successfully Sent"
                        action={action}
                    />
                </div>

            </Grid>
        </Box >
    )
}

export default LogIn