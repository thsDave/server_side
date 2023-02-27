<?php
require_once 'Conexion.php';

class Modelo extends Conexion
{
	private function pst($query, $arr_data = [], $expect_values = true)
    {
        $pdo = parent::connect();
        $pst = $pdo->prepare($query);
        if ($pst->execute($arr_data)) {
            if ($expect_values)
                $res = $pst->fetchAll();
            else
                $res = true;
        }else {
            $res = false;
        }
        return $res;
    }

    public function agregar_registro($mnsj, $clave)
    {
    	return $this->pst("INSERT INTO entradas VALUES (NULL, aes_encrypt(:mnsj, :clave), NOW())", ['mnsj' => $mnsj, 'clave' => $clave], false);
    }

    public function get_nombre($idnombre)
    {
        $res = $this->pst("SELECT nombre FROM nombres WHERE idnombre = :id", ['id' => $idnombre]);

        return $res[0]->nombre;
    }

    public function get_apellido($idapellido)
    {
        $res = $this->pst("SELECT apellido FROM apellidos WHERE idapellido = :id", ['id' => $idapellido]);

        return $res[0]->apellido;
    }

    public function get_telefono($idtel)
    {
        $res = $this->pst("SELECT telefono FROM telefonos WHERE idtelefono = :id", ['id' => $idtel]);

        return $res[0]->telefono;
    }

    public function listar_personas()
    {
        return $this->pst("SELECT * FROM personas");
    }

    public function insertar_persona($datos)
    {
        $res = $this->pst("INSERT INTO personas VALUES (NULL, :nombres, :apellidos, :telefono)", $datos, false);

        if ($res) {
            $res = $this->pst("SELECT * FROM personas ORDER BY idpersona DESC LIMIT 1");

            return $res[0]->idpersona;
        }else {
            return false;
        }
    }

    public function actualizar_persona($datos)
    {
        return $this->pst("UPDATE personas SET nombres = :nombres, apellidos = :apellidos, telefono = :telefono WHERE idpersona = :idpersona", $datos, false);
    }

    public function eliminar_persona($datos)
    {
        return $this->pst("DELETE FROM personas WHERE idpersona = :idpersona", $datos, false);
    }
}

$model = new Modelo;