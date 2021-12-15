import axios from 'axios';

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

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

export const updateBio = (uuid, bio) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/users/` + uuid,
            data: { bio }
        })
        .then((res) => {
            dispatch({ type: UPDATE_BIO, payload:bio })
        })
        .catch((err) => console.log(err));    
    };
};

export const followUser = (followersUuid, idToFollow) => {
    const followBody = {
        userUuid0 : idToFollow,
        followingUuid : idToFollow
        }
    return (dispatch) => {
        return axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/users/follow/` + followersUuid,
            data: followBody
        })
        .then((res) => {
            console.log(res);
            dispatch({ type: FOLLOW_USER, payload: followBody.followingUuid});
        })
        .catch((err) => console.log(err));
    };
    
};


export const unfollowUser = (followersUuid, idToUnfollow) => {
    const unfollowBody = {
        userUuid0 : idToUnfollow,
        followingUuid : idToUnfollow
        }
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/users/unfollow/` + followersUuid,
            data: unfollowBody
        })
        .then((res) => {
            dispatch({ type: UNFOLLOW_USER, payload: unfollowBody.followingUuid});
        })
        .catch((err) => console.log(err));
    };
    
};