// import React, { useState } from 'react';
// import { addUser } from '../Services/Api.js';
// import { useNavigate } from 'react-router-dom';
// import { CircleUserRound } from 'lucide-react';
// import atten from '../Assets/Images/attendance.png';

// const AddUser = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState({
//         username: '',
//         password: '',
//         confirmPassword: '',
//         department: '',
//         section: '',
//         email: '',
//         year: '',
//         dob: '',
//         category: '' 
//     });

//     const [isButtonHovered, setIsButtonHovered] = useState(false);

//     const handleChange = (e) => {
//         const { id, value } = e.target;
//         setData({ ...data, [id]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await addUser(data);
//             if (res.status === 201) {
//                 alert('User added successfully');
//                 navigate('/login');
//             } else {
//                 throw new Error('Failed to add user');
//             }
//         } catch (error) {
//             console.error('Error adding user:', error);
//         }
//     };

//     return (
//         <div style={{ position: 'fixed' }}>
//             <img style={styles.image} src={atten} alt="no" />
//             <svg style={styles.svg} width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
//                 <defs>
//                     <linearGradient id="gradient" x1="85%" y1="14%" x2="15%" y2="86%">
//                         <stop offset="5%" stop-color="#0693e3"></stop>
//                         <stop offset="95%" stop-color="#a2d9ff"></stop>
//                     </linearGradient>
//                 </defs>
//                 <path d="M 0,400 L 0,150 C 64.26794258373207,141.41626794258374 128.53588516746413,132.8325358851675 242,144 C 355.46411483253587,155.1674641148325 518.1244019138755,186.08612440191388 618,217 C 717.8755980861245,247.91387559808612 754.9665071770336,278.82296650717706 840,310 C 925.0334928229664,341.17703349282294 1058.0095693779904,372.62200956937795 1166,396 C 1273.9904306220096,419.37799043062205 1356.9952153110048,434.688995215311 1440,450 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path>
//             </svg>
//             <div style={styles.container}>
//                 <div style={styles.content}>
//                     <CircleUserRound size={50} color='rgba(0,172,238,1)' />
//                     <form onSubmit={handleSubmit}>
//                         <div style={styles.formGroup}>
//                             <input type="text" style={styles.input} id="username" placeholder="Username" onChange={handleChange} required />
//                         </div>
//                         <div style={styles.formGroup}>
//                             <input type="text" style={styles.input} id="RegisterNo" placeholder="Register No" onChange={handleChange} required />
//                         </div>
//                         <div style={styles.formGroup}>
//                             <input type="password" style={styles.input} id="Password" placeholder="Password" onChange={handleChange} required />
//                         </div>
//                         <div style={styles.formGroup}>
//                             <select id="department" style={styles.inps} onChange={handleChange} required>
//                                 <option value="">Dept.</option>
//                                 <option value="CSE">CSE</option>
//                                 <option value="IT">IT</option>
//                                 <option value="ECE">ECE</option>
//                                 <option value="EEE">EEE</option>
//                                 <option value="CIVIL">CIVIL</option>
//                                 <option value="MECH">MECH</option>
//                             </select>
//                         </div>
//                         <div style={styles.formGroup}>
//                             <select id="section" style={styles.inps} onChange={handleChange} required>
//                                 <option value="">Section</option>
//                                 <option value="A">A</option>
//                                 <option value="B">B</option>
//                                 <option value="C">C</option>
//                             </select>
//                         </div>
//                         <div style={styles.formGroup}>
//                             <input type="email" id="email" style={styles.input} placeholder="Email" onChange={handleChange} required />
//                         </div>
//                         <div style={styles.formGroup}>
//                             <select style={styles.inps} id="year" placeholder="Year" onChange={handleChange} required>
//                                 <option value="">Year</option>
//                                 <option value="1">I</option>
//                                 <option value="2">II</option>
//                                 <option value="3">III</option>
//                                 <option value="4">IV</option>
//                             </select>
//                         </div>
//                         <div style={styles.formGroup}>
//                             <input type="date" id="dob" style={styles.input} placeholder="DOB" onChange={handleChange} required />
//                         </div>
//                         <div style={styles.formGroup}>
//                             <select id="category" style={styles.inps} placeholder="Category" onChange={handleChange} required>
//                                 <option value="">Category</option>
//                                 <option value="staff">Staff</option>
//                                 <option value="student">Student</option>
//                             </select>
//                         </div>
//                         <div style={styles.formGroup}>
//                             <button
//                                 style={{ ...styles.button, ...(isButtonHovered ? styles.buttonHover : {}) }}
//                                 type="submit"
//                                 className="submit-btn"
//                                 onMouseEnter={() => setIsButtonHovered(true)}
//                                 onMouseLeave={() => setIsButtonHovered(false)}
//                             >
//                                 <span style={{ ...styles.buttonText, ...(isButtonHovered ? styles.buttonTextHover : {}) }}>Register</span>
//                             </button>
//                         </div>
//                     </form>
//                     <p style={styles.loginMessage}>Already have an account? <a href="/login">Login</a></p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     image: {
//         marginTop: '100px',
//         marginLeft: '120px',
//     },
//     svg: {
//         marginTop: '-30px',
//         width: '100%'
//     },
//     container: {
//         textAlign: 'center',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         height: '100vh',
//         width: '100vw',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     content: {
//         display: 'inline-block',
//         background: '#fff',
//         padding: '20px 30px',
//         width: '350px',
//         textAlign: 'center',
//         boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.3)',
//         borderRadius: '3px',
//         position: 'relative',
//         marginLeft: '57%'
//     },
//     formGroup: {
//         margin: '15px 0',
//     },
//     inps: {
//         padding: '10px',
//         margin: '5px 0',
//         width: '100%',
//         maxWidth: '97%',
//         border: '2px solid #a2d9ff',
//         borderRadius: '3px',
//         transition: '#a2df99 0.3s ease',
//     },
//     inputhover: {
//         borderColor: '#a2df99'
//     },
//     input: {
//         padding: '10px',
//         margin: '2px 0',
//         width: '100%',
//         maxWidth: '90%',
//         border: '2px solid #a2d9ff',
//         borderRadius: '3px',
//     },
//     button: {
//         display: 'inline-block',
//         padding: '10px 40px',
//         background: 'linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)',
//         margin: '10px 0 10px 0',
//         userSelect: 'none',
//         cursor: 'pointer',
//         position: 'relative',
//         transition: 'background-color 0.3s ease',
//         borderRadius: '3px',
//         border: 'none',
//     },
//     buttonText: {
//         color: '#fff',
//     },
//     buttonTextHover: {
//         position: 'relative',
//         zIndex: 1,
//         color: 'black'
//     },
//     buttonHover: {
//         background: 'transparent',
//         border: '2px solid',
//         borderImage: 'linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)',
//         borderImageSlice: '1',
//     },
//     errorText: {
//         textAlign: 'left',
//         paddingLeft: '5px',
//         fontSize: '0.8em',
//         color: '#e57373',
//     },
//     loginMessage: {
//         marginTop: '10px',
//         fontSize: '0.9em',
//     },
// };

// export default AddUser;
import React, { useState } from 'react';
import { addUser } from '../Services/Api.js';
import { useNavigate } from 'react-router-dom';
import { CircleUserRound } from 'lucide-react';
import atten from '../Assets/Images/attendance.png';

const AddUser = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        department: '',
        section: '',
        email: '',
        year: '',
        dob: '',
        category: '',
        RegisterNo: '', // Added RegisterNo field
    });

    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addUser(data);
            if (res.status === 201) {
                alert('User added successfully');
                navigate('/login');
            } else {
                throw new Error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div style={{ position: 'fixed' }}>
            <img style={styles.image} src={atten} alt="no" />
            <svg style={styles.svg} width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
                 <defs>
                     <linearGradient id="gradient" x1="85%" y1="14%" x2="15%" y2="86%">
                         <stop offset="5%" stop-color="#0693e3"></stop>
                         <stop offset="95%" stop-color="#a2d9ff"></stop>
                     </linearGradient>
                 </defs>
                 <path d="M 0,400 L 0,150 C 64.26794258373207,141.41626794258374 128.53588516746413,132.8325358851675 242,144 C 355.46411483253587,155.1674641148325 518.1244019138755,186.08612440191388 618,217 C 717.8755980861245,247.91387559808612 754.9665071770336,278.82296650717706 840,310 C 925.0334928229664,341.17703349282294 1058.0095693779904,372.62200956937795 1166,396 C 1273.9904306220096,419.37799043062205 1356.9952153110048,434.688995215311 1440,450 L 1440,400 L 0,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path>
             </svg>
            <div style={styles.container}>
                <div style={styles.content}>
                    <CircleUserRound size={50} color='rgba(0,172,238,1)' />
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <input type="text" style={styles.input} id="username" placeholder="Username" onChange={handleChange} required />
                        </div>
                        <div style={styles.formGroup}>
                            <input type="text" style={styles.input} id="RegisterNo" placeholder="Register No" onChange={handleChange} required />
                        </div>
                        <div style={styles.formGroup}>
                            <input type="password" style={styles.input} id="password" placeholder="Password" onChange={handleChange} required />
                        </div>
                        <div style={styles.formGroup}>
                            <input type="password" style={styles.input} id="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                        </div>
                        <div style={styles.formGroup}>
                            <select style={styles.inp} id="department" onChange={handleChange} required>
                                <option value="">Select Department</option>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="CSE-IOT">CSE-IOT</option>
                                <option value="CSE-CS">CSE-CS</option>
                                <option value="CSE-AIML">CSE-AIML</option>
                                <option value="CSE-AIDS">CSE-AIDS</option>
                                <option value="ECE">ECE</option>
                                <option value="EEE">EEE</option>
                                <option value="MECH">MECH</option>
                                <option value="CIVIL">CIVIL</option>
                            </select>
                        </div>
                        <div style={styles.formGroup}>
                            <select style={styles.inp} id="section" onChange={handleChange} required>
                                <option value="">Select Section</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                        <div style={styles.formGroup}>
                            <input type="email" style={styles.input} id="email" placeholder="Email" onChange={handleChange} required />
                        </div>
                        <div style={styles.formGroup}>
                            <input type="text" style={styles.input} id="year" placeholder="Year" onChange={handleChange} required />
                        </div>
                        <div style={styles.formGroup}>
                            <input type="date" style={styles.input} id="dob" placeholder="Date of Birth" onChange={handleChange} required />
                        </div>
                        <div style={styles.formGroup}>
                            <select style={styles.inp} id="category" onChange={handleChange} required>
                                <option value="">Select Category</option>
                                <option value="Student">student</option>
                                <option value="Faculty">staff</option>
                            </select>
                        </div>
                        <div style={styles.formGroup}>
                            <button
                                style={{ ...styles.button, ...(isButtonHovered ? styles.buttonHover : {}) }}
                                type="submit"
                                className="submit-btn"
                                onMouseEnter={() => setIsButtonHovered(true)}
                                onMouseLeave={() => setIsButtonHovered(false)}
                            >
                                <span style={{ ...styles.buttonText, ...(isButtonHovered ? styles.buttonTextHover : {}) }}>Register</span>
                            </button>
                        </div>
                    </form>
                    <p style={styles.loginMessage}>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    image: {
        marginTop: '100px',
        marginLeft: '120px',
    },
    container: {
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        display: 'inline-block',
        background: '#fff',
        padding: '20px 30px',
        width: '350px',
        textAlign: 'center',
        boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.3)',
        borderRadius: '3px',
        position: 'relative',
        marginLeft: '57%'
    },
    formGroup: {
        margin: '15px 0',
    },
    input: {
        padding: '10px',
        margin: '2px 0',
        width: '100%',
        maxWidth: '90%',
        border: '2px solid #a2d9ff',
        borderRadius: '3px',
    },
    inp: {
        padding: '10px',
        // margin: '2px 0',
        width: '340px',
        // maxWidth: '90%',
        border: '2px solid #a2d9ff',
        borderRadius: '3px',
    },
    button: {
        display: 'inline-block',
        padding: '10px 40px',
        background: 'linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)',
        margin: '10px 0 10px 0',
        userSelect: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s ease',
        borderRadius: '3px',
        border: 'none',
    },
    buttonText: {
        color: '#fff',
    },
    buttonTextHover: {
        position: 'relative',
        zIndex: 1,
        color: 'black'
    },
    buttonHover: {
        background: 'transparent',
        border: '2px solid',
        borderImage: 'linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%)',
        borderImageSlice: '1',
    },
    errorText: {
        textAlign: 'left',
        paddingLeft: '5px',
        fontSize: '0.8em',
        color: '#e57373',
    },
    loginMessage: {
        marginTop: '10px',
        fontSize: '0.9em',
    },
};

export default AddUser;
