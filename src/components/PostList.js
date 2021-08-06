import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';

function PostList({id}) {
    const [postList, setPostList] = useState([]);
    const history = useHistory();
    const UseContext = useContext(UserContext)

    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`, {
                headers: {
                    Authorization: UseContext.user.userToken //the token is a variable which holds the token
                },
            })
            .then(function (res) {
                const { data } = res;
                setPostList(data)
                
            })
            .catch((error) => {
                console.log(error);
                setPostList(false);
                history.push("/");
                localStorage.removeItem("userToken");
            })
    }, []);



    return (
        <div>
            
            <div className="list-group text-left">
                {postList.map(post =>
                    <a onClick={() =>{
                        history.push({
                        pathname: `./${id}/posts/${post.id}`,
                        state : {postid: post.id}
                        })
                        }} className="list-group-item list-group-item-action" key={post.id} >
                        {post.title}
                    </a>
                
                )}

            </div>

        </div>
    )
}

export default PostList
