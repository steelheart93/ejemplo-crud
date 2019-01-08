<?php
include "conexion.php";

$consulta = $_GET["consulta"];


// Si la consulta es la opcion de listar
$conexionbd = conectar_bd();
$query = "SELECT id, ruta, nombre FROM emisoras";

mysqli_query($conexionbd, "SET NAMES 'utf8'");
$resultado = mysqli_query($conexionbd, $query);

$json = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $id = $fila['id'];
    $ruta = $fila['ruta'];
    $nombre = $fila['nombre'];

    $objeto['id'] = $id;
    $objeto['ruta'] = $ruta;
    $objeto['nombre'] = $nombre;

    array_push($json, $objeto);
}
echo json_encode($json);

mysqli_close($conexionbd);
