import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { CheckCircleFill } from 'react-bootstrap-icons';
import UserContext from './UserContext';    
const Task = (props) => {
    const { id, taskid } = useParams();

    const [task, setTask] = useState(undefined)
    const history = useHistory();
    const UseContext = useContext(UserContext)

    useEffect(() =>{
        axios.get(`https://jsonplaceholder.typicode.com/todos/${taskid}`, {
            headers: {
                Authorization: UseContext.user.userToken //the token is a variable which holds the token
            },
        })
        .then((response) =>{
            const { data } = response;
            setTask(data);
        })
        .catch((error) =>{
            console.log(error);
            setTask(false)
            history.push("/");
            localStorage.removeItem("userToken");
        })
    },[taskid])

    const generateTask = (task) =>{
        const {userId, id, title, completed} = task;        

        return (
            <div>
                <div className="card bg-light border-primary text-left">
                    <div className="card-header">Task: {id}</div>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">User: {userId}</h6>
                        <h5 className="card-title">{title}</h5>
                        <div>{ completed && <div>Task Completed: <CheckCircleFill color="green" /> </div>}</div>
                        <div>{ !completed && <div>Task Completed:  <CheckCircleFill color="grey" /> </div>}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="row m-5">
                <div className="col-12 text-center">
                    {
                        task === undefined &&
                        <div className="progress">
                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    }
                    {task !== undefined && task && generateTask(task)}
                </div>
            </div>
        </div>
    )
}

export default Task
