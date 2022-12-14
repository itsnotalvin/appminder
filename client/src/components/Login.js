import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom'
import '../SignupLogin.css'
import appminder_logo from '../images/appminder_logo.png'

const LOGIN_URL = "/users/session";

export const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [enterVals, setEnterVals] = useState(false);
    const [success, setSuccess] = useState(false);
    const [signupNav, setSignupNav] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get('/users/session')
            .then(res => {
                if (res.status !== 401) {
                    setIsAuthenticated(true);
                }
            })
            .catch(err => { })
    }, []);

    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && pwd) {
            try {
                const response = await axios.post(
                    LOGIN_URL,
                    JSON.stringify({ email: email, password: pwd }),
                    {
                        headers: { "Content-Type": 'application/json' },
                        withCredentials: true,

                    });
                setPwd('');
                setSuccess(true);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg("Sorry! No Server Response");
                } else if (err.response?.status === 400) {
                    setErrMsg("Email or Password is incorrect!");
                } else if (err.response?.status === 401) {
                    setErrMsg("Unauthorized");
                } else {
                    setErrMsg("Login Failed")
                }
                errRef.current.focus();
            }
        }
        else {
            setEnterVals(true);
        }
    }


    return (
        <div className="signup-container">
            {
                signupNav ? <Navigate to='/' replace={true} /> : success ? (
                    <Navigate to='/dashboard' replace={true} />
                ) : (
                    <div className="RegisterBox login">
                        <img src={appminder_logo} id='appminderlogo-landing' />
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} ></p>

                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                className='login-inp'
                                autoComplete="off"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErrMsg("")
                                    setEnterVals(false)
                                }}
                                value={email}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                ref={userRef}
                                className='login-inp'
                                onChange={(e) => {
                                    setPwd(e.target.value)
                                    setErrMsg("")
                                    setEnterVals(false)
                                }}
                                value={pwd}
                                placeholder="Password"
                                required
                            />
                            <div className="signup-comments" style={{ display: errMsg.length ? 'block' : 'none' }}>
                                <p style={{ color: 'red', margin: 0 }}>{errMsg}</p>
                            </div>
                            <div className="signup-comments" style={{ display: enterVals ? 'block' : 'none' }}>
                                <p style={{ color: 'red', margin: 0 }}>Please enter both details</p>
                            </div>
                            <button className="submit-btn" type='submit' onClick={handleSubmit}>Sign In</button>

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