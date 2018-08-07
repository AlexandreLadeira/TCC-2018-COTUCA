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
    desenharGrafico(2, 3);
}

function prosseguir(titulo, mensagem)
{
    var largura = canvas.width;
    var altura  = canvas.height;

    var larguraMensagem = largura * 5/6;
    var alturaTitulo = altura * 1/12;

    var ondeComecarX = largura * 1/12;
    var ondeComecarY = largura * 1/12;

    // Caixa de Título
    c.fillStyle = '#1779ba';
    c.fillRect(ondeComecarX, ondeComecarY, larguraMensagem, alturaTitulo);
    c.stroke;

    // Texto do Título
    var margemTexto = 20;
    c.fillStyle = 'white';
    c.font = "40px Archivo";
    c.fillText(titulo, ondeComecarX + margemTexto, ondeComecarY + alturaTitulo - margemTexto, larguraMensagem - 2*margemTexto);

    // Caixa de Mensagem
    var alturaMensagem = altura * 3/12;
    c.fillStyle = "white";
    c.fillRect(ondeComecarX, ondeComecarY + alturaTitulo, larguraMensagem, alturaMensagem);
    c.stroke;

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

    // Caixas dos Botões
    var alturaBotoes = alturaMensagem / 6;
    var larguraBotoes = larguraMensagem / 5;
    var paddingBotoes = 20;
    var ondeComecarBotaoX = larguraMensagem / 2;
    c.fillStyle = '#1779ba';
    c.fillRect(ondeComecarBotaoX - larguraBotoes - paddingBotoes, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, larguraBotoes, alturaBotoes);
    c.fillRect(ondeComecarBotaoX + larguraBotoes + paddingBotoes, ondeComecarY + alturaTitulo + alturaMensagem - paddingBotoes - alturaBotoes, larguraBotoes, alturaBotoes);
    c.stroke;

    // Texto dos Botões
}

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

    prosseguir("Etapa 1: Definir Dois Pontos", "O ano era 2005. O pernambucano Jocione Mendonça estava em uma praça de São Paulo quando um casal chegou até ele e fez um convite muito bom que mudaria a sua vida para seeeempre");

    /*
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

    if(cruzaX < 0 && cruzaX < qtasColunas/2 * (-1))
    {
        qtsvezes = xAtual1 / (sentido * razaoX * velocidade);

        if(qtsvezes < 0)
            qtsvezes *= -1;

        xAtual1 = 0;
        yAtual1 -= (razaoY * velocidade) * qtsvezes;
    }
    else if(cruzaX > 0 && cruzaX > qtasColunas/2)
    {
        qtsvezes = yAtual1 / (razaoY * velocidade);

        if(qtsvezes < 0)
            qtsvezes *= -1;

        yAtual1 = 0;
        xAtual1 += sentido * razaoX * velocidade * qtsvezes;
    }

    animarReta(); */
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
