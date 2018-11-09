// Canvas
var canvas = document.querySelector('canvas');
var c      = canvas.getContext('2d');

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

    if (modo === Modos.B_DIFERENTE_ZERO)
    {
        if (etapaAtual === 1)
            return "Como encontrar o gráfico?";
        else if (etapaAtual === 2)
            return "Etapa 1: Encontrar dois pontos";
        else if (etapaAtual === 3)
            return "Etapa 1: Encontrar dois pontos";
        else if (etapaAtual === 4)
            return "Etapa 1: Encontrar dois pontos";
        else if (etapaAtual === 5)
            return "Etapa 2: Traçar a reta";
        else if (etapaAtual === 6)
            return "Etapa 3: Prolongar a reta";
        else if (etapaAtual === 7)
            return "Gráfico encontrado!";
    }
    
    if (modo === Modos.B_IGUAL_ZERO)
    {
        if (etapaAtual === 1)
            return "Como encontrar o gráfico?";
        else if (etapaAtual === 2)
            return "Etapa 1: Encontrar dois pontos";
        else if (etapaAtual === 3)
            return "Etapa 1: Encontrar dois pontos";
        else if (etapaAtual === 4)
            return "Etapa 1: Encontrar dois pontos";
        else if (etapaAtual === 5)
            return "Etapa 2: Traçar a reta";
        else if (etapaAtual === 6)
            return "Etapa 3: Prolongar a reta";
        else if (etapaAtual === 7)
            return "Gráfico encontrado!";
    }

    return ""; 
}

function getTextoDaEtapa(etapaAtual) {
    if (modo === Modos.B_DIFERENTE_ZERO)
    {
        if (etapaAtual === 1)
            return "Olá, tudo bem? Meu nome é Professor Funcio e vou ajudá-lo a encontrar o gráfico da função " + funcao + "! " +
            "Vou te mostrar que não é nem um pouco difícil!";
        else if (etapaAtual === 2)
            return "Certo, vamos começar! O primeiro passo é encontrar dois pontos dessa função, uma vez que toda reta é " +
            "definida por dois pontos. A maneira mais comum de fazer isso é determinando os dois pontos pelos quais a função " +
            "cruza o eixo x e o eixo y, e como sabemos que nossa função não passa pela origem, pois 'b' é diferente de 0 (é igual " +
            "a " + b + "), podemos ter certeza que nossa reta cruza o eixo x e o eixo y em pontos diferentes!";
        else if (etapaAtual === 3)
        {
            let texto = "Muito bem! Sabendo disso, devemos encontrar os pontos em que a nossa função cruza o eixo X e o eixo Y. Vamos " + 
            "começar pelo eixo X. Para isso, substituiremos o valor de f(x) (ou y), da função " + funcao + " por 0, pois queremos " + 
            "encontrar o valor que x equivale quando y é igual a 0. Assim, encontraremos uma equação: 0 = " + a + "x ";

            if (b >= 0)
                texto += "+ " + b;
            else
                texto += "- " + Math.abs(b);

            return texto;
        }
        else if (etapaAtual === 4)
            return "Com essa equação, tudo o que devemos fazer é resolvê-la, e assim podemos concluir que x = " + x1 + ". " +
            "Desse modo, já encontramos um dos pontos, que no caso é o (" + x1 + ", " + y1 + ")! Agora, nós devemos encontrar o outro ponto, e " +
            "para fazer isso, faremos a mesma coisa, mas agora substituiremos x por 0, encontrando assim uma outra equação: " +
            "y = " + b + ". Muito mais fácil, não? E assim, temos o segundo ponto: (" + x2 + ", " + y2 + ")!";
        else if (etapaAtual === 5)
            return "Assim, nós já temos dois pontos, e agora podemos traçar nossa função! Para isso, caso você esteja fazendo " + 
            "em uma folha de papel, basta apoiar uma régua sobre os dois pontos e ligá-los, assim traçando uma reta!";
        else if (etapaAtual === 6)
            return "Agora que já ligamos os pontos, nossa função já está praticamente pronta! Tudo o que falta fazer é prolongar " + 
            "a reta do nosso gráfico. Assim, basta que aumentemos a nossa reta até os limites do gráfico!";
        else if (etapaAtual === 7)
            return "E assim, encontramos o gráfico da função " + funcao + "!"; 
    }
    else if (modo === Modos.B_IGUAL_ZERO)
    {
        if (etapaAtual === 1)
            return "Olá, tudo bem? Meu nome é Professor Funcio e vou ajudá-lo a encontrar o gráfico da função " + funcao + "! " +
            "Vou te mostrar que não é nem um pouco difícil!";
        else if (etapaAtual === 2)
            return "Certo, vamos começar! O primeiro passo é encontrar dois pontos dessa função, uma vez que toda reta é " +
            "definida por dois pontos. A maneira mais comum de fazer isso é determinando os dois pontos pelos quais a função " +
            "cruza o eixo x e o eixo y. Mas, como 'b' é igual a 0, temos de fazer isso de outra maneira. Entretando, graças a esse " +
            "valor de 'b', podemos ter certeza de que a nossa função passará pelo ponto (0, 0).";
        else if (etapaAtual === 3)
            return "Então, sabendo disso, encontraremos o nosso gráfico da seguinte maneira: encontraremos um outro ponto qualquer " +
            "da nossa função, ou seja, escolheremos um valor qualquer de 'x' e encontraremos o seu 'y' correspondente. Nesse caso, " +
            "escolheremos o primeiro valor positivo do nosso eixo x que temos marcado: " + razaoLabels + ".";
        else if (etapaAtual === 4)
            return "Desse modo, encontraremos a seguinte equação: y = " + a + "*" + razaoLabels + ", e assim, podemos concluir" + 
            "que nosso segundo ponto é (" + x2 + ", " + y2 + ").";
        else if (etapaAtual === 5)
            return "Assim, nós já temos dois pontos, e agora podemos traçar a nossa função! Para isso, caso você esteja fazendo em uma " +
            "folha de papel, basta apoiar uma régua sobre os dois pontos e ligá-los, assim traçando uma reta!";
        else if (etapaAtual === 6)
            return "Agora que já ligamos os pontos, nossa função já está praticamente pronta! Tudo o que falta fazer é prolongar " + 
            "a reta do nosso gráfico. Assim, basta que aumentemos a nossa reta até os limites do gráfico!";
        else if (etapaAtual === 7)
            return "E assim, encontramos o gráfico da função " + funcao + "!";
    }
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

    let botaoAnterior = true, botaoProximo = true;

    if (etapaAtual === 1)
        botaoAnterior = false;
    
    if (etapaAtual === 7)
        botaoAnterior = false;

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

/*var canvas = document.querySelector('canvas');
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
var aAtual = null, bAtual = null;

// Duas variáveis de cada tipo para fazer a reta crescer nos dois sentidos

var x1, y1, x2, y2;
var a, b;

function validarPontos()
{
    // Excluir Depois:

    x1 = 0;
    y1 = -1;
    x2 = -2;
    y2 = 2;

    //////////////////

    a = (y1 - y2) / (x1 - x2);
    b = y1 - a*x1;

    if ((x1  == 0 && y1 == 0) || (x2 == 0 && y2 == 0))
        etapa = 0.5;

    desenharGrafico();
    tratarEtapa();
}

function getTituloDaEtapa(etapaAtual)
{
    if (etapaAtual == 0)
        return "Etapa 1: Encontrar equações a partir dos pontos já conhecidos";
    else if (etapaAtual == 0.5)
        return "Etapa 1: Encontrar o valor de 'b'";
    else if (etapaAtual == 1)
        return "Etapa 2: Encontrar o valor de 'a'";
    else if (etapaAtual == 1.5)
        return "Etapa 2: Encontrar o valor de 'a'";
    else if (etapaAtual == 2)
        return "Etapa 3: Encontrar o valor de 'b'";
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
            comoEscreverX1 = " + a*" + x1*-1;
        
        if (x2 >= 0)
            comoEscreverX2 = " - a*" + x2;
        else
            comoEscreverX2 = " + a*" + x2*-1;
        
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
        
        var comoEscreverElemento;

        if (x1 >= 0)
            comoEscreverElemento = "a*" + x1;
        else
            comoEscreverElemento = "- a*" + x2*-1;

        texto += "y = " + comoEscreverElemento + " + 0, que é o mesmo que y = " + comoEscreverElemento + ". Assim, encontramos " +
        "que a = " + a; 
    }
    else if (etapaAtual == 2)
    {
        texto = "Como já encontramos o valor de 'a', tudo o que devemos fazer é escolher um ponto dentre os que sabemos, substituir tanto seus valores de 'x' " +
        "e de 'y' quanto o de 'a' no 'corpo' da função e encontrar o valor de 'b'. Utilizaremos o primeiro ponto: ";

        var comoEscreverElemento;
        if (a*x1 > 0)
            comoEscreverElemento = "- " + (a*x1);
        else
            comoEscreverElemento = "+ " + (a*x1*-1); 

        texto += y1 + comoEscreverElemento + " = b. Assim, concluímos que b = " + b;
    }
    else if (etapaAtual == 2.5)
        texto = "Tudo o que devemos fazer agora é substituir todos os valores que encontramos de 'a' e 'b' na função. " + 
        "Como 'a' equivale a " + a + " e 'b' equivale a 0, podemos concluir que a equação da função é y = " + a + "x.";
    else if (etapaAtual == 3)
    {
        texto = "Agora que já encontramos os valores de 'a' e de 'b', tudo o que devemos fazer é substituir esses valores no corpo da função: " +
        "y = " + a + "x";

        var comoEscreverB;

        if (b > 0)
            comoEscreverB = "+ " + b;
        else if (b == 0)
            comoEscreverB = "";
        else
            comoEscreverB = "- " + b*-1;
        
        texto += comoEscreverB;
    }

    return texto;
}


function tratarEtapa()
{
    if (etapa >= 0 && etapa <= 3)
    {
        var anteriorH = true;
        if (etapa === 0 || etapa === 0.5)
            anteriorH = false;

        aAtual = null;
        bAtual = null;

        if (etapa == 1.5 || etapa == 2.5)
            bAtual = b;
        
        if (etapa == 2.5)
            aAtual = a;

        if (etapa == 2 || etapa == 3)
            aAtual = a;

        if (etapa == 3)
            bAtual = b;
        

        setTimeout(function()
        {
            prosseguir(getTituloDaEtapa(etapa), getTextoDaEtapa(etapa), anteriorH, true);
        }, 800);
    }   
    desenharGrafico();
}

function desenharGrafico()
{
    canvas.width = canvas.height;

    desenharGrade();

    var maiorPonto = Math.max(x1, x2, y1, y2);
    var menorPonto = Math.min(x1, x2, y1, y2);

    var razaoLabels = encontrarRazaoLabels(menorPonto, maiorPonto);

    desenharEixos(razaoLabels);


    let textoA = "", textoB = "";

    if (aAtual == null)
        textoA = "?";
    else
        textoA = aAtual;
    
    if (bAtual == null)
        textoB = "?";
    else
        textoB = bAtual;

    c.beginPath();
    c.font = "42px Montserrat";

    let textoFuncao;
    if (bAtual != null)
    {
        if (bAtual > 0)
            textoFuncao = "f(x) = " + textoA + "x + " + textoB;
        else if (bAtual == 0)
            textoFuncao = "f(x) = " + textoA + "x";
        else
            textoFuncao = "f(x) = " + textoA + "x - " + Math.abs(bAtual);
    } 
    else
        textoFuncao = "f(x) = " + textoA + "x + " + textoB;


    c.fillText(textoFuncao, larguraColuna, larguraLinha);

    c.fillText("a: " + textoA, larguraColuna, larguraLinha + 42);

    c.fillText("b: " + textoB, larguraColuna, larguraLinha + 84);


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
*/