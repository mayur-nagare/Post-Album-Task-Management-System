import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';  
import '../styles/Home.css'
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';

function Home(props) {
    const [users, setUsers] = useState([]);
    const history= useHistory();
    const UseContext = useContext(UserContext)
    
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users", {
            headers: {
                Authorization: UseContext.user.userToken //the token is a variable which holds the token
            }
        })
            .then(res => {
                setUsers(res.data)
            })
            .catch(function (error) {
                console.log("Error Fetching data");
                setUsers(false)
                props.showError("Session Invalid");
                history.push("/");
                localStorage.removeItem("userToken");
            })
    }, [])

    return (

        <div className="container">

            <h1>Hello Users!</h1>
            <div className="row justify-content-around">

                {users.map((user) => {
                    return (
                        <div className="col-sm-4 my-10" key={user.id}>
                            <a className="card bg-primary mb-3" onClick={() =>{ 
                                history.push({
                                    pathname: `./users/${user.id}`,
                                    state: {id: user.id}
                                    })}
                                    }>
                                <div className="card-body text-light">
                                    <h5 className="card-title">{user.id+".  "+user.username}</h5>
                                    <h5 className="card-title">{user.name}</h5>
                                    <p className="card-text">{user.email}</p>
                                </div>
                            </a>
                        </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Home
