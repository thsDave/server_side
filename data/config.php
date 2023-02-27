<?php

const URL = 'http://localhost/server_side/';

const DB_SOCKET		= '';
const DB_HOST 		= 'localhost';
const DB_USER		= 'root';
const DB_PWD 		= '';
const DB_NAME 		= 'db_serverside';
const DB_PORT 		= 3306;
const DB_CHARSET 	= 'utf8';

function load($req = null, $val = null)
{
	if (is_null($req)) {
		$url = URL;
	}elseif (is_null($val)) {
		$url = URL.$req;
	}else {
		$url = URL.$req.'?val='.$val;
	}

	header("Location: {$url}");
}

date_default_timezone_set('America/El_Salvador');