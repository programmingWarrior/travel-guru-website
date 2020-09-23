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

    const handleInputLogin = (eb) => {
        let FormValidLogin = true;
        if (eb.target.name === "email") {
            FormValidLogin = /\S+@\S+/.test(eb.target.value);
        }
        if (eb.target.name === "password") {
            const PasswordValid = eb.target.value.length > 5;
            const PasswordNumberValid = /\d{1}/.test(eb.target.value);
            FormValidLogin = PasswordValid && PasswordNumberValid;
        }
        if (FormValidLogin) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[eb.target.name] = eb.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmitLogin = (eb) => {
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
        eb.preventDefault();
    }
    return (

        <div style={{background: '#F0F0F0',height:'550px' }}>
            <div style={{ width: '30%', margin: '0 auto',paddingTop: '5%'}}>
                <form onSubmit={handleSubmitLogin}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" required name="email" onBlur={handleInputLogin} className="form-control" id="exampleInputEmail1" aria-describedby="EmailHelp" />
                        <small id="EmailHelp" className="form-text text-muted">We'll never share your Email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" required name="password" onBlur={handleInputLogin} className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button style={{ width: '100%' }} type="submit" className="btn btn-primary">Submit</button>
                </form><br />
                <Link to="/SignUp"><h5 style={{ TextAlign: 'center' }}>Sign Up</h5></Link>
                <p style={{ color: 'red' }}>{loggedInUser.error}</p>
                {loggedInUser.successe && <p style={{ color: 'green' }}>Login successefully</p>}
            </div>
        </div>
    );
};

export default Login;