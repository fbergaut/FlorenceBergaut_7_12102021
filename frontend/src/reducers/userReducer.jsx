import { DELETE_USER, FOLLOW_USER, GET_USER, UNFOLLOW_USER, UPDATE_BIO, UPLOAD_PICTURE } from "../actions/userActions";

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
                followings: [...state.followings, { followingUuid: action.payload}]
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                followings: state.followings.filter((uuid) => action.payload !== uuid.followingUuid)
            }
        case DELETE_USER:
            return {
                ...state.filter((user) => user.uuid !== action.payload.userUuid)}
        default:
            return state;
    }
}