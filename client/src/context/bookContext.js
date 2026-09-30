import { createContext, useContext } from 'react'
export const BookCtx = createContext(() => {})
export const useBook = () => useContext(BookCtx)
