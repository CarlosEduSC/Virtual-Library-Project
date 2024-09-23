const ListaUsuarios = () => {
    return (
        <div>
            <head>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" />
                <link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css" rel="stylesheet" />

                <title>Lista de Usuarios</title>

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
	
		
		
		<h1>Lista de Usuarios</h1>
		
		<table className="table">
				<thead>
					<tr>
					<th scope="col">Id</th>
					<th scope="col">Nome</th>
					<th scope="col">Email</th>
					<th scope="col">Tipo de Usuario</th>
					</tr>
				</thead>
				
				<tbody>
					<tr>
						<th scope="row"></th>
						<td>Id</td>
						<td>Nome</td>
						<td>Email</td>
						<td>Tipo</td>
						<td>
	          				<a href="deleta-usuario?idUsuario=<%= u.getId()%>">Deletar</a>
			  			</td>
					</tr>
				</tbody>
		</table>
        </div>
    )
}

export default ListaUsuarios