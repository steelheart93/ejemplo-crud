<?php
include "conexion.php";

$conexionbd = conectar_bd();
if (isset($_GET["create"])) {
    create();
} else if (isset($_GET["read"])) {
    read();
} else if (isset($_GET["readAll"])) {
    readAll();
} else if (isset($_GET["update"])) {
    update();
} else if (isset($_GET["delete"])) {
    delete();
} else if (isset($_GET["deleteAll"])) {
    deleteAll();
} else {
    echo "Error en el CRUD de Actividades";
}
mysqli_close($conexionbd);

function create()
{
    global $conexionbd;
    $json = json_decode($_GET["create"]);
    $query = "INSERT INTO actividades (fecha, actividad) VALUES ('$json->fecha', '$json->actividad');";
    $mensaje = (mysqli_query($conexionbd, $query)) ? "exito" : "error";
    echo $mensaje, " en create de la tabla actividades";
}

function read()
{
    global $conexionbd;
    $llave = json_decode($_GET["read"]);
    $query = "SELECT fecha, actividad FROM actividades WHERE llave=$llave";
    $resultado = mysqli_query($conexionbd, $query);
    $json = mysqli_fetch_assoc($resultado);
    echo json_encode($json);
}

function readAll()
{
    global $conexionbd;
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
}

function update()
{
    global $conexionbd;
    $json = json_decode($_GET["update"]);
    $query = "UPDATE actividades SET fecha='$json->fecha', actividad='$json->actividad' WHERE llave=$json->llave;";
    $mensaje = (mysqli_query($conexionbd, $query)) ? "exito" : "error";
    echo $mensaje, " en update de la tabla actividades";
}

function delete()
{
    global $conexionbd;
    $llave = json_decode($_GET["delete"]);
    $query = "DELETE FROM actividades WHERE llave=$llave";
    $mensaje = (mysqli_query($conexionbd, $query)) ? "exito" : "error";
    echo $mensaje, " en delete de la tabla actividades";
}

function deleteAll()
{
    global $conexionbd;
    $query = "TRUNCATE TABLE actividades";
    $mensaje = (mysqli_query($conexionbd, $query)) ? "exito" : "error";
    echo $mensaje, " en deleteAll de la tabla actividades";
}
