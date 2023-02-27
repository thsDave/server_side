<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Ajax reload</title>

		<?php require_once 'master/header.php'; ?>

	</head>
	<body>

		<?php require_once 'master/navbar.php'; ?>

		<div class="container">
			<div class="row mt-4">
				<div class="col-12">
					<h3>Ajax reload</h3>
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-12">
					<button type="button" class="btn btn-sm btn-success" id="modal_form" data-toggle="modal" data-target="#modal_person">
						<i class="fa-solid fa-plus"></i> Nuevo registro
					</button>
					<button type="button" class="btn btn-sm btn-secondary" id="exe">
						<i class="fa-solid fa-plus"></i> Nuevo aleatorio
					</button>
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-12">
					<table id="tbl_personas" class="table table-striped table-condensed">
						<thead class="table-dark">
							<tr>
								<th>idpersona</th>
								<th>nombres</th>
								<th>apellidos</th>
								<th>telefono</th>
								<th>acciones</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>

		<div class="modal fade" tabindex="-1" id="modal_person" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header text-white">
						<h5 class="modal-title"></h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true" class="text-white">&times;</span>
						</button>
					</div>
					<form id="form_person">
						<div class="modal-body">
							<div class="form-group">
								<label for="nombres">Nombres</label>
								<input type="text" class="form-control" name="nombres" id="nombres" placeholder="nombres" required>
							</div>
							<div class="form-group">
								<label for="apellidos">Apellidos</label>
								<input type="text" class="form-control" name="apellidos" id="apellidos" placeholder="apellidos" required>
							</div>
							<div class="form-group">
								<label for="telefono">Teléfono</label>
								<input type="number" class="form-control" name="telefono" id="telefono" placeholder="N° de teléfono" min="60000000" max="79999999" required>
							</div>
						</div>
						<div class="modal-footer">
							<button type="submit" class="btn btn-sm btn-primary">Guardar</button>
							<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal" id="clean_form">Cancelar</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<?php require_once 'master/footer.php'; ?>

		<script src="js/ajax_reload.js"></script>

	</body>
</html>