import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}/users/${uid}`)
        .then((res) => {
            dispatch({ type: GET_USER, payload: res.data})
        })
        .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, uuid) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}/users/upload`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}/users/${uuid}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture })
                    })
            })
            .catch((err) => console.log(err));
    };
};