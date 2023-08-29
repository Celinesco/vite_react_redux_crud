import { Badge, Button, Card, TextInput, Title } from '@tremor/react';
import { useUserActions } from '../userActions';
import { useState } from 'react';


const CreateNewUser = () => {
    const { addUser } = useUserActions();
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setResult(null);

        const form = e.currentTarget;
        const formData = new FormData(form)

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;

        if (!name || !email || !github) {
            return setResult('ko')
        }

        addUser({ name: name.trim(), email: email.trim(), github: github.trim() })
        setResult('ok')
        form.reset()
        setTimeout(() => {
            setResult(null)
        }, 1500)
    }
    return (
        <Card style={{ marginTop: 16 }}>
            <Title>Crear nuevo usuario</Title>
            <form onSubmit={handleSubmit}>
                <TextInput
                    name="name" placeholder='Nombre' />
                <TextInput
                    name="email" placeholder='Email' />
                <TextInput
                    name="github" placeholder='Github' />
                <Button >Crear</Button>
                <span>{result === 'ok' && <Badge color="green">Exitoso!</Badge>}
                    {result === 'ko' && <Badge color="red">Eror</Badge>}</span>
            </form>
        </Card>
    )
}


export default CreateNewUser;