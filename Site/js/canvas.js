var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var qtasLinhas = 12;
var qtasColunas = 12;

var larguraLinha = canvas.height / qtasLinhas;
var larguraColuna = canvas.width / qtasColunas;

var messageBoxProximoHabilitado = false;
var messageBoxAnteriorHabilitado = false;

var etapa = 0;

// Desenhar a grade
function desenharGrade()
{
    c.strokeStyle = "rgb(169, 169, 169)";
    c.lineWidth = 1;

    //Grades das colunas do lado direito
    for (var i = canvas.width / 2; i < canvas.width; i += larguraColuna) 
    {     
        c.moveTo(i , 0);  
        c.lineTo(i, canvas.height); 
        c.stroke(); 
    }

    //Grades das colunas do lado esquerdo
    for (var i = canvas.width / 2; i > 0; i -= larguraColuna)
    {     
        c.moveTo(i , 0);  
        c.lineTo(i, canvas.height); 
        c.stroke(); 
    }

    //Grades das linhas de cima
    for (var i = canvas.height / 2; i > 0; i -= larguraLinha) 
    {    
        c.moveTo(0, i);  
        c.lineTo(canvas.width, i);  
        c.stroke();
    }

    //Grades das linhas de baixo
    for (var i = canvas.height / 2; i < canvas.height; i += larguraLinha)
    {    
        c.moveTo(0, i);  
        c.lineTo(canvas.width, i);  
        c.stroke();
    }
}
// Desenha os eixos X e Y, assim como os pontos das abscissas e ordenadas
function desenharEixos()
{
    c.font = "17px Arial";

    //EIXO X
    c.beginPath();
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.stroke();

    //EIXO Y
    c.beginPath();
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.stroke();

    // Colocando os pontos
    var pontoAtual = 0;

    // Coluna do lado direito
    for (var i = canvas.width / 2; i < canvas.width; i += larguraColuna) 
    {     
        c.fillText(pontoAtual, i, canvas.height / 2 + 17);
        pontoAtual++;
    }
    
    pontoAtual = -1;

    //Colunas do lado esquerdo
    for (var i = (canvas.width / 2 - larguraColuna); i > 0; i -= larguraColuna)
    {     
        c.fillText(pontoAtual, i, canvas.height / 2 + 17);
        pontoAtual--;
    }
    
    pontoAtual = 1;

    //Linhas de cima
    for (var i = canvas.height / 2 - larguraLinha; i > 0; i -= larguraLinha) 
    {    
        c.fillText(pontoAtual, canvas.width / 2 - 17, i);
        pontoAtual++;
    }
    
    pontoAtual = -1;

    //Linhas de baixo
    for (var i = canvas.height / 2 + larguraLinha; i < canvas.height; i += larguraLinha)
    {    
        c.fillText(pontoAtual, canvas.width / 2 - 21, i);
        pontoAtual--;
    }
}


// Duas variáveis de cada tipo para fazer a reta crescer nos dois sentidos
var yAtual1;
var xAtual1;

var yAtual2;
var xAtual2;

var razaoX;
var razaoY;

var sentido;

var a = 1;
var b = 1;
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
    etapa = 0;
    desenharGrafico(etapa);
}



// VARIÁVEIS SERÃO DEFINIDAS NO MÉTODO PROSSEGUIR
var larguraMensagem;
var alturaTitulo;
var alturaMensagem;
var ondeComecarX;
var ondeComecarY;

var alturaBotoes;
var larguraBotoes;
var paddingBotoes;
var ondeComecarBotaoX;;

function prosseguir(titulo, mensagem, anteriorHabilitado, proximoHabilitado)
{
    var largura = canvas.width;
    var altura  = canvas.height;

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
    alturaMensagem = altura * 3/12;
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

    alturaBotoes = alturaMensagem / 6;
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
    c.arc(canvas.width / 2 + ondeCruzaX * larguraColuna, canvas.height / 2, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#1779ba';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPontos(ondeCruzaX, ondeCruzaY);});
    else
    {
        c.beginPath();
        c.arc(canvas.width / 2 + ondeCruzaX * larguraColuna, canvas.height / 2, 8, 0, 360);      
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
    c.arc(canvas.width / 2, canvas.height / 2 - ondeCruza * larguraLinha, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#1779ba';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPontoY(ondeCruza);});
    else
    {
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2 - ondeCruza * larguraLinha, 8, 0, 360);     
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.stroke();

        // PROSSEGUE PARA A PRÓXIMA ETAPA APÓS ANIMAR O DESENHO DOS PONTOS
        setTimeout(function(){
            prosseguir("Etapa 2: Traçar a Reta", "Agora, nós devemos traçar a reta.", true, true); 
        }, 400);  
    }
}

var xAtual, yAtual, aumentoX;
function animarReta(xInicial, yInicial, xFinal, yFinal, velocidade) // Velocidade: Quanto maior, mais lento
{ 
    var deltaX = Math.abs(xFinal - xInicial);
    var deltaY = Math.abs(yFinal - yInicial);

    aumentoX = deltaX/deltaY;   //Ao aumentar Y em 1, devemos aumentar X em aumentoX

    xAtual = xInicial + 5;
    yAtual = yInicial - 5;

    var intervalo = setInterval(function(){

        c.beginPath();
        c.arc(xAtual, yAtual, 2, 0, Math.PI * 2);

        xAtual += aumentoX;
        yAtual -= 1;
        
      /*  if (xInicial < xFinal)
            xAtual += aumentoX;
        else
            xAtual -= aumentoX;

        if (yInicial < yFinal)
            yAtual += 1;
        else
            yAtual -= 1;
        */

        c.fillStyle ='#1779ba';
        c.fill();
        c.strokeStyle = '#1779ba';
        c.stroke();

        if (xInicial < xFinal && (xAtual >= xFinal - 5 || xAtual < 0 || xAtual > canvas.width))
        {
            clearInterval(intervalo);
            if (etapa == 2)
                setTimeout(function()
                {
                    prosseguir("Etapa 3: Prolongar a Reta", "Tudo o que devemos fazer agora é prolongar a reta!", true, true);
                }, 400);
        }
        
        if (xInicial > xFinal && (xAtual <= xFinal + 5 || xAtual < 0 || xAtual > canvas.width))
        {
            clearInterval(intervalo);
            if (etapa == 2)
                setTimeout(function()
                {
                    prosseguir("Etapa 3: Prolongar a Reta", "Tudo o que devemos fazer agora é prolongar a reta!", true, true);
                }, 400);
        }


    }, velocidade);
}

function desenharGrafico(etapaAtual)
{
    canvas.width = canvas.width;    // Resetar o canvas

    desenharGrade();
    desenharEixos();

    var cruzaX = -b/a;
    var cruzaY = b;

    if(a < 0)
        sentido = -1;
    else
        sentido = 1;
    
    var diferencaDeX;
    var diferencaDeY;

    if (etapaAtual > 3)
    {
        // Prolonga a reta
        c.beginPath();
        c.moveTo(canvas.width / 2 + cruzaX * larguraColuna, canvas.height / 2);
        c.lineTo(canvas.width / 2 -100 * larguraColuna, canvas.height / 2 - (a*(-100) + b) * larguraLinha);
        c.moveTo(canvas.width / 2, canvas.height / 2 - cruzaY * larguraLinha);
        c.lineTo(canvas.width / 2 + 100 * larguraColuna, canvas.height / 2 - (a*(100) + b) * larguraLinha);
        c.strokeStyle = '#1779ba';
        c.lineWidth = 5;
        c.stroke();
    }

    if (etapaAtual > 2)
    {
        
        // RETA
        c.beginPath();
        c.moveTo(canvas.width / 2 + cruzaX * larguraColuna, canvas.height / 2);
        c.lineTo(canvas.width / 2, canvas.height / 2 - cruzaY * larguraLinha);
        c.strokeStyle = '#1779ba';
        c.lineWidth = 5;
        c.stroke();
    }

    if (etapaAtual > 1)
    {  
        //PONTO (X)
        c.beginPath();
        c.arc(canvas.width / 2 + cruzaX * larguraColuna, canvas.height / 2, 8, 0, 360);      
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = '#1779ba';
        c.stroke();

        //PONTO (Y)
        c.beginPath();
        c.arc(canvas.width / 2, canvas.height / 2 - cruzaY * larguraLinha, 8, 0, 360);        
        c.fillStyle = '#002699';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = '#1779ba';
        c.stroke(); 
    }


    if (etapaAtual == 0)
        prosseguir("Etapa 1: Definição de Dois Pontos", "O primeiro passo é desenhar dois pontos.", false, true);
    else if (etapaAtual == 1)
    {
        anguloAtual = 0;
        desenharPontos(cruzaX, cruzaY);
    }
    else if (etapaAtual == 2)
    {
        animarReta(canvas.width / 2 + cruzaX * larguraColuna, canvas.height / 2, canvas.width / 2, canvas.height / 2 - cruzaY * larguraLinha, 25 );
    }
    else if (etapaAtual == 3)
    {
        animarReta(canvas.width / 2 + cruzaX * larguraColuna, canvas.height / 2, canvas.width / 2 -100 * larguraColuna, canvas.height / 2 - (a*(-100) + b) * larguraLinha, 10);
        animarReta(canvas.width / 2, canvas.height / 2 - cruzaY * larguraLinha, canvas.width / 2 + 100 * larguraColuna, canvas.height / 2 - (a*(100) + b) * larguraLinha, 10);
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
        etapa--;
        desenharGrafico(etapa);
        elem.style.cursor = 'default';
    }
    else if (messageBoxProximoHabilitado && (x > ondeComecarBotaoX + larguraBotoes + paddingBotoes && x < ondeComecarBotaoX + 2 * larguraBotoes + paddingBotoes) 
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes))
    {
        messageBoxProximoHabilitado  = false;
        messageBoxAnteriorHabilitado = false;
        etapa++;
        desenharGrafico(etapa);
        elem.style.cursor = 'default';
    }

}, false);

elem.onmousemove = movimentoMouse;

function movimentoMouse(event)
{    
    var x = event.pageX - elemLeft,
    y = event.pageY - elemTop;

    if (messageBoxAnteriorHabilitado && (x > ondeComecarBotaoX - larguraBotoes - paddingBotoes && x < ondeComecarBotaoX - paddingBotoes)
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes))
        elem.style.cursor = 'pointer';
    else if (messageBoxProximoHabilitado && (x > ondeComecarBotaoX + larguraBotoes + paddingBotoes && x < ondeComecarBotaoX + 2 * larguraBotoes + paddingBotoes) 
    && (y > ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes && y < ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes))
        elem.style.cursor = 'pointer';
    else
        elem.style.cursor = 'default';
}