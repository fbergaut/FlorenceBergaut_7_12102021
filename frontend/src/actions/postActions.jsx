import axios from 'axios';

//posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/posts`)
            .then((res) => {
                const array = res.data.reverse().slice(0, num);
                dispatch({ type: GET_POSTS, payload: array })
            })
            .catch((err) => console.log(err))
    };
};

export const addPost = (data) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}/posts`, data)
            // .then((res) => {
            //     const array = res.data.slice(0, num)
            //     dispatch({ type: GET_POSTS, payload: array })
            // })
            // .catch((err) => console.log(err))
    };
};

export const likePost = (postUuid, posterUuid) => {
    return (dispatch) => {
        return axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/posts/like-post/` + postUuid,
                data: { posterUuid }
            })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: {postUuid, posterUuid}});
            })
            .catch((err) => console.log(err));
        };
};

export const unlikePost = (postUuid, posterUuid) => {
    return (dispatch) => {
        return axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}/posts/unlike-post/` + postUuid,
                data: { posterUuid }
            })
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: {postUuid, posterUuid}});
            })
            .catch((err) => console.log(err));
        };
};

export const updatePost = (postUuid, message) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/posts/${postUuid}`,
            data: {message}
        })
        .then((res) => {
                dispatch({ type: UPDATE_POST, payload: {postUuid, message}});
            })
            .catch((err) => console.log(err));
    };
};

export const deletePost = (postUuid) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/posts/${postUuid}`
        })
        .then((res) => {
                dispatch({ type: DELETE_POST, payload: {postUuid}});
            })
            .catch((err) => console.log(err));
    };
};

export const addComment = (postUuid, commenterUuid, text, commenterUsername) => {
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/comments/`,
            data: {postUuid, commenterUuid, text, commenterUsername}
        })
        .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: {postUuid}});
            })
            .catch((err) => console.log(err));
    };
};

export const editComment = (postUuid, uuid, text) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/comments/${postUuid}`,
            data: {uuid, text}
        })
        .then((res) => {
                dispatch({ type: EDIT_COMMENT, payload: {postUuid, uuid, text}});
            })
            .catch((err) => console.log(err));
    };
};

export const deleteComment = (postUuid, uuid) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/comments/${postUuid}`,
            data: {uuid}
        })
        .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: {postUuid, uuid}});
            })
            .catch((err) => console.log(err));
    };
};