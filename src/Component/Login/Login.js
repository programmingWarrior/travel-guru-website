import React, { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import * as firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathName: "/" } };

    const handleInputLogin = (event) => {
        let FormValidLogin = true;
        if (event.target.name === "email") {
            FormValidLogin = /\S+@\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const PasswordValid = event.target.value.length > 5;
            const PasswordNumberValid = /\d{1}/.test(event.target.value);
            FormValidLogin = PasswordValid && PasswordNumberValid;
        }
        if (FormValidLogin) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[event.target.name] = event.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmitLogin = (event) => {
        if (loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(response => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = "";
                    newUserInfo.successe = true;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(function (error) {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    console.log(error.message);
                    newUserInfo.successe = false;
                    setLoggedInUser(newUserInfo)
                });

        }
        event.preventDefault();
    }
    return (

        <div style={{height:'550px' }}>
            <div style={{ background: '#F0F0F0',width: '40%', margin: '0 auto',paddingTop: '5%',padding:'20px', border:'2px solid tomato',marginTop:'70px' }}>
                <form onSubmit={handleSubmitLogin}>
                    <div className="form-group">
                        <label for="exampleInputEmail1"><b>Email address</b></label>
                        <input type="email" required name="email" onBlur={handleInputLogin} className="form-control" id="exampleInputEmail1" aria-describedby="EmailHelp" />
                        <small id="EmailHelp" className="form-text text-muted">required.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1"><b>Password</b></label>
                        <input type="password" required name="password" onBlur={handleInputLogin} className="form-control" id="exampleInputPassword1" />
                        <small id="EmailHelp" className="form-text text-muted">required.</small>
                    </div>

                    <button style={{ width: '100%' }} type="submit" className="btn btn-warning"><b>Submit</b></button>
                </form><br />
                <Link style={{textDecoration: 'none'}} to="/SignUp"><h5 style={{ TextAlign: 'center', }}> <small style={{color:'blue'}}>Create an account in this website</small> </h5></Link>
                <p style={{ color: 'red' }}>{loggedInUser.error}</p>
                {loggedInUser.successe && <p style={{ color: 'green' }}>Login successefully</p>}
            </div>
        </div>
    );
};

export default Login;