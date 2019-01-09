<?php
include "conexion.php";

$conexionbd = conectar_bd();

$query = "SELECT ruta FROM emisoras";
$resultado = mysqli_query($conexionbd, $query);

$json = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $ruta = $fila['ruta'];

    $objeto['ruta'] = $ruta;

    array_push($json, $objeto);
}
echo json_encode($json);

mysqli_close($conexionbd);
