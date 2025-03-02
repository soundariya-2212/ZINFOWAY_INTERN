import { getUser, deleteUser } from '../Services/Api.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/add');
    };

    const [users, setUsers] = useState([]);
    const [department, setDepartment] = useState('Select');
    const [year, setYear] = useState('Select');
    const [section, setSection] = useState('Select');
    const [category, setCategory] = useState('Select');

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

    useEffect(() => {
        fetchData();
    }, []);

    // Filter users based on selected department, year, section, and category (student or staff)
    const filteredUsers = users.filter(user => {
        if (department !== 'Select' && user.department !== department) return false;
        if (year !== 'Select' && user.year !== year) return false;
        if (section !== 'Select' && user.section !== section) return false;
        if (category !== 'Select' && user.category !== category) return false;
        return true;
    });

    return (
        <div className="attendance-container">
            <h1>Student Users</h1>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="department">Department:</label>
                <select
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    {['Select', 'CSE', 'IT', 'ECE', 'EEE', 'CSE-IOT', 'CSE-AIML', 'CSE-CS', 'CICIL', 'MECH'].map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
                <label htmlFor="year">Year:</label>
                <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    {['Select', 'I', 'II', 'III', 'IV'].map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <label htmlFor="section">Section:</label>
                <select
                    id="section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                >
                    {['Select', 'A', 'B', 'C'].map(sec => (
                        <option key={sec} value={sec}>{sec}</option>
                    ))}
                </select>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {['Select', 'student', 'staff'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.category}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">
                                    Edit</span>
                                </button>
                            </td>
                            <td>
                                <button className="del-btn" onClick={() => handleDelete(user.id)}>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">
                                    Delete</span> 
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='button1' onClick={handleAdd}>
                Add User
            </button>
        </div>
    );
};

export default AdminUsers;
