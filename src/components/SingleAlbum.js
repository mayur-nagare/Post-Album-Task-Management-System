import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { Image, ImageGroup } from 'react-fullscreen-image';
import "../styles/album.css"
import UserContext from './UserContext';    
const SingleAlbum = (props) => {
    const { id, albumid } = useParams();

    const history = useHistory();
    const [photoCards, setPhotoCards] = useState([]);
    const UseContext = useContext(UserContext)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`, {
            headers: {
                Authorization: UseContext.user.userToken //the token is a variable which holds the token
            }
        })
            .then((res) => {
                const { data } = res;
                setPhotoCards(data);
            })
            .catch((error) => {
                console.log(error);

                setPhotoCards(false);
                history.push("/");
                localStorage.removeItem("userToken");
            })
    }, []);

    return (
        <div className="container-images">
            <ImageGroup>
                <ul className="images">
                    {photoCards.map(i => (
                        <li key={i.id}>
                            <Image
                                src={i.url}
                                alt="nature"
                            />
                        </li>
                    ))}
                </ul>
            </ImageGroup>
        </div>
    )
}

export default SingleAlbum
