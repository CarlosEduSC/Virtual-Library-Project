const UpdateUsuario = () => {
  return (
    <div>
        <head>
		
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css" rel="stylesheet"/>
        
		<title>Atualizar Usuario</title>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>
	</head>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
		  <div className="container-fluid">
		    <a className="navbar-brand" href="#">Menu</a>
		    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
		      <span className="navbar-toggler-icon"></span>
		    </button>
		    <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
		      <ul className="navbar-nav">
		        <li className="nav-item dropdown">
		          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		            Opções Usuario
		          </a>
		          <ul className="dropdown-menu dropdown-menu-dark">
		            <li><a className="dropdown-item" href="CadastroUsuario.jsp">Cadastrar usuario</a></li>
		            <li><a className="dropdown-item" href="findUser.jsp">Atualizar dados de um usuario</a></li>
		            <li><a className="dropdown-item" href="ListaUsuarios.jsp">Lista de usuarios</a></li>
		          </ul>
		        </li>
		        <li className="nav-item dropdown">
		        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		          Opções Livro
		        </a>
		        <ul className="dropdown-menu dropdown-menu-dark">
		         	<li><a className="dropdown-item" href="CadastroLivro.jsp">Cadastrar livro</a></li>
		          	<li><a className="dropdown-item" href="findBook.jsp">Atualizar dados de um livro</a></li>
		          	<li><a className="dropdown-item" href="ListaLivrosAdmin.jsp">Lista de livros</a></li>
		        </ul>
		      </li>
		      </ul>
		    </div>
		  </div>
		</nav>
		
	
		<h1>Atualizar Usuario</h1>
		
		<form className="row g-3 needs-validation" >
			<div className="col-md-4">
				<label  className="form-label">Nome:</label>
				<input type="text" className="form-control" id="nomeUsuario" name="nome-usuario" value="<%= u.getNome() %>" required/>
			</div>
			
			<div className="col-md-4">
				<label  className="form-label">Email:</label>
				<input type="email" className="form-control" id="emailUsuario" name="email-usuario" value="<%= u.getEmail() %>" required/>
			</div>

			<div className="col-md-6">
				<label  className="form-label">Senha:</label>
				<input type="password" className="form-control" id="senhaUsuario" name="senha-usuario" value="<%= u.getSenha() %>" required/>
			</div>

			<div className="col-md-3">
				<label  className="form-label">Tipo de Usuario:</label>
				<select className="form-select" id="tipoUsuario" name="tipo-usuario" required>
					<option selected disabled value="">Selecione uma opção</option>
					<option value="Administrador">Administrador</option>
					<option value="Aluno">Aluno</option>
				</select>
			</div>
			
			<div className="col-12">
				<button className="btn btn-primary" type="submit">Atualizar usuario</button>
			</div>
		</form>
    </div>
  )
}

export default UpdateUsuario