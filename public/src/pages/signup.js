import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid2, Link, Button, Paper, TextField, Typography } from "@mui/material";


function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();s

    const handleSignup = (e) => {
        e.preventDefault();
        axios.post("https://groceries2backend.onrender.com/signup", { name, email, password })
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
    const paperStyle = { padding: "2rem", margin: "100px auto" };
    const heading = { fontSize: "2.5rem", fontWeight: "600" };
    const row = { display: "flex", marginTop: "2rem" };
    const btnStyle = { marginTop: "2rem", fontSize: "1.2rem", fontWeight: "700", backgroundColor: "blue", borderRadius: "0.5rem" };
    return (
        <div>
            <Grid2 align="center" className="wrapper">
                            <Paper elevation={1} style={paperStyle} sx={{ width: { xs: '80vw', sm: '50vw', md: '40vw', lg: '30vw', xl: '20vw' }, height: { lg: '50vh' } }}>
                                <Typography component="h1" variant="h5" style={heading}>Login</Typography>
                    <form onSubmit={handleSignup}>
                        <span style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} fullWidth type="text" label="Enter Name" name="name" onChange={(e)=>setName(e.target.value)}></span>
                        <span style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} fullWidth label="Email" variant="outlined" type="email" placeholder="Enter Email" name="email" onChange={(e)=>setEmail(e.target.value)}/>                    
                        <span style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} fullWidth label="Password" variant="outlined" type="password" placeholder="Enter Password" name="password" onChange={(e)=>setPassword(e.target.value)} />
                        <Button style={btnStyle} variant="contained" type="submit">SignUp</Button>
                    </form>
                    <p>Already have an account?<Link href="/login"> Login</Link></p>
                </Paper>
            </Grid2>
        </div>
    )
}
export default SignUp;