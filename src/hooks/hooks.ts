import { useDispatch as useReduxDispatch, TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../services/store';

// Используем вместо стандартного useDispatch
export const useAppDispatch: () => AppDispatch = useReduxDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;