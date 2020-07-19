var listaTitulosPretty =
[
'Bloque 0<br/>Librer&iacute;as',
'Bloque 1<br/>Crear y eliminar tablas',
'Bloque 2<br/>Modificaci&oacute;n y transformaci&oacute;n de variables',
'Bloque 3<br/>Uni&oacute;n y cruces de tablas',
'Bloque 4<br/>Tratamiento de duplicados y Macrolenguaje',
'Bloque 5<br/>Operadores y algunas funciones',
'Bloque 6<br/>PROCs habituales'
];
var listaTitulos =
[
"Bloque 0: Librerías"
,"Bloque 1: Crear y eliminar tablas"
,"Bloque 2: Modificación y transformación de variables"
,"Bloque 3: Unión y cruces de tablas"
,"Bloque 4: Tratamiento de duplicados y Macrolenguaje"
,"Bloque 5: Operadores y algunas funciones"
,"Bloque 6: PROCs habituales"
];
var contenido = 
[
	// Bloque 0
	[
		[
		'Definir una librería'
		,'SAS trabaja con tablas de datos, que están "contenidas" en librerías. Las librerías son referencias a directorios de nuestro sistema. El nombre de una librería no puede superar los 8 caracteres de longitud. Para definir una librería es necesario usar la instrucción "libname".'
		,'/*\n  Asignación de librerías\n*/\nlibname LIB_INPUT "C:\\Users\\usuario\\Desktop\\Carpeta Con Tablas";'
		]
		,[
		'Definir una librería con macovariables'
		,'Primero se define una macrovariable, que contendrá la ruta o parte de ésta, mediante la instrucción "%let". Después se invoca dicha macrovariable en el string de la instrucción "libname", para lo cual es necesario introducir el nombre asignado entre "&" y ".". Podremos utilizar esta macrovariable en cualquier punto de nuestros programas, siempre que haya sido cargada (mediante su ejecución) en la sesión SAS.\n\nEs muy útil porque permite usar el mismo código en distintos ordenadores cambiando tan solo la ruta que inicialmente se ha asignado en la declaración de la macrovariable.'
		,'/*\n  Asignación de librerías\n*/\n%let RUTA_USUARIO=C:\\Users\\usuario;\nlibname LIB_INPUT "&RUTA_USUARIO.\\Desktop\\Carpeta Con Tablas";'
		]
	]
	// Bloque 1
	,[
		[
		'Creación de tabla vacía con paso DATA'
		,'Para producir en SAS una tabla vacía con un paso DATA es necesario utilizar la instrucción STOP. Dicha instrucción evita que se produzcan registros. En el ejemplo de abajo, se definen una serie de variables, junto con algunos de sus metadatos (longitud, formato...), y se utiliza la instrucción STOP.\n\nUn uso común que se le da a dicha instrucción es el de construir, a partir de una tabla de una BBDD, una tabla idéntica estructuralmente pero sin registros.'
		,'data LIB_OUT.T_VACIA;\n    length nombre apellido $30 edad 4. fecha_aniversario 8. altura_cm 4.1;\n    format nombre apellido $25. edad 4. fecha_aniversario DATE9. altura_cm 4.1;\n    label altura_cm = "Altura de la persona en centímetros";\n    stop; * Sirve para que no se produzcan registros en el paso;\nrun;'
		]
		,[
		'Creación de tabla con sentencias SET y KEEP, en paso DATA'
		,'La instrucción SET sirve para tomar los datos (y sus variables) de otra o más tablas. Por otro lado, KEEP mantiene las variables, es decir, las selecciona. Dependiendo de si se utiliza junto con SET o en la cabecera del paso DATA, las variables serán seleccionadas en la lectura o en la salida. Es importante hacer un uso correcto de esta opción; seleccionar un variable "pesada" en la lectura puede ralentizar las operaciones. Las variables que no estén indicadas en KEEP no serán seleccionadas (leídas o escritas).\n\nDe esta forma estamos consiguiendo crear una tabla réplica de otra, pero seleccionando solo las variables que deseemos.'
		,'data LIB_OUT.TABLA_VACIA_NOMBRE /*(keep = nombre)*/; /* keep en salida */\n	set LIB_OUT.TABLA_VACIA_DATA (keep = nombre); /* keep en entrada */\n	*keep nombre; /* keep en salida */\nrun;'
		]
		,[
		'Creación de tabla con sentencias SET, DROP y RENAME, en paso DATA'
		,'La instrucción DROP es análoga a KEEP, pero efectúa la opción inversa, es decir, "tira" las variables. Si se utiliza en la lectura (SET), no se leen las variables aquí indicadas y, si se utiliza en la salida (cabecera del paso DATA), no se escriben al producir la tabla de salida.\n\nPor otro lado, la instrucción RENAME sirve para modificar el nombre de las variables. De nuevo, esta instrucción también puede utilizarse en la lectura y escritura.'
		,'data LIB_OUT.T_SALIDA /*(drop = mi_var1 mi_var2)*/ ; /* DROP en salida */\n	set LIB_OUT.T_ENTRADA /* (drop = mi_var1 mi_var2)*/; /* DROP en entrada */\n	drop 	mi_var1 \n			mi_var2; /* DROP en salida */\n	/* La sentencia rename se puede ubicar */\n	/* de la misma forma que DROP          */\n	rename 	mi_var_vieja1 = mi_var_nueva1\n			mi_var_vieja2 = mi_var_nueva2;\nrun;'
		]
		,[
		'Creación de tabla vacía, con PROC SQL'
		,'Para construir una tabla vacía (sin registros) mediante PROC SQL, tan solo es necesario definir las variables como en el ejmplo de abajo.\n\nObservar que la separación entre variables dentro de un PROC SQL ha de ser mediante comas.'
		,'proc sql;\n	create table LIB_OUT.TABLA_VACIA_SQL\n		(\n		   NOMBRE   varchar (40)  format = $40. /* Comentario */\n		   ,EDAD     numeric (8)  format = 10.1\n		   ,FECHA_NAC     numeric (8)  format = DATE9. label = "Fecha de nacimiento"\n		);\nquit;'
		]
		,[
		'Selección de campos y renombrado de variables en PROC SQL'
		,'Los campos o variables de una tabla se seleccionan en SQL utilizando la declaración SELECT. Para renombrarlas o para dar nombre a una variable calculada se utiliza la palabra AS.'
		,'proc sql;\n	create table LIB_OUT.TABLA_SALIDA as\n	select \n		A.NOMBRE as A.NOMBRE_PERSONA\n		,A.APELLIDO as A.APELLIDO_PERSONA\n	from LIB_IN.TABLA_ENTRADA as A;\nquit;'
		]
		,[
		'Eliminación de tablas en PROC SQL'
		,'La eliminación de tablas dentro de PROC SQL se hace mediante DROP TABLE. En SAS se permite la eliminación de varias tablas al mismo tiempo con una sola instrucción DROP TABLE.'
		,'proc sql;\n	drop table 	TABLA_1\n				TABLA_2\n				TABLA_3;\nquit;'
		]
		,[
		'Eliminación de tablas con PROC DELETE'
		,'Otra manera de eliminar tablas es con el procedimiento DELETE. Éste cuenta con más opciones, pero aquí se muestra la básica.'
		,'proc delete data = MI_TABLA;\nrun;'
		]
		,[
		'Inserción de registros en tabla'
		,'La inserción de registros se puede efectuar mediante PROC SQL (en un paso DATA no se podría hablar, como tal, de "inserción"). Se indica la tabla en la que se quieren insertar los valores, y éstos a continuación. Es esencial que los campos de los valores estén indicados en el orden correcto, y dicho orden vendrá dado por el orden de las variables en la tabla de destino.'
		,'proc sql;\n	insert into LIB_OUT.TABLA_SUJETOS_SQL \n		values ("Miguel",25,"03JUL1990"d)\n		values ("Antonio",25,"19SEP1990"d)\n		values ("Rosa",26,"28JAN1990"d)\n		values ("Guillermo",25,"19SEP1990"d)\n	;\nquit;'
		]
		,[
		'Inserción de registros en una tabla desde otra'
		,'La inserción de registros se puede efectuar mediante PROC SQL (en un paso DATA no se podría hablar, como tal, de "inserción"). Se indica la tabla en la que se quieren insertar los valores, y después la tabla que contiene los registros de origen. Es esencial que los campos de la sentencia SELECT estén indicados en el orden correcto, para que "encajen" con los campos de la tabla de destino.\n\nEn este caso, mediante la sentencia WHERE, se elige el registro de tabla que queremos insertar.'
		,'proc sql;\n	insert into LIB_OUT.TABLA_DONDE_INSERTAR\n		select *\n		from LIB_OUT.TABLA_FUENTE\n		where NOMBRE = "Pierce Brosnan";\nquit;'
		]
		,[
		'Lectura de datos desde un fichero de texto con formato posicional (txt). Sentencia INFILE'
		,'Mediante el paso DATA podemos leer datos de ficheros de texto. Éste es un ejemplo en el que los campos vienen delimitados posicionalmente, es decir, están alineados verticalmente en el fichero de origen.\n\nComentar el que carácter $ en la definición de las variables, indica que van a ser alfa-numéricas.'
		,'data WORK.TABLA_INFILE_TXT;\n	length entidad 8. contrato 8. cartera $40. intervalo $40.;	\n	infile "C:\Input\tabla.txt";\n	input  entidad 1-2 \n		   contrato 3-10 \n		   cartera $ 11-22 \n	       intervalo $ 23-36\n	;\nrun;'
		]
		,[
		'Lectura de datos desde un fichero de texto con delimitador (csv/txt). Sentencia INFILE'
		,'Mediante el paso DATA podemos leer datos de ficheros de texto. Éste es un ejemplo en el que los campos vienen delimitados por un caracter, y cuya primera fila contiene los nombres de las variables.'
		,'data WORK.TABLA_DEL_TXT;\n	infile "C:\Datos_economicos.txt" \n			delimiter = "," \n			firstobs=2;	/* Los datos comienzan en la segunda fila */\n	length 	Nombre $30.\n			Apellido $60.\n			Edad 3.\n			Saldo_cuenta\n			Fecha_alta 8.;\n	input	Nombre $\n			Apellido $\n			Edad\n			Saldo_cuenta\n			Fecha_alta ;\n	format 	Nombre $30.\n			Apellido $30.\n			Edad 3.\n			Saldo_cuenta 8.\n			Fecha_alta DATE9.;\n	informat Fecha_alta b8601da.; /* En el archivo la fecha viene con este formato */\n	label 	Fecha_alta = "Fecha de alta del producto"\n			Apellido = "Primer y segundo apellido";\nrun;'
		]
		,[
		'Lectura de datos en programa mediante la sentencia DATALINES'
		,'La sentencia DATALINES nos permite leer líneas de datos que estén incluidas en el paso DATA, justo como se ve en el ejemplo. Hay que indicar qué variables son las que se van a leer y sus propiedades adecuadas.'
		,'data WORK.TABLA_DELIMITADOR;\n	length entidad  contrato 8. cartera $40. intervalo $40.;\n	infile datalines delimiter=",";\n	input  entidad\n		   contrato\n		   cartera $\n	       intervalo $\n	;\n	datalines;\n49,12345678,  Tarjetas  ,0.75 to < 2.50\n49,98765432,Hipoteca,0.75 to < 2.50\n49,98764321,Resto Retail,0.75 to < 2.50\n49,12345679,Tarjetas,1.75 to < 2.50\nrun;'
		]
		,[
		'Lectura de datos en programa mediante la sentencia CARDS'
		,'La sentencia CARDS nos permite leer líneas de datos que estén incluidas en el paso DATA, justo como se ve en el ejemplo. Hay que indicar qué variables son las que se van a leer y sus propiedades adecuadas. La diferencia con respecto a DATALINES es que con CARDS hay que indicar entre qué y qué posición se encuentra el campo.'
		,'data WORK.TABLA_CARDS;\n	length entidad 8. contrato 8. cartera $40. intervalo $40.;	\n	input  entidad 1-2\n		   contrato 3-10 \n		   cartera $11-22 \n	       intervalo $23-36\n	;\n	cards; \n4954591590Tarjetas    0.75 to < 2.50\n4911591590Hipoteca    0.75 to < 2.50\n4966591590Resto Retail0.75 to < 2.50\n4947591590Tarjetas    1.75 to < 2.50\nrun;'
		]
		,[
		'Exportación de una tabla'
		,'Mediante el procedimiento EXPORT se puede exportar una tabla de datos a otro formato, indicando el tipo de archivo ("csv", por ejemplo) y otras opciones, como dónde depositar el archivo de salida, o el caracter delimitador.'
		,'proc export data=WORK.DATOS_ECONOMICOS \n			outfile="C:\Output\Datos_economicos.csv"\n			dbms=csv replace;\n	delimiter=";";\nquit;\nproc export data=WORK.DATOS_ECONOMICOS \n			outfile="C:\Output\Datos_economicos.txt"\n			dbms=dlm replace;\n	delimiter=",";\nquit;'
		]
		,[
		'Ejercicio 1'
		,'Crear en la librería WORK una tabla igual a la tabla Datos_economicos, que se llame Mis_datos_economicos.'
		,'/*\n	Pasos previos\n*/\n%let RUTA_TRABAJO=C:\Users\elnombre.elapellido\Desktop\SAS\Sesión 1; \n/*\n	Asignación de librerias\n*/\nlibname LIB_IN "&RUTA_TRABAJO.\Input"; * Precondición: existe la carpeta;\nlibname LIB_OUT "&RUTA_TRABAJO.\Output"; * Precondición: existe la carpeta;\n/*\n	Ejercicio 1\n*/\ndata WORK.MIS_DATOS_ECONOMICOS;\n	set LIB_IN.DATOS_ECONOMICOS;\nrun;'
		]
		,[
		'Ejercicio 2'
		,'Selecciona 4 variables y renómbralas a partir de la tabla Mis_datos_economicos usando KEEP, RENAME. Guárdala, vacía, en la librería WORK y llámala Mis_Datos_economicos_2.'
		,'/*\n	Ejercicio 2\n*/\ndata WORK.MIS_DATOS_ECONOMICOS_2;\n	set WORK.MIS_DATOS_ECONOMICOS;\n	keep s1emp contra1 idnumcli cartera; \n	rename 	s1emp=entidad \n			contra1=contrato \n			idnumcli=cliente \n			cartera=cartera_contrato;\nrun;'
		]
		,[
		'Ejercicio 3'
		,'Incluye etiquetas a los campos de la tabla Mis_Datos_economicos_2.'
		,'/*\n	Ejercicio 3\n*/\ndata WORK.MIS_DATOS_ECONOMICOS_2;\n	set WORK.MIS_DATOS_ECONOMICOS_2;\n	label entidad = "Entidad del contrato"\n		  contrato = "Código de contrato"\n		  cliente = "Código de cliente"\n		  cartera_contrato = "Cartera del contrato"\n	;\nrun;'
		]
		,[
		'Ejercicio 4'
		,'Elimina la tabla creada en el ejercicio 1.'
		,'/*\n	Ejercicio 4\n*/\nproc sql;\n	drop table WORK.MIS_DATOS_ECONOMICOS;\nquit;'
		]
		,[
		'Ejercicio 5'
		,'Inserta todos los registros de la tabla Datos_economicos en la tabla Mis_Datos_economicos_2 (teniendo en cuenta los campos que tenemos en la tabla Mis_Datos_economicos_2).'
		,'/*\n	Ejercicio 5\n*/\nproc sql;\n	insert into WORK.MIS_DATOS_ECONOMICOS_2\n		select	s1emp, contra1, idnumcli, cartera\n		from	LIB_IN.DATOS_ECONOMICOS\n	;\nquit;'
		]
		,[
		'Ejercicio 6'
		,'Exporta a CSV (Comma Separated Value) la tabla Mis_Datos_Economicos_2, con delimitador ";“ (punto y coma).'
		,'/*\n	Ejercicio 6\n*/\nproc export data=bloque1_ejercicio_3 outfile="&RUTA_TRABAJO.\Output\Tabla.csv"\n			dbms=csv replace;\n	delimiter=";";\nquit;'
		]
		,[
		'Ejercicio 7'
		,'Importa los datos del CSV a una nueva tabla con nombre OTROS_DATOS y guárdala en la librería de salida.'
		,'/*\n	Ejercicio 7\n*/\ndata LIB_OUT.OTROS_DATOS;\n	infile "&RUTA_TRABAJO.\Output\Tabla.csv" delimiter = ";" firstobs=2;\n	length entidad 8. contrato 8. cliente 8. cartera_contrato $40. ;\n	input  entidad contrato cliente cartera_contrato $;\n	format entidad 6. contrato 10. cliente 10. cartera_contrato $40. ;\n	label entidad = "Entidad del contrato"\n		  contrato = "Código de contrato"\n		  cliente = "Código de cliente"\n		  cartera_contrato = "Cartera del contrato";\nrun;'
		]
	]
	// Bloque 2
	,[
		[
		'Filtrar registros: sentencia WHERE en paso DATA'
		,'Un filtro WHERE se utiliza para leer únicamente los registros que cumplan las condiciones indicadas. En el ejemplo de abajo, solamente los registros cuya variable "bibliotecas" valga más de 300 serán leídos. El resto de registros no serán procesados en el paso DATA.'
		,'data WORK.COMUNIDADES_LECTURA (keep = CCAA);\n	set OCIO.BIBLIOTECAS08;\n	where bibliotecas > 300;\nrun;'
		]
		,[
		'Filtrar registros: instrucción IF en paso DATA'
		,'La instrucción IF puede utilizarse como un filtro de salida. La diferencia con respecto al filtro WHERE es que IF no evita la lectura de registros, sino que filtra la salida. El código comentado del ejemplo de abajo es simplemente recordatorio; descomentado y comentado este paso DATA produce el mismo resultado.'
		,'data WORK.COMUNIDADES_LECTURA (keep = CCAA);\n	set OCIO.BIBLIOTECAS08;\n	if bibliotecas > 300 /* then output */; \nrun;'
		]
		,[
		'Filtrar registros: sentencia WHERE en PROC SQL. Operadores LIKE e IN'
		,'La sentencia WHERE se utiliza después de la sentencia FROM, como en SQL estándar. Los registros que no reúnan las condiciones indicadas en el filtro no serán leídos de la tabla de origen.\n\nLa instrucción LIKE se traduciría al castellano como "que sea como", y sirve para evaluar si uno o varios campos de texto cumplen ciertas características (que comience por una letra específica, que contenga una serie de caracteres...).\n\nPor otro lado, IN sirve para evaluar si un campo se encuentra incluido en una lista de valores (numéricos o alfanuméricos).'
		,'/*\n	Ejemplo de filtro WHERE (PROC SQL)\n*/\nproc sql;\n	create table WORK.COMUNIDADES_LECTURA as\n	select \n		CCAA\n	from OCIO.BIBLIOTECAS08\n	where bibliotecas > 300;\nquit;\n/*\n	Ejemplo de filtro WHERE con LIKE (PROC SQL)\n*/\nproc sql;\n	create table WORK.TABLA as\n	select \n		CCAA\n	from OCIO.BIBLIOTECAS08\n	where CCAA like "%u%"  or CCAA like "%U%" or CCAA like "A%";\nquit;\n/*\n	Ejemplo de filtro WHERE con IN (PROC SQL)\n*/\nproc sql;\n	create table WORK.TABLA as\n	select\n		CCAA \n		,upper(CCAA)  as CCAA_mayusculas\n	from OCIO.BIBLIOTECAS08\n	where upper(CCAA) in ("EXTREMADURA", "ANDALUCÍA");\nquit;'
		]
		,[
		'Sentencias condicionales: IF ... THEN ... e IF ... THEN ... ELSE ..., en paso DATA'
		,'Estas sentencias se utilizan para condicionar la ejecución de instrucciones. Cuando se cumple la claúsula de un IF, se efectúan las instrucciones que estén incluidas dentro de éste. En caso contrario, no se ejecutarán, a no ser que se haya especificado un ELSE ("en otro caso"), que permite la ejecución de instrucciones diferentes.'
		,'/*\n	Ejemplo de condicional IF ... THEN ... ELSE\n*/\ndata WORK.CLASIFICACION (drop = bibliotecas);\n	set OCIO.BIBLIOTECAS08;\n	format nivel_lectura $5.;\n	if bibliotecas < 100 then \n		delete;\n	if bibliotecas < 300 then\n		nivel_lectura = "Bajo";\n	else\n		if bibliotecas < 500 then\n			nivel_lectura = "Medio";\n		else\n			nivel_lectura = "Alto";\nrun;\n/*\n	Ejemplo de condicional IF ... THEN DO ... ELSE DO\n*/\ndata WORK.CLASIFICACION_Y_PREDICCION;\n	set OCIO.BIBLIOTECAS08;\n	format 	nivel_lectura $5.\n			prediccion_bibliotecas 8.;\n	if bibliotecas < 100 then \n		delete;\n	if bibliotecas < 300 then do;\n		nivel_lectura = "Bajo";\n		prediccion_bibliotecas = round(bibliotecas * 0.8);\n	end;\n	else\n		if bibliotecas < 500 then do;\n			nivel_lectura = "Medio";\n			prediccion_bibliotecas = round(bibliotecas * 1);\n		end;\n		else do;\n			nivel_lectura = "Alto";\n			prediccion_bibliotecas = round(bibliotecas * 1.2);\n		end;\nrun;'
		]
		,[
		'Sentencias condicionales: CASE WHEN ... THEN ... ELSE ... END, en PROC SQL'
		,'La instrucción CASE se utiliza en SQL como condicionante. Ésta puede reunir varios WHEN (cada uno con su cláusula), que devolverá el valor indicado al final del THEN. Si un caso no ha sido contemplado en ninguno de los casos WHEN, irá a parar al valor indicado tras el ELSE, como en el ejemplo de abajo.'
		,'proc sql;\n	create table WORK.CLASIFICACION_Y_PREDICCION as\n	select\n		A.*\n		,case\n			when 300 < bibliotecas < 500 then "Medio"\n			when bibliotecas < 300 then "Bajo"\n			else "Alto"\n		end as nivel_lectura\n		,(case\n			when bibliotecas < 300 then 0.8\n			when bibliotecas < 500 then 1\n			else 1.2\n		end) * bibliotecas as prediccion_bibliotecas format=6.\n	from OCIO.BIBLIOTECAS08 as A\n	where bibliotecas > 100;\nquit;'
		]
		,[
		'Modificación de registros: usar IF ... THEN ... en paso DATA para modificar valores'
		,'En un paso DATA se puede sobre-escribir una tabla; tan sololo hay que indicarla en la instrucción SET y en la cabecera. Las modificaciones que se indiquen en el paso tendrán lugar. Dichos cambios pueden afectar solo a uno o varios registros, como en la tabla del ejemplo.'
		,'data WORK.COMUNIDADES;\n	set WORK.COMUNIDADES;\n	if CCAA = "Extremadura" then do;\n		bibliotecas = 400;\n		CCAA ="Xtremadura";\n	end;\nrun;'
		]
		,[
		'Modificación de registros: usar UPDATE en PROC SQL para modificar valores'
		,'En el caso del PROC SQL, para modificar los valores de una tabla se utiliza la sentencia UPDATE. Junto con SET, para indicar los nuevos valores, y WHERE, para indicar los registros susceptibles de modificación, se pueden efectuar cambios sencillamente.'
		,'proc sql;\n	update WORK.LECTURA \n	set 	bibliotecas=600\n			,CCAA="Extremadura" \n	where CCAA="Xtremadura";\nquit;'
		]
		,[
		'Eliminación de registros: DELETE en paso DATA'
		,'La instrucción DELETE sirve para eliminar los registros de una tabla. Suele utilizarse en conjunción con la instrucción IF, y casi siempre, cuando previamente a la ejecución no se sabe qué provocará la eliminación del registro. Esto último es importante, porque si se conoce de antemano la condición, es mejor en cuanto a tiempo y memoria de computación filtrar los registros con un filtro WHERE (si es posible) que leerlos y eliminarlos.'
		,'data WORK.SIN_MELILLA;\n	set OCIO.BIBLIOTECAS08;\n	if CCAA = "Melilla" then delete;\nrun; '
		]
		,[
		'Eliminación de registros: DELETE en PROC SQL'
		,'La sentencia DELETE permite eliminar registros de una tabla. Se utiliza en conjunción con WHERE, para escoger qué registros suprimir.'
		,'proc sql;\n	delete * from WORK.BIBLIOTECAS08 where CCAA="Ceuta";\nquit;'
		]
		,[
		'Ordenar registros: ORDER BY en PROC SQL'
		,'En PROC SQL la ordenación de una tabla se lleva a cabo con la sentencia ORDER BY. La tabla se ordenará una vez se hayan ejecutado el resto de operaciones, justo antes de la salida. Tras ORDER BY se han de indicar las variables de ordenación separadas por comas y, si es necesario que alguna de ellas siga un orden descendiente, se incluye la partícula "desc" después de ésta.\n\nTambién, como se ve en el ejemplo, en vez de indicar el nombre de la variable se puede indicar la posición que ocupa en la sentencia SELECT; es conocido que el campo "bibliotecas" ocupa la segunda posición en el SELECT, por lo que se escribe "2".'
		,'proc sql;\n	create table WORK.BIBLIOTECAS_ORDENADAS as \n	select *\n	from OCIO.BIBLIOTECAS08\n	where bibliotecas > 300\n	order by\n		2 /* bibliotecas */ desc;\nquit;'
		]
		,[
		'Ordenar registros: PROC SORT'
		,'En SAS el procedimiento de ordenación es SORT. Se indican la tabla de entrada en la opción DATA, y la de salida (si se desea una tabla diferente a la de entrada) en la opción OUT. Dentro del procedimiento podemos indicar un filtro, si place, y debemos especificar la sentencia BY junto con las variables (separadas por espacios), y predecidas cada una de ellas por la palabra DESCENDING si se quiere un ordenamiento descendiente.\n\nLa opción DESCENDING afecta solamente a la variable que viene detrás.'
		,'proc sort data=OCIO.BIBLIOTECAS08 out=WORK.BIBLIOTECAS_ORDENADAS /* (drop = ...) */;\n	by  descending bibliotecas ;  /* descending  ANTES!*/\n	where bibliotecas > 300;\nquit;'
		]
		,[
		'Ejercicio 1'
		,'Crear una tabla LIB_OUT.RESUMEN_CANDYVILLE a partir de la tabla CHUCHES.PRODUCTOS con los registros de los productos fabricados en "Candyville", con los campos "Producto" y "Categoria_Margen". La variable "Categoria_Margen" viene definida por el campo "Margen_Bruto" de la siguiente manera: si el margen es mayor que 80%, el valor es "Alto"; si es menor o igual que 80% pero mayor que 30%, es "Medio" y, si no, es "Bajo".'
		,'/*\n	Pasos previos. Asignación de librerías.\n*/\n%let RUTA_TRABAJO=C:\Users\elnombre.elapellido\Desktop\SAS\Sesión 2; \n\nlibname CHUCHES "&RUTA_TRABAJO.\Input\Chucherías"; * Precondición: existe la carpeta;\nlibname VARIADAS "&RUTA_TRABAJO.\Input\Tablas variadas"; * Precondición: existe la carpeta;\nlibname OCIO "&RUTA_TRABAJO.\Input\Entretenimiento"; * Precondición: existe la carpeta;\nlibname LIB_OUT "&RUTA_TRABAJO.\Output"; * Precondición: existe la carpeta;\n/*\n	Ejercicio 1\n*/\ndata LIB_OUT.RESUMEN_CANDIVILLE (keep = producto categoria_margen);\n	set CHUCHES.PRODUCTOS;\n	format categoria_margen $5.;\n	where planta_primaria = "Candyville";\n	if margen_bruto > 0.8 then categoria_margen = "Alto";\n	else if margen_bruto > 0.3 then categoria_margen = "Medio";\n	else categoria_margen = "Bajo";\nrun;\nproc print; run;'
		]
		,[
		'Ejercicio 2'
		,'Se quiere tener un listado con las provincias y sus densidades poblacionales.\n\nUtilizar la tabla VARIADAS.TERRITORIO09 para crear una tabla llamada LIB_OUT.DENSIDADES_POBLACIONALES, que contenga los nombres de las CCAA, de las provincias, la densidad poblacional, y cuyos registros estén ordenados de mayor a menor densidad poblacional. Imprimir por pantalla el listado.'
		,'/*\n	Ejercicio 2\n*/\ndata WORK.TERRITORIO09;\n	set VARIADAS.TERRITORIO09;\n	label 	densidad="Habitantes / km^2"\n			CCAA = "CCAA"\n			PROV = "Provincia"\n	;\n	densidad = poblacion/superficie;\nrun;\nproc sort data=WORK.TERRITORIO09 out=LIB_OUT.DENSIDADES_POBLACIONALES (keep = CCAA PROV densidad);\n	by descending densidad;\nrun;\nproc print label; run;\nproc delete data=WORK.TERRITORIO09;\nrun;'
		]
		,[
		'Ejercicio 3'
		,'Se quiere conocer en qué municipios de Madrid la diferencia entre hombres y mujeres es más acusada. Utilizar la tabla VARIADAS.MUNIMADRID09 para construir la tabla LIB_OUT.DIFERENCIAS_HM en la que se incluyan las siguientes variables:\n	- Barrio: el nombre del barrio.\n	- Diferencia: diferencia porcentual, en valor absoluto, entre hombres y mujeres.\n	- Ganadores: qué género es el mayoritario en el barrio ("Hombres" o "Mujeres").\nAdemás, la tabla deberá estar ordenada de mayor a menor Diferencia.'
		,'/*\n	Ejercicio 3\n*/\ndata WORK.DIFERENCIAS_HM (keep = Barrio Diferencia Ganadores);\n	set VARIADAS.MUNIMADRID09;\n	rename LDIST = Barrio;\n	Diferencia = abs(Varones-Mujeres)/Total;\n	if Varones > Mujeres then Ganadores = "Hombres";\n	else Ganadores = "Mujeres";\nrun;\nproc sort data=WORK.DIFERENCIAS_HM out=LIB_OUT.DIFERENCIAS_HM;\n	by descending Diferencia;\nrun;\nproc print;run;'
		]
	]
	// Bloque 3
	,[
		[
		'Unión vertical: instrucción SET en paso DATA'
		,'Una unión vertical entre tablas significa generar otra tabla y que ésta sea el resultado de haber apilado una serie de tablas unas encima de otras.\n\nEn el paso DATA, para hacer esto, tan solo hay que indicar las tablas separadas por espacios. En caso de que las tablas no contengan las mismas variables, y se permita que éstas sigan existiendo en la tabla de salida, los registros no informados se completarán con valores ausentes o blancos (dependiendo de si se trata de campos numéricos o alfanuméricos).\n\nNota: este método mantiene los registros que puedan estar duplicados.'
		,'data WORK.ALFABETO_COMPLETO;\n	set LIB_IN.MITAD_DOS_ALFABETO\n		LIB_IN.MITAD_UNO_ALFABETO;\nrun;\n/*\n	Ejemplo de unión vertical con SET y ausentes\n*/\ndata WORK.MITAD_DOS_ALFABETO;\n	set LIB_IN.MITAD_DOS_ALFABETO;\n	letra_mayuscula = upcase(letra);\nrun;\ndata WORK.ALFABETO_COMPLETO;\n	set LIB_IN.MITAD_UNO_ALFABETO\n		WORK.MITAD_DOS_ALFABETO;\nrun;'
		]
		,[
		'Unión vertical: UNION [ALL] en PROC SQL'
		,'Una unión vertical entre tablas significa generar otra tabla y que ésta sea el resultado de haber apilado una serie de tablas unas encima de otras. En SQL esto se consigue mediante la sentencia UNION. Ésta cuenta con la opción ALL. Si se utiliza la opción ALL, y las tablas contienen valores duplicados, estos se mantendrán. Contrariamente, si no se utiliza, la tabla resultante no contendrá duplicados y estará ordenada.\n\nNota: los campos tienen que estar correctamente ordenados en la sentencia SELECT para que "encajen" verticalmente las tablas entre sí. Más en: www.w3schools.com/sql/sql_union.asp'
		,'/*\n	Ejemplo de unión vertical PROOC SQL. Duplicados\n*/\nproc sql;\n	create table WORK.ALFABETO_COMPLETO as\n			select *\n			from LIB_IN.MITAD_UNO_ALFABETO\n		union all\n			select *\n			from LIB_IN.MITAD_DOS_ALFABETO\n		union all\n			select *\n			from LIB_IN.ALFABETO_ESPECIALES\n		union all\n			select *\n			from LIB_IN.ALFABETO_ESPECIALES;\nquit;\n/*\n	Ejemplo de unión vertical PROOC SQL. Sin Duplicados\n*/\nproc sql;\n	create table WORK.ALFABETO_COMPLETO as\n			select *\n			from LIB_IN.MITAD_UNO_ALFABETO\n		union /* all */\n			select *\n			from LIB_IN.MITAD_DOS_ALFABETO\n		union /* all */\n			select *\n			from LIB_IN.ALFABETO_ESPECIALES\n		union /* all */\n			select *\n			from LIB_IN.ALFABETO_ESPECIALES;\nquit;'
		]
		,[
		'Unión horizontal (cruce): MERGE en paso DATA'
		,'La instrucción MERGE sirve para unir tablas. Tiene dos usos:\n   - En caso de que las tablas tengan el mismo número de registros, se pueden unir horizontalmente sin indicar un campo de cruce/unión.\n   - Si las tablas no tienen el mismo número de filas, es necesario indicar una variable de cruce en la sentencia BY, como en el ejemplo.\n\nNota: en el segundo caso, tablas deben estar ordenadas por el campo de cruce en el mismo sentido (ascendente o descendente).'
		,'proc sort data=OCIO.MUSEOS08;	\n	by CCAA;\nrun;\nproc sort data=OCIO.BIBLIOTECAS08;	\n	by CCAA;\nrun;\nproc sort data=OCIO.BINGOS08;	\n	by CCAA;\nrun;\ndata WORK.CULTURA;\n	merge 	OCIO.MUSEOS08\n		OCIO.BIBLIOTECAS08 \n		OCIO.BINGOS08;\n	by CCAA;\nrun;\nproc print; run;\n\n'
		]
		,[
		'Unión horizontal (cruce): INNER JOIN en PROC SQL'
		,'En PROC SQL se pueden utilizar varios cruces. La estructura de cómo hacerlo es la que se indica en el ejemplo. INNER JOIN selecciona solamente los campos de ambas tablas que encuentran a su igual en la otra tabla. Más en: www.w3schools.com/sql/sql_join_inner.asp.'
		,'proc sql;\n	create table WORK.AMBAS_CIUDADES as\n	select \n		A.*\n	from VARIADAS.MADRID as A\n		inner join VARIADAS.SEVILLA as B\n			on (A.DNI = B.DNI);\nquit;'
		]
		,[
		'Unión horizontal (cruce): LEFT/RIGHT JOIN en PROC SQL'
		,'En PROC SQL se pueden utilizar varios cruces. La estructura de cómo hacerlo es la indicada en el ejemplo. LEFT JOIN selecciona todos los registros de la tabla primeramente indicada (en FROM), y utilizando los campos de cruce indicados en ON, se puede "traer" información de la tabla de la derecha. Más en: www.w3schools.com/sql/sql_join_left.asp.\n\nEn el final del ejemplo inferior se encuentra un filtro WHERE comentado. Si éste se descomentase, la tabla resultado contendría los registros de la tabla de la izquierda que no tienen un correspondiente en la tabla de la derecha (y, en este caso, no tendría sentido tratar de substraer información de la tabla de la derecha).\n\nLa sentncia RIGHT JOIN funciona de la misma manera, pero tomando la tabla de la derecha como tabla de referencia.'
		,'proc sql;\n	create table WORK.TODOS_MADRID as\n	select \n		A.DNI\n		,A.NOMBRE as NOMBRE_MAD\n		,A.APELLIDO1 as APELLIDO1_MAD\n		,A.APELLIDO2 as APELLIDO2_MAD\n		,A.EMAIL as EMAIL_MAD\n		,B.NOMBRE as NOMBRE_SEV\n		,B.APELLIDO1 as APELLIDO1_SEV\n		,B.APELLIDO2 as APELLIDO2_SEV\n		,B.EMAIL as EMAIL_SEV\n	from VARIADAS.MADRID as A\n		left join VARIADAS.SEVILLA as B\n			on (A.DNI = B.DNI)\n	/* where B.DNI <> . */\n	;\nquit;'
		]
		,[
		'Unión horizontal (cruce): FULL JOIN en PROC SQL'
		,'En PROC SQL se pueden utilizar varios cruces. La estructura de cómo hacerlo es la que se indica en el ejemplo. FULL JOIN produce un resultado en el que se mantienen todos los registros, los de ambas tablas. Algunos de éstos pueden encontrar un correspondiente en la otra tabla según los campos de cruce que se hayan indicado. Los registros (de la tabla que sea) que no hayan encontrado un correspondiente en la otra tabla, también estarán en la tabla producida, y sus campos no informados tomarán valores ausentes. Más en: www.w3schools.com/sql/sql_join_full.asp'
		,'proc sql;\n	create table WORK.TODAS_RELACIONES as\n	select \n		A.LETRA as LETRAS_ALFA\n		,A.NUMERO\n		,B.LETRA as LETRAS_BETA\n		,B.DIBUJO\n	from LIB_IN.RELACIONES_ALFA as A\n		full join LIB_IN.RELACIONES_BETA as B\n			on (A.LETRA = B.LETRA);\nquit;'
		]
		,[
		'Unión horizontal (cruce): CROSS JOIN en PROC SQL (producto cartesiano)'
		,'En PROC SQL se pueden utilizar varios cruces. La estructura de cómo hacerlo es la que se indica en el ejemplo. CROSS JOIN crea un producto cartesiano "multiplicando" las dos tablas; relaciona cada registro de una tabla con todos los registros de la otra. Así, si "n" y "m" representan la cantidad de registros (filas) de las tablas origen, la tabla final tendrá "n x m" registros (a no ser que se apliquen filtros posteriores que impidan que sea así).'
		,'proc sql;\n	create table WORK.PRODUCTO as\n	select \n		A.LETRA as LETRAS_ALFA\n		,A.NUMERO\n		,B.LETRA as LETRAS_BETA\n		,B.DIBUJO\n	from 	LIB_IN.RELACIONES_ALFA as A,\n			LIB_IN.RELACIONES_BETA as B;\nquit;'
		]
		,[
		'Unión horizontal (cruce): NATURAL JOIN en PROC SQL'
		,'En PROC SQL se pueden utilizar varios cruces. La estructura de cómo hacerlo es la que se indica en el ejemplo. NATURAL JOIN tiene el mismo efecto que INNER JOIN, pero la diferencia radica en que el primero detecta automáticamente los campos de cruce. SU USO NO ES ACONSEJABLE, dado que NATURAL JOIN considera como campos de cruce a todas las variables que tengan el mismo nomrbe en las dos tablas.'
		,'proc sql;\n	create table WORK.TODAS_RELACIONES as\n	select \n		A.LETRA as LETRAS_ALFA\n		,A.NUMERO\n		,B.LETRA as LETRAS_BETA\n		,B.DIBUJO\n	from LIB_IN.RELACIONES_ALFA as A\n		natural join LIB_IN.RELACIONES_BETA as B;\nquit;'
		]
		,[
		'Ejemplo de operación avanzada con MERGE en paso DATA. Clasificación de registros'
		,'En el siguiente ejemplo se utiliza la sentencia MERGE en un paso DATA para clasificar los registros cruzados de dos tabla (pre-ordenadas) en 3 tablas de salida.\n\nLas tablas contienen los datos ficticios de los alumnos que asistieron a un seminario en Madrid y a otro en Sevilla. Algunos de esos alumnos asistieron a los dos. Así, las tablas de salida (SOLO_SEVILLA, SOLO_MADRID y AMBAS_CIUDADES) contendrán los registros de los alumnos correspondientes.\n\nNota: la variable "testigo_madrid" sirve únicamente para capturar el valor de la variable temporal "estuvo_en_madrid".'
		,'data	WORK.SOLO_MADRID\n		WORK.SOLO_SEVILLA\n		WORK.AMBAS_CIUDADES;\n\n	merge 	VARIADAS.MADRID (in = estuvo_en_madrid)\n			VARIADAS.SEVILLA (in = estuvo_en_sevilla);\n	by DNI; 		/* Pre-ordenadas por DNI */\n\n	testigo_madrid = estuvo_en_madrid;\n\n	if estuvo_en_madrid and estuvo_en_sevilla then\n		output WORK.AMBAS_CIUDADES;\n	else \n		if estuvo_en_madrid then\n			output WORK.SOLO_MADRID;\n		else\n			output WORK.SOLO_SEVILLA;\nrun;'
		]
		,[
		'Ejercicio 1'
		,'La carpeta "Sesión 3\Input\Entretenimiento" contiene una serie de tablas acerca de los centros de ocio y culturales de las CCAA en España en el 2008. También contiene una tabla que indica el número de habitantes por Comunidad Autónoma.\n\nCombina las tablas de la manera correcta para obtener una única tabla que incluya:\n	- Los centros culturales (museos y bibliotecas) de cada Comunidad.\n	- Los centros de ocio (casinos y bingos) de cada Comunidad.\n	- El ratio del número de habitantes entre cada una de las métricas anteriores.\n	- El ratio del número de centros culturales entre el número de centros de ocio.'
		,'/*\n	Pasos previos. Asignación de librerías.\n*/\n%let RUTA_TRABAJO=C:\Users\elnombre.elapellido\Desktop\SAS\Sesión 3; \nlibname LIB_IN "&RUTA_TRABAJO.\Input"; * Precondición: existe la carpeta;\nlibname CHUCHES "&RUTA_TRABAJO.\Input\Chucherías"; * Precondición: existe la carpeta;\nlibname OCIO "&RUTA_TRABAJO.\Input\Entretenimiento"; * Precondición: existe la carpeta;\nlibname VARIADAS "&RUTA_TRABAJO.\Input\Tablas Variadas"; * Precondición: existe la carpeta;\nlibname LIB_OUT "&RUTA_TRABAJO.\Output"; * Precondición: existe la carpeta;\n/* \n	Ejercicios 1\n*/\ndata WORK.CCAA_OCIO;\n	merge	OCIO.BIBLIOTECAS08\n			OCIO.BINGOS08\n			OCIO.CASINOS08\n			OCIO.MUSEOS08\n			OCIO.PADRON08;\n	by CCAA;\n	Centros_ocio = sum(casinos, bingos);\n	Centros_cultura = sum(bibliotecas, museos);\n	format Ratio_ocio Ratio_cultura 8.;\n	Ratio_ocio = Personas / Centros_ocio;\n	Ratio_cultura = Personas / Centros_cultura ;\n	format Ratio_cultura_ocio 5.2;\n	Ratio_cultura_ocio = Centros_cultura / Centros_ocio ;\nrun;'
		]
		,[
		'Ejercicio 2'
		,'Queremos conocer la sucursal y entidad de una serie de operaciones. Se cuenta con las tablas "productoXoperacion" y "entidadXoperacion", y ambas están ordenadas por la variable COD_OPERACION.\n\nSe pide crear las siguientes tablas:\n\n	a) Todas las operaciones que tienen entidad asociada/informada.\n	b) Aquellas operaciones cuya entidad no se encuentra.\n	c) Aquellas operaciones que tienen entidad y sucursal pero que no tienen un producto asociado.\n	d) Unir las tablas "productoXoperacion" y "entidadXoperacion" en una mayor, con el mínimo volumen.'
		,'/*\n	Ejercicio 2\n*/\n/*\n	a, b y c\n*/\ndata	WORK.OPERACIONES_ENTIDAD\n		WORK.OPERACIONES_SIN_ENTIDAD\n		WORK.OPERACIONES_SIN_PRODUCTO;\n	merge 	LIB_IN.PRODUCTOXOPERACION 	(in=esta_en_producto)\n			LIB_IN.ENTIDADXOPERACION 	(in=esta_en_entidad);\n	by cod_operacion;\n	if esta_en_producto and esta_en_entidad then \n		output WORK.OPERACIONES_ENTIDAD;\n	else \n		if esta_en_producto and not esta_en_entidad then\n			output WORK.OPERACIONES_SIN_ENTIDAD;\n		else\n			output WORK.OPERACIONES_SIN_PRODUCTO;\nrun;\n/*\n	d\n*/\nproc sql;\n	create table WORK.SOLO_OPERACIONES as\n	select COD_OPERACION\n	from LIB_IN.PRODUCTOXOPERACION\n	union\n	select COD_OPERACION\n	from LIB_IN.ENTIDADXOPERACION;\n\n	create table WORK.OPERACIONES_FINAL as\n	select\n		A.*\n		,B.PRODUCTO\n		,B.AREA_PRODUCTO\n		,C.SUCURSAL\n		,C.ENTIDAD\n	from WORK.SOLO_OPERACIONES as A\n		left join LIB_IN.PRODUCTOXOPERACION as B\n			on (A.COD_OPERACION=B.COD_OPERACION)\n		left join LIB_IN.ENTIDADXOPERACION as C\n			on (A.COD_OPERACION=C.COD_OPERACION);\nquit;'
		]
	]
	// Bloque 4
	,[
		[
		'Eliminación de registros duplicados: sentencia DISTINCT en PROC SQL'
		,'En SAS se pueden eliminar los duplicados como en SQL estándar, mediante la opción DISTINCT. Esta opción hace que la tabla de salida no contenga filas duplicadas.'
		,'proc sql; * Se seleccionan las tuplas/registros diferentes;\n	create table LIB_OUT.SIN_DUPLIS_SQL as\n	select distinct *\n	from LIB_IN.NUMEROS_DUPLICADOS;\nquit;'
		]
		,[
		'Eliminación de registros duplicados: opción NODUPKEY en PROC SORT'
		,'La "forma SAS" de eliminar los duplicados es mediante el uso del procedimiento SORT, junto con su opción NODUPKEY, en la cabecera. Si se utiliza esta opción, serán las variables especificadas (separadas con espacios) en la sentencia BY las únicas que contendrá la tabla de salida. En el ejemplo de abajo se especifican todas las variables mediante el uso de _ALL_ (que también puede escribirse en minúsculas).'
		,'proc sort data=LIB_IN.NUMEROS_DUPLICADOS out=LIB_OUT.SIN_DUPLIS_SORT  nodupkey;\n	by _ALL_; /* _all_ = todas las variables */\nrun;'
		]
		,[
		'Selección de registros con niveles de agregación ("semi-duplicados"). Instrucciones FIRST y LAST en paso DATA'
		,'Es posible que una tabla cuente con varios posibles niveles de agregación. Es decir, la tabla contiene individuos (personas, cosas) que pueden ser clasificados por una o más variables (segmento comercial, color, fecha de contratación...).\n\nEn el ejemplo de abajo se utiliza una tabla que informa de las adquisiciones efectuadas por clientes, junto con más datos asociados a dichas adquisiciones. Así, las adquisiciones pueden clasificarse según el cliente, o según la fecha de compra, o según ambas.\n\nEl paso DATA recorre de manera secuencial una tabla, digamos de arriba a abajo. Si esta tabla está ordenada, las opciones FIRST y LAST permiten efectuar operaciones en los registros "primero" y "último" de cada nivel de agregación.\n\nLa ventaja del uso de estas opciones es que, por lo general, en SQL se requerirían de más pasos para obtener un mismo resultado.'
		,'/*\n	Extracción de primeros y últimos registros.\n	Selección de información con "first" y "last"\n	mediante la sentencia "by" en un paso DATA.\n\n	Ejemplo 1: Obtener qué es lo último y más caro\n	que ha adquirido cada cliente.\n*/\nproc sort data= LIB_IN.HISTORICO_EJEMPLO out=WORK.HISTORICO_EJEMPLO;\n	by CLIENTE descending FECHA descending FACTURADO ;\nrun;\ndata LIB_OUT.ULTIMAS_COMPRAS;\n	set WORK.HISTORICO_EJEMPLO;\n	by CLIENTE /*descending FECHA /*descending FACTURADO ;\n	if first.CLIENTE then\n		output;\nrun;\n/*\n	Ejemplo 2: Obtener qué es lo más barato\n	que ha adquirido cada cliente cada día.\n*/\nproc sort data= LIB_IN.HISTORICO_EJEMPLO out=WORK.HISTORICO_EJEMPLO;\n	by CLIENTE descending FECHA descending FACTURADO ;\nrun;\ndata LIB_OUT.COMPRAS_BARATAS;\n	set WORK.HISTORICO_EJEMPLO;\n	by CLIENTE descending FECHA /*descending FACTURADO*/;\n	if last.FECHA then\n		output;\nrun;'
		]
		,[
		'Introducción al macrolenguaje. Macroprogramas: BorrarTabla'
		,'El siguiente macroprograma elimina la tabla de datos cuyo nombre se haya proporcionado. En otras palabras, el usuario le dará el nombre de una tabla al macroprograma y éste la eliminará.\n\n-----------------\n\nEn el ejemplo primero se define el macroprograma, y en la última línea está la invocación de dicho macroprograma. Para poder invocar el macroprograma, y así utilizarlo, se debe primero compilar (enviar a SAS su definición), como cualquier otro código.\n\nSi por algún casual se envió a SAS una definición errónea de un macroprograma, lo que se debe hacer es corregir su código y volver a enviarlo.\n\nCuando un macroprograma ha sido compilado, éste podrá utilizarse durante toda la sesión, pero al cerrar la sesión se borrará del catálogo de macroprogramas interno de SAS, y se deberá volver a cargar en la siguiente sesión.'
		,'/*\n	Definir un macroprograma que elimine\n	una tabla dada e informe en la log al\n	usuario con un mensajito.\n*/\n%macro BorrarTabla(TABLA_IN);\n	proc delete data= &TABLA_IN.;\n	run;\n	%put ATENCIÓN: La tabla &TABLA_IN. ha sido eliminada.;\n%mend BorrarTabla;\n\n%BorrarTabla(MI_TABLA);'
		]
		,[
		'Introducción al macrolenguaje. Macroprogramas: DeduplicarEInformar'
		,'El siguiente macroprograma elimina los duplicados de un tabla de datos y crea otra nueva en el proceso, en función de los nombres que se hayan proporcionado. En otras palabras, el usuario le dará el nombre de una tabla que (en principio) contiene registros duplicados (parámetro TABLA_IN) al macroprograma, y también el nombre de la tabla de salida, y el macroprograma producirá una tabla igual a la de entrada pero sin duplicados (parámetro TABLA_OUT).\n\nAdemás, en este ejemplo no se han utilizado parámetros posicionales, es decir, gracias a que han incluido los símbolos de igual (=) en los parámetros de la cabecera, a la hora de invocar el macroprograma, éstos se pueden utilizar en el orden que se desee.\n\n-----------------\n\nEn el ejemplo primero se define el macroprograma, y en la última línea está la invocación de dicho macroprograma. Para poder invocar el macroprograma, y así utilizarlo, se debe primero compilar (enviar a SAS su definición), como cualquier otro código.\n\nSi por algún casual se envió a SAS una definición errónea de un macroprograma, lo que se debe hacer es corregir su código y volver a enviarlo.\n\nCuando un macroprograma ha sido compilado, éste podrá utilizarse durante toda la sesión, pero al cerrar la sesión se borrará del catálogo de macroprogramas interno de SAS, y se deberá volver a cargar en la siguiente sesión.'
		,'/*\n	Definir un macroprograma que elimine\n	los duplicados de una tabla, e informe\n	al usuario de que se ha efectuado.\n*/\n%macro DeduplicarEInformar(TABLA_IN=, TABLA_OUT=);\n	proc sql;\n		create table &TABLA_OUT. as\n		select distinct *\n		from &TABLA_IN.;\n	quit;\n	%put ATENCIÓN: Se ha deduplicado la tabla &TABLA_IN. en la tabla &TABLA_OUT..;\n%mend DeduplicarEInformar;\n\n%DeduplicarEInformar(TABLA_OUT=MI_TABLA_SALIDA, TABLA_IN=TABLA_CON_DUPLICADOS);'
		]
		,[
		'Ejercicio 1'
		,'Se tiene una tabla con las bebidas que han consumido una serie de personas (LIB_IN.BEBIDAS), el lugar/circunstancia en que lo han hecho y el día. Se pide:\n	a) Un listado de todas las personas que han bebido algo, ordenadas alfabéticamente por su nombre.\n	b) Un listado de todas las bebidas que han consumido.\n	c) Una relación entre las personas y los lugares en los que han estado alguna vez (ordenada por nombre y lugar).'
		,'/*\n	Pasos previos. Asignación de librerías.\n*/\n%let RUTA_TRABAJO=C:\Users\n nombre.apellido\Desktop\SAS\Sesión 4; \nlibname LIB_IN "&RUTA_TRABAJO.\Input"; * Precondición: existe la carpeta;\nlibname LIB_OUT "&RUTA_TRABAJO.\Output"; * Precondición: existe la carpeta;\n/*\n	Ejercicio 1\n*/\n/* a */\nproc sql;\n	create table LIB_OUT.LISTA_PERSONAS as\n	select distinct NOMBRE\n	from LIB_IN.BEBIDAS\n	order by NOMBRE;\nquit;\nproc print; run;\n\n/* b */\nproc sql;\n	create table LIB_OUT.LISTA_BEBIDAS as\n	select distinct BEBIDA\n	from LIB_IN.BEBIDAS\n	order by BEBIDA;\nquit;\nproc print; run;\n\n/* c */\nproc sql;\n	create table LIB_OUT.REL_LUGAR_PERSONA as\n	select distinct \n		LUGAR\n		,PERSONA\n	from LIB_IN.BEBIDAS\n	order by \n		LUGAR\n		,PERSONA;\nquit;\nproc print; run;'
		]
		,[
		'Ejercicio 2'
		,'De ese mismo listado, se pide lo siguiente:\n	a) Para cada persona, ¿cuándo fue la última vez que consumió algo?\n	b) Para cada lugar, ¿cuál es la primera fecha en que fue visitado? ¿Por quién/es?'
		,'/*\n	Ejercicio 2\n*/\n/* a */\nproc sort data=LIB_IN.BEBIDAS out=WORK.BEBIDAS_ORD;\n	by NOMBRE descending FECHA;\nrun;\ndata LIB_OUT.MI_ULTIMA_VEZ (keep = NOMBRE FECHA);\n	set WORK.BEBIDAS_ORD;\n	by NOMBRE descending FECHA;\n	if first.NOMBRE then output;\nrun;\nproc print; run;\n\n/* b */\nproc sort data=LIB_IN.BEBIDAS out=WORK.BEBIDAS_ORD;\n	by LUGAR FECHA;\nrun;\ndata WORK.PRIMERA_VISITA (keep = LUGAR FECHA); * Se selecciona la primera fecha de cada lugar;\n	set WORK.BEBIDAS_ORD;\n	by LUGAR FECHA;\n	if first.LUGAR then output;\nrun;\nproc sql; * Se cruza, por si hay más de una persona que visitó ese lugar ese mismo día;\n	create table LIB_OUT.PRIMERAS_VISITA as\n	select distinct\n		A.LUGAR\n		,A.FECHA\n		,A.NOMBRE\n	from LIB_IN.BEBIDAS as A\n		right join WORK.PRIMERA_VISITA as B\n			on (A.LUGAR = B.LUGAR and A.FECHA = B.FECHA);\nquit;\nproc print; run;'
		]
		,[
		'Ejercicio 3'
		,'Construye un macroprograma que sirva para efectuar filtros en tablas. Como parámetros, debe tener:\n	- Un parámetro para la tabla de entrada.\n	- Un parámetro para la tabla de salida.\n	- Un parámetro para el filtro.\nEl macroprograma debe informar al usuario de que se ha ejecutado con un mensajito. Por último, compila la macro y efectúa una ejecución de ejemplo.'
		,'/*\n	Ejercicio 3\n*/\n%macro Filtrar(TABLA_IN=, TABLA_OUT=, FILTRO=);\n	data &TABLA_OUT.;\n		set &TABLA_IN.;\n		where &FILTRO.;\n	run;\n	%put Se ha filtrado la tabla &TABLA_IN. y generado la tabla &TABLA_OUT utilizando\n		el filtro &FILTRO..;\n%mend Filtrar;\n\n%Filtrar (TABLA_OUT=WORK.BEBIDAS, TABLA_IN=LIB_IN.BEBIDAS, FILTRO=bebida = "Cola-cao");'
		]
	]
	// Bloque 5
	,[
		[
		'Lista de operadores'
		,'Para obtener una lista de los operadores aritméticos, lógicos y de comparación, abra la ayuda de SAS y busque "SCL Operators", es decir, los operadores de los componentes del lenguaje SAS.'
		,'/*			\n	Operadores de comparación:\n\n	Igualdad			=		EQ\n	Diferencia			^=  NE  ¬=  ~= <>\n	Mayor que			>  GT\n	Menor que			<  LT\n	Mayor o igual que		>=  GE\n	Menor				<=  LE\n	Inclusión			IN\n\n\n	Operadores numéricos:\n\n	+  suma\n	-  resta\n	*  multiplicación\n	** exponenciación\n	/  división\n\n	Operadores lógicos:\n\n	& AND operador de conjunción\n	| OR  operador de disyunción\n	! NOT operador de negación\n	¬ NOT operador de negación\n	~ NOT operador de negación\n*/'
		]
		,[
		'Funciones PUT e INPUT'
		,'La función PUT permite convertir el contenido de una variable numérica en alfanumérico, a la vez que se proporciona un formato de conversión. Por otro lado, la función INPUT realiza la operación inversa: convertir una variable alfanumérica en numérica, mediante la especificación del formato alfanumérico (es decir, se le "explica" a SAS cómo está algo escrito en texto para que lo pueda convertir a un número).'
		,'/*\n	Función PUT:\n		Sintaxis: Variable_alfanumérica = put(variable_numerica, put);																											\n		Uso: Transformar variables de tipo numérico en variables de tipo alfanumérico		\n*/\ndata WORK.ORIGEN_PUT;\n	x1=1; 		output;\n	x1=123; 	output;\n	x1=1234;	output;\nrun;\ndata WORK.FUNCION_PUT;\n	set WORK.ORIGEN_PUT;\n	x2=put (x1,5.);\n	x3=put (x1,z5.);\n	x4=put (x1, e8.);\nrun;\n\n/*\n	Función INPUT:\n		Sintaxis: variable_numerica = input(variable_caracter, formato_input);																											\n		Uso: Convertir variables alfanuméricas en variables numéricas\n		Consideraciones: SAS almacena los números sin separar los miles, millones... por "." o ",",\n				pero sí que almacena el separador decimal.\n\n	Ejemplo 1 INPUT: Cantidades.\n*/\ndata WORK.ORIGEN_INPUT;\n	format a $6. b $11. c $9. d $8.;\n	a="55000";	b="67,000.43";	c="1.450,324";	d="20150515";	output; \nrun;\n\ndata WORK.FUNCION_INPUT;\n	set WORK.ORIGEN_INPUT;\n	a1=input(a,6.);\n	b1=input(b,comma11.);\n	c1=input(c, commax9.);\n	format d1 DATE9.;\n	d1=input(d,yymmdd8.);\n	y=d1/365;\nrun;\n\n/*\n	Ejemplo 2 INPUT: Fechas.\n*/\ndata WORK.ORIGEN_INPUT_FECHA;\n	A_cadena="20150515";	B_cadena="15052015";	C_cadena="2015-05-15";	output;\n	A_cadena="19870208";	B_cadena="02081987";	C_cadena="1987-02-08";	output;\n	A_cadena="20071231";	B_cadena="31122007";	C_cadena="2007-12-31";	output;\nrun;\n\ndata WORK.FUNCION_INPUT_FECHA;\n	set WORK.ORIGEN_INPUT_FECHA;\n	format 	A_fecha ddmmyys8. \n			B_fecha yymmddn8. \n			C_fecha date7.;\n	A_fecha=input(A_cadena,yymmdd8.);\n	B_fecha=input(B_cadena,ddmmyy8.);\n	C_fecha=input(C_cadena,anydtdte24.);\nrun;'
		]
		,[
		'Algunas funciones numéricas'
		,'SAS cuenta con muchas funciones numéricas. Algunas son las que se muestran en el ejemplo de abajo. Un aspecto a destacar de las funciones numéricas es que no operan los valores nulos (ausentes, missing), sino que los obvian. Esto no ocurre cuando se utilizan los operadores. Es decir, "5 + . " devolverá un valor nulo, pero "sum(5,.)" devolverá "5".'
		,'/*\n	Funciones numéricas.\n\n	a)SUM() Sumatorio\n	b)MAX() Valor máximo\n	c)MIN() Valor mínimo\n	d)MEAN() Calcula la media\n	e)ABS() valor absoluto\n	f)ROUND(variable,n) Redondea a n decimales. Si no se indica nada, redondea a 0 decimales\n*/\ndata WORK.ORIGEN_NUMERICAS;\n	Ciudad="Madrid";		Anio_2013=323455;	Anio_2014=2114356;	Anio_2015=656323;output;\n	Ciudad="Barcelona";		Anio_2013=822444;	Anio_2014=343453;	Anio_2015=23155;output;\n	Ciudad="Álava";			Anio_2013=123456;	Anio_2014=22355;	Anio_2015=123456;output;\n	Ciudad="Valencia";		Anio_2013=985633;	Anio_2014=.;		Anio_2015=7886709;output;\n	Ciudad="Sevilla";		Anio_2013=978745;	Anio_2014=6545776;	Anio_2015=165699;output;\n	Ciudad="Zaragoza";		Anio_2013=345346;	Anio_2014=456456;	Anio_2015=345346;output;\nrun;\ndata WORK.FUNCIONES_NUMERICAS;\n	set WORK.ORIGEN_NUMERICAS;\n	Sum_2015_2014 = sum(Anio_2015,Anio_2014);\n	Mayor_Facturacion = max(of Anio_20:); /* Máximo de todas las variables que comienzan por "Anio_20"*/\n	Facturacion_Media = mean (of A:); /* Media de todas las variables que comienzan por "A"*/\nrun;'
		]
		,[
		'Algunas funciones de texto'
		,'En SAS existe un gran número de funciones de cadenas de texto. Lo más recomendable es recurrir a la documentación de SAS. Algunas funciones se ven abajo.'
		,'/*\n	Funciones de texto.\n\n	a)COMPRESS: elimina de la cadena los caracteres especificados(si no se especifica, se eliminan blancos)\n	b)SUBSTR: extrae una parte de una cadena de texto 	\n 	c)SCAN: recupera un trozo de una cadena delimitado por uno o más caracteres\n 	d)RIGHT: alinea el texto a la derecha\n 	e)LEFT: alinea el texto a la izquierda\n	f)TRIM: elimina caracteres del comienzo y/o fin de la cadena y devuelve 0 si es missing\n 	g)UPCASE: convierte a mayúsculas\n*/\ndata WORK.FUNCIONES_TEXTO;\n	origen = "   Bienvenidos al curso de Programación SAS  ";\n	origen_compress = compress(origen);\n	origen_compress_a = compress(origen,"a");\n	origen_substr = substr(origen,4,20);\n	origen_scan = scan(origen,3," ");\n	origen_right = right(origen);\n	origen_left = left(origen);\n	origen_trim = trim(both " " from origen);\n	origen_upcase = upcase(origen);\nrun;'
		]
		,[
		'Algunas funciones de fechas'
		,'En SAS existe un gran número de funciones para manipular fechas. Lo más recomendable es recurrir a la documentación de SAS. Algunas funciones se ven en el ejemplo de abajo.'
		,'/*\n	Funciones de fechas.\n\n	1)YEAR, DAY, MONTH: devuelven el año, día y mes de una fecha, respectivamente\n	2)DATADIF: calcula diferencias entre fechas\n	2)INTCK: calcula diferencias entre fechas\n	3)INTNX: desplaza fechas (añade/resta unidades temporales)\n*/\ndata WORK.FUNCIONES_FECHA;\n	set LIB_IN.ORIGEN_FUNCIONES_FECHA;\n	*Si queremos conocer el día/mes/año de fecha utilizamos DAY()/MONTH()/YEAR();\n	dia_inicio = day(fecha_inicio);\n	mes_inicio = month(fecha_inicio);\n	anio_inicio = year(fecha_inicio);\n\n	*Si queremos conocer el numero de días entre dos fechas utilizamos DATADIF();\n	Dif_Inicio_Fin = datdif(fecha_inicio,fecha_fin,"ACT/ACT");\n	Dif_Fin_Inicio = datdif(fecha_fin,fecha_inicio,"ACT/ACT");\n\n	*Si queremos conocer el numero de días/meses/años que hay entre dos fechas usamos INTCK;\n	Dif_dias = intck("DAY",fecha_inicio,fecha_fin); \n	Dif_meses = intck("MONTH",fecha_inicio,fecha_fin);\n	Dif_anios = intck("YEAR",fecha_inicio,fecha_fin);\n	\n	*Si queremos sumar o restar días/meses/años a una fecha utilizamos INTNX;\n	format	dias_antes \n			meses_despues \n			anios_despues \n			fecha_fin ddmmyys10.;\n	dias_antes = intnx("DAY",fecha_fin,-17, "SAME");\n	meses_despues = intnx("MONTH",fecha_fin,18, "SAME");\n	anios_despues = intnx("YEAR",fecha_fin,10,"SAME");\n\n	*Si queremos llevar una fecha al principio o al final del mes, también INTNX;\n	format	primer_dia_mes_ini\n			ultimo_dia_mes_ini date9.;\n	primer_dia_mes_ini = intnx("MONTH",fecha_inicio,0, "BEGIN");\n	ultimo_dia_mes_ini = intnx("MONTH",fecha_inicio,0, "END");\nrun;'
		]
		,[
		'Funciones de agregación en PROC SQL. (Agrupaciones)'
		,'Mediante la sentencia GROUP BY en PROC SQL se pueden agregar datos según variables de grupo, tal y como se hace en SQL estándar. En el ejemplo inferior se ven algunas funciones que pueden ser agregadas ("sumarizadas").'
		,'/*\n	Funciones de agregación.\n\n	a)SUM - Suma\n	b)MAX - Máximmo\n	c)MIN - Mínimo\n	d)MEAN - Media\n	e)MEDIAN - Mediana\n	f)VAR - Varianza\n	g)COUNT - Conteo\n*/\n/*\n	Ejemplo de uso de estas funciones:\n*/\nproc sql;\n	create table WORK.AGREGADOS as\n	select\n		max (Enero) as MAX_ENEERO\n		,mean(Febrero) as MEAN_FEBRERO\n		,median(Marzo) as MEDIAN_MARZO\n	from LIB_IN.MATRIMONIOS2008;\nquit;\n\n/*\n	Uso de estas funciones junto a la\n	sentencia de agrupación GROUP BY\n*/\nproc sql;\n	create table WORK.AGREGADOS_GROUPBY as\n	select\n		B.CCAA\n		,max (Enero) as MAX_ENEERO\n		,mean(Febrero) as MEAN_FEBRERO\n		,median(Marzo) as MEDIAN_MARZO\n		,count(*) as NUM_PROVINCIAS\n	from LIB_IN.MATRIMONIOS2008 as A\n		left join LIB_IN. CCAAPROV as B\n			on (A.CODPRO = B.CODPRO)\n	group by \n		B.CCAA;\nquit;'
		]
		,[
		'Ejercicio 1'
		,'Supongamos que queremos tener un listado con los contratos de productos que aún están vigentes. Para ello debemos tener en cuenta lo siguiente:\n	- Se tiene la tabla LIB_IN.PLAZOS, que contiene los productos con sus contratos y la fecha de apertura. Además, la variable FECHA_APERTURA_EXTRANJERO incorpora la fecha en formato de cadena para los contratos abiertos en el extranjero. La variable PLAZO_CONTRATO indica, en días, la vigencia del contrato.\n	\n	- La tabla LIB_IN.CANCELACIONES contiene la fecha de cancelación del contrato (si es missing, no ha sido cancelado).\n	\n	- Se considera como "vencido" un contrato cuyo plazo (duración) ha ocurrido o si ha sido cancelado.\n	\n	- Los contratos se mueven según el producto. Es decir, se puede tener un contrato con número identificador 35 para el producto A, y un contrato con la misma numeración para un producto B, pero no tienen ninguna relación entre ellos.\n	\nObtén dicho listado.'
		,'/*\n	Pasos previos. Asignación de librerías.\n*/\n%let RUTA_TRABAJO=C:\Users\n nombre.apellido\Desktop\SAS\Sesión 5; \nlibname LIB_IN "&RUTA_TRABAJO.\Input"; * Precondición: existe la carpeta;\nlibname LIB_OUT "&RUTA_TRABAJO.\Output"; * Precondición: existe la carpeta;\n/*\n	Ejercicio 1\n*/\ndata WORK.PLAZOS (drop = fecha_apertura_nacional fecha_apertura_extranjero);\n	set LIB_IN.PLAZOS;\n	format fecha_apertura date9.;\n	fecha_apertura = fecha_apertura_nacional;\n	if fecha_apertura eq . then\n		fecha_apertura = input (fecha_apertura_extranjero,yymmdd8.);\nrun;\nproc sql;\n	create table LIB_OUT.CONTRATOS_VIGENTES as\n	select\n		A.CONTRATO\n		,A.PRODUCTO\n		,intnx("MONTH",A.FECHA_APERTURA,A.PLAZO_CONTRATO, "SAME") as FECHA_VENCIMIENTO format = date9.\n	from WORK.PLAZOS as A\n		left join LIB_IN.CANCELACIONES as B\n			on (A.CONTRATO=B.CONTRATO and A.PRODUCTO=B.PRODUCTO)\n	where	(intnx("MONTH",A.FECHA_APERTURA,A.PLAZO_CONTRATO, "SAME") > today()) /* Que no haya pasado el plazo */\n			and B.FECHA_CANCELACION eq .\n	;\nquit;'
		]
		,[
		'Ejercicio 2'
		,'Dado el conjunto de datos de bebidas LIB_IN.BEBIDAS de la sesión 4, se pide:\n	a) Calcular la cantidad total de bebidas consumidas.\n	b) Listar la cantidad total de bebidas consumidas por persona, de mayor a menor.\n	c) Listar la media de bebidas consumidas por cada uno de los lugares.\n	d) Ver qué bebidas son las más populares (listado de mayor a menor).\n	e) Calcular la cantidad de bebidas diferentes consumidas.'
		,'/*\n	Ejercicio 2\n*/\nproc sql;\n	/* a) */\n	select count(*) as CANTIDAD_BEBIDAS\n	from LIB_IN.BEBIDAS;\n\n	/* b) */\n	select \n		NOMBRE\n		,count(*) as CANTIDAD_BEBIDAS\n	from LIB_IN.BEBIDAS\n	group by NOMBRE\n	order by CANTIDAD_BEBIDAS desc;\n\n	/* c) */\n	select \n		LUGAR\n		,mean(CANTIDAD_BEBIDAS) as MEDIA_X_DIA\n	from\n		(	/* Sub consulta */\n			select \n				LUGAR\n				,FECHA\n				,count(*) as CANTIDAD_BEBIDAS\n			from LIB_IN.BEBIDAS\n			group by LUGAR\n				,FECHA\n		)\n	group by LUGAR\n	order by MEDIA_X_DIA desc;\n\n	/* d) */\n	select \n		BEBIDA\n		,count(*) as VECES_CONSUMIDA\n	from LIB_IN.BEBIDAS\n	group by BEBIDA;\n\n	/* e) */\n	select count(distinct BEBIDA) as BEBIDAS_DIFERENTES\n	from LIB_IN.BEBIDAS;\nquit;'
		]
		,[
		'Ejercicio 3'
		,'Queremos conocer los ingresos por venta de una empresa (tabla VENTAS_EMPRESA). Para ello debemos tener en cuenta las siguientes premisas:\n	- La empresa vende sus productos en varios países (debemos tener en cuenta el tipo de cambio).\n	- El tipo de cambio viene recogido en la tabla TIPO_DE_CAMBIO.\n	- La tabla TIPO_DE_CAMBIO recoge los tipos de cambio por periodo. Para este ejercicio necesitamos el tipo del último periodo (en este caso tiene la fecha de fin de validez a máximos).\n	- Si la venta se produce en Euros no es necesario aplicar ningún tipo de cambio.'
		,'/*\n	Ejercicio 3\n*/\nproc sort data=LIB_IN.TIPO_DE_CAMBIO;\n	by moneda fecha_fin;\nrun;\nproc sort data=LIB_IN.TIPO_DE_CAMBIO out=WORK.TIPO_CAMBIO_PERIODO;\n	by moneda;\nrun;\nproc sort data=LIB_IN.VENTAS_EMPRESA;\n	by moneda;\nrun;\ndata WORK.VENTAS_TIPO_CAMBIO;\n	merge	LIB_IN.VENTAS_EMPRESA (in=a)\n			WORK.TIPO_CAMBIO_PERIODO (in=b);\n		by moneda;\n	if a; /* Similar a un left join */\nrun;\ndata WORK.VENTAS_MONEDA_ORIGEN (drop = tipo_de_cambio rename=(tipo_cambio_temp = tipo_de_cambio));\n	set WORK.VENTAS_TIPO_CAMBIO;\n	if missing(tipo_de_cambio) then /* tipo_de_cambio eq . */\n		tipo_cambio_temp=1;\n	else\n		tipo_cambio_temp = tipo_de_cambio;\n	ingresos_por_venta = unidades*precio*tipo_cambio_temp; \nrun;\nproc sql;\n	create table WORK.INGRESOS_POR_PRODUCTO as\n	select\n		producto\n		,sum(ingresos_por_venta) as ingresos_por_producto\n	from WORK.VENTAS_MONEDA_ORIGEN \n	group by 1;\nquit;'
		]
		,[
		'Ejercicio 4'
		,'Se quiere conocer el margen total de cada cliente de chucherías. Consideraciones:\n	- Los datos de los cliente se encuentran en la tabla LIB_IN.CLIENTES_CHUCHES.\n	- El número de unidades vendidas y los descuentos aplicados se encuentran en la tabla LIB_IN.VENTAS_CHUCHES.\n	- El precio de venta por unidad y el % de margen de cada producto se encuentran en la taba LIB_IN.PRODUCTOS_CHUCHES.\n	- La fórmula para el cálculo del margen total es MARGEN_TOTAL=UNIDADES*PRECIO_VENTA*(1-DESCUENTO)*MARGEN_BRUTO.\n	- Las ventas vienen detalladas por pedido; es necesario sumarizar.'
		,'/*\n	Ejercicio 4\n*/\nproc sql;\n	create table WORK.CLIENTES_CALCULOS as \n	select distinct /* No se sabe si hay duplicados */\n		a.*\n		,b.id_producto\n		,b.fecha\n		,b.unidades\n		,b.descuento\n		,c.producto\n		,c.categoria\n		,c.subcategoria\n		,c.precio_venta\n		,c.margen_bruto\n		,unidades*precio_venta as ventas_totales\n		,unidades*precio_venta*(1-descuento) as ventas_descuento\n		,unidades*precio_venta*(1-descuento)*margen_bruto as margen_total\n	from LIB_IN.CLIENTES_CHUCHES as a\n		inner join LIB_IN.VENTAS_CHUCHES as b\n			on a.id_cliente=b.cliente\n		inner join LIB_IN.PRODUCTOS_CHUCHES as c\n			on b.id_producto=c.id_producto;\n\n	create table WORK.CLIENTES_CALCULOS_AGR as\n	select 	\n		id_cliente\n		,sum(ventas_totales) as ventas_totales\n		,sum(ventas_descuento) as ventas_descuento\n		,sum(margen_total) as margen\n	from WORK.CLIENTES_CALCULOS \n	group by 1;\n\n	create table ventas_sumarizadas as \n	select \n		a.id_cliente\n		,a.nombre\n		,a.region\n		,a.tipo_cliente\n		,b.margen\n	from LIB_IN.CLIENTES_CHUCHES as a\n		left join WORK.CLIENTES_CALCULOS_AGR as b\n			on a.id_cliente=b.id_cliente;\nquit;'
		]
	]
	// Bloque 6
	,[
		[
		'PROC MEANS: Uso básico'
		,'El uso básico de PROC MEANS -sin opciones-: éste nos proporciona estadísticos básicos sobre las variables numéricas de un conjunto de datos.'
		,'proc means data=LIB_IN.OPERACIONES;\nrun;'
		]
		,[
		'PROC MEANS: Especificación de variables y estadísticos'
		,'El procedimiento devuelve los estadísticos que hayamos especificado en la cabecera para las variables indicadas en la sentencia "var".'
		,'proc means data=LIB_IN.OPERACIONES mean std min p1;\n	var saldo;\nrun;'
		]
		,[
		'PROC MEANS: Generar una tabla de resultados'
		,'Se puede especificar, también, el nombre de una tabla de resultados que contenga los estadísticos calculados. Consulte más información acerca del PROC MEANS en la ayuda de SAS para ver cómo proceder en caso de querer obtener esta tabla para más de una variable al mismo tiempo.'
		,'proc means data=LIB_IN.OPERACIONES mean std min p1 Q3 P10;  \n	var saldo;\n	output out= WORK.RESUMEN;\nrun;'
		]
		,[
		'PROC MEANS: Operar los estadísticos mediante agrupaciones'
		,'Utilizando la sentencia "by" se pueden efectuar los cálculos teniendo en cuenta variables de agrupación.'
		,'proc sort data=LIB_IN.OPERACIONES out=WORK.OPERACIONES;\n	by producto;\nrun;\nproc means data=WORK.OPERACIONES mean std min p1 Q3 P10;  \n	var saldo;\n	by producto;\n	output out= WORK.RESUMEN_AGRUPADO;\nrun;'
		]
		,[
		'PROC FREQ: Uso básico'
		,'El uso básico de PROC FREQ -sin opciones-: éste nos proporciona conteos básicos sobre las variables categóricas (nominales y ordinales) de un conjunto de datos.'
		,'proc freq data=LIB_IN.OPERACIONES;\nrun;'
		]
		,[
		'PROC FREQ: Especificación de variables'
		,'Con la sentencia "tables" se indica de qué variables se quiere obtener tablas de frecuencias.'
		,'proc freq data=LIB_IN.OPERACIONES;\n	tables interes producto;\nrun;'
		]
		,[
		'PROC FREQ: Relación entre variables'
		,'Utilizando el símbolo "*" (asterisco) se pueden crear tablas de contingencias (matrices de confusión), es decir, efectuar conteos cruzando dos variables categóricas.'
		,'proc freq data=LIB_IN.OPERACIONES;\n	tables interes producto interes * producto;\nrun;'
		]
		,[
		'PROC FREQ: Test de independencia Chi-Cuadrado'
		,'La opción "Chisq" efectúa el test de independencia entre las variables que se cruzan.'
		,'proc freq data=LIB_IN.OPERACIONES;\n	tables interes * producto /Chisq;\nrun;'
		]
		,[
		'PROC CONTENTS: Uso básico'
		,'Este procedimiento devuelve la información acerca de las propiedades de una tabla y de sus metadatos (variables y sus propiedades).'
		,'proc contents data=LIB_IN.OPERACIONES;\nrun;'
		]
		,[
		'PROC CONTENTS: Producir una tabla de resultados'
		,'Los resultados del procedimiento pueden almacenarse en otra tabla. Para saber más acerca de esto, consulte la ayuda de SAS.'
		,'proc contents data=LIB_IN.OPERACIONES  out=WORK.METADATOS_OPERACIONES;\nrun;'
		]
		,[
		'PROC CONTENTS: Producir tablas con los metadatos de toda una librería'
		,'Un método de extracción de metadatos a gran escala puede llevarse a cabo con la especificación "_ALL_" (en mayúsculas o minúsculas). Si en vez de indicar el nombre de una tabla, se especifica "_ALL_", se obtendrán los metadatos de todas las tablas de la librería (en el ejemplo de abajo, de la librería WORK).'
		,'proc contents data=WORK._ALL_  out=WORK.METADATOS_WORK noprint;\nrun;'
		]
	]
];