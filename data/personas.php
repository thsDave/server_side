<?php

require 'TableData.php';

$campos = [
	'idpersona',
	'nombres',
	'apellidos',
	'telefono'
];

$table_data->get('vista_personas','idpersona', $campos);