import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { IBook } from "../../shared/interfaces/IBook"
import { findAllBooks } from "../../shared/methods/book/FindAllBooks"
import { findAllAvailableBooks } from "../../shared/methods/book/FindAllAvailableBooks"
import { findAllUnavailableBooks } from "../../shared/methods/book/FindAllUnavailableBooks"
import BookCard from "../../components/BookCard"
import Alert from "../../components/Alert"
import LoadingPage from "../LoadingPage"

const BookList = () => {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)

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


  return (
    !isLoading ? <div className="book-list">
      {books.map((book) =>
        <BookCard book={book} />
      )}

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </div> 
    
    :
    
    <LoadingPage/>
  )
}

export default BookList