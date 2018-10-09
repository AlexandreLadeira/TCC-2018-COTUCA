function desenharPonto(x, y, velocidade, raio, context, progressao = 1) {

    let anguloAtual = 0;

    let animacao = setInterval(function(){
        context.beginPath();
        context.arc(x, y, raio, getRadianos(anguloAtual), getRadianos(anguloAtual + progressao));
        context.stroke();
        anguloAtual += progressao;
    }, velocidade);

    return animacao;
}

function getRadianos(graus){
    return (Math.PI / 180) * graus; 
}