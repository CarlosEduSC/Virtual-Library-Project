import { IBook } from '../../shared/interfaces/IBook'
import './index.css'

interface BookCardProps {
  book: IBook
}

const BookCard = ({book}: BookCardProps) => {
  return (
    <div className='book-card'>
        <h1>{book.title}</h1>
    </div>
  )
}

export default BookCard