
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import UserContext from './UserContext';


function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const UseContext = useContext(UserContext);

    const handleEmail= (e) => {
        setEmail(e.target.value)
    }

    const handlePassword= (e) => {
        setPassword(e.target.value)
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(String(email).toLowerCase());
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email) {
            props.showError("Please enter a valid email");
            return;
        }
        if (validateEmail(email) === false) {
            props.showError("Your email is invalid");
            return;
        }

        if (!password || password.length < 6) {
            props.showError("Please enter your password");
            return;
        }

        axios.post("https://reqres.in/api/login", {email, password})
            .then((response) => {
                redirectToHome();
                props.showError(null)
                console.log(response);
                localStorage.setItem("userToken", response.data.token)
                UseContext.setUser({"userToken": response.data.token})
                

            })
            .catch((error) => {
                props.showError("Auth failure! Please Provide Proper Credentials");
                console.log(error);
            });

    };

    const redirectToHome = () => {
        props.updateTitle('Logout');
        props.history.push('/home');
    }

    return (
        <div className="container">
            <div className="row justify-content-center" style={{ marginTop: "150px", marginBottom: "150px" }}>
                <div id="col" className="col-md-6 my-auto">
                    <div className="card bg-light mb-3">
                        <div className="card-body">
                            <h3 className="card-title">Login</h3>
                            <form>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={handleEmail}
                                    />
                                </div>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePassword}
                                    />
                                </div>
                                <div className="form-check">
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={handleLogin}
                                >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        // <div className="card col-12 col-lg-4 login-card mt-2 hv-center">

        // </div>

    );
};

export default withRouter(Login);
