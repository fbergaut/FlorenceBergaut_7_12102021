import { FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/userActions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            }
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload
            }
        case FOLLOW_USER:
            return {
                ...state,
                followings: [...state.followings, { followingUuid: action.payload}],
                // followers: [...state.followers, { userUuid0: action.payload.followBody.userUuid0}]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                followings: state.followings.filter((id) => id !== action.payload.idToUnfollow),
            }   
        default:
            return state;
    }
}