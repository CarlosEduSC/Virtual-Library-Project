import BaseForm from '../../components/BaseForm'
import FormTitle from '../../components/FormTitle'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Alert from '../../components/Alert'
import { IBook } from '../../shared/interfaces/IBook'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CoverSelect from '../../components/CoverSelect'
import { updateBook } from '../../shared/methods/book/UpdateBook'
import { findBookById } from '../../shared/methods/book/FindBookById'
import LoadingPage from '../LoadingPage'

const UpdateBook = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {bookId} = useParams()

  const [book, setBook] = useState<IBook>()
  const [title, setTitle] = useState("")
  const [publishingDate, setPublishingDate] = useState("")
  const [author, setAuthor] = useState("")
  const [cover, setCover] = useState("")
  const [copysTotal, setCopysTotal] = useState(0)
  const [borrowedCopys, setBorrowedCopys] = useState(0)
  const [available, setAvailable] = useState(true)

  const [navigateWithState, setNavigateWithState] = useState(false)

  const [isFormLoading, setIsFormLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [submit, setSubmit] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    const fetchBook = async () => {
      const success = await findBookById(
        bookId ?? "",
        (bookData) => {
          setTitle(bookData.title)
          setAuthor(bookData.author)
          setPublishingDate(bookData.publishingDate)
          setCover(bookData.cover)
          setCopysTotal(bookData.copysTotal)
          setBorrowedCopys(bookData.borrowedCopys)
          setAvailable(bookData.available)
        },
        (errorTitle, errorMessage) => {
          setAlertTitle(errorTitle)
          setAlertMessage(errorMessage)
        })

      if (success) {
        setIsPageLoading(false)

      } else {
        setNavigateWithState(true)
      }
    }

    if (bookId) {
      fetchBook()
    }
  }, [bookId])

  useEffect(() => {
    const fetchSubmit = async () => {
      if (book) {
        const success = await updateBook(
          book,
          (alertTitle, alertMessage) => {
            setAlertTitle(alertTitle)
            setAlertMessage(alertMessage)
          }
        )

        if (success) {
          setIsFormLoading(false)

          setNavigateWithState(true)

        } else {
          setIsFormLoading(false)

          setIsAlertOpen(true)
        }
      }
    }

    if (submit) {
      fetchSubmit()
    }

  }, [submit, book])

  useEffect(() => {
    if (navigateWithState) {
      const stateData = {
        from: location,
        alertTitle,
        alertMessage,
        filter: location.state.filter
      };

      navigate(location.state.from, { state: stateData, replace: true });
    }
  }, [navigateWithState, alertTitle, alertMessage, navigate, location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsFormLoading(true)

    const bookData: IBook = {
      id: bookId ?? "",
      title,
      publishingDate: publishingDate.split("-").reverse().join("/"),
      author,
      cover,
      copysTotal,
      availableCopys: copysTotal - borrowedCopys,
      borrowedCopys,
      available
    }

    setBook(bookData)
    setSubmit(true)
  }

  return (
    !isPageLoading ? <BaseForm onSubmit={handleSubmit}>
      <FormTitle>Preencha os campos abaixo para cadastrar um novo livro.</FormTitle>

      <Input value={title} label="Titulo" placeHolder="Digite o titulo do livro" onAlterado={value => setTitle(value)} />

      <Input value={author} label="Autor" placeHolder="Digite o nome do autor" onAlterado={value => setAuthor(value)} />

      <div className="bottom-line">
        <Input value={publishingDate} label="Data de publicação" type="date" width={25} onAlterado={value => setPublishingDate(value)} />

        <Input value={copysTotal.toString()} label="Numero de copias" type="number" min={borrowedCopys} width={20} onAlterado={value => setCopysTotal(Number.parseInt(value))} />
      </div>

      <CoverSelect image={cover} onCoverChange={image => setCover(image)} />

      <Button isLoading={isFormLoading}>Atualizar</Button>

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </BaseForm> 
    
    :
    <LoadingPage/>
  )
}

export default UpdateBook