/** @format */

import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Title,
    Badge,
} from "@tremor/react";/* para leer la store */
import { useAppSelector } from "../../hooks/store";
import { useUserActions } from "../userActions";
import { Dispatch, SetStateAction } from "react";
import { UserWithId } from "../user-slice";

// deleteUserById es la accion que viaja
// handleDelete es el dispatch, osea lo que despacha la accion
interface ListOfUsersProps {
    setEditForm: Dispatch<SetStateAction<{ user: UserWithId, edit: boolean }>>
}


export default function ListOfUsers({ setEditForm }: ListOfUsersProps) {
    const users = useAppSelector((state) => state.users);
    const { handleDeleteUser } = useUserActions();
    const handleEdit = (item: UserWithId) => {
        setEditForm({ user: item, edit: true });
    }
    // este users viene de la store. dentro del reducer
    return (
        <Card>
            <Title>
                Usuarios
                <Badge style={{ marginRight: 8 }}>{users.length}</Badge>
            </Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Id</TableHeaderCell>
                        <TableHeaderCell >Name</TableHeaderCell>
                        <TableHeaderCell >Email</TableHeaderCell>
                        <TableHeaderCell >Acciones</TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {users.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id.slice(0, 5)}</TableCell>
                            <TableCell style={{ display: "flex", alignItems: "center" }}>
                                <img src={`https://unavatar.io/github/${item.github}`} alt={item.name} style={{ width: 32, height: 32, borderRadius: '100%', marginRight: 8 }} />
                                {item.name}</TableCell>
                            <TableCell >{item.email}</TableCell>
                            <TableCell>
                                <button type="button" onClick={() => { handleEdit(item) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>

                                </button>
                                <button aria-label="remove element" type="button" onClick={() => { handleDeleteUser(item.id) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
