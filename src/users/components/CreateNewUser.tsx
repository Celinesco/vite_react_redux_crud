import { Badge, Button, Card, TextInput, Title } from '@tremor/react';
import { useUserActions } from '../userActions';
import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from 'react';
import { UserWithId } from '../user-slice';

interface UserFormProps {
    editForm: { user: UserWithId, edit: boolean };
    setEditForm: Dispatch<SetStateAction<{ user: UserWithId, edit: boolean }>>
}

const UserForm = ({ editForm, setEditForm }: UserFormProps) => {
    const { addUser, edit } = useUserActions();
    const [result, setResult] = useState<'ok' | 'ko' | null>(null);
    const [formFields, setFormFields] = useState<UserWithId>(editForm.user)

    useEffect(() => {
        setFormFields(editForm.user)
    }, [editForm])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setResult(null);

        const form = e.currentTarget;

        const formData = new FormData(form)
        console.log(formData)


        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if (!name || !email || !github) {
            return setResult('ko')
        }

        let user = {
            name: name.trim(),
            email: email.trim(),
            github: github.trim()
        }
        if (!editForm.edit) {
            addUser(user)
        }
        else {
            console.log(formFields)
            edit(formFields)
        }

        setResult('ok');
        setEditForm({ user: { id: "", name: "", email: "", github: "" }, edit: false })
        form.reset()
        setTimeout(() => {
            setResult(null)
        }, 1500)
    }
    return (
        <Card style={{ marginTop: 16 }}>
            <Title>{!editForm.edit ? 'Crear nuevo usuario' : 'Editar usuario'}</Title>
            <form onSubmit={handleSubmit} >
                <TextInput
                    className='my-2'
                    name="name" placeholder='Nombre' value={formFields.name} onChange={handleChange} />
                <TextInput
                    className='my-2'
                    name="email" placeholder='Email' value={formFields.email} onChange={handleChange} />
                <TextInput
                    className='my-2'
                    name="github" placeholder='Github' value={formFields.github} onChange={handleChange} />
                <Button >{!editForm.edit ? 'Crear' : 'Editar'}</Button>
                <span>{result === 'ok' && <Badge color="green">Exitoso!</Badge>}
                    {result === 'ko' && <Badge color="red">Error</Badge>}</span>
            </form>
        </Card>
    )
}


export default UserForm;