import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from "../Firebase"

function HomePage() {

    const user = auth.currentUser

    const [currentUser, setCurrentUser] = useState(null);

    const darkTheme = useSelector((state) => state.app.darkTheme)

    useEffect(() => {
        const welcomeText = document.querySelector(".welcome-text")
        if (welcomeText) {
            if (darkTheme) {
                welcomeText.style.color = "white"
            } else {
                welcomeText.style.color = "black"
            }
        }

    }, [darkTheme])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Grid container sx={{ marginTop: "20px", position: "relative" }}>
            <Grid item xs={12} md={12}>

                {
                    user ?
                        darkTheme ? <>
                            <img style={{ width: "100%", borderRadius: "16px" }} src="/src/images/main_dark.jpg" alt="İmage not found" />
                            <div
                                style={{
                                    position: "absolute",
                                    top: "25%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "white",
                                    fontSize: "36px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                                }}
                            >
                                <span className='welcome-text'>  Welcome {user.displayName}</span>
                            </div>
                        </>
                            :
                            <>
                                <img style={{ width: "100%", borderRadius: "16px" }} src="/src/images/main_light.jpg" alt="İmage not found" />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "25%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "white",
                                        fontSize: "36px",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
                                    }}
                                >
                                    <span className='welcome-text'> Welcome {user.displayName}</span>
                                </div>
                            </>
                        :
                        <></>

                }



            </Grid>
        </Grid>
    )
}

export default HomePage