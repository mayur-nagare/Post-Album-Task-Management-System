import React, {useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import UserContext from './UserContext';    
function AlbumList({id}) {
    const [albumList, setAlbumList] = useState([]);
    const history = useHistory();
    const UseContext = useContext(UserContext)
    
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`, {
                headers: {
                    Authorization: UseContext.user.userToken //the token is a variable which holds the token
                },
            })
            .then(function (res) {
                const { data } = res;
                setAlbumList(data)
            })
            .catch((error) => {
                console.log(error);

                setAlbumList(false);
                history.push("/");
                localStorage.removeItem("userToken");
            })
    }, [])
    return (
        <div>
            <div className="list-group text-left">
            {albumList.map(album => 
                <a onClick={() =>{
                    history.push({
                    pathname: `./${id}/albums/${album.id}`,
                    state : {albumid: album.id,
                            id: id}
                    })
                    }}
                    className="list-group-item list-group-item-action" key={album.id}>
                    {album.title}
                </a>
                
                )}
                
            </div>
        </div>
    )
}

export default AlbumList
