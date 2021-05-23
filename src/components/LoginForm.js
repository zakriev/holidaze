import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoginError from "../components/common/LoginError";
import {admin_url} from "../components/settings/contactApi"
import Auth from "../components/context/Auth";


export default function LoginForm() {
	const [submitting, setSubmit] = useState(false);
	const [loginError, setErrorLogin] = useState(null);
	const [identifier, setIndentifer] = useState("");
	const [identifierError, setErrorIdentifier] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const history = useHistory();
	const [auth, setAuth] = useContext(Auth);

	 const onSubmit = (e) => {
		 e.preventDefault();
		 if(!identifier) setErrorIdentifier("Please enter your username");
		 if(!password) setPasswordError("Please enter your password");
		setSubmit(true);
		setErrorLogin(null);
		axios.post(admin_url, {identifier, password}).then((response) => {
			console.log("response", response.data);
			setAuth(response.data);
			history.push("/admin");
		}).catch ((error) => {
			console.log("error", error);
			setErrorLogin(error.toString());
			setSubmit(false);
		}) 
	
	}

	return (
		<div>
    <div className="login-section ">
              <h1>Login to admin page</h1>
			  <span><p>Username: hussainAdmin</p></span>
			  <span><p>Password: Admin123</p></span>
				<div className="login-form-wrapper">
                <form id="login" onSubmit={onSubmit}>
                    {loginError && <LoginError>{loginError}</LoginError>}
                    <fieldset disabled={submitting}>
                        <div className="input-fields">
                            <input id="login-input" name="username" placeholder="Username" onChange={(e) => setIndentifer(e.target.value)} />
                            {identifierError && <LoginError>{identifierError}</LoginError>}
                    	</div>
						<div className="input-fields">
                            <input name="password" id="login-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
                            {passwordError && <LoginError>{passwordError}</LoginError>}
                        </div>
                        <button onClick={(e) => console.log(e)} className="btn-login">{submitting ? "Loading" : "Login"}</button>
                    </fieldset>
                </form>
				</div>
            </div> 
			</div>
		
	);
}
