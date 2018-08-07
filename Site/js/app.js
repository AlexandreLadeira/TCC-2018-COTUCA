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


function falar(indice){   
	
	var texto = document.getElementById("texto"+indice).textContent; // pega o texto com o id do indice	
	var vet   = texto.split(".");// divide o texto em um vetor, a partir de cada ponto final
	var i	  = 1;
	var msg   = new SpeechSynthesisUtterance(vet[0]);	
	
	msg.lang  = 'pt-BR';//garantindo que está em pt-br

	window.speechSynthesis.speak(msg); // fala a primeira frase 
	
	
	while (i < vet.length) // fala o vetor de frases inteiro
	{		
		msg = new SpeechSynthesisUtterance(vet[i]);
		msg.lang = 'pt-BR';	//pt-br	
		window.speechSynthesis.speak(msg);		
		i++;		
	}

	

}

