import { GET_POSTS, LIKE_POST } from "../actions/postActions";

const initialState = {};

export default function postReducer(state = initialState, action)
{
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if (post.uuid === action.payload.postUuid) {
                    return {
                        ...post,
                        likers: [action.payload.posterUuid, ...post.likers]
                    }
                }
                return post;
            });
        default:
            return state;    
    }
}