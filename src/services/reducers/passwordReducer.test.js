import {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAILED
  } from '../actions/actions';
  import { passwordReducer } from './passwordReducer';
  
  describe('passwordReducer', () => {
    const initialState = {
      message: null,
      error: null
    };
  
    it('should return the initial state', () => {
      expect(passwordReducer(undefined, {} )).toEqual(initialState);
    });
  
    it('should handle PASSWORD_RESET_SUCCESS', () => {
      const action = {
        type: PASSWORD_RESET_SUCCESS,
        message: 'Password reset link sent'
      };
  
      expect(passwordReducer(initialState, action)).toEqual({
        message: 'Password reset link sent',
        error: null
      });
    });
  
    it('should handle PASSWORD_RESET_FAILED', () => {
      const action = {
        type: PASSWORD_RESET_FAILED,
        error: 'Failed to send password reset link'
      };
  
      expect(passwordReducer(initialState, action)).toEqual({
        message: null,
        error: 'Failed to send password reset link'
      });
    });
  
    it('should handle PASSWORD_RESET_CONFIRM_SUCCESS', () => {
      const action = {
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
        message: 'Password successfully reset'
      };
  
      expect(passwordReducer(initialState, action)).toEqual({
        message: 'Password successfully reset',
        error: null
      });
    });
  
    it('should handle PASSWORD_RESET_CONFIRM_FAILED', () => {
      const action = {
        type: PASSWORD_RESET_CONFIRM_FAILED,
        error: 'Failed to confirm password reset'
      };
  
      expect(passwordReducer(initialState, action)).toEqual({
        message: null,
        error: 'Failed to confirm password reset'
      });
    });
  });
  