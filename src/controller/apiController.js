const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export const getNotas = () => {
    const options = {
        method: 'GET',
        headers: {
            'xc-token': TOKEN,
            'Content-Type': 'application/json',
        }
    }

    return fetch(API_URL, options)
        .then((response) => response.json())
        .then(r => r.list)
        .catch((error) => {
            console.error('Error GET', error);
            throw error;
        });


};

export const addNota = (nota) => {
    const options = {
        method: 'POST',
        headers: {
            'xc-token': TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nota),
    }
    return fetch(API_URL, options)
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error POST', error);
            throw error;
        });
};

export const getNotaById = (id) => {

    const options = {
        method: 'GET',
        headers: {
            'xc-token': TOKEN,
            'Content-Type': 'application/json',
        }
    }

    return fetch(`${API_URL}/${id}`, options)
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error GET ID', error);
            throw error;
        });
};

export const updateNote = (id, nota) => {

    const options = {
        method: 'PATCH',
        headers: {
            'xc-token': TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...nota, Id: id }),
    }

    return fetch(API_URL, options)
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error PATCH', error);
            throw error;
        });
};

export const deleteNota = (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'xc-token': TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Id: id }),
    }
    return fetch(API_URL, options)
        .then(() => { })
        .catch((error) => {
            console.error('Error DELETE ', error);
            throw error;
        });
};