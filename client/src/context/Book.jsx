import { useState } from 'react'
import BookingModal from '../components/BookingModal'
import { BookCtx } from './bookContext'
export function BookProvider({ children }) {
  const [open, setOpen] = useState(false)
  return <BookCtx.Provider value={() => setOpen(true)}>{children}{open && <BookingModal onClose={() => setOpen(false)} />}</BookCtx.Provider>
}
