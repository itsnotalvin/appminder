import { useRef, useState, useEffect } from "react";
import axios from "axios"
import { Navigate } from 'react-router-dom'
import '../SignupLogin.css'

const REGISTER_URL = '/users/signup'

const NAME_REGEX = /^[A-Za-z]+$/;

export const Signup = () => {
    const pwdInput = useRef(null);
    const retypedPwdInput = useRef(null);
    const lc = useRef(null);
    const uc = useRef(null);
    const dig = useRef(null);
    const spec = useRef(null);
    const minLength = useRef(null);
    const signupBtnRef = useRef(null);
    const [allValid, setAllValid] = useState(false);
    let password, retypedPassword, signupBtn, checkLcLi, checkUcLi, checkDigLi, checkSpecLi, checkLenLi;

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get('/users/session')
            .then(res => {
                if (res.status !== 401) {
                    setIsAuthenticated(true);
                }
            })
            .catch()
        userRef.current.focus();
        password = pwdInput.current;
        retypedPassword = retypedPwdInput.current;
        checkLcLi = lc.current;
        checkUcLi = uc.current;
        checkDigLi = dig.current;
        checkSpecLi = spec.current;
        checkLenLi = minLength.current;
        signupBtn = signupBtnRef.current;
        signupBtn.classList.add('disabled');
        [password, retypedPassword].forEach((element) => {
            element.addEventListener('input', validityChecks);
        });
    }, []);

    function changeSubmitBtn(btn, bool) {
        if (!bool) {
            btn.classList.add('disabled');
            setAllValid(false);
        }
        else {
            btn.classList.remove('disabled');
            setAllValid(true);
        }
    }

    function validityChecks() {
        passwordValidityChecker();
        if (password.value !== retypedPassword.value) {
            changeSubmitBtn(signupBtn, false);
        }
        else {
            passwordValidityChecker();
        }
    }

    function passwordValidityChecker() {
        changeSubmitBtn(signupBtn, true);
        if (!checkLc(password.value)) {
            changeSubmitBtn(signupBtn, true);
            checkLcLi.classList.remove('list-items');
        }
        else {
            checkLcLi.classList.add('list-items');
        }
        if (!checkUc(password.value)) {
            changeSubmitBtn(signupBtn, true);
            checkUcLi.classList.remove('list-items');
        }
        else {
            checkUcLi.classList.add('list-items');
        }
        if (!checkSpec(password.value)) {
            changeSubmitBtn(signupBtn, true);
            checkSpecLi.classList.remove('list-items');
        }
        else {
            checkSpecLi.classList.add('list-items');
        }
        if (!checkDig(password.value)) {
            changeSubmitBtn(signupBtn, true);
            checkDigLi.classList.remove('list-items');
        }
        else {
            checkDigLi.classList.add('list-items');
        }
        if (!checkLen(password.value)) {
            changeSubmitBtn(signupBtn, true);
            checkLenLi.classList.remove('list-items');
        }
        else {
            checkLenLi.classList.add('list-items');
        }
    }

    function checkLc(password) {
        if (/(?=.*[a-z])/.test(password)) {
            return true
        }
        else {
            return false
        }
    }

    function checkUc(password) {
        if (/(?=.*[A-Z])/.test(password)) {
            return true
        }
        else {
            return false
        }
    }

    function checkDig(password) {
        if (/(?=.*\d)/.test(password)) {
            return true
        }
        else {
            return false
        }
    }

    function checkSpec(password) {
        if (/(?=.*[-+_!@#$%^&*.,?])/.test(password)) {
            return true
        }
        else {
            return false
        }
    }

    function checkLen(password) {
        if (password.length >= 8) {
            return true
        }
        else {
            return false
        }
    }

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
    const [storedEmail, setStoredEmail] = useState('');


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [validInputs, setValidInputs] = useState(true);

    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName])

    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName])

    useEffect(() => {
        setValidEmail(email ? true : false);
    }, [email])

    useEffect(() => {
        if (success === true) {
            axios.post('/email/send', ({
                email: storedEmail
            }))
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
    }, [success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validFirstName && validLastName && validEmail && allValid) {
            try {
                const response = await axios.post(REGISTER_URL,
                    JSON.stringify({ first_name: firstName, last_name: lastName, email: email, hashed_pw: pwd }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
                // set stored email so email can be sent
                setStoredEmail(email);

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
                } else if (err.response.status === 400) {
                    setErrMsg(err.response.data.message);
                } else {
                    setErrMsg('Registration Unsuccessful')
                }
                errRef.current.focus();
            }
        }
        else {
            setValidInputs(false);
        }
    }

    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    return (
        <>
            {success ?
                <Navigate to='/login' replace={true} /> :
                <div className="signup-container">
                    <div className="RegisterBox">
                        <h1>Register</h1>

                        <form onSubmit={handleSubmit}>
                            {/* firstname */}
                            <input
                                type="text"
                                id="firstName"
                                ref={userRef}
                                autoComplete="off"
                                placeholder="First Name"
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    setValidInputs(true)
                                    setErrMsg("")
                                }
                                }
                                required
                                aria-invalid={validFirstName ? "false" : "true"}
                                aria-describedby="fnnote"
                                onFocus={() => {
                                    setFirstNameFocus(true)
                                }}
                                onBlur={() => setFirstNameFocus(false)}
                            />
                            {/* lastname */}
                            <input
                                type="text"
                                id="lastName"
                                ref={userRef}
                                autoComplete="off"
                                placeholder="Last Name"
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    setValidInputs(true)
                                    setErrMsg("")
                                }}
                                required
                                aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby="lnnote"
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                            />
                            {/* email */}
                            <input
                                type="text"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setValidInputs(true)
                                    setErrMsg("")
                                }}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="emailnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                placeholder="Email Address"
                            />

                            {/* password */}
                            <span className={validPwd ? "valid" : "hide"}>
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>

                            </span>
                            <input
                                type="password"
                                ref={pwdInput}
                                id="password"
                                onChange={(e) => {
                                    setPwd(e.target.value)
                                    setValidInputs(true)
                                    setErrMsg("")
                                }}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                placeholder="Password"
                            />
                            <div className="signup-comments pwd-pointers">
                                <ul className="pointers-pw">
                                    <li id="lc" ref={lc}> Atleast one lowercase character</li>
                                    <li id="uc" ref={uc}> Atleast one uppercase character</li>
                                    <li id="dig" ref={dig}> Atleast one number</li>
                                    <li id="spec" ref={spec}> Atleast one special character</li>
                                    <li id="eight" ref={minLength}> Atleast eight characters</li>
                                </ul>
                            </div>

                            <div className={validInputs ? "signup-comments" : "signup-comments invalid-input"} style={{ display: validInputs ? 'none' : 'block', margin: 0 }}>
                                <p style={{ color: 'red' }}>Enter all fields please!</p>
                            </div>

                            <div className="signup-comments" style={{ display: errMsg.length === 0 ? 'none' : 'block', margin: 0 }}>
                                <p style={{ color: 'red' }}>{errMsg}</p>
                            </div>

                            {/* confirm password */}
                            <input
                                type="password"
                                id="confirm_pwd"
                                ref={retypedPwdInput}
                                onChange={(e) => {
                                    setMatchPwd(e.target.value)
                                    setValidInputs(true)
                                    setErrMsg("")
                                }}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="form-control form-control-lg"
                                placeholder="Confirm Password"
                            />
                            {/* submit button */}

                            <p className={validInputs ? "submit-btn" : "submit-btn invalid-input disabled"} role="submit-btn" onClick={handleSubmit} ref={signupBtnRef}>
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
            }
        </>
    )
}

