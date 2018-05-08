var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');

c.beginPath();
c.strokeStyle = "rgb(169, 169, 169)";

const qtasLinhas = 8;
const qtasColunas = 8;

const larguraLinha = canvas.height / qtasLinhas;
const larguraColuna = canvas.width / qtasColunas;

//Colunas
for (var i = -1 * canvas.width; i < canvas.width; i += canvas.width / qtasColunas)  // canvas.width / qtasColunas é a escala das colunas
{     
    c.moveTo(i , 0);  
    c.lineTo(i, canvas.height); 
    c.stroke(); 
}

//Linhas
for (var i = 0; i < canvas.height; i += canvas.width / qtasLinhas) // canvas.width / qtasLinhas é a escala das linhas
{    
    c.moveTo(0, i);  
    c.lineTo(canvas.width, i);  
    c.stroke();
}

// Desenha os eixos X e Y

//EIXO X
c.beginPath();
c.moveTo(0, canvas.height / 2);
c.lineTo(canvas.width, canvas.height / 2);
c.strokeStyle = "black";
c.lineWidth = 3.5;
c.stroke();

//EIXO Y
c.beginPath();
c.moveTo(canvas.width / 2, 0);
c.lineTo(canvas.width / 2, canvas.height);
c.strokeStyle = "black";
c.lineWidth = 3.5;
c.stroke();
/////////////////////////

function desenharLinhas(ondeCruzaX, ondeCruzaY)
{
    c.font = "17px Arial";

    var escalaY;
    var escalaX;

    // Escrevendo os pontos do eixo Y
    var yTexto = 0;
    while (yTexto < qtasLinhas)
    {
        var textoPonto;
        if (ondeCruzaY == null || ondeCruzaY == 0)
            textoPonto = (qtasLinhas/2 - yTexto).toString();
        else
        {
            var numeroPonto = (qtasLinhas/2 - yTexto) * ondeCruzaY / 3;
            if (numeroPonto % 1 != 0)
                textoPonto = numeroPonto.toFixed(1);
            else
                textoPonto = numeroPonto;

        }

        c.fillText(textoPonto, canvas.width / 2 * 0.97, yTexto * canvas.height / qtasLinhas - canvas.height / qtasLinhas * 0.06);
        yTexto++;
    }

    //Escrevendo os pontos do eixo X
    var xTexto = 0;
    while (xTexto < qtasColunas)
    {
        var textoPonto;
        if (ondeCruzaX == null || ondeCruzaX == 0)
            textoPonto = (xTexto - qtasColunas / 2).toString();
        else
        {
            var numeroPonto = (qtasColunas/2 - xTexto) * ondeCruzaX / 3;
            if (numeroPonto % 1 != 0)
                textoPonto = numeroPonto.toFixed(1);
            else
                textoPonto = numeroPonto;
        }

        if (qtasColunas / 2 - xTexto != 0)
            c.fillText(textoPonto, xTexto * canvas.width / qtasColunas + canvas.width / qtasColunas * 0.06 , canvas.height / 2 * 1.03);

        xTexto++;
    }
}
var xInicial;
var yInicial;

var razaoY;

function desenharGrafico(a, b)
{
    var ondeCruzaX = -b/a;
    var ondeCruzaY = b;
    desenharLinhas(ondeCruzaX, ondeCruzaY);

  //  xInicial = canvas.width/2 + (ondeCruzaX * canvas.width/qtasColunas);
  //  yInicial = canvas.height/2 + (ondeCruzaY * canvas.height/qtasLinhas);

    yInicial = canvas.height / 2;
    xInicial = canvas.width / qtasColunas;

    var xPontoTeste  = ondeCruzaX * canvas.width / qtasColunas + canvas.width / 2;
    var yPontoTeste  = ondeCruzaY * canvas.height / qtasLinhas + canvas.height / 2;
    
    razaoY = (xPontoTeste - xInicial) / (yPontoTeste - yInicial);

    desenharReta();
}

function desenharReta()
{
    requestAnimationFrame(desenharReta);

    c.beginPath();
    c.lineWidth = 1;
    c.arc(xInicial, yInicial, 5, Math.PI * 2, false)

    c.strokeStyle = "DodgerBlue";
    c.fillStyle   = "DodgerBlue";
    c.fill();

    c.stroke();

    if (yInicial <= canvas.height  && xInicial <= canvas.width)
    {
        xInicial += 1;          // Aumentará x pixels (Razão = x/y)
        yInicial -= razaoY;     // Aumentará y pixels
    }
}

desenharGrafico(2, 0);      //´PENSAR EM MUITOS IFs
