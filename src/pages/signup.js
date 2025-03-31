import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid2, Link, Button, Paper, TextField, Typography } from "@mui/material";
import Image from "../assets/G.png"
import './login.css'


function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post("https://groceries2backend.onrender.com/signup", { name, email, password },
            { 
                withCredentials: true 
            }
        )
            .then(result => {
                if (result.status === 201) {
                    navigate("/login");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    window.alert("Email already exists. Please use a different email.");
                } else {
                    console.log(err);
                }
            });
    };
    const paperStyle = {padding: "2rem", margin: "100px auto", borderRadius:"1rem", boxShadow: "10px 10px 10px"};
    const heading = {fontSize:"2.5rem", fontWeight:"600"}
    const row = {display:"flex", marginTop:"2rem"}
    const btnStyle={marginTop:"2rem", fontSize:"1.2rem", fontWeight:"700", backgroundColor:"blue", borderRadius:"0.5rem"};
    return (
        <div className="login-background">
            
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
            <h2 className='fs-3 font-bold underline ms-2 mt-2 loginht' >Eat Better When You Plan Better</h2>
                <Paper elevation={1} style={paperStyle} sx={{width: {
                    xs: '80vw',     // 0
                    sm: '50vw',     // 600
                    md: '40vw',     // 900
                    lg: '30vw',     // 1200
                    xl: '20vw',     // 1536 
                },
                height:{
                    lg: '60vh',     // 1200px and up
                }}}>
                    <Typography component="h1" variant="h5" style={heading}> Signup </Typography>
                    <form onSubmit={handleSignup}>
                        <TextField style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} fullWidth type="text" label="Enter Name" name="name" onChange={(e)=>setName(e.target.value)}></TextField>
                        <TextField style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} fullWidth label="Email" variant="outlined" type="email" placeholder="Enter Email" name="email" onChange={(e)=>setEmail(e.target.value)}/>                    
                        <TextField style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} fullWidth label="Password" variant="outlined" type="password" placeholder="Enter Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                        <Button style={btnStyle} variant="contained" type="submit">SignUp</Button>
                    </form>
                    <p>Already have an account?<Link href="/login"> Login</Link></p>
                </Paper>
            </Grid2>
        </div>
    )
}
export default SignUp;