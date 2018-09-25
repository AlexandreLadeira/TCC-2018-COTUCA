var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var qtasLinhas = 18;
var qtasColunas = 18;

var larguraLinha = canvas.height / qtasLinhas;
var larguraColuna = canvas.width / qtasColunas;

var messageBoxProximoHabilitado = false;
var messageBoxAnteriorHabilitado = false;
var messageBoxHabilitado = false;

var etapa = 0;
var funcao = "f(x) = ax + b";

// Desenhar a grade
function desenharGrade()
{
    c.strokeStyle = "rgb(169, 169, 169)";
    c.lineWidth = 1.2;

    // Colunas
    for (var i = larguraColuna; i < canvas.width; i += larguraColuna)
    {
        c.beginPath();
        c.moveTo(i, 0);
        c.lineTo(i, canvas.height);
        c.stroke();
    }

    // Linhas
    for (var i = larguraLinha; i < canvas.height; i += larguraLinha)
    {
        c.beginPath();
        c.moveTo(0, i);
        c.lineTo(canvas.width, i);
        c.stroke();
    }
}

// Desenha os eixos X e Y, assim como os pontos das abscissas e ordenadas
function desenharEixos(razaoLabels)
{
    razaoLabels = razaoLabels || 1;

    c.beginPath();
    c.lineWidth = 2;
    c.strokeStyle = "rgb(54, 54, 54)";

    //EIXO X
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);

    //EIXO Y
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);

    c.stroke();

    // Colocando os pontos:
    c.beginPath();
    c.font = "16px Arial";

    // Eixo X
    var pontoAtual = (qtasColunas - 2) / -2;    // -2 para retirar os pontos da borda
    for (var i = larguraColuna; i < canvas.width; i += larguraColuna)
    {
        c.fillText(pontoAtual * razaoLabels, i, canvas.height / 2);
        pontoAtual++;
    }
    
    // Eixo Y
    pontoAtual = (qtasLinhas - 2) / 2;          // -2 para retirar os pontos da borda
    for (var i = larguraLinha; i < canvas.height; i += larguraLinha)
    {
        if (pontoAtual != 0)
            c.fillText(pontoAtual * razaoLabels, canvas.width / 2, i);

        pontoAtual--;
    }
    c.stroke();
}


// Duas variáveis de cada tipo para fazer a reta crescer nos dois sentidos

var x1, y1, x2, y2;
function validarPontos()
{
    // Excluir Depois:

    x1 = 0;
    y1 = 1;
    x2 = 1;
    y2 = 2;

    //////////////////

    desenharGrafico(x1, y1, x2, y2);
}

// VARIÁVEIS SERÃO DEFINIDAS NO MÉTODO PROSSEGUIR
var larguraMensagem;
var alturaTitulo;
var alturaMensagem;
var ondeComecarX;
var ondeComecarY;

var alturaBotoes = 40;
var larguraBotoes;
var paddingBotoes = 20;
var ondeComecarBotaoX;

function prosseguir(titulo, mensagem, anteriorHabilitado, proximoHabilitado)
{
    var larguraDoCanvas = canvas.width;
    var alturaDoCanvas  = canvas.height;

    messageBoxHabilitado = true;

    larguraMensagem = larguraDoCanvas * 5/6;
    alturaTitulo    = alturaDoCanvas  * 1/12;

    ondeComecarX = larguraDoCanvas * 1/12;
    ondeComecarY = larguraDoCanvas * 1/12;

    // Caixa de Título
    c.beginPath();
    c.shadowColor = "black";
    c.shadowBlur = 10;
    c.fillStyle = '#1779ba';
    c.fillRect(ondeComecarX, ondeComecarY, larguraMensagem, alturaTitulo);
    c.stroke();

    // Texto do Título
    c.beginPath();
    c.shadowBlur = 0;
    var margemTexto = 20;
    c.fillStyle = 'white';
    c.font = "36px Montserrat";
    c.fillText(titulo, ondeComecarX + margemTexto, ondeComecarY + alturaTitulo - margemTexto, larguraMensagem - 2*margemTexto);
    c.stroke();

    // Caixa de Mensagem
    c.shadowColor = "black";
    c.shadowBlur = 10;

    var qtasLinhas = c.measureText(mensagem).width /  (larguraMensagem - 2 * margemTexto);

    alturaMensagem = qtasLinhas * 16 + margemTexto + 2*paddingBotoes + alturaBotoes;

    c.fillStyle = "white";
    c.fillRect(ondeComecarX, ondeComecarY + alturaTitulo, larguraMensagem, alturaMensagem);
    c.stroke;
    c.shadowBlur = 0;

    // Texto da Mensagem
    c.fillStyle = "black";
    c.font = "24px Montserrat";

    var palavras = mensagem.split(' ');
    var linhaAtual = '';
    var y = ondeComecarY + alturaTitulo + 2 * margemTexto;
    var alturaLinha = 26;   // Recomendado: Tamanho da fonte + 2

    for(var i = 0; i < palavras.length; i++) {
        linhaAtual += palavras[i] + ' ';
        var tamanhoLinhaAtual = c.measureText(linhaAtual);
        var widthAtual = tamanhoLinhaAtual.width;
        if (widthAtual > larguraMensagem - 2 * margemTexto) 
        {
            c.fillText(linhaAtual, ondeComecarX + margemTexto, y, larguraMensagem - 2*margemTexto);
            linhaAtual = '';
            y += alturaLinha;
        }
    }
    c.fillText(linhaAtual, ondeComecarX + margemTexto, y, larguraMensagem - 2*margemTexto);

    // Caixas dos Botões
    c.shadowColor = "black";
    c.shadowBlur = 5;
    larguraBotoes = larguraMensagem / 5;
    paddingBotoes = 20;
    ondeComecarBotaoX = larguraMensagem / 2;

    c.fillStyle = '#1779ba';

    if (anteriorHabilitado)
        c.fillRect(ondeComecarBotaoX - larguraBotoes - paddingBotoes, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, larguraBotoes, alturaBotoes);
    
    if(proximoHabilitado)
        c.fillRect(ondeComecarBotaoX + larguraBotoes + paddingBotoes, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, larguraBotoes, alturaBotoes);
    
    c.stroke;
    c.shadowBlur = 0;   

    // Imagem do som
    var imagem = new Image;
    imagem.src = "imagens/IconeSom.png";
    c.drawImage(document.getElementById("som"), canvas.width / 2 - 20, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, 40, 40);


    // Texto dos Botões

    // -- Anterior
    c.font = "24px Montserrat";
    c.fillStyle = "white";

    if (anteriorHabilitado)
    {
        messageBoxAnteriorHabilitado = true;

        var tamanhoAnterior = c.measureText("Anterior");
        var widthAnterior = tamanhoAnterior.width;
        var paddingTextoAnterior = (larguraBotoes - widthAnterior)/2;
    
        c.fillText("Anterior", ondeComecarBotaoX - larguraBotoes - paddingBotoes + paddingTextoAnterior, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes + 26);
    }

    // -- Próximo
    if (proximoHabilitado)
    {
        messageBoxProximoHabilitado = true;

        var tamanhoProximo = c.measureText("Próximo");
        var widthProximo = tamanhoProximo.width;
        var paddingTextoProximo = (larguraBotoes - widthProximo)/2;

        c.fillText("Próximo",ondeComecarBotaoX + larguraBotoes + paddingBotoes + paddingTextoProximo, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes + 26);
    }
}

function getTituloEtapaAtual()
{
    if (etapa == 0)
        return "";
    else if (etapa == 0.5)
        return "";
    
    return "";
}

function getTextoEtapaAtual()
{
    if (etapa == 0)
        return "";
    else if (etapa == 0.5)
        return "";

    return "";
}

function tratarEtapa()
{
    
}

function encontrarRazaoLabels(menorPonto, maiorPonto)
{    
    var menorPonto;
    
    if (Math.abs(menorPonto) > Math.abs(maiorPonto))
        menorPonto = Math.abs(menorPonto);
    else
        menorPonto = Math.abs(maiorPonto);
    
    var achouRazao = false;
    var razaoLabels = 1;
    var deQuantoEmQuanto = 5;
    while (!achouRazao)
    {
        if (menorPonto / razaoLabels <= deQuantoEmQuanto)
            achouRazao = true;
        else
        {
            if (razaoLabels == 1)
                razaoLabels = deQuantoEmQuanto;
            else
                razaoLabels += deQuantoEmQuanto;
        }
    }

    return razaoLabels;
}

function desenharGrafico(x1, y1, x2, y2, etapaAtual)
{
    canvas.width = canvas.height;

    desenharGrade();

    var maiorPonto = Math.max(x1, x2, y1, y2);
    var menorPonto = Math.min(x1, x2, y1, y2);

    var razaoLabels = encontrarRazaoLabels(menorPonto, maiorPonto);

    desenharEixos(razaoLabels);

    c.beginPath();
    c.font = "42px Montserrat";
    c.fillText(funcao, larguraLinha, larguraColuna);

    c.stroke();

    c.beginPath();
    c.fillStyle   = '#002699';
    c.strokeStyle = '#002699';

    c.arc(
        canvas.width  / 2 + (x1 * larguraColuna)/razaoLabels, 
        canvas.height / 2 - (y1 * larguraLinha) /razaoLabels,
        8, 0, 2 * Math.PI);

    c.fill();
    c.stroke();

    c.beginPath();

    c.arc(
        canvas.width  / 2 + (x2 * larguraColuna) / razaoLabels, 
        canvas.height / 2 - (y2 * larguraLinha ) / razaoLabels, 
        8, 0, 2 * Math.PI);

    c.fill();
    c.stroke();

    c.beginPath();
    c.moveTo(canvas.width  / 2 + (x1 * larguraColuna)/razaoLabels  , canvas.height / 2 - (y1 * larguraLinha) /razaoLabels);
    c.lineTo(canvas.width  / 2 + (x2 * larguraColuna) / razaoLabels, canvas.height / 2 - (y2 * larguraLinha ) / razaoLabels);
    c.stroke();

    var xInicial1 = canvas.width  / 2 + (x1 * larguraColuna) / razaoLabels;
    var yInicial1 = canvas.height / 2 - (y1 * larguraLinha ) / razaoLabels;
    var xInicial2 = canvas.width  / 2 + (x2 * larguraColuna) / razaoLabels;
    var yInicial2 = canvas.height / 2 - (y2 * larguraLinha ) / razaoLabels;
    var xFinal1, yFinal1, xFinal2, yFinal2;

    var deltaX = x1 - x2;
    var deltaY = y1 - y2;

    var razao = Math.abs(deltaX /deltaY);

    var y = 20000;
    var x = y * razao;

    if (x1 > x2)
    {
        xFinal1 = canvas.width  / 2 + x;
        xFinal2 = canvas.width  / 2 - x;
    }
    else
    {
        xFinal1 = canvas.width  / 2 - x;
        xFinal2 = canvas.width  / 2 + x;
    }

    if (y1 > y2)
    {
        yFinal1 = canvas.height  / 2 - y;
        yFinal2 = canvas.height  / 2 + y;
    }
    else
    {
        yFinal1 = canvas.height  / 2 + y;
        yFinal2 = canvas.height  / 2 - y;
    }
    
    c.beginPath();
    c.moveTo(xInicial1, yInicial1);
    c.lineTo(xFinal1, yFinal1);
    c.stroke();

    c.beginPath();
    c.moveTo(xInicial2, yInicial2);
    c.lineTo(xFinal2, yFinal2);
    c.stroke();

}

desenharGrade();
desenharEixos();

// EVENTOS (MOVIMENTO DO MOUSE E CLIQUE DO MOUSE)
var elem = document.getElementById('canvas'),
elemLeft = elem.offsetLeft,
elemTop  = elem.offsetTop;


function mouseSobreAnterior(x, y)
{
    return messageBoxAnteriorHabilitado && 
    (x > ondeComecarBotaoX - larguraBotoes - paddingBotoes && x < ondeComecarBotaoX - paddingBotoes) && // Coordenada X
    (   
    (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes) &&  // Coordenada Y
    (y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes)                    // Coordenada Y
    );
}

function mouseSobreProximo(x, y)
{
    return messageBoxProximoHabilitado && 
    (x > ondeComecarBotaoX + larguraBotoes + paddingBotoes && x < ondeComecarBotaoX + 2 * larguraBotoes + paddingBotoes) && // Coord. X
    (
    (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes) &&    // Coordenada Y
    (y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes)                      // Coordenada Y
    );
}

function mouseSobreAudio(x, y)
{
    return messageBoxHabilitado && 
    (x > canvas.width / 2  - 20 && x < canvas.width/2 + 20) && // Coordenada X
    (
    (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes) &&    // Coordenada Y
    (y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes + 40)  // Coordenada Y
    );

}

elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
   if (mouseSobreAnterior(x, y))
    {
        messageBoxAnteriorHabilitado = false;
        messageBoxProximoHabilitado  = false;
        messageBoxHabilitado = false;

        if (b == 0 && etapa == 1)
            etapa -= 0.5;
        else
            etapa--;

        tratarEtapa();

        elem.style.cursor = 'default';
        window.speechSynthesis.cancel();
    }
   else if (mouseSobreProximo(x, y))
    {
        messageBoxProximoHabilitado  = false;
        messageBoxAnteriorHabilitado = false;
        messageBoxHabilitado = false;

        if (etapa == 0.5)
            etapa+= 0.5;
        else
            etapa++;

        tratarEtapa();

        elem.style.cursor = 'default';
        window.speechSynthesis.cancel();
    }
    else if (mouseSobreAudio(x, y))
    {
        if(window.speechSynthesis.speaking)	
		window.speechSynthesis.cancel(); // Reiniciar caso já esteja executando
        else
        {
            var texto = getTituloDaEtapa(etapa);    // Pega o título para falá-lo
            var msg   = new SpeechSynthesisUtterance(texto);
            msg.lang = 'pt-BR';	                    // Coloca a mensagem em português
            window.speechSynthesis.speak(msg);      // Fala o título

            texto = getTextoDaEtapa(etapa);
            var vet   = texto.split(",").join(".").split(".");

            for (var i = 0; i < vet.length; i++)
            {
                msg = new SpeechSynthesisUtterance(vet[i]);
                msg.lang = 'pt-BR';
                window.speechSynthesis.speak(msg);
            }

        }
    }
    

}, false);

elem.onmousemove = movimentoMouse;
function movimentoMouse(event)
{    
    var 
    x = event.pageX - elemLeft,
    y = event.pageY - elemTop;

    // Botão Anterior
    if (mouseSobreAnterior(x, y))
        elem.style.cursor = 'pointer';
    //Botão Próximo
    else if (mouseSobreProximo(x, y))
        elem.style.cursor = 'pointer';
    // Botão de Som
    else if (mouseSobreAudio(x, y))
        elem.style.cursor = 'pointer';
    else
        elem.style.cursor = 'default';
}