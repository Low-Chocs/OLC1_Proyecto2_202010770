/*
    DECLARAMOS UN VECTOR DE 15 POSICIONES
    SE IMPRIMR? Y POSTERIORMENTE SE ORDENAR?
*/
int vectorNumeros[] = new int[15];

/*
    DECLARAMOS UNA LISTA
*/
std::string frase[] = new std::string[17];

void Hanoi(int discos, int origen, int auxiliar, int destino) {
    if (discos == 1) {
        cout << "Mover disco de " + origen + " a " + destino << endl;
    } else {
        Hanoi(discos - 1, origen, destino, auxiliar);
        cout << "Mover disco de " + origen + " a " + destino << endl;
        Hanoi(discos - 1, auxiliar, origen, destino);
    }
}

void imprimirVector(){
    for (int i = 0; i < vectorNumeros.length(); i++) {
        cout << "vectorNumeros[" + i + "] = " + vectorNumeros[i] << endl;
    }
}

void BubbleSort(){
    for (int i = 0; i < vectorNumeros.length(); i++)
    {
        for (int j = 0; j < vectorNumeros.length() - i - 1; j++)
        {
            if (vectorNumeros[j] > vectorNumeros[j + 1]) {
                int temp = vectorNumeros[j];
                vectorNumeros[j] = vectorNumeros[j + 1];
                vectorNumeros[j + 1] = temp;
            }
        }
    }
}

int indiceLista = 0;
void agregarValorLista(std::string letra){
    frase[indiceLista] = letra;
    indiceLista ++;
}

void imprimirLista(){
    for (int i = 0; i < frase.length(); i++) {
        cout << "frase[" + i + "] = " + frase[i] << endl;
    }
}

std::string mensajeVolteado(){
    std::string mensaje="";
    for(int i=frase.length()-1;i>=0;i--){
        mensaje=mensaje+frase[i];
    }
    return mensaje;
}

execute Archivo3();

void ParoImpar(int a) {
    if (par(a) == 1) { // El n?mero es Par
        cout << "El numero '" + a + "'" + " es Par" << endl;
    } else { // El n?mero es impar
        cout << "El numero '" + a + "'" + " es Impar" << endl;
    }
}

int par(int nump) {
    if (nump == 0) {
        return 1;
    }
    return impar(nump - 1);
}

int impar(int numi) {
    if (numi == 0) {
        return 0;
    }
    return par(numi - 1);
}

int ackermanPuntosMenos(int m, int n)
{
    if (m == 0) {
        return n + 1;
    } else if (m > 0 && n == 0) {
        return ackermanPuntosMenos(m - 1, 1);
    } else {
        return ackermanPuntosMenos(m - 1, ackermanPuntosMenos(m, n - 1));
    }
}

int ackerman(int m, int n)
{
    
    return (m == 0 ? n + 1 : (m > 0 && n == 0 ? ackerman(m - 1, 1) : ackerman(m - 1, ackerman(m, n - 1))));
}

void Archivo3(){
    vectorNumeros[0] = 200;
    vectorNumeros[1] = 26;
    vectorNumeros[2] = 1;
    vectorNumeros[3] = 15;
    vectorNumeros[4] = 167;
    vectorNumeros[5] = 0;
    vectorNumeros[6] = 76;
    vectorNumeros[7] = 94;
    vectorNumeros[8] = 25;
    vectorNumeros[9] = 44;
    vectorNumeros[10] = 5;
    vectorNumeros[11] = 59;
    vectorNumeros[12] = 95;
    vectorNumeros[13] = 10;
    vectorNumeros[14] = 23;
    cout << "====================ARCHIVO 3=======l=============" << endl;
    cout << "**************SECCION DE VECTORES****************" << endl;
    cout << "---Vector Desordenado---" << endl;
    imprimirVector();
    BubbleSort();
    cout << "-----Vector Ordenado----" << endl;
    imprimirVector();
    cout << "************FIN DE SECCION VECTORES***************" << endl;
    cout << "****************SECCION DE LISTAS****************" << endl;
    
    //agregamos valores a la lista
    agregarValorLista(")");
    agregarValorLista(":");
    agregarValorLista(" ");
    agregarValorLista("1");
    agregarValorLista("I");
    agregarValorLista("P");
    agregarValorLista("M");
    agregarValorLista("O");
    agregarValorLista("C");
    agregarValorLista(" ");
    agregarValorLista("E");
    agregarValorLista("L");
    agregarValorLista("A");
    agregarValorLista("S");
    agregarValorLista(" ");
    agregarValorLista("I");
    agregarValorLista("S");
    imprimirLista();
    
    cout << "El mensaje es:" << endl;
    cout << mensajeVolteado() << endl;
    cout << "************FIN DE SECCION DE LISTAS**************" << endl;
    cout << "**************SECCION DE CASTEOS***************" << endl;
    Casteos();
    cout << "************FIN DE SECCION DE CASTEOS*************" << endl;
    cout << "**************SECCION DE NATIVAS***************" << endl;

    FuncionesEspecialesNativas();
    
    cout << "************FIN DE SECCION DE NATIVAS*************" << endl;
    cout << "***********SECCION DE RECURSIVIDAD***************" << endl;
    cout << "---------------FUNCION FIBONACCI-----------------" << endl;
    imprimir_fibonacci(20); //con 20 6765
    
    cout << "-------------------------------------------------" << endl;
    cout << "---------------FUNCION PAR-IMPAR-----------------" << endl;
    ParoImpar(71);
    cout << "-------------------------------------------------" << endl;
    cout << "----------------TORRES DE HANOI------------------" << endl;
    int discos = 3;
    int origen = 1;
    int auxiliar = 2;
    int destino = 3;
    
    Hanoi(discos, origen, auxiliar, destino);
    cout << "-------------------------------------------------" << endl;
    cout << "---------------FUNCION ACKERMANN-----------------" << endl;
    int m = 3;
    int n = 4;
    
    cout << "Funcion de Ackerman (" + m + ", " + n + ") = " + ackerman(m, n) << endl;
    cout << "Funcion de Ackerman Puntos Menos (" + m + ", " + n + ") = " + ackermanPuntosMenos(m, n) << endl;
    cout << "-------------------------------------------------" << endl;
    cout << "*************FIN DE RECURSIVIDAD*****************" << endl;
    cout << "=================================================" << endl;
    
}

void Casteos(){
    cout << "int a "+typeof((double) 1789) << endl;
    cout << "double a "+ typeof((int) 258.2) << endl;
    cout << "char a "+ typeof((double) 'F') << endl;
    cout << "int a "+typeof((char) 98) << endl;
    cout << "double a "+typeof(std::toString(2589.97)) << endl;
}

void FuncionesEspecialesNativas(){
    cout << "------------------LENGTH-------------------" << endl;
    cout << "vectorNumero es de "+vectorNumeros.length()+" elementos" << endl;
    cout << "La lista frase tiene "+frase.length()+" elementos" << endl;
    int a = 15;
    cout << "------------------TOLOWER-------------------" << endl;
    cout << "SIN TOLOWER" << endl;
    cout << toLower("CON TOLOWER") << endl;
    cout << "------------------TOUPPER-------------------" << endl;
    cout << "sin toupper" << endl;
    cout << toUpper("con toupper") << endl;
    cout << "------------------ROUND-------------------" << endl;
    double c=26.5;
    cout << "sin round: "+c << endl;
    c=round(c);
    cout << "con round "+c << endl;
    double cc=26.4;
    cout << "sin round: "+cc << endl;
    cc=round(cc);
    cout << "con round "+cc << endl;
    cout << "-----------------TYPEOF--------------------" << endl;
    std::string x="soy una cadena";
    int y = 50;
    double z = 78.5;
    char xx = 'a';
    bool yy = true;
    cout << "tipo: "+typeof(x) << endl;
    cout << "tipo: "+typeof(y) << endl;
    cout << "tipo: "+typeof(z) << endl;
    cout << "tipo: "+typeof(xx) << endl;
    cout << "tipo: "+typeof(yy) << endl;
    cout << "------------------LENGTH-------------------" << endl;
    std::string cadena="soy una cadena";
    cout << "tama?o: "+cadena.length() << endl;
    cout << "------------------std::toString-------------------" << endl;
    int numero=105;
    cout << "tipo: "+typeof(numero) << endl;
    cout << "tipo: "+typeof(std::toString(numero)) << endl;
    cout << "----------------TOCHARARRAY------------------" << endl;
    cout << "########imprimiendo lista de caracteres#######" << endl;
    imprimirListaChar();
}
char listaChar[] = "SOY UNA LISTA".c_str();
void imprimirListaChar(){
    for (int i = 0; i < listaChar.length(); i++) {
        cout << "listaChar[" + i + "] = " + listaChar[i] << endl;
    }
}

void imprimir_fibonacci(int valor) {
    cout << "Resultado de fibonacci(" + valor + ") = " + fibonacci(valor) << endl;
}

int fibonacci(int n) {
    if (n > 1) {
        return fibonacci(n - 1) + fibonacci(n - 2);
    } else if (n == 1) {
        return 1;
    } else if (n == 0) {
        return 0;
    } else {
        cout << "error" << endl;
        return 0;
    }
}

