import { SET_PREVIOUS_LOCATION } from '../actions/actions';


interface LocationState {
    previousLocation: Location | null;
}

interface SetPreviousLocationAction {
    type: typeof SET_PREVIOUS_LOCATION;
    payload: Location;
}

type LocationActionTypes = SetPreviousLocationAction;

const initialState: LocationState = {
    previousLocation: null,
};

export const locationReducer = (state = initialState, action: LocationActionTypes): LocationState => {
    switch (action.type) {
        case SET_PREVIOUS_LOCATION:
            return {
                ...state,
                previousLocation: action.payload,
            };
        default:
            return state;
    }
};
