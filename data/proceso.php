<?php

require_once 'Modelo.php';

if (isset($_POST['add'])) { echo json_encode($model->agregar_registro($_POST['mnsj'], "clave123")); }

if (isset($_POST['insert_rand']))
{
	$nombres = "{$model->get_nombre(rand(1,100))} {$model->get_nombre(rand(1,100))}";
	$apellidos = "{$model->get_apellido(rand(1,100))} {$model->get_apellido(rand(1,100))}";

	$datos = [
		'nombres' => $nombres,
		'apellidos' => $apellidos,
		'telefono' => $model->get_telefono(rand(1,100))
	];

	$res = $model->insertar_persona($datos);

	echo ($res) ? json_encode($res) : json_encode(false);
}

if (isset($_POST['opcion']))
{
	$opcion = (isset($_POST['opcion'])) ? preg_replace('([^0-9])', '', trim($_POST['opcion'])) : false;

	switch ($opcion) {
		case 1: // C -> nueva persona
			$datos['nombres'] = (isset($_POST['nombres'])) ? preg_replace('([^A-Za-zÁ-ź ])', '', trim($_POST['nombres'])) : null;
			$datos['apellidos'] = (isset($_POST['apellidos'])) ? preg_replace('([^A-Za-zÁ-ź ])', '', trim($_POST['apellidos'])) : null;
			$datos['telefono'] = (isset($_POST['telefono'])) ? preg_replace('([^0-9])', '', trim($_POST['telefono'])) : null;

			echo (!in_array(null, $datos)) ? json_encode($model->insertar_persona($datos)) : json_encode(false);
		break;

		case 2: // R -> listar personas
			echo json_encode($model->listar_personas());
		break;

		case 3: // U -> actualizar persona
			$datos['idpersona'] = (isset($_POST['idpersona'])) ? preg_replace('([^0-9])', '', trim($_POST['idpersona'])) : null;
			$datos['nombres'] = (isset($_POST['nombres'])) ? preg_replace('([^A-Za-zÁ-ź ])', '', trim($_POST['nombres'])) : null;
			$datos['apellidos'] = (isset($_POST['apellidos'])) ? preg_replace('([^A-Za-zÁ-ź ])', '', trim($_POST['apellidos'])) : null;
			$datos['telefono'] = (isset($_POST['telefono'])) ? preg_replace('([^0-9])', '', trim($_POST['telefono'])) : null;

			$_SESSION['datos'] = $datos;

			echo (!in_array(null, $datos)) ? json_encode($model->actualizar_persona($datos)) : json_encode(false);
		break;

		case 4: // D -> Eliminar persona
			$datos['idpersona'] = (isset($_POST['idpersona'])) ? preg_replace('([^0-9])', '', trim($_POST['idpersona'])) : null;

			echo (!in_array(null, $datos)) ? json_encode($model->eliminar_persona($datos)) : json_encode(false);
		break;

		default:
			return false;
		break;
	}

}