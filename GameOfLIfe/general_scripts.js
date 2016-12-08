$(function(){

	$(".Cell").click(function(){
		var fila = ($(this).attr("id")).split(",")[0];
        var columna = ($(this).attr("id")).split(",")[1];

		if($(this).hasClass("deadCell"))
		{
          $(this).removeClass("deadCell").addClass("lifeCell");
          tablero[fila][columna]=true;
		}
        else
        {
          $(this).removeClass("lifeCell").addClass("deadCell");     
          tablero[fila][columna]=false;  
        }
	});

});

var juego = true;
var filas = prompt("Numero de filas",20);
var columnas = prompt("Numero de columans",20);
var tablero = new Array(filas);

function crearTablero(){
	for (var i = 0; i < filas; i++) {
		var fila = '<tr class="fila"> </tr>';
		fila = $(fila);
		tablero[i] = new Array(columnas);
		var num = $("#tablero").append(fila);
		for (var j = 0; j < columnas; j++) {
			var celda = '<td id="'+i+','+j+'" class="Cell deadCell"> </td>';
			celda = $(celda);
			num.append(celda);
			tablero[i][j]=false;
		}

	}
}

function play(){
	juego=true;
	var tableroTemporal = new Array(filas);
	for (var i = 0; i < filas; i++) {
		tableroTemporal[i] = new Array(columnas);
	}

	setTimeout(function () {
		for (var f = 0; f < filas; f++) {
			
			for (var c = 0; c < columnas; c++) {
				
		        if (f == 0 && c == 0)
		            var cells = [ tablero[f][c + 1], tablero[f + 1][c + 1], tablero[f + 1][c] ];
		        else if (c == 0 && f!=filas-1)
		            var cells = [ tablero[f][c + 1], tablero[f + 1][c + 1], tablero[f + 1][c], tablero[f - 1][c + 1], tablero[f - 1][c] ];
		        else if (c == 0 && f == filas-1)
		            var cells = [ tablero[f][c + 1], tablero[f - 1][c + 1], tablero[f - 1][c] ];
		        else if (f == 0 && c!=columnas-1)
		            var cells = [ tablero[f][c - 1], tablero[f][c + 1], tablero[f + 1][c - 1], tablero[f + 1][c + 1], tablero[f + 1][c] ];
		        else if (f == 0 && c == columnas-1)
		            var cells = [ tablero[f][c - 1], tablero[f + 1][c - 1], tablero[f + 1][c] ];
		        else if (f == filas-1 && c == columnas-1)
		            var cells = [ tablero[f][c - 1], tablero[f - 1][c - 1], tablero[f - 1][c] ];
		        else if (c == columnas-1)
		            var cells = [ tablero[f][c - 1], tablero[f + 1][c - 1], tablero[f + 1][c], tablero[f - 1][c - 1], tablero[f - 1][c] ];
		        else if (f == filas-1)
		        	var cells = [ tablero[f][c - 1], tablero[f][c + 1], tablero[f - 1][c - 1], tablero[f - 1][c + 1], tablero[f - 1][c] ];
		        else
		           	var cells = [ tablero[f][c - 1], tablero[f][c + 1], tablero[f + 1][c - 1], tablero[f + 1][c + 1], tablero[f + 1][c], tablero[f - 1][c - 1], tablero[f - 1][c + 1], tablero[f - 1][c] ];

			    var vivos = 0;

	            //Contar muertos y vivos
	            for (var cell = 0; cell < cells.length; cell++)
	            {
	                if (cells[cell])
	                    vivos++;
	            }

	            var id = "#"+f+","+c;

	            //Reglas
	            if (vivos < 2 && tablero[f][c])
	            {
	                tableroTemporal[f][c] = false;
	                document.getElementById(f+","+c).className = "Cell deadCell";
	            }
	            else if (((vivos == 2) || (vivos == 3)) && tablero[f][c]==true)
	            {
	                tableroTemporal[f][c] = true;
	                document.getElementById(f+","+c).className = "Cell lifeCell";
	            }
	            else if (vivos > 3 && tablero[f][c])
	            {
	                tableroTemporal[f][c] = false;
	                document.getElementById(f+","+c).className = "Cell deadCell";
	            }
	            else if (vivos >= 3 && !tablero[f][c])
	            {
	                tableroTemporal[f][c] = true;
	                document.getElementById(f+","+c).className = "Cell lifeCell";
	            }
	            else
	            {
	                tableroTemporal[f][c] = false;
	                document.getElementById(f+","+c).className = "Cell deadCell";
	            }
			}
		}

		tablero = tableroTemporal;
		if(juego)
			play();
	}, 1000)
}

