import './index.css'

const BookForm = () => {
    return (
        <div className='book-form'>
            <h1>Cadastro de Livro</h1>

            <form className="row g-3 needs-validation" method="post" action="cadastro-livro">
                <div className="col-md-4">
                    <label className="form-label">Nome:</label>
                    <input type="text" className="form-control" id="nomeLivro" name="nome-livro" required />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Autor:</label>
                    <input type="" className="form-control" id="autorLivro" name="autor-livro" required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Data de criação:</label>
                    <input type="date" className="form-control" id="dataCriacao" name="data-criacao" required />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Status do livro:</label>
                    <select className="form-select" id="statusLivro" name="status-livro" required>
                        <option selected disabled value="">Selecione uma opção</option>
                        <option value="Disponivel">Disponível</option>
                        <option value="Emprestado">Emprestado</option>
                        <option value="Indisponivel">Indisponível</option>
                    </select>
                </div>

                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Cadastrar livro</button>
                </div>
            </form>
        </div>
    )
}

export default BookForm