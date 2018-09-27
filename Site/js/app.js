//Troca o estilo do site, para se adapatar a casos de alto contrates
function trocaEstilo()
{
	//se não estiver em alto contraste, aplica o alto contraste
	if(document.getElementById('modo').innerHTML == "") 
	{
		document.getElementById('estilo').setAttribute('href','css/altoContraste.css');
		document.getElementById('found').setAttribute('href','css/foundation2.css');
		document.getElementById('modo').innerHTML = "altoContraste";

		
		for(i = 1; i <= 7; i++)
		{
			document.getElementById('ouvirSom'+i).src = "imagens/IconeSomC.png";
			document.getElementById('imagem'+i).src = "imagens/imagemc"+i+".jpg";
		}

		for (i = 8; i <= 14; i++)
			document.getElementById('ouvirSom'+i).src = "imagens/IconeSomC.png";

	}
	else // se estiver volta ao normal
	{
		document.getElementById('estilo').setAttribute('href','css/app.css');
		document.getElementById('found').setAttribute('href','css/foundation.css');
		document.getElementById('modo').innerHTML = "";

		for(i = 1; i <= 7; i++)
		{
			document.getElementById('ouvirSom'+i).src = "imagens/IconeSom.png";
			document.getElementById('imagem'+i).src = "imagens/imagem"+i+".jpg";
		}

		for (i = 8; i <= 14; i++)
			document.getElementById('ouvirSom'+i).src = "imagens/IconeSom.png";
	}	

}

function moeda(z)
{
	v = z;
	v = v.replace(",",".");	
	return v;
}

//exemplo na introdução de função
function CorridaUber()
{
	var bandeira 	= parseFloat(moeda(document.getElementById("bandeira").value));
	var quilometro 	= parseFloat(moeda(document.getElementById("quilometro").value));
	var distancia 	= parseFloat(moeda(document.getElementById("distancia").value));


	if( isNaN(bandeira) || isNaN(quilometro) || isNaN(distancia) )
		alert("Nenhum campo pode ser vazio ou conter letras");
	else
	{	
		var resultado = quilometro*distancia + bandeira;

		if(isNaN(resultado))
			resultado = 0.00;

		resultado = parseFloat(resultado.toFixed(2)) + "";

		resultado = resultado.replace(".",",");

		document.getElementById("resultado").innerHTML = "R$" + resultado; 
	}
}


function falar(indice)
{ 	
	//document.getElementById("player").textContent = "Cancelar"; funciona
	velocidade = document.getElementById("velocidade").value;
	
	if(window.speechSynthesis.speaking)	
		window.speechSynthesis.cancel(); // reinicia se ja estiver tocando
	else
	{
		var texto = document.getElementById("texto"+indice).textContent; // pega o texto com o id do indice	
		var vet   = texto.split(".");// divide o texto em um vetor, a partir de cada ponto final
		var i	  = 1;
		var msg   = new SpeechSynthesisUtterance(vet[0]);
	 	msg.rate  = velocidade;	
		
		msg.lang  = 'pt-BR';//garantindo que está em pt-br

		window.speechSynthesis.speak(msg); // fala a primeira frase 
		
		
		while (i < vet.length) // fala o vetor de frases inteiro
		{		
			msg = new SpeechSynthesisUtterance(vet[i]);
			msg.rate  = velocidade;
			msg.lang = 'pt-BR';	//pt-br	
			window.speechSynthesis.speak(msg);		
			i++;		
		}

	}

}

