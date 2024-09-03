import { useDispatch as useReduxDispatch, TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../services/actions/actions';

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;  // передаем в хук структуру хранилища
export const useAppDispatch: () => AppDispatch = useReduxDispatch;  // Хук не даст отправить экшен, который не определен в App
