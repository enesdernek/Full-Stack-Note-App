import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import "../style/navi.css"

import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../redux/slices/appSlice';
import { Avatar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from "../Firebase"
import { signOut } from 'firebase/auth';
import { AccountCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import FilterHdrIcon from '@mui/icons-material/FilterHdr';







function Navi() {

    const user = auth.currentUser

    const [currentUser, setCurrentUser] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch()

    const darkTheme = useSelector((state) => state.app.darkTheme)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);



    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            borderRadius: 20 / 2,
        },
    }));

    const navigateToMyAccountPage = () => {
        if (user) {
            navigate("/accountdetails")
            handleClose()
        }
    }



    useEffect(() => {
        const appbar = document.querySelector(".appbar")
        const htmlElement = document.documentElement;

        if (darkTheme) {
            appbar.classList.add("appbar-dark")
            appbar.classList.remove("appbar-light")
            htmlElement.style.backgroundColor = "#1F1F1F"
        } else {
            appbar.classList.remove("appbar-dark")
            appbar.classList.add("appbar-light")
            htmlElement.style.backgroundColor = "white"
        }
    }, [darkTheme])

    const handleChangeTheme = () => {
        dispatch(changeTheme())
    }

    const navigate = useNavigate()

    const navigateToSignInPage = () => {
        navigate("/login")
    }

    const navigateToMainPage = () => [
        navigate("/")
    ]

    const userLogOut = async () => {
        try {
            await auth.signOut()

            navigate("/login")

        } catch (error) {
            console.log(error.message)
        }
        handleClose()

    }

    const navigateToManageNotesPage = () => {
        handleClose()
        navigate("/managenotes")
    }



    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="appbar appbar-light" position="static">
                <Container maxWidth="xl">
                    <Toolbar >
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={navigateToMainPage}
                        >
                            <FilterHdrIcon />
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <span onClick={navigateToMainPage} className="main-header-text">Notemountain</span>
                        </Typography>

                        {
                            user ?

                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={navigateToMyAccountPage}><AccountBoxIcon sx={{ marginRight: "5px" }} />My Account</MenuItem>
                                        <MenuItem onClick={navigateToManageNotesPage}><SettingsApplicationsIcon sx={{ marginRight: "5px" }} /> Manage Notes</MenuItem>
                                        <MenuItem onClick={userLogOut}><LogoutIcon sx={{ marginRight: "5px" }} />Log Out</MenuItem>
                                    </Menu>
                                </div>

                                :

                                <Button onClick={navigateToSignInPage} sx={{ marginRight: "10px" }} color="inherit">Login</Button>

                        }


                        <FormGroup>
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }} checked={darkTheme} onChange={handleChangeTheme} />}

                            />
                        </FormGroup>


                    </Toolbar>
                </Container >
            </AppBar>

        </Box>


    )
}

export default Navi