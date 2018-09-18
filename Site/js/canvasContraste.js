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

// Desenhar a grade
function desenharGrade()
{
    c.strokeStyle = "white";
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
    c.strokeStyle = "rgb(209, 200, 200)";

    //EIXO X
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);

    //EIXO Y
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);

    c.stroke();

    // Colocando os pontos:
    c.beginPath();
    c.font = "16px Arial white";
    c.fillStyle = 'white';

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

var a;
var b;
var funcao = "";
function getAeBdaFuncao(x)
{           
    var achou   = false; // Determina se achou um dos termos

    var aFunc   = ""; // Termo "a" da função
    var bFunc   = ""; // Termo "b" da função
    var aux = ""; // Auxiliar para a leitura
    
    var qtsNumerosAchou = 0; // Verifica se já achou "a" e "b" ou apenas um deles

    var indiceIgual = x.indexOf("="); // Pega o indíce do character "=", para poder cortar a string

    x = x.substring(indiceIgual+1, x.length).trim(); // Tira a parte "f(x) =" ou a parte "y ="da expressão

    for(i = 0; i < x.length; i++) // Percorre a string até o fim
    {
        var s = x.charAt(i); // Pega um character

        if(s != " ") // Ignora espaço em branco
        {  
            if(s == "-")
            {
                if(!achou) // Se ainda não achou, o número q será lido é negativo
                    aux = "-";
                else // Se já achou, negativo não será o que está no aux, mas sim o próximo
                    aFunc = "-"; // Só cairá nesse if se o segundo número for o termo de "a"

            }

            if(!isNaN(s) || s == "/") //Se for numero ou barra de divisão
            {
                aux += s; // Concatena o numero ou a barra de divisão
                
                if(!achou) // Ainda não tinha achado um número
                {
                    achou = true;
                    qtsNumerosAchou++;
                }
            }
            else
                if(s == 'x') // Nesse caso o numero é o a
                {
                    if(!achou) // Não existe numero antes de x
                    {
                        aFunc = aux + "1"; // O aux terá "-" caso o termo seja negativa e estará vazio caso seja positivo
                        qtsNumerosAchou++;
                    }
                    else
                    {
                        aFunc += aux; // Concatena pois o número pode ser negativo, se for, o sinal "-" já está na variável "a"
                        aux = "";
                        achou = false;
                    }
                }
                else
                {
                    if(achou) // Se achou e chegou aqui, só pode ser o termo "b"
                    {
                        bFunc = aux
                        aux   = "";
                        achou = false;
                    }
                }
        }
    }

    if(qtsNumerosAchou == 1) // No caso de b não ter sido fornecido
    {
        bFunc = "0";
        if(aFunc == "") // Se não existe número antes de x
            aFunc = aux;
    }
    else
        if(qtsNumerosAchou == 2 && achou) // Terminou o "for" e não colocou o número lido em b
            bFunc = aux;
    
    return [aFunc, bFunc]; // Retorna um vetor com duas posições, a primeira é o termo "a" e a segundo o termo "b"
}

function validarFuncao()
{
    
    funcao = document.getElementById("funcao").value;
    // expressao regular para validar uma funcao afim na for f(x) = ax + b
    var expressaoReg  = /^((f\([a-z]{1}\)\s*=\s*)|(y\s*=\s*))\-?(\d+(\,|\/)\d+)?\d*[a-z]{1}\s*(((\+|\-)\s*\d+((\,|\/)\d+)?)|(\s*))$/;   

    // expressao regular para validar uma funcao afim na for f(x) = b + ax
    var expressaoReg2 = /^((f\([a-z]{1}\)\s*=\s*)|(y\s*=\s*))\-?\s*\d+((\,|\/)\d+)?\s*(\-|\+)\s*(\d+(\,|\/)\d+)?\d*[a-z]{1}$/;

    if (expressaoReg.test(funcao) || expressaoReg2.test(funcao))
    {

        var valores = getAeBdaFuncao(funcao);
        a = valores[0];
        b = valores[1];

        if (b == 0)
            etapa = 0.5;
        else
            etapa  = 0;
    
        desenharGrafico(etapa);
    }
    else
    {
        alert("A função deve serguir o padrão f(x) = ax + b ou y = ax + b");
        return; 
    }
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
    c.shadowColor = "#fffa00";
    c.shadowBlur = 10;
    c.fillStyle = 'black';
    c.fillRect(ondeComecarX, ondeComecarY, larguraMensagem, alturaTitulo);
    c.stroke();

    // Texto do Título
    c.beginPath();
    c.shadowBlur = 0;
    var margemTexto = 20;
    c.fillStyle = '#fffa00';
    c.font = "36px Montserrat";
    c.fillText(titulo, ondeComecarX + margemTexto, ondeComecarY + alturaTitulo - margemTexto, larguraMensagem - 2*margemTexto);
    c.stroke();

    // Caixa de Mensagem
    c.shadowColor = "black";
    c.shadowBlur = 10;

    var qtasLinhas = c.measureText(mensagem).width /  (larguraMensagem - 2 * margemTexto);

    alturaMensagem = qtasLinhas * 16 + margemTexto + 2*paddingBotoes + alturaBotoes;

    c.fillStyle = "black";
    c.fillRect(ondeComecarX, ondeComecarY + alturaTitulo, larguraMensagem, alturaMensagem);
    c.stroke;
    c.shadowBlur = 0;

    // Texto da Mensagem
    c.fillStyle = "#fffa00";
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
    c.shadowColor = "#fffa00";
    c.shadowBlur = 10;
    larguraBotoes = larguraMensagem / 5;
    paddingBotoes = 20;
    ondeComecarBotaoX = larguraMensagem / 2;

    c.fillStyle = 'black';

    if (anteriorHabilitado)
        c.fillRect(ondeComecarBotaoX - larguraBotoes - paddingBotoes, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, larguraBotoes, alturaBotoes);
    
    if(proximoHabilitado)
        c.fillRect(ondeComecarBotaoX + larguraBotoes + paddingBotoes, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, larguraBotoes, alturaBotoes);
    
    c.stroke;
    c.shadowBlur = 0;   

    // Imagem do som
    var imagem = new Image;
    imagem.src = "imagens/IconeSomC.png";    
    c.drawImage(document.getElementById("som"), canvas.width / 2 - 20, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, 40, 40);


    // Texto dos Botões

    // -- Anterior
    c.font = "24px Montserrat";
    c.fillStyle = "#fffa00";

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
    c.arc(x1, y1, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#fffa00';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPontos(x1, y1, x2, y2);});
    else
    {
        c.beginPath();
        c.arc(x1, y1, 8, 0, 360);      
        c.fillStyle = '#fffa00';
        c.fill();
        c.lineWidth = 1;
        c.stroke;

        anguloAtual = 0;
        desenharPonto2(x2, y2);
    }
}

function desenharPonto2(x2, y2)
{    
    anguloAtual += 0.1;
    c.beginPath();
    c.arc(x2, y2, 8, 0, anguloAtual);  
    c.lineWidth = 0.05;
    c.strokeStyle = '#fffa00';
    c.stroke();

    if (anguloAtual <= Math.PI * 2 + Math.PI / 2)
        requestAnimationFrame(function(){desenharPonto2(x2, y2);});
    else
    {
        c.beginPath();
        c.arc(x2, y2, 8, 0, 360);     
        c.fillStyle = '#fffa00';
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
        
        c.fillStyle ='#fffa00';
        c.fill();
        c.strokeStyle = '#fffa00';
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
    var botaoAnterior = true, botaoProximo = true;

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
        + "valor de x (que será, na função dada, igual a " + x1 + "). Para encontrar o ponto no qual a reta cruzará o eixo y (eixo das ordenadas), "
        + "devemos fazer algo parecido: substituir o 'x' da função por 0 e encontrar o valor de 'f(x)'. No caso, esse valor, "
        + "de acordo com a função dada, será " + y2 + ".";
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
        + "seus dois pontos, anteriormente definidos (pontos (0, "+ y2 +") e ("+ x1 + ", 0)). Para isso, basta "
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
var x1, x2, y1, y2;
var textoX1 = 0, textoX2 = 0, textoY1 = 0, textoY2 = 0;
function desenharGrafico(etapaAtual)
{
    canvas.width = canvas.width;    // Resetar o canvas

    desenharGrade();

    x1 = -b/a;
    y2 = b;

    if (etapaAtual == 0 || etapaAtual == 0.5)
    {
        if (b != 0)
            razaoLabels = encontrarRazaoLabels(x1, y2);
        else
            razaoLabels = encontrarRazaoLabels(0, a);
    }

    if (b != 0) // Não cruza no (0, 0)
    {
        y1 = 0;
        x2 = 0;
    }
    else
    {
        y1 = 0;     // Ponto (0, 0)

        x2 = razaoLabels;

        y2 = a * razaoLabels;
    }

    desenharEixos(razaoLabels);
    if (etapaAtual > 2)
    {
        // RETA
        c.beginPath();

        c.moveTo(canvas.width / 2 + (x1 * larguraColuna)/razaoLabels, canvas.height / 2 - (y1 * larguraLinha)/razaoLabels);
        c.lineTo(canvas.width / 2 + (x2 * larguraLinha) /razaoLabels, canvas.height / 2 - (y2 * larguraLinha)/razaoLabels);
        c.strokeStyle = '#fffa00';
        c.lineWidth = 5;
        c.stroke();
    }

    if (etapaAtual > 1)
    {  
        //PONTO (X)
        c.beginPath();

        c.arc(canvas.width / 2 + (x1 * larguraColuna) / razaoLabels, canvas.height / 2 - (y1 * larguraLinha)/razaoLabels, 8, 0, 360);      
        c.fillStyle = '#fffa00';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = '#fffa00';
        c.stroke();

        //PONTO (Y)
        c.beginPath();
        c.arc(canvas.width / 2 + (x2 * larguraColuna)/razaoLabels, canvas.height / 2 - ( y2 * larguraLinha) / razaoLabels, 8, 0, 360);      
        c.fillStyle = '#fffa00';
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = '#fffa00';
        c.stroke(); 
    }


    if (etapaAtual == 0 || etapaAtual == 0.5)
        prosseguirEtapa();
    else if (etapaAtual == 1)
    {
        anguloAtual = 0;
        desenharPontos(
            canvas.width / 2 + (x1 * larguraColuna)/razaoLabels, 
            canvas.height / 2 - (y1 * larguraLinha ) / razaoLabels, 
            canvas.width  / 2 + (x2 * larguraColuna) / razaoLabels, 
            canvas.height / 2 - (y2 * larguraLinha ) / razaoLabels
        );   
    }
    else if (etapaAtual == 2)
    {
        animarReta(
            canvas.width  / 2 + (x1 * larguraColuna) / razaoLabels, 
            canvas.height / 2 - (y1 * larguraLinha ) / razaoLabels, 
            canvas.width  / 2 + (x2 * larguraColuna) / razaoLabels, 
            canvas.height / 2 - (y2 * larguraLinha ) / razaoLabels, 10 
        );
    }
    else if (etapaAtual == 3)
    {
        var xInicial1 = canvas.width  / 2 + (x1 * larguraColuna) / razaoLabels;
        var yInicial1 = canvas.height / 2 - (y1 * larguraLinha ) / razaoLabels;
        var xInicial2 = canvas.width  / 2 + (x2 * larguraColuna) / razaoLabels;
        var yInicial2 = canvas.height / 2 - (y2 * larguraLinha ) / razaoLabels;
        var xFinal1, yFinal1, xFinal2, yFinal2;
        var velocidade = 1;

        var x = Number.MAX_SAFE_INTEGER;
        var y = a * x + b;

        if (x1 > x2)
        {
            xFinal1 = canvas.width  / 2 + (x * larguraColuna) / razaoLabels;
            xFinal2 = canvas.width  / 2 - (x * larguraColuna) / razaoLabels;
        }
        else
        {
            xFinal1 = canvas.width  / 2 - (x * larguraColuna) / razaoLabels;
            xFinal2 = canvas.width  / 2 + (x * larguraColuna) / razaoLabels;
        }

        if (y1 > y2)
        {
            yFinal1 = canvas.height  / 2 - (y * larguraLinha) / razaoLabels;
            yFinal2 = canvas.height  / 2 + (y * larguraLinha) / razaoLabels;
        }
        else
        {
            yFinal1 = canvas.height  / 2 + (y * larguraLinha) / razaoLabels;
            yFinal2 = canvas.height  / 2 - (y * larguraLinha) / razaoLabels;
        }

        // ??????????
        xFinal1 *= 10;
        xFinal2 *= 10;
        // ??????????

        console.log(Math.abs((x1 - x2) / (y1 - y2)) + " e " + Math.abs((xFinal1 - xFinal2) / (yFinal1 - yFinal2)));

        animarReta(xInicial1, yInicial1, xFinal1, yFinal1, velocidade);
        animarReta(xInicial2, yInicial2, xFinal2, yFinal2, velocidade);
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