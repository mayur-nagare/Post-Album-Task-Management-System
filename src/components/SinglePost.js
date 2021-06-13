import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import '../styles/comments.css';
import { Collapse } from 'reactstrap'
import UserContext from './UserContext';

const SinglePost = (props) => {
    const { postid } = useParams();

    const history = useHistory();
    const [post, setPost] = useState(undefined);
    const [commentsList, setCommentsList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const UseContext = useContext(UserContext)
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}`, {
            headers: {
                Authorization: UseContext.user.userToken //the token is a variable which holds the token
            }
        })
            .then((res) => {
                const { data } = res;
                setPost(data);

            })
            .catch(function (error) {
                console.log(error);

                setPost(false);
                history.push("/");
                localStorage.removeItem("userToken");

            })
    }, [postid])

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`, {
            headers: {
                Authorization: localStorage.getItem("userToken") //the token is a variable which holds the token
            }
        })
            .then((response) => {
                const { data } = response;
                setCommentsList(data);

            })
            .catch(function (error) {
                console.log(error);
                setCommentsList(false);
                history.push("/");
                localStorage.removeItem("userToken");

            })
    }, [postid])

    const generatePost = (post) => {
        const { id, userId, title, body } = post;

        return (
            <div>
                <div className="card bg-light border-primary text-left">
                    <div className="card-header">User: {userId}</div>
                    <div className="card-body text-primary">
                        <h5 className="card-title">Post: {id}</h5>
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted"></h6>
                        <h6 className="card-subtitle mb-2 text-muted">post:</h6>
                        <p className="card-text">{body}</p>
                    </div>
                </div>
                {/* {id+" "+userId+" "+title+" "+body}    */}
            </div>
        )
    }

    return (
        <div>
            <div className="row m-5">
                <div className="col-12 text-center">
                    {
                        post === undefined &&
                        <div className="progress">
                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    }
                    {post !== undefined && post && generatePost(post)}
                </div>
                <div className="col-12 text-center">
                    <div className="card bg-light border-dark text-left">
                        <div class="card-header font-weight-bold">Comments</div>
                        <div className="list-group text-left">
                            {commentsList.map((comment) =>

                                <div class="card cardMargin" key={comment.id}>
                                    <div class="card-header" onClick={toggle}>
                                            {comment.name}
                                    </div>
                                    <Collapse isOpen={isOpen}>
                                        <div class="card-body">
                                            <h5 class="card-title">{comment.id}</h5>
                                            <h5 class="card-title">{comment.name}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">Email: {comment.email}</h6>
                                            <h6 class="card-subtitle mb-2 text-muted">comment:</h6>
                                            <p class="card-text">{comment.body}</p>
                                        </div>
                                    </Collapse>
                                    {/* </div> */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default SinglePost

