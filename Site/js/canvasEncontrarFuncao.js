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
var a = 0, b = 0;
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

var comoEscreverX1, comoEscreverY1;
var comoEscreverX2, comoEscreverY2;

var a, b;

function validarPontos()
{
    // Excluir Depois:

    x1 = 0;
    y1 = 1;
    x2 = 1;
    y2 = 2;

    //////////////////

    a = (y1 - y2) / (x1 - x2);
    b = y1 - a*x1;

    prosseguir(getTituloDaEtapa(0), getTextoDaEtapa(0), false, true);
}

function getTituloDaEtapa(etapaAtual)
{
    if (etapaAtual == 0)
        return "Etapa 1: Encontrar equações a partir dos pontos já conhecidos";
    else if (etapaAtual == 0.5)
        return "Etapa 1: Encontrar o valor de 'b'";
    else if (etapaAtual == 1)
        return "Etapa 2: Encontrar o valor de 'b'";
    else if (etapaAtual == 1.5)
        return "Etapa 2: Encontrar o valor de 'a'";
    else if (etapaAtual == 2)
        return "Etapa 3: Encontrar o valor de 'a'";
    else if (etapaAtual == 2.5)
        return "Etapa 3: Substituir os valores encontrados na função";
    else if (etapaAtual == 3)
        return "Etapa 3: Substituir os valores encontrados na função";
    
    return "";
}

function getTextoDaEtapa(etapaAtual)
{    
    var texto = "";

    if (etapaAtual == 0)
    {
        texto = "Para encontrar a função, utilizaremos primeiramente o que chamamos de 'sistema'. Para isso, basta substituir tanto " +
        "x quanto y do 'corpo' de uma função linear (y = ax + b) pelos valores de cada ponto que conhecemos, encontrando duas " +
        "equações: "  + y1 + " = " + x1 + " * a + b e " + y2 + " = " + x2 + " * a + b. Devemos nos lembrar que tanto o valor de a " + 
        "e b são iguais nas duas equações encontradas, e assim, podemos igualar o valor de 'b', encontrando uma única equação com " +
        "uma única incógnita, 'a': ";

        var comoEscreverX1, comoEscreverX2;
        if (x1 >= 0)
            comoEscreverX1 = " - a*" + x1;
        else
            comoEscreverX1 = " + a*" + x1;
        
        if (x2 >= 0)
            comoEscreverX2 = " - a*" + x2;
        else
            comoEscreverX2 = " + a*" + x2;
        
        texto += y1 + comoEscreverX1 + " = " + y2 + comoEscreverX2;
    } 
    else if (etapaAtual == 0.5)
        texto = "Para encontrar a função, devemos encontrar o valor tanto de 'a' quanto de 'b'. Como sabemos que temos um ponto que " +
        "passa por (0, 0), encontrar o valor de 'b' fica ainda mais fácil. Substituindo os valores desse ponto no 'corpo' da função " +
        "(y = ax + b), encontramos 0 = a*0 + b, e assim podemos concluir que o valor de 'b' é igual a 0.";
    else if (etapaAtual == 1)
    {
        texto = "Como já encontramos uma equação com a incógnita 'a', podemos desenvolvê-la e assim encontraremos o valor de 'a', " +
        "que será igual a " + a;
    }
    else if (etapaAtual == 1.5)
    {
        texto = "Como já encontramos o valor de 'b', agora podemos encontrar o valor de 'a'. Para isso, basta substituir " +
        "tanto o valor que encontramos de 'b' quanto os valores de um dos pontos no 'corpo' da função. Vamos utilizar o ponto x1, " +
        "mas poderíamos utilizar o ponto x2. Substituindo, encontramos: ";
        
        var comoEscreverElemento, comoEscreverB;

        if (x1 >= 0)
            comoEscreverElemento = "a*" + x1;
        else
            comoEscreverElemento = "- a*" + x2;

        texto += "y = " + comoEscreverElemento + " + 0, que é o mesmo que y = " + comoEscreverElemento + ". Assim, encontramos " +
        "que a = " + a; 
    }
    else if (etapaAtual == 2)
    {
        texto = "Como já encontramos o valor de "
    }
    else if (etapaAtual == 2.5)
        texto = "Tudo o que devemos fazer agora é substituir todos os valores que encontramos de 'a' e 'b' na função. " + 
        "Como 'a' equivale a " + a + " e 'b' equivale a 0, podemos concluir que a equação da função é y = " + a * "x.";


    return texto;
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
    desenharGrafico(x1, y1, x2, y2, etapa);
    setTimeout(function(){
        prosseguir(getTituloDaEtapa(etapa), getTextoDaEtapa(etapa), true, true)
    }, 1500);
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

function desenharGrafico()
{
    canvas.width = canvas.height;

    desenharGrade();

    var maiorPonto = Math.max(x1, x2, y1, y2);
    var menorPonto = Math.min(x1, x2, y1, y2);

    var razaoLabels = encontrarRazaoLabels(menorPonto, maiorPonto);

    desenharEixos(razaoLabels);

    c.beginPath();
    c.font = "42px Montserrat";
    c.fillText(funcao, larguraColuna, larguraLinha);

    c.fillText("a: ?", larguraColuna, larguraLinha + 42);
    c.fillText("b: ?", larguraColuna, larguraLinha + 84);

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

        etapa++;

        tratarEtapa();

        elem.style.cursor = 'default';
        window.speechSynthesis.cancel();
    }
    else if (mouseSobreAudio(x, y))
    {
        var velocidade = document.getElementById("velocidade").value;

        if(window.speechSynthesis.speaking)	
		    window.speechSynthesis.cancel(); // Reiniciar caso já esteja executando
        else
        {
            var texto = getTituloDaEtapa(etapa);    // Pega o título para falá-lo
            var msg   = new SpeechSynthesisUtterance(texto);
            msg.lang = 'pt-BR';	                    // Coloca a mensagem em português
            msg.rate  = velocidade;	
            window.speechSynthesis.speak(msg);      // Fala o título

            texto = getTextoDaEtapa(etapa);
            var vet   = texto.split(",").join(".").split(".");

            for (var i = 0; i < vet.length; i++)
            {
                msg = new SpeechSynthesisUtterance(vet[i]);
                msg.lang = 'pt-BR';
                msg.rate  = velocidade;	
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