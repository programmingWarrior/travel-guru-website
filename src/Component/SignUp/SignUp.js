import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';



const SignUp = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    //firebase ------->
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    const FacebookProvider = new firebase.auth.FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(GoogleProvider).then(function (result) {
            var { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            history.replace(from);
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }
    //handleGoogleSignIn end --->

    //handleFacebookSignIn start --->
    const handleFacebookSignIn = () => {
        firebase.auth().signInWithPopup(FacebookProvider).then(function (result) {
            var { displayName, email } = result.user;
            const signedInUser = { name: displayName, email }
            setLoggedInUser(signedInUser);
            history.replace(from);

            // ...
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    //firebase end ----------->



    const handleInput = (e) => {
        let FormValid = true;
        if (e.target.name === "email") {
            FormValid = /\S+@\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {

            const PasswordValid = e.target.value.length > 5;
            const PasswordNumberValid = /\d{1}/.test(e.target.value);
            FormValid = PasswordValid && PasswordNumberValid;

        }
        if (FormValid) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[e.target.name] = e.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        // console.log(loggedInUser)
        if (loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(response => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    updateUserName(loggedInUser.name)
                    history.replace(from);
                    console.log(response)
                })
                .catch(error => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo)
                });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log("Update successful")
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <div style={{background: '#F0F0F0',height:'600px',paddingBottom: '5%',}}>
            <div style={{ width: '30%', margin: '0 auto', padding: '20px', borderRadius: '10px', background: '#fff',marginTop: '10% auto' }}>
                <button class="btn btn-outline-warning " onClick={handleGoogleSignIn}>Continue with Google Login</button><br />
                <button class="btn btn-outline-primary" onClick={handleFacebookSignIn}>Continue with Facebook Login</button>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Your name</label>
                        <input type="name" required name="name" onBlur={handleInput} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" required name="email" onBlur={handleInput} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input id="password" type="password" required name="password" onBlur={handleInput} className="form-control" />

                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">Check me out</label>
                    </div>

                    <button style={{ width: '100%' }} type="submit" className="btn btn-primary">Submit</button>
                </form><br />
                <p style={{ textAlign: 'center' }} >Already have an account? <Link to="/Login">Sign in</Link></p>
                <p style={{ color: 'red' }}>{loggedInUser.error}</p>
                {loggedInUser.success && <p style={{ color: 'green' }}>User created successfully</p>}
            </div>
        </div>
    );
};

export default SignUp;