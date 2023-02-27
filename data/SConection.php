<?php

	require_once 'config.php';

	class SConection
	{
		private $socket;
	    private $host;
    	private $user;
    	private $pwd;
    	private $db;
    	private $port;
    	private $charset;
	    private $con;

	    public function __construct()
	    {
	    	$this->socket = DB_SOCKET;
	    	$this->host = DB_HOST;
	    	$this->user = DB_USER;
	    	$this->pwd = DB_PWD;
	    	$this->db = DB_NAME;
	    	$this->port = DB_PORT;
	    	$this->charset = DB_CHARSET;
	    }

	    public function connect()
	    {
	    	try
	    	{
	    		$mysql = ($this->socket == '') ? 'host='.$this->host : 'unix_socket='.$this->socket;

	    		$str_connect = "mysql:{$mysql};dbname={$this->db};port={$this->port};charset={$this->charset}";

	    		$options = [
	    			PDO::ATTR_PERSISTENT => true,
	    			PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
	    		];

	    		$this->con = new PDO($str_connect, $this->user, $this->pwd, $options);

    			return $this->con;
	    	}
	    	catch (PDOException $e)
	    	{
	    		load('err_db.php', utf8_encode($e->getMessage()));
	    	}
	    }
	}