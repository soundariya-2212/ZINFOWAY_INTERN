import { getUser, deleteUser } from '../Services/Api.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/add');
    };

    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getUser();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteUser(id);
            if (res.status === 200) {
                alert('User deleted');
            }
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };
    console.log(users)
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Department</th>
                        <th>Year</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.department}</td>
                            <td>{user.year}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.category}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button className="del-btn" onClick={() => handleDelete(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAdd} className="edit-btn">
                Add User
            </button>
        </>
    );
};

export default Users;
