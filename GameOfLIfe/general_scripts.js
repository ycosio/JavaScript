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

var tablero = new Array(20);

function crearTablero(){

	for (var i = 0; i < 20; i++) {
		var fila = '<tr class="fila"> </tr>';
		fila = $(fila);
		tablero[i] = new Array(20);
		var num = $("#tablero").append(fila);
		for (var j = 0; j < 20; j++) {
			var celda = '<td id="'+i+','+j+'" class="Cell deadCell"> </td>';
			celda = $(celda);
			num.append(celda);
			tablero[i][j]=false;
		}

	}
}

function play(){
	var tableroTemporal = new Array(20);
	for (var i = 0; i < 20; i++) {
		tableroTemporal[i] = new Array(20);
	}

	//while(true){
		for (var f = 0; f < 20; f++) {
			
			for (var c = 0; c < 20; c++) {
				
		        if (f == 0 && c == 0)
		            var cells = [ tablero[f][c + 1], tablero[f + 1][c + 1], tablero[f + 1][c] ];
		        else if (c == 0 && f!=19)
		            var cells = [ tablero[f][c + 1], tablero[f + 1][c + 1], tablero[f + 1][c], tablero[f - 1][c + 1], tablero[f - 1][c] ];
		        else if (c == 0 && f == 19)
		            var cells = [ tablero[f][c + 1], tablero[f - 1][c + 1], tablero[f - 1][c] ];
		        else if (f == 0 && c!=19)
		            var cells = [ tablero[f][c - 1], tablero[f][c + 1], tablero[f + 1][c - 1], tablero[f + 1][c + 1], tablero[f + 1][c] ];
		        else if (f == 0 && c == 19)
		            var cells = [ tablero[f][c - 1], tablero[f + 1][c - 1], tablero[f + 1][c] ];
		        else if (f == 19 && c == 19)
		            var cells = [ tablero[f][c - 1], tablero[f - 1][c - 1], tablero[f - 1][c] ];
		        else if (c == 19)
		            var cells = [ tablero[f][c - 1], tablero[f + 1][c - 1], tablero[f + 1][c], tablero[f - 1][c - 1], tablero[f - 1][c] ];
		        else if (f == 19)
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
	                $("#"+f+","+c).removeClass("lifeCell").addClass("deadCell");
	            }
	            else if (((vivos == 2) || (vivos == 3)) && tablero[f][c]==true)
	            {
	                tableroTemporal[f][c] = true;
	                $("#"+f+","+c).removeClass("deadCell").addClass("lifeCell");
	            }
	            else if (vivos > 3 && tablero[f][c])
	            {
	                tableroTemporal[f][c] = false;
	                $("#"+f+","+c).removeClass("lifeCell").addClass("deadCell");
	            }
	            else if (vivos >= 3 && !tablero[f][c])
	            {
	                tableroTemporal[f][c] = true;
	                $("#"+f+","+c).removeClass("deadCell").addClass("lifeCell");
	            }
	            else
	            {
	                tableroTemporal[f][c] = false;
	                $("#"+f+","+c).removeClass("lifeCell").addClass("deadCell");
	            }
			}
		}

		tablero = tableroTemporal;
	//}
}

