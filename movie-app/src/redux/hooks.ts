import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// Aus Redux Toolkit, an sich braucht man das aber nicht, wenn man direkt aus den Slices die Actions und Selectors verwendet.

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
