import { useEffect, useState } from "react"
import BaseForm from "../../components/BaseForm"
import FormTitle from "../../components/FormTitle"
import Input from "../../components/Input"
import { IBook } from "../../shared/interfaces/IBook"
import Alert from "../../components/Alert"
import Button from "../../components/Button"
import './index.css'
import { createBook } from "../../shared/methods/book/CreateBook"
import { useLocation, useNavigate } from "react-router-dom"

const CreateBook = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [book, setBook] = useState<IBook>()
  const [title, setTitle] = useState("")
  const [publishingDate, setPublishingDate] = useState("")
  const [author, setAuthor] = useState("")
  const [cover, setCover] = useState("")
  const [copysTotal, setcCopyTotal] = useState(0)

  const [coverURl, setCoverURL] = useState("./images/base-image.jpg")

  const [isLoading, setIsLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [successState, setSuccessState] = useState(false)

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCoverChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const base64 = await convertToBase64(file);
      setCover(base64)
      setCoverURL(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    const fetchSubmit = async () => {
      if (book) {
        const success = await createBook(
          book,
          (alertTitle, alertMessage) => {
            setAlertTitle(alertTitle)
            setAlertMessage(alertMessage)
          }
        )

        if (success) {
          setIsLoading(false)

          setSuccessState(true)

        } else {
          setIsLoading(false)

          setIsAlertOpen(true)
        }
      }
    }

    if (submit) {
      fetchSubmit()
    }

  }, [submit, book])

  useEffect(() => {
    if (successState) {
      const stateData = {
        from: location,
        alertTitle,
        alertMessage
      };

      navigate(location.state.from, { state: stateData, replace: true });
    }
  }, [successState, alertTitle, alertMessage, navigate, location]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)

    const bookData: IBook = {
      id: "",
      title,
      publishingDate: publishingDate.split("-").reverse().join("/"),
      author,
      cover,
      copysTotal,
      availableCopys: copysTotal,
      available: true
    }

    setBook(bookData)
    setSubmit(true)
  }

  return (
    <BaseForm onSubmit={handleSubmit}>
      <FormTitle>Preencha os campos abaixo para cadastrar um novo livro.</FormTitle>

      <Input value={title} label="Titulo" placeHolder="Digite o titulo do livro" onAlterado={value => setTitle(value)} />

      <Input value={author} label="Autor" placeHolder="Digite o nome do autor" onAlterado={value => setAuthor(value)} />

      <div className="bottom-line">
        <Input value={publishingDate} label="Data de publicação" type="date" width={25} onAlterado={value => setPublishingDate(value)} />

        <Input value={copysTotal.toString()} label="Numero de copias" type="number" width={20} onAlterado={value => setcCopyTotal(Number.parseInt(value))} />
      </div>

      <div className="cover">
        <h3 style={{ margin: "10px auto" }}>Selecionar capa do livro</h3>
        <img className="cover-img" src={coverURl} />

        <img className="image-select" alt="Selecionar capa do livro" src="./images/add-image.png" onClick={() => document.getElementById('image-input')?.click()} />

        <input id="image-input" type="file" onChange={handleCoverChange} style={{ display: "none" }} required={false} />
      </div>

      <Button isLoading={isLoading}>Cadastrar</Button>

      {isAlertOpen && <Alert title={alertTitle} message={alertMessage} onClose={() => setIsAlertOpen(false)} />}
    </BaseForm>
  )
}

export default CreateBook