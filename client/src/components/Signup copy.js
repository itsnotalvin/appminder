import { useRef, useState, useEffect } from "react";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

export const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [email] = useState('');
    const [lastName] = useState('');

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
            
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>
                {/* email */}
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={email}
                    required
                />
                < br/>
                {/* first name */}
                <label htmlFor="firstName">First Name:</label>
                <input 
                    type="text" 
                    id="firstName"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                {/* last name */}
                 <label htmlFor="email">Last Name:</label>
                <input 
                    type="text" 
                    id="lastName"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={lastName}
                    required
                />
                {/* password */}
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
                    Already have an account? < br/>
                    <span>
                        { /*insert route */}
                        <a href="#">Sign In</a>
                    </span>
                </p>
            </form>

        </div>
        </>
        
    )
}