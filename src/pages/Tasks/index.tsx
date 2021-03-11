import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import Api from '../../services/api';
import { Badge, Button } from 'react-bootstrap';


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
    
    return (
        <>
            <br />
            <h1 className="container">Tasks Page</h1>
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
                    tasks.map(task => {
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{formatDate(task.updated_at)}</td>
                            <td><Badge variant={task.finished ? "success" : "warning"}>
                                { task.finished ? 'Finished': 'Pending'}
                                </Badge></td>
                                <td>
                                    <Button size="sm">Edit</Button>{' '}
                                    <Button size="sm" variant="success">Finished</Button>{' '}
                                    <Button size="sm" variant="danger">Remove</Button>{' '}
                                </td>
                        </tr>       
                    })
                }
                </tbody>
            </Table>
        </>
        )
}

export default Tasks;