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


function isPlaying(audelem) { return !audelem.paused; }

function falar(texto){       
	
	var vet   = texto.split("."); 
	var i	  = 0;
	var audio = document.getElementById('som');

	
	while (i < vet.length)
	{
		if(!(isPlaying(audio)))
		{
			audio.src = "http://translate.google.com/translate_tts?tl=pt&q="+ vet[i] +"&client=tw-ob";
			audio.play(); // funciona 
			i++;
		}
	}

	//https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_av_event_ended
	


/*	while (i < vet.length)
	{
		
			var url  = "http://translate.google.com/translate_tts?tl=pt&q="+ vet[i] +"&client=tw-ob";
			$('audio').attr('src',url).get(0).play();//play no audio 
			i++;
		
	} */

}

