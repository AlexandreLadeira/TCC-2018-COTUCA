function trocaEstilo() {

	if(document.getElementById('modo').innerHTML == "")
	{
		document.getElementById('estilo').setAttribute('href','css/altoContraste.css');
		document.getElementById('found').setAttribute('href','css/foundation2.css');
		document.getElementById('modo').innerHTML = "altoContraste";
	}
	else
	{
		document.getElementById('estilo').setAttribute('href','css/app.css');
		document.getElementById('found').setAttribute('href','css/foundation.css');
		document.getElementById('modo').innerHTML = "";
	}	




}

function moeda(z){
	v = z;
	v = v.replace(",",".");	
	return v;
	}

function CorridaUber(){
	var bandeira 	= parseFloat(moeda(document.getElementById("bandeira").value));
	var quilometro 	= parseFloat(moeda(document.getElementById("quilometro").value));
	var distancia 	= parseFloat(moeda(document.getElementById("distancia").value));
	
	console.log(bandeira);
	console.log(quilometro);
	console.log(distancia);

	var resultado = quilometro*distancia + bandeira;

	resultado = parseFloat(resultado.toFixed(2)) + "";

	resultado = resultado.replace(".",",");

	document.getElementById("resultado").innerHTML = "R$" + resultado; 
}

