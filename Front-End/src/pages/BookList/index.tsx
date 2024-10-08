import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { IBook } from "../../shared/interfaces/IBook"
import { findAllBooks } from "../../shared/methods/book/FindAllBooks"
import { findAllAvailableBooks } from "../../shared/methods/book/FindAllAvailableBooks"
import { findAllUnavailableBooks } from "../../shared/methods/book/FindAllUnavailableBooks"
import BookCard from "../../components/BookCard"
import Alert from "../../components/Alert"
import LoadingPage from "../LoadingPage"
import Input from "../../components/Input"
import Select from "../../components/Select"
import './index.css'
import { makeBookUnavailable } from "../../shared/methods/book/MakeBookUnavailable"
import { makeBookAvailable } from "../../shared/methods/book/MakeBookAvailable"

const BookList = () => {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)

  const [search, setSearch] = useState("")

  const [books, setBooks] = useState<IBook[]>([])

  const [selectedBookId, setSelectedBookId] = useState("")

  const [actionType, setActionType] = useState<"delete" | "reactivate" | "">("")

  const filters = [
    "Todos os livros",
    "Somente livros disponiveis",
    "Somente livros indisponiveis",
  ]

  const [filterChange, setFilterChange] = useState(false)

  const [filter, setFilter] = useState(filters[0])

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const handleFilterSelected = (filterSelected: string) => {
    setIsLoading(true)
    setFilterChange(true)
    setFilter(filterSelected)
  }

  const handleButtonClick = (bookId: string, active: boolean) => {
    setSelectedBookId(bookId)

    if (active) {
      setActionType("delete")

    } else {
      setActionType("reactivate")
    }
  }

  const handleUserDelete = (alertTitle: string, alertMessage: string) => {
    handleFilterSelected(filter)

    setAlertTitle(alertTitle)
    setAlertMessage(alertMessage)

    setIsAlertOpen(true)
  }

  const fetchBooks = async (selectedFilter: string) => {
    var success = false

    if (selectedFilter == filters[0]) {
      success = await findAllBooks(
        setBooks,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )

    } else if (selectedFilter == filters[1]) {
      success = await findAllAvailableBooks(
        setBooks,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )

    } else if (selectedFilter == filters[2]) {
      success = await findAllUnavailableBooks(
        setBooks,
        (errorTitle, errorMessage) => {
          if (errorTitle != null && errorMessage != null) {
            setAlertTitle(errorTitle)
            setAlertMessage(errorMessage)
          }
        }
      )

    }

    setFilterChange(false)

    if (!success) {
      setIsLoading(false)
      setIsAlertOpen(true)

    } else {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (location.state && location.state.filter) {
      setFilter(location.state.filter)
    }
  }, [location.state]);

  useEffect(() => {
    fetchBooks(filter)
  }, [filterChange])

  useEffect(() => {
    const fetchDelete = async () => {
      const success = await makeBookUnavailable(
        selectedBookId,
        (alertTitle, alertMessage) => {
          setAlertTitle(alertTitle)
          setAlertMessage(alertMessage)
        }
      )

      if (success) {
        setIsLoading(true)

        fetchBooks(filter)
      }

      setIsAlertOpen(true)

      setActionType("")
    }

    if (actionType == "delete") {
      fetchDelete()
    }
  }, [actionType])

  useEffect(() => {
    const fetchReactivate = async () => {
      const success = await makeBookAvailable(
        selectedBookId,
        (alertTitle, alertMessage) => {
          setAlertTitle(alertTitle)
          setAlertMessage(alertMessage)
        }
      )

      if (success) {
        setIsLoading(true)

        fetchBooks(filter)
      }

      setIsAlertOpen(true)

      setActionType("")
    }

    if (actionType == "reactivate") {
      fetchReactivate()
    }
  }, [actionType])


  return (
    !isLoading ? <div className="book-list">
      <div className='search'>
        <Input value={search} onAlterado={value => setSearch(value)} placeHolder='Procurar livro pelo titulo,autor ou data de publicação' height={20} width={140} />
      </div>

      <h4 className='warning'>*ao clicar para excluir um livro, ele será permanentemente removido e não poderá ser recuperado!</h4>

      <div className='filter'>
        <Select placeholder={filter} options={filters} onOptionSelected={handleFilterSelected} />
      </div>

      {books.length > 1 ?
        <>
          <h1 className='title'>Livros</h1>

          <div className="books">
            {books.map((book) => (
              (
                book.title.toUpperCase().includes(search.toUpperCase()) ||
                book.author.toUpperCase().includes(search.toUpperCase()) ||
                book.publishingDate.split("-").reverse().join("/").toUpperCase().includes(search.toUpperCase())) &&
              <BookCard
                book={book}
                onAction={() => handleButtonClick(book.id, book.available)}
                onDelete={(alertTitle, alertMessage) => handleUserDelete(alertTitle, alertMessage)}
                page={[location.pathname, filter]}
              />
            ))}
          </div>

        </> :

        <h1 className='title'>
          Sem Livros

          {
            filter == filters[0] ? " cadastrados!" :
              filter == filters[1] ? " disponiveis!" :
                filter == filters[2] ? " indisponiveis!" : ""}
        </h1>
      }

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </div>

      :

      <LoadingPage />
  )
}

export default BookList