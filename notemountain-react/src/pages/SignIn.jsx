import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup"
import { Alert, Box, Button, Checkbox, FormControlLabel, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import "../style/LogIn.css"
import { Link } from "react-router-dom"
import { auth } from "../Firebase"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const validationSchema = yup.object({
    displayName: yup.string("Enter your user name")
        .required("User name is required")
        .min(3, "Your user name length must be more than 2 characters.")
        .max(20, "Your user name can not be more than 20 characters.")
    ,
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    passwordCheck: yup
        .string("Confirm your password").required("You have to confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    termConfirm: yup
        .boolean()
        .oneOf([true], "You must accept our terms.")
});


function SıgnIn() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const user = auth.currentUser


    const formik = useFormik({
        initialValues: {
            displayName: "",
            email: "",
            password: "",
            passwordCheck: "",
            termConfirm: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
                const user = response.user

                if (user) {
                    try {
                        await updateProfile(user, {
                            displayName: values.displayName
                        })
                    } catch (error) {
                        console.log(error.message)
                    }
                }

                navigate("/")

            } catch (error) {
                console.log(error.message)
            }

        },

    })

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
                            Sign In To Notemountain
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField sx={{ width: "100%" }} id="displayName" name='displayName' label="Display Name" type="text" value={formik.values.displayName}
                                onChange={formik.handleChange}
                                error={formik.touched.displayName && Boolean(formik.errors.displayName)}

                            />
                            {formik.touched.displayName && formik.errors.displayName && (
                                <FormHelperText error>{formik.errors.displayName}</FormHelperText>
                            )}

                            <TextField sx={{ width: "100%", marginTop: "20px" }} id="email" name='email' label="Email" type="email" value={formik.values.email}
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

                            <TextField sx={{ width: "100%", marginTop: "20px" }} id="passwordCheck" name='passwordCheck' label="Password Again" type="password" value={formik.values.passwordCheck} onChange={formik.handleChange} error={formik.touched.passwordCheck && Boolean(formik.errors.passwordCheck)}
                            />
                            {formik.touched.passwordCheck && formik.errors.passwordCheck && (
                                <FormHelperText error>{formik.errors.passwordCheck}</FormHelperText>
                            )}

                            <FormControlLabel sx={{ marginTop: "20px", display: "block" }} control={<Checkbox id="termConfirm" name='termConfirm' checked={formik.values.termConfirm}
                                onChange={formik.handleChange}

                            />} label="I accept the terms." />
                            {formik.touched.termConfirm && formik.errors.termConfirm && (
                                <FormHelperText error>{formik.errors.termConfirm}</FormHelperText>
                            )}
                            <Button type="submit" color="success" variant="contained">Sign In</Button>

                        </form>
                        <Box sx={{ paddingTop: "20px" }} >
                            <Link to="/login" className='log-in-navigate-link' style={{ color: "blue" }} href="">Do you have an account ? Click here for log in</Link>
                        </Box>
                    </Box>
                </Grid>

                <Grid item md={3} xs={1}>

                </Grid>

            </Grid>
        </Box>
    )
}

export default SıgnIn