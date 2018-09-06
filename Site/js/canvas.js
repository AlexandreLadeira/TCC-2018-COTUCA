var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var qtasLinhas = 12;
var qtasColunas = 12;

var larguraLinha = canvas.height / qtasLinhas;
var larguraColuna = canvas.width / qtasColunas;

var messageBoxProximoHabilitado = false;
var messageBoxAnteriorHabilitado = false;
var messageBoxHabilitado = false;

var etapa = 0;

// Desenhar a grade
function desenharGrade()
{
    c.strokeStyle = "rgb(169, 169, 169)";
    c.lineWidth = 1.5;

    //Grades das colunas do lado direito
    for (var i = canvas.width / 2; i < canvas.width; i += larguraColuna) 
    {     
        c.moveTo(i , 0);  
        c.lineTo(i, canvas.height); 
    }

    //Grades das colunas do lado esquerdo
    for (var i = canvas.width / 2; i > 0; i -= larguraColuna)
    {     
        c.moveTo(i , 0);  
        c.lineTo(i, canvas.height); 
    }

    //Grades das linhas de cima
    for (var i = canvas.height / 2; i > 0; i -= larguraLinha) 
    {    
        c.moveTo(0, i);  
        c.lineTo(canvas.width, i); 
    }

    //Grades das linhas de baixo
    for (var i = canvas.height / 2; i < canvas.height; i += larguraLinha)
    {    
        c.moveTo(0, i);  
        c.lineTo(canvas.width, i);  
    }
    c.stroke();
}
// Desenha os eixos X e Y, assim como os pontos das abscissas e ordenadas
function desenharEixos(razaoLabels)
{
    razaoLabels = razaoLabels || 1;
    c.font = "17px Arial";

    c.beginPath();
    //EIXO X
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);
    c.strokeStyle = "black";
    c.lineWidth = 1;

    //EIXO Y
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);
    c.strokeStyle = "black";
    c.lineWidth = 1;

    c.stroke();

    // Colocando os pontos
    var pontoAtual = 0;

    // Coluna do lado direito
    for (var i = canvas.width / 2; i < canvas.width; i += larguraColuna) 
    {     
        c.fillText(pontoAtual * razaoLabels, i, canvas.height / 2);
        pontoAtual++;
    }
    
    pontoAtual = -1;

    //Colunas do lado esquerdo
    for (var i = (canvas.width / 2 - larguraColuna); i > 0; i -= larguraColuna)
    {     
        c.fillText(pontoAtual * razaoLabels, i, canvas.height / 2);
        pontoAtual--;
    }
    
    pontoAtual = 1;

    //Linhas de cima
    for (var i = canvas.height / 2 - larguraLinha; i > 0; i -= larguraLinha) 
    {    
        c.fillText(pontoAtual * razaoLabels, canvas.width / 2, i);
        pontoAtual++;
    }
    
    pontoAtual = -1;

    //Linhas de baixo
    for (var i = canvas.height / 2 + larguraLinha; i < canvas.height; i += larguraLinha)
    {    
        c.fillText(pontoAtual * razaoLabels, canvas.width / 2, i);
        pontoAtual--;
    }
}


// Duas variáveis de cada tipo para fazer a reta crescer nos dois sentidos

var a = 2;
var b = 1;
var funcao = "";
function validarFuncao()
{
    /*
    // expressao regular para validar uma funcao afim na for f(x) = ax + b
    var expressaoReg  = /^((f\([a-z]{1}\)\s*=\s*)|(y\s*=\s*))\-?(\d+(\,|\/)\d+)?\d*[a-z]{1}\s*(((\+|\-)\s*\d+((\,|\/)\d+)?)|(\s*))$/;   

    // expressao regular para validar uma funcao afim na for f(x) = b + ax
    var expressaoReg2 = /^((f\([a-z]{1}\)\s*=\s*)|(y\s*=\s*))\-?\s*\d+((\,|\/)\d+)?\s*(\-|\+)\s*(\d+(\,|\/)\d+)?\d*[a-z]{1}$/;

    if (expressaoReg.test(document.getElementById("funcao").value) || expressaoReg2.test(document.getElementById("funcao").value))
    {
        alert("TA SERTO");
    }
    else
        alert("ta errado"); 

    */
    funcao = document.getElementById("funcao").value;
    if (b == 0)
        etapa = 0.5;
    else
        etapa  = 0;

    desenharGrafico(etapa);
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
    var largura = canvas.width;
    var altura  = canvas.height;

    messageBoxHabilitado = true;

    larguraMensagem = largura * 5/6;
    alturaTitulo = altura * 1/12;

    ondeComecarX = largura * 1/12;
    ondeComecarY = largura * 1/12;

    // Caixa de Título
    
    c.shadowColor = "black";
    c.shadowBlur = 10;
    c.fillStyle = '#1779ba';
    c.fillRect(ondeComecarX, ondeComecarY, larguraMensagem, alturaTitulo);
    c.stroke;

    // Texto do Título
    c.shadowBlur = 0;
    var margemTexto = 20;
    c.fillStyle = 'white';
    c.font = "40px Archivo";
    c.fillText(titulo, ondeComecarX + margemTexto, ondeComecarY + alturaTitulo - margemTexto, larguraMensagem - 2*margemTexto);

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
    c.font = "24px Archivo";

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
    c.font = "24px Archivo";
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

var anguloAtual = 0;
function desenharPontos(x1, y1, x2, y2) // PROBLEMA 1 => Mudar o código para receber quatro parâmetros 
{
    anguloAtual += 0.1;
    c.beginPath();
    c.arc(canvas.width / 2 + (x1 * larguraColuna)/razaoLabels, canvas.height / 2 - (y1 * larguraLinha) / razaoLabels, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#1779ba';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPontos(x1, y1, x2, y2);});
    else
    {
        c.beginPath();
        c.arc(canvas.width / 2 + (x1 * larguraColuna)/razaoLabels, canvas.height / 2 - (y1 * larguraLinha) / razaoLabels, 8, 0, 360);      
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.stroke();

        anguloAtual = 0;
        desenharPonto2(y1);
    }
}

function desenharPonto2(ondeCruza)
{    
    anguloAtual += 0.1;
    c.beginPath();
    c.arc(canvas.width / 2, canvas.height / 2 - (ondeCruza * larguraLinha)/razaoLabels, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#1779ba';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPonto2(ondeCruza);});
    else
    {
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2 - (ondeCruza * larguraLinha)/razaoLabels, 8, 0, 360);     
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.stroke();

        // PROSSEGUE PARA A PRÓXIMA ETAPA APÓS ANIMAR O DESENHO DOS PONTOS
        setTimeout(function(){
            prosseguirEtapa(); 
        }, 400);  
    }
}

function animarReta(xInicial, yInicial, xFinal, yFinal, velocidade) // Velocidade: Quanto maior, mais lento
{ 
    var deltaX = Math.abs(xFinal - xInicial);
    var deltaY = Math.abs(yFinal - yInicial);

    var aumentoX, aumentoY;

    if (deltaX < deltaY)
    {
        aumentoX = deltaX/deltaY;   //Ao aumentar Y em 1, devemos aumentar X em aumentoX
        aumentoY = 1;
    }
    else
    {
        aumentoX = 1;   //Ao aumentar Y em 1, devemos aumentar X em aumentoX
        aumentoY = deltaY/deltaX;
    }

    var xAtual = xInicial;
    var yAtual = yInicial;

    var intervalo = setInterval(function(){

        c.beginPath();
        c.arc(xAtual, yAtual, 2, 0, Math.PI * 2);   // Raio = 2;
        
        if (xInicial < xFinal)
            xAtual += aumentoX;
        else if (xInicial > xFinal)
            xAtual -= aumentoX;
        if (yInicial < yFinal)
            yAtual += aumentoY;
        else if (yInicial > yFinal)
            yAtual -= aumentoY; 
        
        c.fillStyle ='#1779ba';
        c.fill();
        c.strokeStyle = '#1779ba';
        c.stroke();

        if (xInicial < xFinal && (xAtual >= xFinal || xAtual < 0 || xAtual > canvas.width))
        {
            clearInterval(intervalo);
            if (etapa == 2)
                setTimeout(function()
                {
                    prosseguirEtapa();
                }, 400);
        }
        
        if (xInicial > xFinal && (xAtual <= xFinal || xAtual < 0 || xAtual > canvas.width))
        {
            clearInterval(intervalo);
            if (etapa == 2)
                setTimeout(function()
                {
                    prosseguirEtapa();
                }, 400);
        }
    }, velocidade);
}

function prosseguirEtapa()
{
    var 
    botaoAnterior = true,
    botaoProximo = true;

    if (etapa == 0 || etapa == 0.5)
        botaoAnterior = false;

    prosseguir(getTituloDaEtapa(etapa), getTextoDaEtapa(etapa), botaoAnterior, botaoProximo);
}

function getTituloDaEtapa(etapaAtual)
{
    if (etapa == 0 || etapa == 0.5)
        return "Etapa 1: Definição de Dois Pontos";
    else if (etapa == 1)
        return "Etapa 2: Traçar a Reta";
    else if (etapa == 2)
        return "Etapa 3: Prolongar a Reta";
    else
        return "";
}

function getTextoDaEtapa(etapaAtual)
{
    if (etapa == 0)
        return "O primeiro passo para determinar o gráfico da função "
        + "dada (" + funcao + "), é encontrar dois de seus pontos. A maneira mais fácil de fazer isso é determinando "
        + "os dois pontos pelo qual a reta passa ao cruzar com os eixos ordenados. Para encontrar a posição na qual a reta cruzará "
        + "o eixo x (eixo das abscissas), devemos substituir o 'f(x)'(também chamado de 'y'), da função dada por 0 e encontrar o "
        + "valor de x (que será, na função dada, igual a " + cruzaX + "). Para encontrar o ponto no qual a reta cruzará o eixo y (eixo das ordenadas), "
        + "devemos fazer algo parecido: substituir o 'x' da função por 0 e encontrar o valor de 'f(x)'. No caso, esse valor, "
        + "de acordo com a função dada, será " + cruzaY + ".";
    else if (etapa == 0.5)  // Passa por (0, 0)
        return "O primeiro passo para determinar o gráfico da função "
        + "dada (" + funcao + "), é encontrar dois de seus pontos. Como o valor de b é igual a 0, não podemos escolher as "
        + "posições pelas quais a reta passará pelos eixos ordenados, pois esses dois pontos serão na mesma posição (0, 0). "
        + "Assim, devemos determinar um ponto a mais qualquer, escolhendo um valor de x aleatório e encontrando o seu y. "
        + "Para não encontrarmos um valor muito diferente entre x e y, escolheremos o valor de x com base no primeiro ponto "
        + "que marcamos no gráfico (ponto ("+ razaoLabels +", 0)), e substituindo x na função por esse valor, encontramos o ponto "
        + "(" + razaoLabels +"," + (a*razaoLabels) + ")."
    else if (etapa == 1)
        return "O segundo passo para definir o gráfico da função é traçar uma reta que ligará "
        + "seus dois pontos, anteriormente definidos (pontos (0, "+ cruzaY +") e ("+ cruzaX + ", 0)). Para isso, basta "
        + "colocar uma régua ou outro material de superfície reta sobre os dois pontos e traçar uma linha retilínea.";
    else if (etapa == 2)
        return "O último passo para definir o gráfico da função é prolongar a reta que desenhamos. "
        + "Devemos fazer isso porque nossa função possui infinitas soluções, e não somente aquelas que estão especificadas atualmente. "
        + "Assim, devemos apoiar uma régua ou um outro material de superfície retilínea sobre a reta já desenhada e traçar uma "
        + "nova linha até atingir os limites do gráfico.";
    else
        return "";

}

function encontrarRazaoLabels(pontoX, pontoY)
{    
    var maiorPonto;
    
    if (Math.abs(pontoX) > Math.abs(pontoY))
        maiorPonto = Math.abs(pontoX);
    else
        maiorPonto = Math.abs(pontoY);
    
    var achouRazao = false;
    var razaoLabels = 1;
    var deQuantoEmQuanto = 5;
    while (!achouRazao)
    {
        if (maiorPonto / razaoLabels <= deQuantoEmQuanto)
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

var razaoLabels = 1;
var cruzaX, cruzaY;
function desenharGrafico(etapaAtual)
{
    canvas.width = canvas.width;    // Resetar o canvas

    desenharGrade();

    cruzaX = -b/a;
    cruzaY = b;

    if (etapaAtual == 0)
    {
        if (cruzaX != cruzaY)
            razaoLabels = encontrarRazaoLabels(cruzaX, cruzaY);
    }

    desenharEixos(razaoLabels);
    if (etapaAtual > 2)
    {
        // RETA
        c.beginPath();
        if (b != 0)
        {
            c.moveTo(canvas.width / 2 + (cruzaX * larguraColuna)/razaoLabels, canvas.height / 2);
            c.lineTo(canvas.width / 2, canvas.height / 2 - (cruzaY * larguraLinha)/razaoLabels);
        }
        else
        {
            c.moveTo(canvas.width / 2, canvas.height / 2);  // Ponto (0,0)
            c.lineTo(canvas.width / 2 + larguraColuna, canvas.height / 2 - razaoLabels * a * larguraLinha);
        }
        c.strokeStyle = '#1779ba';
        c.lineWidth = 5;
        c.stroke();
    }

    if (etapaAtual > 1)
    {  
        //PONTO (X)
        c.beginPath();
        c.arc(canvas.width / 2 + (cruzaX * larguraColuna) / razaoLabels, canvas.height / 2, 8, 0, 360);      
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = '#1779ba';
        c.stroke();

        //PONTO (Y)
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2 - ( cruzaY * larguraLinha) / razaoLabels, 8, 0, 360);        
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = '#1779ba';
        c.stroke(); 
    }


    if (etapaAtual == 0 || etapaAtual == 0.5)
        prosseguirEtapa();
    else if (etapaAtual == 1)
    {
        anguloAtual = 0;
        if (b != 0)
            desenharPontos(cruzaX, 0, 0, cruzaY);
        else
        {
            desenharPontos(0, 0, canvas.width / 2 + razaoLabels, canvas.height / 2 - razaoLabels * a);
            console.log("a");
        }
    }
    else if (etapaAtual == 2)
    {
        animarReta(canvas.width / 2 + (cruzaX * larguraColuna)/razaoLabels, canvas.height / 2, canvas.width / 2, canvas.height / 2 - (cruzaY * larguraLinha)/razaoLabels, 25 );
    }
    else if (etapaAtual == 3)
    {
         var xInicial = canvas.width / 2 + (cruzaX * larguraColuna)/razaoLabels;
         var yInicial = canvas.height / 2;
         var xFinal, yFinal;
         var velocidade = 6;

         if (a > 0)
         {
            xFinal   = canvas.width / 2 - (Number.MAX_SAFE_INTEGER * larguraColuna)/razaoLabels;
            yFinal   = canvas.height / 2 - ( (a*(-Number.MAX_SAFE_INTEGER) + b) * larguraLinha ) / razaoLabels;
         }
         else
         {
            xFinal   = canvas.width / 2  + ( Number.MAX_SAFE_INTEGER * larguraColuna ) / razaoLabels;
            yFinal   = canvas.height / 2 - ( (a*(Number.MAX_SAFE_INTEGER) + b) * larguraLinha ) / razaoLabels;
         } 
         
        animarReta(xInicial, yInicial, xFinal, yFinal, velocidade);

        xInicial = canvas.width / 2;
        yInicial = canvas.height / 2 - (cruzaY * larguraLinha)/razaoLabels;
        if (a > 0)
        {
            xFinal   = canvas.width / 2 + (Number.MAX_SAFE_INTEGER * larguraColuna)/razaoLabels;
            yFinal   = canvas.height / 2 - ( (a*(Number.MAX_SAFE_INTEGER) + b) * larguraLinha ) /razaoLabels;
        }
        else
        {
            xFinal   = canvas.width / 2  - ( Number.MAX_SAFE_INTEGER * larguraColuna ) / razaoLabels;
            yFinal   = canvas.height / 2 - ( (a*(-Number.MAX_SAFE_INTEGER) + b) * larguraLinha ) / razaoLabels;
        }
        animarReta(xInicial, yInicial, xFinal, yFinal, velocidade);
    } 
}

desenharGrade();
desenharEixos();

// EVENTOS (MOVIMENTO DO MOUSE E CLIQUE DO MOUSE)
var elem = document.getElementById('canvas'),
elemLeft = elem.offsetLeft,
elemTop = elem.offsetTop;


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

        desenharGrafico(etapa);
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

        desenharGrafico(etapa);
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