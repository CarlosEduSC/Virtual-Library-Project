import { useState } from "react"
import BaseForm from "../../components/BaseForm"
import FormTitle from "../../components/FormTitle"
import Input from "../../components/Input"
import { IBook } from "../../shared/interfaces/IBook"

const CreateBook = () => {
  const [book, setBook] = useState<IBook>()
  const [title, setTitle] = useState("")
  const [publishingDate, setPublishingDate] = useState("")
  const [author, setAuthor] = useState("")
  const [cover, setCover] = useState("")
  const [copysTotal, setcCopyTotal] = useState(0)

  const [submit, setSubmit] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault
    
    const bookData: IBook = {
      id: "",
      title,
      publishingDate,
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

      <Input value={title} label="Titulo" placeHolder="Digite o titulo do livro" onAlterado={value => setTitle(value)}/>
    </BaseForm>
  )
}

export default CreateBook