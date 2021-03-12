import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import Api from '../../services/api';
import { Badge, Button } from 'react-bootstrap';
import './index'
import { useHistory } from 'react-router-dom';

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useHistory()
    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {
        const response = await Api.get('/tasks');
        console.log(response)
        setTasks(response.data)
    }

    function formatDate(date: Date) {
        return moment(date).format("DD/MM/YYYY")
    }

    function newTask() {
        history.push('/form');
    }

    function editTask(id: number) {
        history.push(`/form/${id}`)
    }

    console.log(tasks)
    
    return (
        <div className="container">
            <br />
            <div className="tasks-header">
                <h1>Tasks Page</h1>
                <Button variant="dark" onClick={newTask}>Add Task</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    tasks ? tasks.map(task => {
                        
                        return (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formatDate(task.updated_at)}</td>
                                <td><Badge variant={task.finished ? "success" : "warning"}>
                                    { task.finished ? 'Finished': 'Pending'}
                                    </Badge></td>
                                    <td>
                                        <Button size="sm" onClick={() => editTask(task.id)}>Edit</Button>{' '}
                                        <Button size="sm" variant="success">Finished</Button>{' '}
                                        <Button size="sm" variant="danger">Remove</Button>{' '}
                                    </td>
                            </tr>    
                        )   
                    })
                    : ''
                }
                </tbody>
            </Table>
        </div>
        )
}

export default Tasks;