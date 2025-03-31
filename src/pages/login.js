import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid2, Link, Button, Paper, TextField, Typography, CircularProgress } from "@mui/material";
import Image from "../assets/G.png"
import './login.css'



function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Set to false initially
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true); // Start the spinner
        axios.post('https://groceries2backend.onrender.com/login', { email, password }, { withCredentials: true })
            .then(result => {
                if (result.data === "Success") {
                    axios.get('https://groceries2backend.onrender.com/user', { withCredentials: true })
                        .then(response => {
                            if (response.data.user) {
                                setIsLoggedIn(true);
                                navigate("/home", { state: { user: response.data.user } });
                            }
                        })
                        .finally(() => setLoading(false)); // Stop the spinner
                } else {
                    alert("Login failed");
                    setLoading(false); // Stop the spinner
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Stop the spinner
            });
    };

    const paperStyle = { padding: "2rem", margin: "100px auto" };
    const heading = { fontSize: "2.5rem", fontWeight: "600" };
    const row = { display: "flex", marginTop: "2rem" };
    const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };
    const label = { fontWeight: "700" };

    return (
        <div className="bg-success.bg-gradient login-background"
        >
            
            <Grid2 align="center" className="wrapper">
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <img
                        src={Image} // Replace with your image path
                        alt="Groceries Logo"
                        style={{ maxWidth: '150px' }} // Adjust size as needed
                    />
                </div>
            
            <h1 className='fs-1 font-bold underline ms-2 mt-2 text-success'>Groceries <br/>
            </h1>
            <h2 className='fs-3 font-bold underline ms-2 mt-2 text-white bg-dark'>Plan Better,Eat Better</h2>
            
                <Paper elevation={1} style={paperStyle} sx={{ width: { xs: '80vw', sm: '50vw', md: '40vw', lg: '30vw', xl: '20vw' }, height: { lg: '50vh' } }}>
                    <Typography component="h1" variant="h5" style={heading}>Login</Typography>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <form onSubmit={handleLogin}>
                            <span style={row}>
                                <TextField sx={{ label: { fontWeight: '700', fontSize: "1.3rem" } }} style={label} label="Email" fullWidth variant="outlined" type="email" placeholder="Enter Email" name="email" onChange={(e) => setEmail(e.target.value)} />
                            </span>
                            <span style={row}>
                                <TextField sx={{ label: { fontWeight: '700', fontSize: "1.3rem" } }} label="Password" fullWidth variant="outlined" type="password" placeholder="Enter Password" name="password" onChange={(e) => setPassword(e.target.value)} />
                            </span>
                            <Button style={btnStyle} variant="contained" type="submit">Login</Button>
                        </form>
                    )}
                    <p>Don't have an account? <Link href="/signup">SignUp</Link></p>
                </Paper>
            </Grid2>
        </div>
    );
}

export default Login;
