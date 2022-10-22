import { useRef, useState, useEffect } from "react";
import axios from "../axios.js";
// import { Link } from "react-router-dom";

const LOGIN_URL = "/users/session";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log(email,pwd, 'after try')
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({email: email, password: pwd}),
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
    <>
        { success ? (
            <section>
                <h1> Welcome back to Appminder</h1>
                <br />
                <p>
                    <a href='#'>Get Started</a>
                </p>
            </section>
        ) : (
            <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} ></p>
            <p>This is a test sample</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                < br/>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    ref={userRef}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                < br />
                <button>Sign In</button>

                <p>
                    Don't have an account? < br/>
                    <span>
                        { /*insert route */}
                        {/* <Link to="/signup">Sign Up</Link> */}
                        <a href='#'>Sign Up</a>
                    </span>
                </p>
            </form>
        </div>

        )
        }
        
    </>
        
        
        
    )
}