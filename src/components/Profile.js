import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Envelope, Person, Telephone, GeoAlt, Building, Globe2 } from 'react-bootstrap-icons';
import Tabs from './Tabs';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from './UserContext';

const Profile = (props) => {
    const history = useHistory();
    const { id } = useParams();

    const [user, setUser] = useState(undefined);
    const UseContext = useContext(UserContext)

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}`, {
                headers: {
                    Authorization: UseContext.user.userToken //the token is a variable which holds the token
                }
            })
            .then(function (res) {
                const { data } = res;
                setUser(data);
            })
            .catch((error) => {
                console.log(error);
                setUser(false);
                history.push("/");
                localStorage.removeItem("userToken");
            })
    }, [id])

    const generateUser = (user) => {
        const { address, company, email, name, phone, username, website } = user;
        const { suite, street, city, zipcode } = address;


        return (
            <>
                <div className="card bg-light">
                    <div className="card-body text-center">
                        <h3 className="card-title">{name}</h3>
                    </div>
                    <div className="card-header card-subtitle text-muted text-left">Personal Details</div>
                    <div className="card-body text-left">
                        <p className="card-text"><Person style={{ marginRight: 15 }} />{username} </p>
                        <p className="card-text"><Envelope style={{ marginRight: 15 }} />{email} </p>
                        <p className="card-text"><Telephone style={{ marginRight: 15 }} />{phone} </p>
                        <p className="card-text"><GeoAlt style={{ marginRight: 15 }} />{suite + ", " + street + ", " + city + ", " + zipcode} </p>
                        <p className="card-text"><Building style={{ marginRight: 15 }} />{company.name} </p>
                        <p className="card-text"><Globe2 style={{ marginRight: 15 }} />{website} </p>
                    </div>
                </div>
            </>
        );
    };


    

    return (
        <div>
            <div className="row m-5">
                <div className="col-4 text-center">
                    {
                        user === undefined &&
                        <div className="progress">
                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    }
                    {user !== undefined && user && generateUser(user)}
                    {user === false && <p className="text-capitalize"> User not found</p>}
                </div>
                <div className="col-8 border">
                    {
                        user === undefined &&
                        <div className="progress">
                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    }
                    {user !== undefined && user && <Tabs {...props} updateTitle={props.updateTitle} user={user} />}
                    {user === false && <p className="text-capitalize"> User not found</p>}
                </div>
            </div>

        </div>

    )

}

export default Profile
