import { locationReducer } from './locationReducer';
import { SET_PREVIOUS_LOCATION } from '../actions/actions';

describe('locationReducer', () => {
    const initialState = {
        previousLocation: null,
    };

    it('should return the initial state when an unknown action is passed', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        const state = locationReducer(undefined, action);
        expect(state).toEqual(initialState);
    });

    it('should handle SET_PREVIOUS_LOCATION', () => {
        const location = { pathname: '/test', search: '', hash: '' }; // Пример данных для location
        const action = {
            type: SET_PREVIOUS_LOCATION,
            payload: location,
        };

        const expectedState = {
            previousLocation: location,
        };

        const state = locationReducer(initialState, action);
        expect(state).toEqual(expectedState);
    });
});
