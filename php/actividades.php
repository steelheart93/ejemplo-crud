<?php
include "conexion.php";

$conexionbd = conectar_bd();
if (isset($_GET["create"])) {
    $json = json_decode($_GET["create"]);
    $query = "INSERT INTO actividades (fecha, actividad) VALUES ('$json->fecha', '$json->actividad');";
    $mensaje = (mysqli_query($conexionbd, $query)) ? "exito en create" : "error en create";
    echo $mensaje, " de la tabla actividades";
} else if (isset($_GET["read"])) {
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
    echo "update";
} else if (isset($_GET["delete"])) {
    echo "delete";
} else {
    echo "Error en el CRUD de Actividades";
}
mysqli_close($conexionbd);
