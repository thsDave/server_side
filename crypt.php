<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Encriptar datos</title>

		<?php require_once 'master/header.php'; ?>

	</head>
	<body>
		<?php require_once 'master/navbar.php'; ?>

		<div class="container">
			<div class="row mt-4">
				<div class="col-12">
					<h3>Encriptado de datos</h3>
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-12">
					<form id="form">
						<div class="form-group">
							<label for="mnsj">Mensaje</label>
							<input type="text" class="form-control" name="mnsj" id="mnsj" autofocus required>
						</div>
						<div class="form-group">
							<button type="submit" class="btn btn-primary">Enviar</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<?php require_once 'master/footer.php'; ?>

		<script src="js/proceso.js"></script>

	</body>
</html>