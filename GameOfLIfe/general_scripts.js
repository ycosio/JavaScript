$(function(){

	$(".Cell").click(function(){
		if($(this).hasClass("deadCell"))
          $(this).removeClass("deadCell").addClass("lifeCell");
        else
          $(this).removeClass("lifeCell").addClass("deadCell");       
	});

});

function crearTablero(){
	for (var i = 0; i < 20; i++) {
		var fila = '<tr class="fila"> </tr>';
		fila = $(fila);
		var num = $("#tablero").append(fila);
		for (var j = 0; j < 20; j++) {
			var celda = '<td class="Cell deadCell"> </td>';
			celda = $(celda);
			num.append(celda);
		}

	}
}

