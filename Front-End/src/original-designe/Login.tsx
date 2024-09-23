const Login = () => {
  return (
    <div>
        <head>
		
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
    	<link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css" rel="stylesheet"/>
    	
		<title>Login Biblioteca</title>
		
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"></script>
	</head>

    <h1>Login</h1>
		
		<form action="login" method="Post" className="row g-3 needs-validation">
			<div className="col-md-4">
				<label  className="form-label">Email:</label>
				<input type="email" className="form-control" id="email" name="login-email" required/>
			</div>

			<div className="col-md-6">
				<label className="form-label">Senha:</label>
				<input type="password" className="form-control" id="senha" name="login-senha" required/>
			</div>
			
			<div className="col-12">
				<button className="btn btn-primary" type="submit">Entrar</button>
			</div>
		</form>
    </div>
  )
}

export default Login