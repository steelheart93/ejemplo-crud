<?php
include "conexion.php";

$conexionbd = conectar_bd();
if (isset($_GET["create"])) {
    $json = json_decode($_GET["create"]);
    $query = "INSERT INTO actividades (fecha, actividad) VALUES ('$json->fecha', '$json->actividad');";
    $mensaje = (mysqli_query($conexionbd, $query)) ? "exito en create" : "error en create";
    echo $mensaje, " de la tabla actividades";
} else if (isset($_GET["read"])) {
    $llave = json_decode($_GET["read"]);
    $query = "SELECT fecha, actividad FROM actividades WHERE llave=$llave";
    $resultado = mysqli_query($conexionbd, $query);
    $json = mysqli_fetch_assoc($resultado);
    echo json_encode($json);
} else if (isset($_GET["readAll"])) {
    $query = "SELECT llave, fecha, actividad FROM actividades ORDER BY llave DESC";
    $resultado = mysqli_query($conexionbd, $query);

    $json = [];
    while ($fila = mysqli_fetch_assoc($resultado)) {
        $llave = $fila['llave'];
        $fecha = $fila['fecha'];
        $actividad = $fila['actividad'];

        $objeto['llave'] = $llave;
        $objeto['fecha'] = $fecha;
        $objeto['actividad'] = $actividad;

        array_push($json, $objeto);
    }
    echo json_encode($json);
} else if (isset($_GET["update"])) {
    $json = json_decode($_GET["update"]);
    $query = "UPDATE actividades SET fecha='$json->fecha', actividad='$json->actividad' WHERE llave=$json->llave;";
    $mensaje = (mysqli_query($conexionbd, $query)) ? "exito en update" : "error en update";
    echo $mensaje, " de la tabla actividades";
} else if (isset($_GET["delete"])) {
    echo "delete";
} else if (isset($_GET["deleteAll"])) {
    echo "deleteAll";
} else {
    echo "Error en el CRUD de Actividades";
}
mysqli_close($conexionbd);
