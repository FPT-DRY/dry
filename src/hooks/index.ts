import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '~/redux/store';

export { default as useTimeout } from './useTimeout';
export { default as useInterval } from './useInterval';
export { default as useTime } from './useTime';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
