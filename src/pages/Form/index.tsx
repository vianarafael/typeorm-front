import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import Api from '../../services/api';
import {  Button, Form } from 'react-bootstrap';

interface ITask {
    title: string;
    description: string;
}

interface IUserPublicProfileRouteParams {
    id: string;
}

const TasksForm: React.FC = () => {

    const history = useHistory();
    // const { id } = useParams();
    const { id } = useParams<IUserPublicProfileRouteParams>();
    // const id = params.id

    useEffect(() => {
        if (id !== undefined) {
            findTask(id)
        }
    }, [id])

    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    })

    // value: string = (<HTMLInputElement>var.target).value
    function updateModel (e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        if (id !== undefined) {
            const response = await Api.put(`/tasks/${id}`, model)
        } else {
            const response = await Api.post('/tasks', model)
        }
        back()
    }

    async function findTask(id: string) {
        const response = await Api.get(`tasks/${id}`);
        setModel({
            title: response.data.title,
            description: response.data.description
        })

    }

    function back() {
        history.goBack();
    }
    
    return (
        <div className="container">
            <br />
            <div className="tasks-header">
                <h1>Tasks Form</h1>
                <Button variant="dark" onClick={back}>Back</Button>
            </div>
            <br />
            <div className="container">
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="title" 
                    value={model.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        name="description"
                        as="textarea" 
                        value={model.description}
                        rows={3}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                         />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </div>
        )
}

export default TasksForm;