import { useNavigate } from 'react-router-dom'
import { IBook } from '../../shared/interfaces/IBook'
import './index.css'
import { useEffect, useState } from 'react'
import { deleteBook } from '../../shared/methods/book/DeleteBook'
import TextField from '../TextField'
import Button from '../Button'
import CoverImage from '../CoverImage'

interface BookCardProps {
  book: IBook
  onAction: () => void
  onDelete: (alertTitle: string, alertMessage: string) => void
  page?: string[]
}

const BookCard = ({ book, onAction, onDelete, page = [] }: BookCardProps) => {
  const navigate = useNavigate()

  const [onBookDelete, setOnBookDelete] = useState(false)

  useEffect(() => {
    const fetchBookDelete = async () => {
      await deleteBook(
        book.id,
        (alertTitle, alertMessage) => {
          onDelete(alertTitle, alertMessage)
        }
      )
    }

    if (onBookDelete) {
      fetchBookDelete()
    }

  }, [onBookDelete])

  return (
    <div className='book-card'>
      <img
        className='edit'
        alt='Editar os dados do livro.'
        src='/images/edit.png'
        onClick={() => navigate("/updateBook/" + book.id, { state: { from: page[0], filter: page[1] } })}
      />

      <h1>{book.title}</h1>

      <TextField label='Autor'>{book.author}</TextField>
      <TextField label='Data de Publicação'>{book.publishingDate.split("-").reverse().join("/")}</TextField>
      <TextField label='Total de copias'>{book.copysTotal.toString()}</TextField>
      <TextField label='Copias Disponiveis'>{book.availableCopys.toString()}</TextField>
      <TextField label='Copias Indisponiveis'>{(book.copysTotal - book.availableCopys).toString()}</TextField>
      <TextField label='Disponibilidade'>{book.available ? "Disponivel" : "Indisponivel"}</TextField>

      <img
        className='delete'
        alt='Deletar livro.'
        src='/images/delete.png'
        onClick={() => setOnBookDelete(true)}
      />

      <div className='cover-div'>
        <CoverImage image={book.cover} />
      </div>


      <div className='bottom'>
        <Button
          isLoading={false}
          height={30}
          fontSize={15}
          borderRadius={7}
          onClick={onAction}

        >{book.available ? "Indisponibilizar Livro" : "Disponibiliar Livro"}</Button>
      </div>
    </div>
  )
}

export default BookCard