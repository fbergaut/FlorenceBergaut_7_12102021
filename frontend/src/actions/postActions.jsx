import axios from 'axios';

//posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/posts`)
            .then((res) => {
                const array = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array })
            })
            .catch((err) => console.log(err))
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