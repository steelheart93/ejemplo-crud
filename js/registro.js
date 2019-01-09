$(function () {
    var activity;
    var indice = 0;
    var objetos = [];
    var f = new Date();
    var dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    var fecha = dias[f.getDay()] + " " + f.toLocaleDateString() + ", " + f.toTimeString() + ".";

    read();
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
        var key = "";

        Object.keys(localStorage).forEach(function (clave) {
            var json = JSON.parse(localStorage.getItem(clave));
            if (index == json.i) key = clave;
        });

        var valor = prompt("Modificar", JSON.parse(localStorage.getItem(key)).value);
        localStorage.setItem(key, JSON.stringify({ i: index, value: valor }));
        location.reload();
    });

    $("#registrar").click(function () {
        if (confirm("¿Desea registrar la actividad de hoy?")) {
            while (activity == null) {
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

function read() {
    var promesaRead = $.get("php/actividades.php", "read");

    promesaRead.done(function (respuesta) {
        var json = JSON.parse(respuesta);

        for (activity of json) {
            var html = `<tr> <td class='index'>${activity.llave}</td>`;
            html += `<td class='date'>${activity.fecha}</td> <td>${activity.actividad}</td> </tr>`;
            document.getElementById("tbody").innerHTML += html;
        }
    });

    promesaRead.fail(function (respuesta) {
        alert("¡Error en promesaRead!");
        console.log(respuesta);
    });
}