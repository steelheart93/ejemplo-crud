<?php
function conectar_bd()
{
    $server = "localhost";
    $user = "root";
    $pass = "";
    $nombrebd = "registro";

    return mysqli_connect($server, $user, $pass, $nombrebd);
}
