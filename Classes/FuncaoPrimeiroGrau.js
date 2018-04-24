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

    get escalaEixoX()
    {
        
    }

    get escalaEixoY()
    {

    }

    valorDeY(x)
    {
        return this.a*x + this.b; 
    }
}