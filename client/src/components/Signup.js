import { useRef, useState, useEffect } from "react";
import axios from "../axios.js"
import { Navigate } from 'react-router-dom'
import '../SignupLogin.css'

const REGISTER_URL = '/users/signup'


const NAME_REGEX = /^[A-Za-z]+$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/;

export const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        console.log(result);
        console.log(firstName);
        setValidFirstName(result);
    }, [firstName])

    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        console.log(result);
        console.log(lastName);
        setValidLastName(result);
    }, [lastName])

    useEffect(() => {
        setValidEmail(email ? true : false);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result)
        setValidFirstName(result);
        const match = pwd === matchPwd;
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, pwd, matchPwd])

    // useEffect(() => {
    //     setValidName(USER_REGEX.test(user));
    // }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = NAME_REGEX.test(firstName);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ first_name: firstName, last_name: lastName, email: email, hashed_pw: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data.accessToken;
            console.log(response.data);
            console.log(response.accessToken);

            // clear input fields after submit
            setFirstName("");
            setLastName("");
            setEmail("");
            setPwd("");
            setMatchPwd("")
            setSuccess(true);

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username already associated with an account');
            } else {
                setErrMsg('Registration Unsuccessful')
            }
            errRef.current.focus();
        }
    }


    return (
        <>
            {success ? (
                <Navigate to='/login' replace={true} />
            ) : (
                <div className="signup-container">
                    <div className="RegisterBox">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>

                        <form onSubmit={handleSubmit}>
                            {/* firstname */}
                            <input
                                type="text"
                                id="firstName"
                                ref={userRef}
                                autoComplete="off"
                                placeholder="First Name"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                aria-invalid={validFirstName ? "false" : "true"}
                                aria-describedby="fnnote"
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                            />
                            {/* <p id="fnnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>Must only contain alphabetical letters
                 </p> */}
                            {/* lastname */}
                            <input
                                type="text"
                                id="lastName"
                                ref={userRef}
                                autoComplete="off"
                                placeholder="Last Name"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby="lnnote"
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                            />
                            {/* <p id="lnnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>Must only contain alphabetical letters
                 </p> */}
                            {/* email */}
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                placeholder="Email Address"
                            />
                            {/* <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>Enter a valid email followed by @ to valid hosting address<br /> sample text</p> */}

                            {/* password */}
                            <span className={validPwd ? "valid" : "hide"}>
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>

                            </span>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                placeholder="Password"
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? 'instruction pwdnote' : 'offscreen pwdnote'}>
                                8 to 24 characters
                            </p>
                            <p className="signup-comments">
                                Must include uppercase and lower letters 1 special character and 1 special number
                            </p>

                            {/* confirm password */}
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="form-control form-control-lg"
                                placeholder="Confirm Password"
                            />
                            <p
                                id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                Must match the first password input field.
                            </p>
                            {/* submit button */}

                            <p className="submit-btn" disable={!validFirstName && validEmail && validPwd && validMatch ? true : false}>
                                Start tracking
                            </p>
                            <p className="signup-comments">
                                Already have an account?
                            </p>
                            <p className="signup-comments login-via-signup" onClick={() => setSuccess(true)}>
                                Sign in here!
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

