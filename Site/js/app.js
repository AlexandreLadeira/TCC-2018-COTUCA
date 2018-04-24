$(document).foundation()

var canvas = document.querySelector('canvas');

var c = canvas.getContext('2d');

c.beginPath();

//colunas
for (var i = -1 * canvas.width; i < canvas.width; i += canvas.width / 5)  //  canvas.width/10 é a escala
{     
    c.moveTo(i , 0);  
    c.lineTo(i, canvas.height);  
}

//linhas
for (var i = 0; i < canvas.height; i += 50) //50 seria a escala (pixels)
{    
    c.moveTo(0, i);  
    c.lineTo(canvas.width, i);  
}

c.strokeStyle = "gray";
c.stroke();

// Desenha os eixos X e Y
c.beginPath();
c.moveTo(800, 0);
c.lineTo(800, canvas.height);
c.strokeStyle = "black";
c.lineWidth = 5;
c.stroke();

c.beginPath();
c.moveTo(0, 400);
c.lineTo(canvas.width, 400);
c.strokeStyle = "black";
c.lineWidth = 5;
c.stroke();
/////////////////////////


c.font = "17px Arial";
var xTexto = 780;
var yTexto = canvas.height ;

var i = -7;

while (yTexto > 0)
{
    yTexto -= 50;

    if (i != 0)
        c.fillText(i.toString(), xTexto, yTexto);
    else
        c.fillText(i.toString(), xTexto, yTexto + 2);
    i++;
}

var x = 800;
var y = 700;

function desenhaComCirculo()
{
    requestAnimationFrame(desenhaComCirculo);

    c.beginPath();
    c.lineWidth = 1;
    c.arc(x, y, 5, Math.PI * 2, false)

    c.strokeStyle = "blue";
    c.fillStyle   = "blue";
    c.fill();

    c.stroke();

    if (y != 100 && x != 100)
    {
        // Vai até x = 300 e y = 700
        x += 1;     // Aumentará 150 pixels (Razão = 1/4)
        y -= 4;     // Aumentará 600 pixels
    }
} 
