import { useRef, useState, useEffect } from "react";
import axios from "../axios.js";
import { Navigate } from 'react-router-dom'
import '../SignupLogin.css'

const LOGIN_URL = "/users/session";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [signupNav, setSignupNav] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(email, pwd, 'after try')
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email: email, password: pwd }),
                {
                    headers: { "Content-Type": 'application/json' },
                    withCredentials: true,

                });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Email or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed")
            }
            errRef.current.focus();
        }
    }


    return (
        <div className="signup-container">
            {
                signupNav ? <Navigate to='/' replace={true} /> : success ? (
                    <Navigate to='/dashboard' replace={true} />
                ) : (
                    <div className="RegisterBox">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} ></p>

                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                ref={userRef}
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                placeholder="Password"
                                required
                            />
                            <p className="submit-btn" onClick={handleSubmit}>Sign In</p>

                            <p className="signup-comments">
                                Don't have an account?
                            </p>
                            <p className="signup-comments login-via-signup" onClick={() => setSignupNav(true)}>Sign Up</p>
                        </form>
                    </div >
                )
            }
        </div>



    )
}