import {
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
  } from '../actions/actions';
  import { userReducer, initialState } from './userReducer';
  
  describe('userReducer', () => {
  
    it('should return the initial state when an unknown action is passed', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      const state = userReducer(undefined, action);
      expect(state).toEqual(initialState);
    });
  
    it('should handle GET_USER_SUCCESS', () => {
      const action = { type: GET_USER_SUCCESS };
      const expectedState = {
        error: null
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  
    it('should handle GET_USER_FAILED', () => {
      const action = { type: GET_USER_FAILED, payload: 'Error fetching user' };
      const expectedState = {
        error: 'Error fetching user'
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  
    it('should handle UPDATE_USER_SUCCESS', () => {
      const action = { type: UPDATE_USER_SUCCESS };
      const expectedState = {
        error: null
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  
    it('should handle UPDATE_USER_FAILED', () => {
      const action = { type: UPDATE_USER_FAILED, payload: 'Error updating user' };
      const expectedState = {
        error: 'Error updating user'
      };
      const state = userReducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });
  