// Canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

// Gráfico
var espacoLinha , espacoColuna;
espacoLinha = espacoColuna = 50;

var qtasLinhas  = 0;
var qtasColunas = 0;
var razaoLabels = 1;
var etapaAtual = 0;

var Modos = {
    B_IGUAL_ZERO: "BIgualA0",
    B_DIFERENTE_ZERO: "BDiferenteDe0"
};

var modo;

// Message Box
var messageBoxHabilitado         = true;
var messageBoxAnteriorHabilitado = true;
var messageBoxProximoHabilitado  = true;
var messageBoxMinimizado         = false;

// FUNÇÃO PARA DESENHAR A GRADE DO GRÁFICO
function desenharGrade() {
    // Configurações das linhas / colunas ------------------------------------------------------------- 
    c.strokeStyle = "rgb(169, 169, 169)";
    c.lineWidth = 1;

    qtasColunas = 0;
    qtasLinhas  = 0;

    // Colunas do lado direito -------------------------------------------------------------------------
    for (let i = canvas.width/2; i < canvas.width; i += espacoColuna)
    {
        c.beginPath();
        c.moveTo(i, 0);
        c.lineTo(i, canvas.height);
        c.stroke();

        qtasColunas++; // O lado direito terá a mesma quantidade de colunas que o lado esquerdo
    }

    // Colunas do lado esquerdo ------------------------------------------------------------------------
    for (let i = canvas.width/2; i > 0; i -= espacoColuna)
    {
        c.beginPath();
        c.moveTo(i, 0);
        c.lineTo(i, canvas.height);
        c.stroke();
    }

    // Linhas de baixo ---------------------------------------------------------------------------------
    for (let i = canvas.height/2; i < canvas.height; i += espacoLinha)
    {
        c.beginPath();
        c.moveTo(0, i);
        c.lineTo(canvas.width, i);
        c.stroke();

        qtasLinhas++; // A parte de baixo terá a mesma quantidade de linhas que a parte de cima
    }

    // Linhas de cima ----------------------------------------------------------------------------------
    for(let i = canvas.height/2; i > 0; i-= espacoLinha)
    {
        c.beginPath();
        c.moveTo(0, i);
        c.lineTo(canvas.width, i);
        c.stroke();
    }
}

// FUNÇÃO PARA DESENHAR OS EIXOS DO GRÁFICO
function desenharEixos() {
    c.beginPath();

    // Configurações dos eixos --------------------------------------------------------------------------

    c.lineWidth = 1.5;
    c.strokeStyle = "rgb(49, 49, 49)";

    // Desenhar os eixos --------------------------------------------------------------------------------

    // Eixo X
    c.moveTo(0, canvas.height / 2);
    c.lineTo(canvas.width, canvas.height / 2);

    // Eixo Y
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);

    c.stroke();
}

// FUNÇÃO PARA ESCREVER AS POSIÇÕES DOS PONTOS NO GRÁFICO
function escreverPontos() {
    c.beginPath();

    // Configuração da fonte dos pontos -----------------------------------------------------------------
    let tamanhoFonte = Math.min(espacoColuna, espacoLinha) / 4;
    c.font           = tamanhoFonte + "pt Arial";

    // Eixo X -------------------------------------------------------------------------------------------
    let pontoAtual      = qtasColunas  * -1;                              // Começará na esquerda (pontos negativos)
    let posicaoInicial  = canvas.width / 2 - qtasColunas * espacoColuna;  // Posição mais a esquerda possível dentro do gráfico

    // Percorre até o final do canvas ( à direita)
    for (let i = posicaoInicial; i < canvas.width; i += espacoColuna) 
    {
        let tamanhoTextoPonto = c.measureText(Math.round(pontoAtual * 100) / 100).width;

        // Não escrevemos o ponto (0, 0)
        if (pontoAtual !== 0) 
            c.fillText(Math.round(pontoAtual * razaoLabels * 100) / 100, i - tamanhoTextoPonto / 2, canvas.height / 2, espacoColuna * 0.8);

        pontoAtual++;
    }
    
    // Eixo Y ------------------------------------------------------------------------------------------
    pontoAtual      = qtasLinhas;                                         // Começará em cima (pontos positivos)
    posicaoInicial  = canvas.height / 2 - qtasLinhas * espacoLinha;       // Posição mais em cima possível dentro do gráfico

    // Percorre até o final do canvas (em baixo)
    for (let i = posicaoInicial; i < canvas.height; i += espacoLinha)
    {
        // Não escrevemos o ponto (0, 0)
        if (pontoAtual !== 0)        
            c.fillText(Math.round(pontoAtual * razaoLabels * 100) / 100, canvas.width / 2, i + tamanhoFonte / 2);

        pontoAtual--;
    }
    c.stroke();
}


var x1, y1, x2, y2;
var a, b;
function validarPontos()
{
    // Excluir Depois:

    x1 = 1;
    y1 = 3;
    x2 = 2;
    y2 = 6;

    //////////////////

    a = Math.round((y1 - y2) / (x1 - x2) * 100)/ 100 ;
    b = Math.round((y1 - a*x1) * 100)/100 ;

    if (b === 0)
        modo = Modos.B_IGUAL_ZERO;
    else
        modo = Modos.B_DIFERENTE_ZERO;
    
    etapaAtual = 1;

    desenharGrafico();
}

function desenharMessageBox(titulo, mensagem, temAnterior, temProximo, minimizado = false) {

    messageBoxHabilitado = true;
    if (!minimizado)
    {
        // Caixa base da mensagem ----------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = "white";
        c.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.35);
        c.stroke();

        // Caixa do título da mensagem -----------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = "rgb(23,121,186)";
        c.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.08);
        c.stroke();   

        // Texto do título -----------------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = "white";
        c.font = canvas.height * 0.03 + "pt Montserrat";
        
        // Responsividade => Layout funcional até 320px
        if (c.measureText(titulo).width >= canvas.width)
            c.font = canvas.height * 0.021 + "pt Montserrat";

        c.fillText(titulo, 20, canvas.height * 0.705, canvas.width); // 20 é a margem
        c.stroke();

        // Texto da mensagem ---------------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = "black";

        // Para tornar o texto o menor possível: 

        c.font = canvas.height * 0.021 + "pt Montserrat";

        let posicaoY = canvas.height * 0.73 + 40;   // Posição depois da caixa de título com uma margem de 40px
        let palavras = mensagem.split(' ');
        let linhaAtual = "";
        let indice = 0;
        let primeiraLinha = true;

        for(let i = 0; i < palavras.length; i++) 
        {
            linhaAtual += palavras[i] + " ";

            if (c.measureText(linhaAtual).width > canvas.width * 0.8125) 
            {
                if (primeiraLinha)
                {
                    c.fillText(linhaAtual, canvas.width * 0.024 + 20 , posicaoY, canvas.width * 0.7885);
                    primeiraLinha = false;
                }
                else
                    c.fillText(linhaAtual, 20, posicaoY, canvas.width * 0.8125);

                linhaAtual = "";
                posicaoY += canvas.width * 0.021;
            }
        }

        if (!primeiraLinha)
            c.fillText(linhaAtual, 20, posicaoY);
        else
            c.fillText(linhaAtual, canvas.width * 0.024 + 20 , posicaoY);
        c.stroke();

        // Professor Funcio -----------------------------------------------------------------------------------

        c.drawImage(document.getElementById("img_professorFuncio"), 
        canvas.width * 0.85625, canvas.height * 0.73 + 30, 
        canvas.width * 0.1, canvas.width * 0.078);

        // Botões ----------------------------------------------------------------------------------------------

        let centroPrincipalBotoes = canvas.width * 0.90625; // Centro base para os botões (Coincide com o 
                                                            // centro da imagem do personagem)

        // Anterior: 
        let posicaoXAnterior = canvas.width  * 0.8125 + 36;
        let posicaoYBotoes   = canvas.height * 0.73 + 40 + canvas.width * 0.078;
        let widthBotoes      = canvas.width  * 0.055;
        let heightBotoes     = canvas.height * 0.04;

        c.shadowColor = "black";
        c.shadowBlur = 4;
        c.fillStyle = "rgb(23,121,186)";      

        if (temAnterior)
        {
            c.beginPath();
            messageBoxAnteriorHabilitado = true;
            c.fillRect(posicaoXAnterior, posicaoYBotoes, widthBotoes, heightBotoes);
            c.stroke();
        }
        else
            messageBoxAnteriorHabilitado = false;

        // Próximo:
        c.fillStyle = "rgb(23,121,186)";
        let distanciaCentroAoAnterior = canvas.width * 0.90625 - (posicaoXAnterior + widthBotoes);
        if (temProximo)
        {
            c.beginPath();
            messageBoxProximoHabilitado = true;
            c.fillRect(centroPrincipalBotoes + distanciaCentroAoAnterior, posicaoYBotoes, widthBotoes, heightBotoes);
            c.stroke();
        }
        else
            messageBoxProximoHabilitado = false;

        c.shadowBlur = 0;

        // Texto do Anterior:
        c.font = canvas.height * 0.017 + "pt Montserrat";
        c.fillStyle = "white";
        let margemTextoAnterior = (widthBotoes - c.measureText("Anterior").width) / 2;
        if (temAnterior)
        {
            c.beginPath();
            c.fillText("Anterior", posicaoXAnterior + margemTextoAnterior, posicaoYBotoes + canvas.height * 0.03, widthBotoes);
            c.stroke();
        }

        // Texto do Próximo:
        c.font = canvas.height * 0.017 + "pt Montserrat";
        c.fillStyle = "white";
        let margemTextoProximo = (canvas.width * 0.055 - c.measureText("Próximo").width) / 2;

        if (temProximo)
        {
            c.beginPath();
            c.fillText("Próximo", centroPrincipalBotoes + distanciaCentroAoAnterior + margemTextoProximo, posicaoYBotoes + canvas.height * 0.03, widthBotoes);
            c.stroke();
        }


        // Imagem de Ouvir Texto -------------------------------------------------------------------------------
        c.beginPath();

        c.drawImage(document.getElementById("img_som"), 
        20, canvas.height * 0.73 + 45 - canvas.width * 0.021, 
        canvas.width * 0.021, canvas.width * 0.021);

        c.stroke();

        //Imagem de Minimizar a Caixa --------------------------------------------------------------------------
        c.beginPath();
        c.drawImage(document.getElementById("img_minimizar"),
        canvas.width * 0.958, canvas.height * 0.65 + (canvas.height * 0.08 - canvas.width * 0.013) / 2,
        canvas.width * 0.013, canvas.width * 0.013);
        c.stroke();
    }
    // DESENHAR O MESSAGE BOX MINIMIZADO
    else    
    {
        // Caixa do título da mensagem -----------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = "rgb(23,121,186)";
        c.fillRect(0, canvas.height * 0.93, canvas.width, canvas.height * 0.07);
        c.stroke();   

        // Texto do título -----------------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = "white";
        c.font = canvas.height * 0.03 + "pt Montserrat";
        
        // Responsividade => Layout funcional até 320px
        if (c.measureText(titulo).width >= canvas.width)
            c.font = canvas.height * 0.021 + "pt Montserrat";

        c.fillText(titulo, 20, canvas.height * 0.985, canvas.width); // 20 é a margem
        c.stroke();

        //Imagem de Minimizar a Caixa --------------------------------------------------------------------------
        c.beginPath();
        c.drawImage(document.getElementById("img_expandir"),
        canvas.width * 0.958, canvas.height * 0.93 + (canvas.height * 0.08 - canvas.width * 0.013) / 2,
        canvas.width * 0.013, canvas.width * 0.013);
        c.stroke();
    }
}

function fecharMessageBox() {
    messageBoxHabilitado         = false;
    messageBoxAnteriorHabilitado = false;
    messageBoxProximoHabilitado  = false;
}

function getTituloDaEtapa(etapaAtual) {
    
    if (etapaAtual === 1)
        return "Como encontrar a função?";
    else if (etapaAtual === 2)
        return "Etapa 1: Preparar o sistema";
    else if (etapaAtual === 3)
        return "Etapa 2: Encontrar o valor de 'a'";
    else if (etapaAtual === 4)
        return "Etapa 3: Encontrar o valor de 'b'";
    else if (etapaAtual === 5)
        return "Etapa 3: Encontrar o valor de 'b'";
    else if (etapaAtual === 6)
        return "Função encontrada!";

    return ""; 
}

function getTextoDaEtapa(etapaAtual) {
    if (etapaAtual === 1)
        return "Olá, tudo bem? Meu nome é Professor Funcio e vou ajudá-lo a encontrar a função a partir de seu gráfico, ou " +
        "seja, a partir de dois de seus pontos: (" + x1 + ", " + y1 + ") e (" + x2 + ", " + y2 + ")!";
    else if (etapaAtual === 2)
        return "Certo, vamos começar! Para encontrar a função, devemos encontrar tanto 'a' quanto 'b'. Assim, utilizaremos o que " +
        "chamamos de 'sistema'. Para isso, basta substituir tanto 'x' quanto 'y' do 'corpo' de uma função linear (y = ax + b) " +
        "pelos valores de cada ponto que conhecemos, encontrando duas equações: " 
        + y1 + " = " + x1 + "*a + b e " + y2 + " = " + x2 + "*a + b. Devemos nos lembrar que tanto " +
        "o valor de a quanto de b são iguais nas duas equações encontradas, afinal a função é a mesma.";
    else if (etapaAtual === 3) {
        let equacao1 = y1 + " ";
        let equacao2 = y2 + " "; 

        if (x1 < 0)
            equacao1 += "+ ";
        else
            equacao1 += "- ";

        if (x2 < 0)
            equacao2 += "+ ";
        else
            equacao2 += "- ";

        equacao1 += Math.abs(x1)  + "*a";
        equacao2 += Math.abs(x2)  + "*a";

        return "Assim, podemos igualar o valor de 'b' nas duas equações, e assim encontraremos uma única equação com a incógnita " + 
        "'a': " + equacao1 + " = " + equacao2 + ". Desenvolvendo, concluímos que a = " + a + "!";
    }
    else if (etapaAtual === 4) 
        return "Feito isso, agora podemos encontrar o valor de 'b'. Tudo o que precisamos fazer é escolher um dos dois pontos " +
        "que conhecemos e substituir tanto os seus valores quanto o valor de 'a' no 'corpo' da função. Utilizaremos o ponto " + 
        "(" + x1 + ", " + y1 + "), e encontraremos a seguinte equação: " + y1 + " = " + Math.round(x1 * a * 100) / 100 + " + b";
    else if (etapaAtual === 5) {
        let equacao1 = y1 + "";
        let metodo = "";

        if (x1 * a < 0)
        {
            equacao1 += " + ";
            metodo = "adição";
        }
        else
        {
            equacao1 += " - ";
            metodo = "subtração";
        }
        
        equacao1 += Math.round(Math.abs(x1 * a) * 100) / 100 + " = b";

        return "Agora que já temos a equação, tudo o que precisamos fazer é resolvê-la. Primeiro isolamos o 'b': " + equacao1 + 
        " e agora, basta realizar uma " + metodo + " e concluirê-mos que b = " + b + "!";
    }
    else if (etapaAtual === 6)
        return "E assim, encontramos a nossa função a partir de dois de seus pontos, ou seja, a partir de seu gráfico! Muito fácil, " +
        "não?";

    return "";

}

function encontrarRazaoLabels(x1, y1, x2, y2)
{    
    let maiorValorX, maiorValorY;
    
    if (Math.abs(x1) > Math.abs(x2))
        maiorValorX = Math.abs(x1);
    else
        maiorValorX = Math.abs(x2);
    

    if (Math.abs(y1) > Math.abs(y2))
        maiorValorY = y1;
    else
        maiorValorY = y2;
    
    let achouRazao = false;
    let razaoLabels = 1;
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

function getPosicaoX(ponto, razaoLabels = 1){
    return canvas.width / 2 + ponto * espacoColuna / razaoLabels;
}

function getPosicaoY(ponto, razaoLabels = 1){
    return canvas.height / 2 - ponto * espacoLinha / razaoLabels;
}

function desenharGrafico() {

    canvas.width = canvas.width;    // Reseta o Canvas

    desenharGrade();
    desenharEixos();
    escreverPontos();

    if (etapaAtual === 0) 
        return;

    c.strokeStyle = '#1779ba';
    c.lineWidth = 1;         
    c.fillStyle = '#1779ba';

    c.beginPath();    
    c.arc(getPosicaoX(x1), getPosicaoY(y1), 10, 0, Math.PI * 2 + Math.PI / 180);  
    c.fill();
    c.stroke();

    c.beginPath();    
    c.arc(getPosicaoX(x2), getPosicaoY(y2), 10, 0, Math.PI * 2 + Math.PI / 180);  
    c.fill();
    c.stroke(); 

    c.beginPath();
    c.strokeStyle = '#1779ba';
    c.lineWidth = 5;
    c.moveTo(getPosicaoX(x1), getPosicaoY(y1));
    c.lineTo(getPosicaoX(x2), getPosicaoY(y2));
    c.stroke();
    c.lineWidth = 1;

    let xFinal1, yFinal1, xFinal2, yFinal2;

    let deltaX = x1 - x2;
    let deltaY = y1 - y2;

    let razao = Math.abs(deltaY /deltaX);

    let x = qtasColunas + 1;
    let y = razao * x;

    if (x1 > x2) {
        xFinal1 = getPosicaoX(x);
        xFinal2 = getPosicaoX(-x);
    }
    else {
        xFinal1 = getPosicaoX(-x);
        xFinal2 = getPosicaoX(x);
    }

    if (y1 > y2) {
        yFinal1 = getPosicaoY(y);
        yFinal2 = getPosicaoY(-y);
    }
    else {
        yFinal1 = getPosicaoY(-y);
        yFinal2 = getPosicaoY(y);
    }

    c.strokeStyle = '#1779ba';
    c.lineWidth = 5;

    c.beginPath();
    c.moveTo(getPosicaoX(x1), getPosicaoY(y1));
    c.lineTo(xFinal1, yFinal1);
    c.stroke();

    c.beginPath();
    c.moveTo(getPosicaoX(x2), getPosicaoY(y2));
    c.lineTo(xFinal2, yFinal2);
    c.stroke();

    c.lineWidth = 1;

    let botaoAnterior = true, botaoProximo = true;

    if (etapaAtual === 1)
        botaoAnterior = false;
    
    if (etapaAtual === 6)
        botaoProximo = false;

    desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);
}


// EVENTOS (MOVIMENTO DO MOUSE E CLIQUE DO MOUSE)
var elem = document.getElementById('canvas'),
elemLeft = elem.offsetLeft,
elemTop = elem.offsetTop;

function mouseSobreAnterior(x, y) {
    return messageBoxAnteriorHabilitado &&  !messageBoxMinimizado &&
    (
        x >= canvas.width  * 0.8125 + 36 &&  // Coordenada X
        x <= canvas.width  * 0.8675 + 36     // Coordenada X
    ) 
    && 
    (   
        y >= canvas.height * 0.73 + 40 + canvas.width * 0.078 &&   // Coordenada Y
        y <= canvas.height * 0.77 + 40 + canvas.width * 0.078      // Coordenada Y
    );
}


function mouseSobreProximo(x, y) {
    return messageBoxProximoHabilitado && !messageBoxMinimizado &&
    (
        x >= canvas.width * 0.945 - 36 &&      // Coordenada X
        x <= canvas.width - 36                 // Coordenada X
    )
    &&             
    (
        y >= canvas.height * 0.73 + 40 + canvas.width * 0.078 &&   // Coordenada Y
        y <= canvas.height * 0.77 + 40 + canvas.width * 0.078      // Coordenada Y
    );
}

function mouseSobreAudio(x, y) {
    return messageBoxHabilitado && !messageBoxMinimizado &&
    (
        x >= 20 &&                       // Coordenada X 
        x <= 20 + canvas.width * 0.021   // Coordenada X
    )    
    && 
    (
        y > canvas.height * 0.73 + 45 - canvas.width * 0.021 &&     // Coordenada Y
        y < canvas.height * 0.73 + 45                               // Coordenada Y
    );
}

function mouseSobreCaixaDeTitulo(x, y) {
    if (!messageBoxMinimizado)
        return messageBoxHabilitado &&
        (
            y >= canvas.height * 0.65 &&     // Coordenada Y
            y <= canvas.height * 0.73        // Coordenada Y
        );
    else
        return messageBoxHabilitado &&
        (
            y >= canvas.height * 0.93 &&     // Coordenada Y
            y <= canvas.height        // Coordenada Y
        );      
}


elem.addEventListener('click', function(event) {
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
   if (mouseSobreAnterior(x, y))
    {
        jaAnimou = true;
        etapaAtual--;
        fecharMessageBox();
        desenharGrafico();
        window.speechSynthesis.cancel();
    }
   else if (mouseSobreProximo(x, y))
    {
        jaAnimou = false;
        etapaAtual++;
        fecharMessageBox();
        desenharGrafico();
        window.speechSynthesis.cancel();
    }
    else if (mouseSobreAudio(x, y))
    {
        let velocidade = document.getElementById("velocidade").value;

        if(window.speechSynthesis.speaking)	
		   window.speechSynthesis.cancel(); // Reiniciar caso já esteja executando
        else
        {
            let texto = getTituloDaEtapa(etapaAtual);    // Pega o título para falá-lo
            let msg   = new SpeechSynthesisUtterance(texto);
            msg.lang = 'pt-BR';	                    // Coloca a mensagem em português
            msg.rate  = velocidade;	
            window.speechSynthesis.speak(msg);      // Fala o título

            texto = getTextoDaEtapa(etapaAtual);
            let vet   = texto.split(",").join(".").split(".");

            for (let i = 0; i < vet.length; i++)
            {
                msg = new SpeechSynthesisUtterance(vet[i]);
                msg.rate  = velocidade;
                msg.lang = 'pt-BR';
                window.speechSynthesis.speak(msg);
            }

        } 
    }
    else if (mouseSobreCaixaDeTitulo(x, y))
    {
        messageBoxMinimizado = !messageBoxMinimizado;
        desenharGrafico();
    }
    

}, false); 

elem.onmousemove = movimentoMouse;
function movimentoMouse(event) {    
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    elem.style.cursor = "default";

    // Botão Anterior
    if (mouseSobreAnterior(x, y) || mouseSobreProximo(x,y) || mouseSobreAudio(x, y) || mouseSobreCaixaDeTitulo(x, y))
        elem.style.cursor = 'pointer';
}