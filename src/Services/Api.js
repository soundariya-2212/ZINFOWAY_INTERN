// import axios from 'axios';

// const URL='http://localhost:3000'


// const getUser=()=>axios.get(`${URL}/users`)
// const getUserId=(id)=>axios.get(`${URL}/users/${id}`)
// const addUser=(data)=>axios.post(`${URL}/users`,data)
// const editUser=(id,data)=>axios.put(`${URL}/users/${id}`,data)
// const deleteUser=(id)=>axios.delete(`${URL}/users/${id}`)
// export {getUser,getUserId,addUser,editUser,deleteUser}


// before the option of edit user
// import axios from 'axios';

// const URL = 'http://localhost:3000';

// const getUser = () => axios.get(`${URL}/users`);
// const getUserId = (id) => axios.get(`${URL}/users/${id}`);
// const addUser = (data) => axios.post(`${URL}/users`, data);
// const editUser = (id, data) => axios.put(`${URL}/users/${id}`, data);
// const deleteUser = (id) => axios.delete(`${URL}/users/${id}`);

// const loginUser = async (credentials) => {
//     try {
//         const response = await axios.post(`${URL}/login`, credentials);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export { getUser, getUserId, addUser, editUser, deleteUser, loginUser };


// import axios from 'axios';

// const URL = 'http://localhost:3000';

// const getUser = () => axios.get(`${URL}/users`);
// const getUserId = (id) => axios.get(`${URL}/users/${id}`);
// const addUser = (data) => axios.post(`${URL}/users`, data);
// const editUser = (id, data) => axios.put(`${URL}/users/${id}`, data); // Modified function for updating user
// const deleteUser = (id) => axios.delete(`${URL}/users/${id}`);

// const loginUser = async (credentials) => {
//     try {
//         const response = await axios.post(`${URL}/login`, credentials);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// };

// export { getUser, getUserId, addUser, editUser, deleteUser, loginUser };


import axios from 'axios';

const URL = 'http://localhost:3000';

const getUser = () => axios.get(`${URL}/users`);
const getUserId = (id) => axios.get(`${URL}/users/${id}`);
const addUser = (data) => axios.post(`${URL}/users`, data);
const editUser = async (id, data) => {
    try {
        const response = await axios.put(`${URL}/users/${id}`, data);
        // Update the user details in the JSON data
        const users = await getUser();
        const updatedUsers = users.data.map(user => {
            if (user.id === id) {
                return { ...user, ...data };
            }
            return user;
        });
        await axios.put(`${URL}/users`, { users: updatedUsers });
        return response.data;
    } catch (error) {
        throw error;
    }
};
const deleteUser = (id) => axios.delete(`${URL}/users/${id}`);

const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getUser, getUserId, addUser, editUser, deleteUser, loginUser };
