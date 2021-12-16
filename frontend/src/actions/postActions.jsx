import axios from 'axios';

//posts
export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/posts`)
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data })
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