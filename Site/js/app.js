function trocaEstilo(arq) {

	if(document.getElementById('modo').innerHTML == "")
	{
		document.getElementById('estilo').setAttribute('href','css/altoContraste.css');
		document.getElementById('modo').innerHTML = "altoContraste";
	}
	else
	{
		document.getElementById('estilo').setAttribute('href','css/app.css');
		document.getElementById('modo').innerHTML = "";
	}

	
	

	console.log(arq);
}