var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var qtasLinhas = 12;
var qtasColunas = 12;

var larguraLinha = canvas.height / qtasLinhas;
var larguraColuna = canvas.width / qtasColunas;

// Desenhar a grade
c.beginPath();
c.strokeStyle = "rgb(169, 169, 169)";

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

// Desenha os eixos X e Y, assim como os pontos das abscissas e ordenadas
function desenharEixos()
{
    c.font = "17px Arial";

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

function desenharGrafico(a, b)
{
    var cruzaX = -b/a;
    var cruzaY = b;

    if(a < 0)
        sentido = -1;
    else
        sentido = 1;
    
    var diferencaDeX;
    var diferencaDeY;

    c.beginPath();
    
    if (cruzaX != 0 && cruzaY != 0)
    {
        c.moveTo(canvas.width / 2 + cruzaX * larguraColuna, canvas.height / 2);
        c.lineTo(canvas.width / 2, canvas.height / 2 - cruzaY * larguraLinha);

        //Variáveis para fazer a animação

        xAtual1 = canvas.width / 2 + cruzaX * larguraColuna;
        yAtual1 = canvas.height / 2;

        xAtual2 = xAtual1;
        yAtual2 = yAtual1;

        diferencaDeX = (canvas.width / 2 + cruzaX * larguraColuna) - (canvas.width / 2);

        if (diferencaDeX < 0)
            diferencaDeX *= -1;
        
        diferencaDeY = (canvas.height / 2 - cruzaY * larguraLinha) - (canvas.height / 2);

        if (diferencaDeY < 0)
            diferencaDeX *= -1;

    }
    else
    {
        c.moveTo(canvas.width / 2, canvas.height / 2);  // (0, 0)
        var pontoY = a * 1 + b;
        c.lineTo(canvas.width / 2 + larguraColuna, canvas.height / 2 - larguraLinha * pontoY);

        //Variáveis para fazer a animação

        xAtual1 = canvas.width / 2;
        yAtual1 = canvas.height / 2;

        xAtual2 = xAtual1;
        yAtual2 = yAtual1;

        diferencaDeX = (canvas.width / 2 + larguraColuna) - (canvas.width / 2);

        if (diferencaDeX < 0)
            diferencaDeX *= -1;
        
        diferencaDeY = (canvas.height / 2 - larguraLinha * pontoY) - (canvas.height / 2);

        if (diferencaDeY < 0)
            diferencaDeX *= -1;
    }

    if (diferencaDeX > diferencaDeY)
    {
        razaoX = diferencaDeX / diferencaDeY;
        razaoY = 1;
    }
    else
    {
        razaoX = 1;
        razaoY = diferencaDeY / diferencaDeX;
    }

    animarReta();
}

const velocidade = 3;

function animarReta()
{
    var req = requestAnimationFrame(animarReta);

    c.beginPath();
    c.lineWidth = 0;
    c.arc(xAtual1, yAtual1, 2, Math.PI * 2, false);

    c.strokeStyle = "rgba(30, 174, 255, 0.6)";
    c.fillStyle   = "rgba(30, 174, 255, 0.6)";
    c.fill();

    c.stroke();

    c.beginPath();
    c.lineWidth = 0;
    c.arc(xAtual2, yAtual2, 2, Math.PI * 2, false);

    c.strokeStyle = "rgba(30, 174, 255, 0.6)";
    c.fillStyle   = "rgba(30, 174, 255, 0.6)";
    c.fill();

    c.stroke();

    if (yAtual1 >= 0 && xAtual1 <= canvas.width)
    {
        xAtual1 += sentido * razaoX * velocidade;   // Aumentará x pixels (Razão = x/y)
        yAtual1 -= razaoY * velocidade;                  // Aumentará y pixels

        xAtual2 -= sentido * razaoX * velocidade;
        yAtual2 += razaoY * velocidade;
    }
    else
        cancelAnimationFrame(req);
}

desenharEixos();
desenharGrafico(5, 2);
