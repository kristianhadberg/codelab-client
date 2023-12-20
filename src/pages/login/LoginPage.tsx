import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/auth";
import { useAppDispatch } from "../../app/hooks";
import { withEmotionCache } from "@emotion/react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
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

        const loginSuccess = await dispatch(login(username, password));

        if (loginSuccess) {
            navigate("/topics");
        } else {
            setUsernameError(true);
            setPasswordError(true);
        }
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
                <form style={{ display: "flex", justifyContent: "center", width: "100%" }} onSubmit={handleSubmit}>
                    <FormControl style={{ width: "50%" }}>
                        <TextField style={textFieldStyles} inputRef={usernameRef} id="username" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)} required error={usernameError} />
                        <TextField style={textFieldStyles} id="password" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} required error={passwordError} />
                        <Button variant="outlined" style={{ color: "black", backgroundColor: "white", border: "none", height: "50px" }} type="submit">
                            Login
                        </Button>
                        <p style={{ fontWeight: "200" }}>
                            Don't have an account? Sign up&nbsp;
                            <Link style={{ fontWeight: "bold" }} to="/register">
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
