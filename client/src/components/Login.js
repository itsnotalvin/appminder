import { useRef, useState, useEffect } from "react";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setUser('')
        setPwd('')
        setSuccess(true);
    }


    return (
    <>
        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"></p>
            <p>This is a test sample</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
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
                        <a href="#">Sign Up</a>
                    </span>
                </p>
            </form>
        </div>
    </>
        
        
        
    )
}