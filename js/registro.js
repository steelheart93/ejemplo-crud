$(function () {
    var activity;
    var indice = 0;
    var f = new Date();
    var dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var fecha = dias[f.getDay()] + " " + f.toLocaleDateString() + ", " + f.toTimeString() + ".";

    readAll();
    $("#date").text(fecha);

    $("#eliminar").click(function () {
        var index = prompt("INDEX OR CLEAR", "# OR CLEAR");
        if (index.toLowerCase() == "clear") {
            localStorage.clear();
        } else {
            var key = "";

            Object.keys(localStorage).forEach(function (clave) {
                var json = JSON.parse(localStorage.getItem(clave));
                if (index == json.i) key = clave;
            });

            localStorage.removeItem(key);

            Object.keys(localStorage).forEach(function (clave) {
                var json = JSON.parse(localStorage.getItem(clave));

                if (index < json.i) {
                    json.i--;
                    localStorage.setItem(clave, JSON.stringify(json));
                }
            });
        }
        location.reload();
    });

    $("#modificar").click(function () {
        var index = prompt("INDEX", "#");
        
        alert(read(index));


        //date = prompt("Fecha & Hora", date);
        //activity = prompt("Actividad & Observaciones", activity);

        //var json = { "llave": index, "fecha": date, "actividad": activity };
        //var cadena = JSON.stringify(json);

        //update(cadena);
        //location.reload();
    });

    $("#registrar").click(function () {
        if (confirm("¿Desea registrar la actividad de hoy?")) {
            while (activity == null || activity == "") {
                activity = prompt("Actividad & Observaciones");
            }

            var date = dias[f.getDay()] + " " + f.toLocaleDateString() + ", " + f.toLocaleTimeString();
            date = prompt("Fecha & Hora", date);

            var json = { "fecha": date, "actividad": activity };
            var cadena = JSON.stringify(json);

            create(cadena);
            location.reload();
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

    cargarMusic();
});

var music = [];
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

function create(cadenaJSON) {
    $.get("php/actividades.php", { "create": cadenaJSON }, function (respuesta) {
        alert(respuesta);
    });
}

function read(llave) {
    var r;
    $.get("php/actividades.php", { "read": llave }, function (respuesta) {
        r = respuesta;
    });

    return r;
}

function readAll() {
    var promesaReadAll = $.get("php/actividades.php", "readAll");

    promesaReadAll.done(function (respuesta) {
        var json = JSON.parse(respuesta);

        for (activity of json) {
            var html = `<tr> <td class='index'>${activity.llave}</td>`;
            html += `<td class='date'>${activity.fecha}</td> <td>${activity.actividad}</td> </tr>`;
            document.getElementById("tbody").innerHTML += html;
        }
    });

    promesaReadAll.fail(function (respuesta) {
        alert("¡Error en promesaReadAll!");
        console.log(respuesta);
    });
}

function update(cadenaJSON) {
    $.get("php/actividades.php", { "update": cadenaJSON }, function (respuesta) {
        alert(respuesta);
    });
}