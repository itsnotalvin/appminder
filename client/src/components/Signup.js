import { useRef, useState, useEffect } from "react";
import axios from "../axios.js"

const REGISTER_URL = '/signup'


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

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
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(user);
        console.log(result);
        console.log(pwd);
        setValidPwd(result)
        setValidName(result);
        const match = pwd === matchPwd;
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    // useEffect(() => {
    //     setValidName(USER_REGEX.test(user));
    // }, [user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        // console.log(user, pwd);
        // setSuccess(true);
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.accessToken);
            setSuccess(true);
            // clear input fields after submit
        } catch (err) {
            if(!err?.response) {
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
            <section>
                <h1>Success!</h1>
            </section>
        ) : (

        <div>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                {/* username */}
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                 />
                 <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>4 to 24 characters <br /> sample text</p>

                 {/* password */}
                 <label htmlFor="password">
                     Password
                     <span className={validPwd ? "valid" : "hide" }>
                     </span>
                     <span className={validPwd || !pwd ? "hide" : "invalid"}>

                     </span>
                 </label>
                 <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                 />
                 <p id="pwdnote" className={pwdFocus && !validPwd ? "instruction" : "offscreen"}>
                     8 to 24 characters
                     Must include uppercase and lower letters
                 </p>

                {/* confirm password */}
                <label htmlFor="confirm_pwd">Confirm Password:</label>
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
                  placeholder="Enter a confirm password"
                />
                <p
                  id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                  Must match the first password input field.
                </p>

                {/* submit button */}
                <button disable={!validName || !validPwd || !validMatch ? true : false}>
                  Start tracking
                </button>
                <p>
                    Already have an account? < br/>
                    Sign in here!
                </p>

                
            </form>
        </div>
        )}
        </>
    )
}

