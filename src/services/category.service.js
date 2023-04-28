import axios from 'axios';

const todoURL = 'http://localhost:3030/';
const pageURL = todoURL + 'category';

export const getCategory = async () => {
    const res = await axios.get(pageURL);
    return res.data;
}

export const postCategory = async (data) => {
   return await axios.post(pageURL, data);
}

export const updateSingleCategory = async (data,id) => {
    return await axios.put(`${pageURL}/${id}`, data);
}

export const deleteSingleCategory = async (id) => {
    return await axios.delete(`${pageURL}/${id}`);
}



