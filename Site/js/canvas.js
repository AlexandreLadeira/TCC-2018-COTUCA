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

var a = 2/100;
var b = 15;
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
function desenharPontos(ondeCruzaX, ondeCruzaY)
{
    anguloAtual += 0.1;
    c.beginPath();
    c.arc(canvas.width / 2 + (ondeCruzaX * larguraColuna)/razaoLabels, canvas.height / 2, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#1779ba';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPontos(ondeCruzaX, ondeCruzaY);});
    else
    {
        c.beginPath();
        c.arc(canvas.width / 2 + (ondeCruzaX * larguraColuna)/razaoLabels, canvas.height / 2, 8, 0, 360);      
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.stroke();

        anguloAtual = 0;
        desenharPontoY(ondeCruzaY);
    }
}

function desenharPontoY(ondeCruza)
{    
    anguloAtual += 0.1;
    c.beginPath();
    c.arc(canvas.width / 2, canvas.height / 2 - (ondeCruza * larguraLinha)/razaoLabels, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#1779ba';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPontoY(ondeCruza);});
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
    if (etapa == 0)
        prosseguir("Etapa 1: Definição de Dois Pontos", "O primeiro passo para determinar o gráfico da função "
        + "dada (" + funcao + "), é encontrar dois de seus pontos. A maneira mais fácil de fazer isso é determinando "
        + "os dois pontos pelo qual a reta passa ao cruzar com os eixos ordenados. Para encontrar o ponto no qual a reta cruzará "
        + "o eixo x (eixo das abscissas), devemos substituir o 'f(x)'(também chamado de 'y'), da função dada por 0 e encontrar o "
        + "valor de x (que será, na função dada, igual a " + cruzaX + "). Para encontrar o ponto no qual a reta cruzará o eixo y (eixo das ordenadas), "
        + "devemos fazer algo parecido: substituir o 'x' da função por 0 e encontrar o valor de 'f(x)'. No caso, esse valor, "
        + "de acordo com a função dada, será " + cruzaY + ". ", false, true);
    else if (etapa == 1)
        prosseguir("Etapa 2: Traçar a Reta", "O segundo passo para definir o gráfico da função é traçar uma reta que ligará "
        + "seus dois pontos, anteriormente definidos (pontos (0, "+ cruzaY +") e ("+ cruzaX + ", 0)). Para isso, basta "
        + "colocar uma régua ou outro material de superfície reta sobre os dois pontos e traçar uma linha retilínea.", true, true);
    else if (etapa == 2)
        prosseguir("Etapa 3: Prolongar a Reta", "O último passo para definir o gráfico da função é prolongar a reta que desenhamos. "
        + "Devemos fazer isso porque nossa função possui infinitas soluções, e não somente aquelas que estão especificadas atualmente. "
        + "Assim, devemos apoiar uma régua ou um outro material de superfície retilínea sobre a reta já desenhada e traçar uma "
        + "nova linha até atingir os limites do gráfico.", true, true);
}

function textoDaEtapa(etapaAtual)
{    
    if (etapa == 0)
    return "Etapa 1: Definição de Dois Pontos. O primeiro passo para determinar o gráfico da função"
    + "dada (" + funcao + "), é encontrar dois de seus pontos. A maneira mais fácil de fazer isso é determinando "
    + "os dois pontos pelo qual a reta passa ao cruzar com os eixos ordenados. Para encontrar o ponto no qual a reta cruzará "
    + "o eixo x (eixo das abscissas), devemos substituir o 'f(x)'(também chamado de 'y'), da função dada por 0 e encontrar o "
    + "valor de x (que será, na função dada, igual a " + cruzaX + "). Para encontrar o ponto no qual a reta cruzará o eixo y (eixo das ordenadas), "
    + "devemos fazer algo parecido: substituir o 'x' da função por 0 e encontrar o valor de 'f(x)'. No caso, esse valor, "
    + "de acordo com a função dada, será " + cruzaY + ".";
else if (etapa == 1)
    return "Etapa 2: Traçar a Reta. O segundo passo para definir o gráfico da função é traçar uma reta que ligará "
    + "seus dois pontos, anteriormente definidos (pontos (0, "+ cruzaY +") e ("+ cruzaX + ", 0)). Para isso, basta "
    + "colocar uma régua ou outro material de superfície reta sobre os dois pontos e traçar uma linha retilínea.";
else if (etapa == 2)
    return "Etapa 3: Prolongar a Reta. O último passo para definir o gráfico da função é prolongar a reta que desenhamos. "
    + "Devemos fazer isso porque nossa função possui infinitas soluções, e não somente aquelas que estão especificadas atualmente. "
    + "Assim, devemos apoiar uma régua ou um outro material de superfície retilínea sobre a reta já desenhada e traçar uma "
    + "nova linha até atingir os limites do gráfico.";
}


function encontrarRazaoLabels(ondeCruzaX, ondeCruzaY)
{    
    var maiorPonto;
    
    if (Math.abs(ondeCruzaX) > Math.abs(ondeCruzaY))
        maiorPonto = Math.abs(ondeCruzaX);
    else
        maiorPonto = Math.abs(ondeCruzaY);
    
    var achouRazao = false;
    var razaoLabels = 1;
    while (!achouRazao)
    {
        if (maiorPonto / razaoLabels <= 5)
            achouRazao = true;
        else
        {
            if (razaoLabels == 1)
                razaoLabels = 5;
            else
                razaoLabels += 5;
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
        razaoLabels = encontrarRazaoLabels(cruzaX, cruzaY);

    desenharEixos(razaoLabels);
    
    var diferencaDeX;
    var diferencaDeY;

    if (etapaAtual > 3)
    {
        // Prolonga a reta
        c.beginPath();
        c.moveTo(canvas.width / 2 + (cruzaX * larguraColuna)/razaoLabels, canvas.height / 2);
        c.lineTo(canvas.width / 2 - (Number.MAX_SAFE_INTEGER * larguraColuna)/razaoLabels, canvas.height / 2 - ( (a*(-Number.MAX_SAFE_INTEGER) + b) * larguraLinha) /razaoLabels);
        c.moveTo(canvas.width / 2, canvas.height / 2 - (cruzaY * larguraLinha))/razaoLabels;
        c.lineTo(canvas.width / 2 + (Number.MAX_SAFE_INTEGER * larguraColuna)/razaoLabels, canvas.height / 2 - ( (a*(Number.MAX_SAFE_INTEGER) + b) * larguraLinha) /razaoLabels);
        c.strokeStyle = '#1779ba';
        c.lineWidth = 5;
        c.stroke();
    }

    if (etapaAtual > 2)
    {
        
        // RETA
        c.beginPath();
        c.moveTo(canvas.width / 2 + (cruzaX * larguraColuna)/razaoLabels, canvas.height / 2);
        c.lineTo(canvas.width / 2, canvas.height / 2 - (cruzaY * larguraLinha)/razaoLabels);
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


    if (etapaAtual == 0)
        prosseguirEtapa();
    else if (etapaAtual == 1)
    {
        anguloAtual = 0;
        desenharPontos(cruzaX, cruzaY);
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

elem.addEventListener('click', function(event) {
    var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
    
    if (messageBoxAnteriorHabilitado && (x > ondeComecarBotaoX - larguraBotoes - paddingBotoes && x < ondeComecarBotaoX - paddingBotoes)
     && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes))
    {
        messageBoxAnteriorHabilitado = false;
        messageBoxProximoHabilitado  = false;
        messageBoxHabilitado = false;
        etapa--;
        desenharGrafico(etapa);
        elem.style.cursor = 'default';
    }
    else if (messageBoxProximoHabilitado && (x > ondeComecarBotaoX + larguraBotoes + paddingBotoes && x < ondeComecarBotaoX + 2 * larguraBotoes + paddingBotoes) 
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes))
    {
        messageBoxProximoHabilitado  = false;
        messageBoxAnteriorHabilitado = false;
        messageBoxHabilitado = false;
        etapa++;
        desenharGrafico(etapa);
        elem.style.cursor = 'default';
    }
    else if (messageBoxHabilitado 
    && (x > canvas.width / 2  - 20 && x < canvas.width/2 + 20) 
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes + 40) )
    {
        if(window.speechSynthesis.speaking)	
		window.speechSynthesis.cancel(); // reinicia se ja estiver tocando
        else
        {
            var texto = textoDaEtapa(etapa);
            var vet   = texto.split(",");
            var i	  = 1;
            var msg   = new SpeechSynthesisUtterance(vet[0]);		
            
            console.log(vet);

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
    }
    

}, false);

elem.onmousemove = movimentoMouse;

function movimentoMouse(event)
{    
    var x = event.pageX - elemLeft,
    y = event.pageY - elemTop;

    // Botão Anterior
    if (messageBoxAnteriorHabilitado && (x > ondeComecarBotaoX - larguraBotoes - paddingBotoes && x < ondeComecarBotaoX - paddingBotoes)
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes))
        elem.style.cursor = 'pointer';
    //Botão Próximo
    else if (messageBoxProximoHabilitado && (x > ondeComecarBotaoX + larguraBotoes + paddingBotoes && x < ondeComecarBotaoX + 2 * larguraBotoes + paddingBotoes) 
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes))
        elem.style.cursor = 'pointer';
    // Botão de Som
    else if (messageBoxHabilitado 
    && (x > canvas.width / 2  - 20 && x < canvas.width/2 + 20) 
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes + 40) )
        elem.style.cursor = 'pointer';
    else
        elem.style.cursor = 'default';
}