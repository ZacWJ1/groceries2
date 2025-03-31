import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



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
            <div >
                            
                    
                    <p>Already have an account?</p>
                
            </div>
        </div>
    )
}
export default SignUp;