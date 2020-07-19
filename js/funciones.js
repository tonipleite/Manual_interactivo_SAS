var explicacionMostrando = '';
var seccionMostrando = '';
var numeroSeccion = -1;
var colorEncendido ='#B0DEFF';
var fuenteEncendida = 'black';
var colorApagado ='rgb(143, 169, 209)';
var fuenteApagada = '#444';

function ListaSe (){	// Listar Secciones
	for (i = 0; i < listaTitulosPretty.length; i++) { 
		document.write('<div id="' + i +'_sec" class="seccion" onClick="MoSe(this.id)">' + listaTitulosPretty[i] +'</div>');
	}
}


// FUNCIONALIDAD DE LAS SECCIONES
function CeSe(){
	if (seccionMostrando != ''){
		nodoSeparador = document.getElementById('separador');
		nodoSeparador.innerHTML = '';
	}
}
function MoSe(id){	// Mostrar Sección
	CeEx ();
	explicacionMostrando = '';
	CeSe();
	if (seccionMostrando != id){
		if (seccionMostrando != ''){
			document.getElementById(seccionMostrando).style.backgroundColor = colorApagado;
			document.getElementById(seccionMostrando).style.color = fuenteApagada;
		}
		numeroSeccion = Number(id.replace('_sec',''));
		nodoSeparador = document.getElementById('separador');
		nodoSeparador.innerHTML = ListaEx();
		seccionMostrando = id;
		document.getElementById(id).style.backgroundColor = colorEncendido;
		document.getElementById(seccionMostrando).style.color = fuenteEncendida;
	}else{
		document.getElementById(id).style.backgroundColor = colorApagado;
		document.getElementById(seccionMostrando).style.color = fuenteApagada;
		seccionMostrando = '';
	}
	
	
}

// FUNCIONALIDAD DE LAS EXPLICACIONES
function CeEx (){		// Cerrar explicación
	if (explicacionMostrando != ''){
		var nodo = document.getElementById(explicacionMostrando + '_ex');
		nodo.parentNode.removeChild(nodo);
	}
}
function MoEx (id){		// MoEx = Mostrar Explicacion
	// Si había algún texto explicativo abierto, se cierra.
	CeEx();
	if (explicacionMostrando != id) {
		// Se crea el nodo del texto explicativo.
		var nodo = document.createElement("DIV");
		nodo.id = id + '_ex';
		nodo.className = 'recurso';
		nodo.innerHTML = CodEx(id);
		
		
		// Se inserta en el documento.
		var nodoReferencia = document.getElementById(id);
		if (nodoReferencia.nextSibling)  {		// Si no es el último...
			nodoReferencia.parentNode.insertBefore(nodo, nodoReferencia.nextSibling);
		}else{
			nodoReferencia.parentNode.appendChild(nodo);
		}
		
		// Se deja una señal, diciendo el id_ex que está actualmente abierto.
		explicacionMostrando = id;
	}else{
		explicacionMostrando = '';
	}
}
function ListaEx (){	// Listar Explicaciones
	explicaciones = '';
	for (i = 0; i < contenido[numeroSeccion].length; i++) { 
		explicaciones = explicaciones +	'<p id="' + i + '" class="explicacion" onClick="MoEx(this.id)">' + i + ". " +
						AHTML(contenido[numeroSeccion][i][0]) +'</p>';
	}
	return(explicaciones);
}

function AHTML (palabra){
	var diccionario = 
	[
		['&','&amp;'],
		['á','&aacute;'],
		['é','&eacute;'],
		['í','&iacute;'],
		['ó','&oacute;'],
		['ú','&uacute;'],
		['ü','&uuml;'],
		['ñ','&ntilde;'],
		['Ñ','&Ntilde;'],
		['Á','&Aacute;'],
		['É','&Eacute;'],
		['Í','&Iacute;'],
		['Ó','&Oacute;'],
		['Ú','&Uacute;'],
		['Ü','&Uuml;'],
		['<','&lt;'],
		['>','&gt;'],
		['¬','&#172;'],
		['¿','&#191;'],
		['^','&#94;'],
		//['/','&frasl;'],
		['  ','&nbsp;&nbsp;'],
		['"','&quot;'] 
	];
	for (j = 0; j < diccionario.length; j++) { 
		palabra = palabra.split(diccionario[j][0]).join(diccionario[j][1]);
	}
	return(palabra);
}

function CodEx (id) {  // CodEx = Código Explicación
	elTitulo     = AHTML(contenido[numeroSeccion][Number(id)][0]);
	elComentario = AHTML(contenido[numeroSeccion][Number(id)][1]);
	elCodigoSAS  = AHTML(contenido[numeroSeccion][Number(id)][2]);
	texto = '<p class="tituloRecurso">' + elTitulo + '</p><p class="comentarioSAS">' + elComentario +
			'</p><p class="codigoSAS">' + elCodigoSAS + '</p>';
	return(texto);
}