import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserId, editUser } from '../Services/Api.js';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        department: '',
        year: '',
        dob: '',
        category: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserId(id);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await editUser(id, data);
            if (res.status === 200) {
                alert('User updated successfully');
                navigate('/');
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleChangeSelect = (e) => {
        setData({ ...data, category: e.target.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={data.username} id="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" value={data.password} id="password" placeholder="Password" onChange={handleChange} required />
                <input type="password" value={data.confirmPassword} id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required/>
                <input type="email" value={data.email} id="email" placeholder="Email" onChange={handleChange} required/>
                <input type="text" value={data.department} id="department" placeholder="Department" onChange={handleChange} required/>
                <input type="text" value={data.year} id="year" placeholder="Year" onChange={handleChange} required/>
                <input type="date" value={data.dob} id="dob" placeholder="Date of Birth" onChange={handleChange} required/>
                <select value={data.category} onChange={handleChangeSelect} required>
                    <option value="">Select category</option>
                    <option value="staff">Staff</option>
                    <option value="student">Student</option>
                </select>
                <button className="button"  type="submit"><span className='buttonText'>Update User</span></button>
            </form>
        </>
    );
};

 export default EditUser;
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getUserId, editUser } from '../Services/Api.js';

// const EditUser = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [data, setData] = useState({
//         username: '',
//         password: '',
//         confirmPassword: '',
//         email: '',
//         department: '',
//         dob: '',
//         category: 'student' // Set category directly to 'student'
//     });

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await getUserId(id);
//                 setData(res.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchUser();
//     }, [id]);

//     const handleChange = (e) => {
//         setData({ ...data, [e.target.id]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await editUser(id, data);
//             if (res.status === 200) {
//                 alert('User updated successfully'); // Display alert
//                 navigate('/');
//             } else {
//                 throw new Error('Failed to update user');
//             }
//         } catch (error) {
//             console.error('Error updating user:', error);
//         }
//     };

//     const styles = {
//         container: {
//             backgroundColor: 'lightblue',
//             padding: '20px',
//             borderRadius: '5px',
//             boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
//         },
//         input: {
//             marginBottom: '10px',
//             padding: '8px',
//             borderRadius: '3px',
//             border: '1px solid #ccc',
//             width: '100%',
//             boxSizing: 'border-box'
//         },
//         button: {
//             padding: '10px 20px',
//             backgroundColor: '#007bff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '3px',
//             cursor: 'pointer'
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={data.username} id="username" placeholder="Username" onChange={handleChange} style={styles.input} required />
//                 <input type="password" value={data.password} id="password" placeholder="Password" onChange={handleChange} style={styles.input} required />
//                 <input type="password" value={data.confirmPassword} id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} style={styles.input} required />
//                 <input type="email" value={data.email} id="email" placeholder="Email" onChange={handleChange} style={styles.input} required />
//                 <input type="text" value={data.department} id="department" placeholder="Department" onChange={handleChange} style={styles.input} required />
//                 <input type="date" value={data.dob} id="dob" placeholder="Date of Birth" onChange={handleChange} style={styles.input} required />
//                 <button type="submit" style={styles.button}>Update User</button>
//             </form>
//         </div>
//     );
// };

// export default EditUser;
