$(function () {
    var indice = 0;

    _readAll();
    cargarMusic();
    setInterval(function () {
        var f = new Date();
        var fecha = dias[f.getDay()] + " " + f.toLocaleDateString() + ", " + f.toTimeString() + ".";
        $("#date").text(fecha);
    }, 1000);


    $("#eliminar").click(function () {
        var index = prompt("INDEX OR TRUNCATE", "# OR TRUNCATE");
        if (index.toLowerCase() == "truncate") {
            _deleteAll();
        } else {
            _delete(index);
        }
        _readAll();
    });

    $("#modificar").click(function () {
        var index = prompt("INDEX", "#");
        var promesa = _read(index);

        promesa.done(function (respuesta) {
            var json = JSON.parse(respuesta);

            var date = prompt("Fecha & Hora", json.fecha);
            var activity = prompt("Actividad & Observaciones", json.actividad);

            var json = { "llave": index, "fecha": date, "actividad": activity };
            var cadena = JSON.stringify(json);

            _update(cadena);
            _readAll();
        });
    });

    $("#registrar").click(function () {
        if (confirm("¿Desea registrar la actividad de hoy?")) {
            var activity = "";
            while (activity == "") {
                activity = prompt("Actividad & Observaciones");
            }

            var d = new Date();
            var date = dias[d.getDay()] + " " + d.toLocaleDateString() + ", " + d.toLocaleTimeString();
            date = prompt("Fecha & Hora", date);

            var json = { "fecha": date, "actividad": activity };
            var cadena = JSON.stringify(json);

            _create(cadena);
            _readAll();
        } else {
            alert("¡Sí no lo intentas la probabilidad de fallar es del 100%!");
        }
    });

    $("#atras").click(function () {
        (indice <= 0) ? indice = music.length - 1 : indice--;
        $("#marco").attr("src", music[indice]);
    });

    $("#adelante").click(function () {
        (indice >= music.length - 1) ? indice = 0 : indice++;
        $("#marco").attr("src", music[indice]);
    });

    if (!navigator.onLine) {
        $("#atras, #adelante").css("display", "none");
    }
});

var music = [];
var dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");

function cargarMusic() {
    var promesaEmisoras = $.get("php/emisoras.php");

    promesaEmisoras.done(function (respuesta) {
        var json = JSON.parse(respuesta);

        for (emisora of json) {
            music.push(emisora["ruta"]);
        }
    });

    promesaEmisoras.fail(function (respuesta) {
        alert("¡Error en promesaEmisoras!");
        console.log(respuesta);
    });
}

function _create(cadenaJSON) {
    $.get("php/actividades.php", { "create": cadenaJSON }, function (respuesta) {
        console.log(respuesta);
    });
}

function _read(llave) {
    var promesaRead = $.get("php/actividades.php", { "read": llave });
    return promesaRead;
}

function _readAll() {
    setTimeout(function () {
        var promesaReadAll = $.get("php/actividades.php", "readAll");

        promesaReadAll.done(function (respuesta) {
            var json = JSON.parse(respuesta);

            var html = "";
            for (activity of json) {
                html += `<tr> <td class='index'>${activity.llave}</td>`;
                html += `<td class='date'>${activity.fecha}</td>`
                html += ` <td>${activity.actividad}</td> </tr>`;
            }
            document.getElementById("tbody").innerHTML = html;
        });

        promesaReadAll.fail(function (respuesta) {
            alert("¡Error en promesaReadAll!");
            console.log(respuesta);
        });
    }, 1000);
}

function _update(cadenaJSON) {
    $.get("php/actividades.php", { "update": cadenaJSON }, function (respuesta) {
        console.log(respuesta);
    });
}

function _delete(llave) {
    $.get("php/actividades.php", { "delete": llave }, function (respuesta) {
        console.log(respuesta);
    });
}

function _deleteAll() {
    $.get("php/actividades.php", "deleteAll", function (respuesta) {
        console.log(respuesta);
    });
}