class FuncaoDePrimeiroGrau
{
    constructor(a,b)
    {      
        this.a = a;
        this.b = b;
    }

    get raizDaFuncao()
    {
        return -1 * this.b / this.a
    }

<<<<<<< HEAD
    get escalaEixoX()
    {
        
    }

    get escalaEixoY()
=======
    get escala()
>>>>>>> e3b3f1cc852f30f23904ed7354645c517679b4d1
    {

    }

    valorDeY(x)
    {
        return this.a*x + this.b; 
    }
}