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
var jaAnimou = false;
var intervalos = [];

// Message Box
var messageBoxHabilitado         = true;
var messageBoxAnteriorHabilitado = true;
var messageBoxProximoHabilitado  = true;
var messageBoxMinimizado         = false;

// Cores
var corLinhas = "rgb(169, 169, 169)";
var corEixos  = "rgb(49, 49, 49)";   
var corPrimaria = "rgb(23,121,186)"; 
var corSecundaria = "white"; 
var corTerciaria = "black"; 
var corDeFundo = "white";
var corFonte = "black";

// FUNÇÃO PARA DESENHAR A GRADE DO GRÁFICO
function desenharGrade() {
    // Configurações das linhas / colunas ------------------------------------------------------------- 
    c.strokeStyle = corLinhas;
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
    c.strokeStyle = corEixos;

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
    c.fillStyle      = corFonte;

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


// Duas variáveis de cada tipo para fazer a reta crescer nos dois sentidos

var a, b;
var x1, y1;
var x2, y2;
var funcao;
function getAeBdaFuncao(x) {           
    let achou   = false; // Determina se achou um dos termos

    let aFunc   = ""; // Termo "a" da função
    let bFunc   = ""; // Termo "b" da função
    let aux = "";     // Auxiliar para a leitura
    
    let qtsNumerosAchou = 0; // Verifica se já achou "a" e "b" ou apenas um deles

    let indiceIgual = x.indexOf("="); // Pega o indíce do character "=", para poder cortar a string

    x = x.substring(indiceIgual+1, x.length).trim(); // Tira a parte "f(x) =" ou a parte "y ="da expressão

    for(let i = 0; i < x.length; i++) // Percorre a string até o fim
    {
        let s = x.charAt(i); // Pega um character

        if(s != " ") // Ignora espaço em branco
        {  
            if(s == "-")
            {
                if(!achou) // Se ainda não achou, o número q será lido é negativo
                    aux = "-";
                else // Se já achou, negativo não será o que está no aux, mas sim o próximo
                    aFunc = "-"; // Só cairá nesse if se o segundo número for o termo de "a"

            }

            if(!isNaN(s) || s == "/" || s == ",") //Se for numero ou barra de divisão
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

function validarFuncao() {
    
    funcao = document.getElementById("funcao").value;

    if(funcao === "") {
        desenharGrafico();
        return;
    }

    // expressao regular para validar uma funcao afim na for f(x) = ax + b
    let expressaoReg  = /^((f\([a-z]{1}\)\s*=\s*)|(y\s*=\s*))\-?(\d+(\,|\/)\d+)?\d*[a-z]{1}\s*(((\+|\-)\s*\d+((\,|\/)\d+)?)(\s*))$/;   

    // expressao regular para validar uma funcao afim na for f(x) = b + ax
    let expressaoReg2 = /^((f\([a-z]{1}\)\s*=\s*)|(y\s*=\s*))\-?\s*\d+((\,|\/)\d+)?\s*(\-|\+)\s*(\d+(\,|\/)\d+)?\d*[a-z]{1}(\s*)$/;

    if (expressaoReg.test(funcao) || expressaoReg2.test(funcao))
    {
        let valores = getAeBdaFuncao(funcao);
        a = Number(valores[0].replace(",", "."));
        b = Number(valores[1].replace(",", "."));

        x1 = Math.round(-b/a * 100) / 100;
        y2 = Math.round(b * 100) /100;

        // Não cruza no ponto (0, 0):
        if (b != 0) {
            y1 = 0;
            x2 = 0;
            modo = Modos.B_DIFERENTE_ZERO;
        }
        else 
        {
            x1 = 0;
            y1 = 0;
            x2 = 1;
            y2 = a;
            modo = Modos.B_IGUAL_ZERO;
        }   
            
        etapaAtual  = 1;
        encontrarRazaoLabels(x1, y1, x2, y2);
    
        desenharGrafico(etapaAtual);
    }
    else
    {
        alert("A função deve serguir o padrão f(x) = ax + b ou y = ax + b");
        return false; 
    }
}

function desenharMessageBox(titulo, mensagem, temAnterior, temProximo, minimizado = false) {

    messageBoxHabilitado = true;
    if (!minimizado)
    {
        // Caixa base da mensagem ----------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = corSecundaria;
        c.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.35);
        c.stroke();

        // Caixa do título da mensagem -----------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = corPrimaria;
        c.fillRect(0, canvas.height * 0.65, canvas.width, canvas.height * 0.08);
        c.stroke();   

        // Texto do título -----------------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = corSecundaria;
        c.font = canvas.height * 0.03 + "pt Montserrat";
        
        // Responsividade => Layout funcional até 320px
        if (c.measureText(titulo).width >= canvas.width)
            c.font = canvas.height * 0.021 + "pt Montserrat";

        c.fillText(titulo, 20, canvas.height * 0.705, canvas.width); // 20 é a margem
        c.stroke();

        // Texto da mensagem ---------------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = corTerciaria;

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

        c.shadowColor = corTerciaria;
        c.shadowBlur = 4;
        c.fillStyle = corPrimaria;      

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
        c.fillStyle = corPrimaria;
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
        c.fillStyle = corSecundaria;
        let margemTextoAnterior = (widthBotoes - c.measureText("Anterior").width) / 2;
        if (temAnterior)
        {
            c.beginPath();
            c.fillText("Anterior", posicaoXAnterior + margemTextoAnterior, posicaoYBotoes + canvas.height * 0.03, widthBotoes);
            c.stroke();
        }

        // Texto do Próximo:
        c.font = canvas.height * 0.017 + "pt Montserrat";
        c.fillStyle = corSecundaria;
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
        c.fillStyle = corPrimaria;
        c.fillRect(0, canvas.height * 0.93, canvas.width, canvas.height * 0.07);
        c.stroke();   

        // Texto do título -----------------------------------------------------------------------------------
        c.beginPath();
        c.fillStyle = corSecundaria;
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

// FUNÇÃO PARA ANIMAR O DESENHO DE UM PONTO EM UMA DADA POSIÇÃO DO CANVAS
// Retorna o tempo que leva para realizar a animação em MS
function desenharPonto(x, y, intervalo = 33.3) {
    c.beginPath();
    let anguloAtual = 0;

    let animacao = setInterval(function(){
        c.beginPath();
        c.strokeStyle = corPrimaria;
        c.lineWidth = 1;
        c.arc(x, y, 10, anguloAtual - Math.PI / 180, anguloAtual + Math.PI / 180);
        c.stroke();

        anguloAtual += Math.PI / 180;

        if (anguloAtual > Math.PI * 2)
        {
            c.beginPath();
            
            c.arc(x, y, 10, 0, Math.PI * 2);
            c.fillStyle = corPrimaria;
            c.fill();
            c.stroke();
            clearInterval(animacao);

            let indice = intervalos.indexOf(animacao);

            if(indice >= 0)
                intervalos.splice(indice, 1);
        }

    }, intervalo);

    intervalos.push(animacao);
    return intervalo * 361; // Tempo total que levará a execução da animação (setInterval é executado 361 vezes)
}

// FUNÇÃO PARA DESENHAR UMA RETA ENTRE DOIS PONTOS DADOS
// retorna o tempo que leva para realizar a animação em MS
function desenharReta(xInicial, yInicial, xFinal, yFinal, intervalo = 33.3) {

    let deltaX = Math.abs(xFinal - xInicial);
    let deltaY = Math.abs(yFinal - yInicial);

    let aumentoX, aumentoY;

    if (deltaX < deltaY) {
        aumentoX = deltaX/deltaY;   //Ao aumentar Y em 1, devemos aumentar X em aumentoX
        aumentoY = 1;
    }
    else {
        aumentoX = 1;   //Ao aumentar Y em 1, devemos aumentar X em aumentoX
        aumentoY = deltaY/deltaX;
    }

    let xAtual = xInicial;
    let yAtual = yInicial;

    let inter = setInterval(function(){

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
        
        c.fillStyle = corPrimaria;
        c.fill();
        c.strokeStyle = corPrimaria;
        c.stroke();

        if (xInicial < xFinal && xAtual >= xFinal) {
            if ( (yInicial < yFinal && yAtual >= yFinal) || (yInicial > yFinal && yAtual <= yFinal) )
                clearInterval(inter);
        }
        
        if (xInicial > xFinal && xAtual <= xFinal) {
            if ( (yInicial < yFinal && yAtual >= yFinal) || (yInicial > yFinal && yAtual <= yFinal) )
                clearInterval(inter);
        }

    }, intervalo);

    let div = (Math.pow(Math.pow(deltaX, 2) + Math.pow(deltaY, 2), 1/2) / (Math.pow(Math.pow(aumentoX, 2) + Math.pow(aumentoY, 2), 1/2)));
    return div * intervalo;

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
            "escolheremos x = 1.";
        else if (etapaAtual === 4)
            return "Desse modo, encontraremos a seguinte equação: y = " + a + "* 1" + ", e assim, podemos concluir" + 
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
        maiorValorY = Math.abs(y1);
    else
        maiorValorY = Math.abs(y2);

    razaoLabels = Math.max(Math.ceil(maiorValorX/(qtasColunas-1)), Math.ceil(maiorValorY/(qtasLinhas-1)));
}

function getPosicaoX(ponto){
    return canvas.width / 2 + (ponto * espacoColuna / razaoLabels);
}

function getPosicaoY(ponto){
    return canvas.height / 2 - (ponto * espacoLinha / razaoLabels);
}

function desenharGrafico() {

    canvas.width = canvas.width;    // Reseta o Canvas
    
    // Cancela todos os intervalos:
    intervalos.forEach(function(elemento, indice, array) {
        clearInterval(elemento);
    });

    c.beginPath();
    c.fillStyle = corDeFundo;
    c.rect(0, 0, canvas.width, canvas.height);
    c.fill();
    c.stroke();

    desenharGrade();
    desenharEixos();
    escreverPontos();

    if (etapaAtual === 0)
        return;

    if (modo === Modos.B_DIFERENTE_ZERO) {
        
        if (etapaAtual > 5 || (etapaAtual === 5 && jaAnimou)) {        
            c.strokeStyle = corPrimaria;
            c.lineWidth = 1;         
            c.fillStyle = corPrimaria;

            c.beginPath();    
            c.arc(getPosicaoX(x1), getPosicaoY(y1), 10, 0, Math.PI * 2 + Math.PI / 180);   
            c.fill();
            c.stroke();

            c.beginPath();
            c.arc(getPosicaoX(x2), getPosicaoY(y2), 10, 0, Math.PI * 2 + Math.PI / 180);  
            c.fill();
            c.stroke();
        }

        if (etapaAtual > 6 || (etapaAtual === 6 && jaAnimou)) {
            c.beginPath();
            c.moveTo(getPosicaoX(x1), getPosicaoY(y1));
            c.lineTo(getPosicaoX(x2), getPosicaoY(y2));
            c.strokeStyle = corPrimaria;
            c.lineWidth = 5;
            c.stroke();
            c.lineWidth = 1;
        }

        if (etapaAtual === 7 && jaAnimou) {
            let xFinal1, yFinal1, xFinal2, yFinal2;

            if (x1 > x2) {
                xFinal1 = (qtasColunas + 1) * razaoLabels;
                xFinal2 = (qtasColunas + 1) * -razaoLabels;
            }
            else {
                xFinal1 = (qtasColunas + 1) * -razaoLabels;
                xFinal2 = (qtasColunas + 1) * razaoLabels;
            }

            if (y1 > y2) {
                yFinal1 = (qtasLinhas + 1) * razaoLabels;
                yFinal2 = (qtasLinhas + 1) * -razaoLabels;
            }
            else {
                yFinal1 = (qtasLinhas + 1) * -razaoLabels;
                yFinal2 = (qtasLinhas + 1) * razaoLabels;
            }

            if (Math.pow( Math.pow(xFinal1, 2) + Math.pow(a * xFinal1 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal1 - b) / a), 2) + Math.pow(yFinal1 , 2) , 1/2))
                xFinal1 = (yFinal1 - b) / a;
            else
                yFinal1 = a * xFinal1 + b;
            
            if (Math.pow( Math.pow(xFinal2, 2) + Math.pow(a * xFinal2 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal2 - b) / a), 2) + Math.pow(yFinal2 , 2) , 1/2))
                xFinal2 = (yFinal2 - b) / a;
            else
                yFinal2 = a * xFinal2 + b;   

            yFinal1 = getPosicaoY(yFinal1);
            yFinal2 = getPosicaoY(yFinal2);
            xFinal1 = getPosicaoX(xFinal1);
            xFinal2 = getPosicaoX(xFinal2);

            c.strokeStyle = corPrimaria;
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
        }

        let botaoAnterior = true, botaoProximo = true;
        if (etapaAtual === 1)
            botaoAnterior = false;
        else if (etapaAtual === 7)
            botaoProximo = false;  

        if (etapaAtual === 5 && !jaAnimou) {
            let intervaloPontoA = setTimeout(function(){
                let tempoAnimacaoPrimeiroPonto = desenharPonto(getPosicaoX(x1), getPosicaoY(y1), 4);

                let intervaloPontoB = setTimeout(function(){

                    let tempoAnimacaoSegundoPonto = desenharPonto(getPosicaoX(x2), getPosicaoY(y2), 4);
                    let intervaloProsseguir = setTimeout(function(){
                        jaAnimou = true;
                        desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);
                    }, tempoAnimacaoSegundoPonto + 200)
                intervalos.push(intervaloProsseguir);

                }, tempoAnimacaoPrimeiroPonto + 400);  
                intervalos.push(intervaloPontoB);
            }, 300);
        
            intervalos.push(intervaloPontoA);
        }
        else if (etapaAtual === 6 && !jaAnimou) {
            let intervaloReta = setTimeout(function() {
                let tempoAnimacaoReta = desenharReta(getPosicaoX(x1), getPosicaoY(y1), getPosicaoX(x2), getPosicaoY(y2), 10);
                let intervaloProsseguir = setTimeout(function(){
                    jaAnimou = true;
                    desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);
                }, tempoAnimacaoReta + 300)
                intervalos.push(intervaloProsseguir);
            }, 300);
            intervalos.push(intervaloReta);
        }
        else if (etapaAtual === 7 && !jaAnimou) {
            let xInicial1 = getPosicaoX(x1);
            let yInicial1 = getPosicaoY(y1);
            let xInicial2 = getPosicaoX(x2);
            let yInicial2 = getPosicaoY(y2);
            let xFinal1, yFinal1, xFinal2, yFinal2;
            let velocidade = 5;

            if (x1 > x2) {
                xFinal1 = (qtasColunas + 1) * razaoLabels;
                xFinal2 = (qtasColunas + 1) * -razaoLabels;
            }
            else {
                xFinal1 = (qtasColunas + 1) * -razaoLabels;
                xFinal2 = (qtasColunas + 1) * razaoLabels;
            }

            if (y1 > y2) {
                yFinal1 = (qtasLinhas + 1) * razaoLabels;
                yFinal2 = (qtasLinhas + 1) * -razaoLabels;
            }
            else {
                yFinal1 = (qtasLinhas + 1) * -razaoLabels;
                yFinal2 = (qtasLinhas + 1) * razaoLabels;
            }

            if (Math.pow( Math.pow(xFinal1, 2) + Math.pow(a * xFinal1 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal1 - b) / a), 2) + Math.pow(yFinal1 , 2) , 1/2))
                xFinal1 = (yFinal1 - b) / a;
            else
                yFinal1 = a * xFinal1 + b;
            
            if (Math.pow( Math.pow(xFinal2, 2) + Math.pow(a * xFinal2 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal2 - b) / a), 2) + Math.pow(yFinal2 , 2) , 1/2))
                xFinal2 = (yFinal2 - b) / a;
            else
                yFinal2 = a * xFinal2 + b;   
            
            yFinal1 = getPosicaoY(yFinal1);
            yFinal2 = getPosicaoY(yFinal2);
            xFinal1 = getPosicaoX(xFinal1);
            xFinal2 = getPosicaoX(xFinal2);

            let tempo1 = desenharReta(xInicial1, yInicial1, xFinal1, yFinal1, velocidade);
            let intervalo1 = setTimeout(function(){
                let tempo2 = desenharReta(xInicial2, yInicial2, xFinal2, yFinal2, velocidade);
                let intervalo2 = setTimeout(function(){
                    jaAnimou = true;
                    desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);            
                }, tempo2);
                intervalos.push(intervalo2);
            }, tempo1);
            intervalos.push(intervalo1);
        }
        else
            desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);

    }
    else if (modo === Modos.B_IGUAL_ZERO) {

        if (etapaAtual > 3 || (etapaAtual === 3 && jaAnimou)) { 
            c.strokeStyle = corPrimaria;
            c.lineWidth = 1;         
            c.fillStyle = corPrimaria;

            c.beginPath();    
            c.arc(getPosicaoX(x1), getPosicaoY(y1), 10, 0, Math.PI * 2 + Math.PI / 180);   
            c.fill();
            c.stroke();
        }

        if (etapaAtual > 5 || (etapaAtual === 5 && jaAnimou)) {        
            c.strokeStyle = corPrimaria;
            c.lineWidth = 1;         
            c.fillStyle = corPrimaria;

            c.beginPath();
            c.arc(getPosicaoX(x2), getPosicaoY(y2), 10, 0, Math.PI * 2 + Math.PI / 180);  
            c.fill();
            c.stroke();
        }

        if (etapaAtual > 6 || (etapaAtual === 6 && jaAnimou)) {
            c.beginPath();
            c.moveTo(getPosicaoX(x1), getPosicaoY(y1));
            c.lineTo(getPosicaoX(x2), getPosicaoY(y2));
            c.strokeStyle = corPrimaria;
            c.lineWidth = 5;
            c.stroke();
            c.lineWidth = 1;
        }

        if (etapaAtual === 7 && jaAnimou) {
            let xFinal1, yFinal1, xFinal2, yFinal2;

            if (x1 > x2) {
                xFinal1 = (qtasColunas + 1) * razaoLabels;
                xFinal2 = (qtasColunas + 1) * -razaoLabels;
            }
            else {
                xFinal1 = (qtasColunas + 1) * -razaoLabels;
                xFinal2 = (qtasColunas + 1) * razaoLabels;
            }

            if (y1 > y2) {
                yFinal1 = (qtasLinhas + 1) * razaoLabels;
                yFinal2 = (qtasLinhas + 1) * -razaoLabels;
            }
            else {
                yFinal1 = (qtasLinhas + 1) * -razaoLabels;
                yFinal2 = (qtasLinhas + 1) * razaoLabels;
            }

            if (Math.pow( Math.pow(xFinal1, 2) + Math.pow(a * xFinal1 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal1 - b) / a), 2) + Math.pow(yFinal1 , 2) , 1/2))
                xFinal1 = (yFinal1 - b) / a;
            else
                yFinal1 = a * xFinal1 + b;
            
            if (Math.pow( Math.pow(xFinal2, 2) + Math.pow(a * xFinal2 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal2 - b) / a), 2) + Math.pow(yFinal2 , 2) , 1/2))
                xFinal2 = (yFinal2 - b) / a;
            else
                yFinal2 = a * xFinal2 + b;   

            yFinal1 = getPosicaoY(yFinal1);
            yFinal2 = getPosicaoY(yFinal2);
            xFinal1 = getPosicaoX(xFinal1);
            xFinal2 = getPosicaoX(xFinal2);

            c.strokeStyle = corPrimaria;
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
        }

        let botaoAnterior = true, botaoProximo = true;
        if (etapaAtual === 1)
            botaoAnterior = false;
        else if (etapaAtual === 7)
            botaoProximo = false;  

        if (etapaAtual === 3 && !jaAnimou) {
            let intervaloPonto = setTimeout(function(){
                let tempoAnimacaoPrimeiroPonto = desenharPonto(getPosicaoX(x1), getPosicaoY(y1), 4);
                let intervaloProsseguir = setTimeout(function(){
                    jaAnimou = true;
                    desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);
                }, tempoAnimacaoPrimeiroPonto + 200)
                intervalos.push(intervaloProsseguir);
            }, 300)
            intervalos.push(intervaloPonto);
        }
        else if (etapaAtual === 5 && !jaAnimou) {
            let intervaloPonto = setTimeout(function(){
                let tempoAnimacaoPrimeiroPonto = desenharPonto(getPosicaoX(x2), getPosicaoY(y2), 4);
                let intervaloProsseguir = setTimeout(function(){
                    jaAnimou = true;
                    desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);
                }, tempoAnimacaoPrimeiroPonto + 200)
                intervalos.push(intervaloProsseguir);
            }, 300)
            intervalos.push(intervaloPonto);
        }
        else if (etapaAtual === 6 && !jaAnimou) {
            let intervaloReta = setTimeout(function() {
                let tempoAnimacaoReta = desenharReta(getPosicaoX(x1), getPosicaoY(y1), getPosicaoX(x2), getPosicaoY(y2), 10);
                let intervaloProsseguir = setTimeout(function(){
                    jaAnimou = true;
                    desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);
                }, tempoAnimacaoReta + 300)
                intervalos.push(intervaloProsseguir);
            }, 300);
            intervalos.push(intervaloReta);
        }
        else if (etapaAtual === 7 && !jaAnimou) { 
            let xInicial1 = getPosicaoX(x1);
            let yInicial1 = getPosicaoY(y1);
            let xInicial2 = getPosicaoX(x2);
            let yInicial2 = getPosicaoY(y2);
            let xFinal1, yFinal1, xFinal2, yFinal2;
            let velocidade = 5;

            if (x1 > x2) {
                xFinal1 = (qtasColunas + 1) * razaoLabels;
                xFinal2 = (qtasColunas + 1) * -razaoLabels;
            }
            else {
                xFinal1 = (qtasColunas + 1) * -razaoLabels;
                xFinal2 = (qtasColunas + 1) * razaoLabels;
            }

            if (y1 > y2) {
                yFinal1 = (qtasLinhas + 1) * razaoLabels;
                yFinal2 = (qtasLinhas + 1) * -razaoLabels;
            }
            else {
                yFinal1 = (qtasLinhas + 1) * -razaoLabels;
                yFinal2 = (qtasLinhas + 1) * razaoLabels;
            }

            if (Math.pow( Math.pow(xFinal1, 2) + Math.pow(a * xFinal1 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal1 - b) / a), 2) + Math.pow(yFinal1 , 2) , 1/2))
                xFinal1 = (yFinal1 - b) / a;
            else
                yFinal1 = a * xFinal1 + b;
            
            if (Math.pow( Math.pow(xFinal2, 2) + Math.pow(a * xFinal2 + b , 2) , 1/2) >
            Math.pow( Math.pow(((yFinal2 - b) / a), 2) + Math.pow(yFinal2 , 2) , 1/2))
                xFinal2 = (yFinal2 - b) / a;
            else
                yFinal2 = a * xFinal2 + b;

            yFinal1 = getPosicaoY(yFinal1);
            yFinal2 = getPosicaoY(yFinal2);
            xFinal1 = getPosicaoX(xFinal1);
            xFinal2 = getPosicaoX(xFinal2);

            let tempo1 = desenharReta(xInicial1, yInicial1, xFinal1, yFinal1, velocidade);
            let intervalo1 = setTimeout(function(){
                let tempo2 = desenharReta(xInicial2, yInicial2, xFinal2, yFinal2, velocidade);
                let intervalo2 = setTimeout(function(){
                    jaAnimou = true;
                    desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);            
                }, tempo2);
                intervalos.push(intervalo2);
            }, tempo1);
            intervalos.push(intervalo1); 
        }
        else
            desenharMessageBox(getTituloDaEtapa(etapaAtual), getTextoDaEtapa(etapaAtual), botaoAnterior, botaoProximo, messageBoxMinimizado);
    }
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
function movimentoMouse(event)
{    
    let x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

    elem.style.cursor = "default";

    // Botão Anterior
    if (mouseSobreAnterior(x, y) || mouseSobreProximo(x,y) || mouseSobreAudio(x, y) || mouseSobreCaixaDeTitulo(x, y))
        elem.style.cursor = 'pointer';
}