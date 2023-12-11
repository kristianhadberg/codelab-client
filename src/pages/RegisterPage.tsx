import { Button, FormControl, TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/auth/auth";
import { useAppDispatch } from "../app/hooks";
export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registerSuccess = await dispatch(register(username, firstName, lastName, password));

        if (registerSuccess) {
            navigate("/topics");
        }
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
                <form style={{ display: "flex", justifyContent: "center", width: "100%" }} onSubmit={handleSubmit}>
                    <FormControl style={{ width: "50%" }}>
                        <TextField style={textFieldStyles} inputRef={usernameRef} id="username" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} required />
                        <TextField style={textFieldStyles} id="firstname" label="First name" variant="outlined" onChange={(e) => setFirstName(e.target.value)} required />
                        <TextField style={textFieldStyles} id="lastname" label="Last name" variant="outlined" onChange={(e) => setLastName(e.target.value)} required />
                        <TextField style={textFieldStyles} id="password" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} required />
                        <Button variant="outlined" style={{ color: "black", backgroundColor: "white", border: "none", height: "50px" }} type="submit">
                            Register
                        </Button>
                        <p style={{ fontWeight: "200" }}>
                            Already have an account? Log in&nbsp;
                            <Link style={{ fontWeight: "bold" }} to="/login">
                                here
                            </Link>
                        </p>
                    </FormControl>
                </form>
            </div>
        </>
    );
}

const textFieldStyles = {
    backgroundColor: "#34444D",
    borderRadius: "5px",
    marginBottom: "20px",
    color: "#fffff",
};
