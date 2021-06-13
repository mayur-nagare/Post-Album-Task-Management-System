import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';    

function TasksList({id}) {
    const [tasksList, setTasksList] = useState([]);
    const history = useHistory();
    const UseContext = useContext(UserContext)
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`, {
                headers: {
                    Authorization: UseContext.user.userToken //the token is a variable which holds the token
                },
            })
            .then(function (res) {
                const { data } = res;
                setTasksList(data)
            })
            .catch((error) => {
                console.log(error);

                setTasksList(false);
                history.push("/");
                localStorage.removeItem("userToken");
            })
    }, [])
    return (
        <div>
            <div className="list-group text-left">
            {
                tasksList.map(task =>
                    <a onClick={() =>{
                        history.push({
                        pathname: `./${id}/todos/${task.id}`,
                        state : {taskid: task.id,
                                id: id}
                        })
                        }}
                        className="list-group-item list-group-item-action" key={task.id}>
                        {task.completed && task.title}
                        { !task.completed && <s>{task.title}</s>}
                        
                    </a>
                    )
            }
                
            </div>
        </div>
    )
}

export default TasksList
