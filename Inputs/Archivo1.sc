int var1 = 1;
int punteo = 0;

execute InicioArchivo1();

void InicioArchivo1() {
    Cout << "-----------------CALIFICACION ARCHIVO 1-----------------" << endl;
    Cout << "Valor: 15 pts" << endl;
    Cout << "--------------------------------------------------------" << endl;
    int var1 = 0;
    //Verificar ambitos, se toma con prioridad la variable local ante la global.
    if (var1 != 0) {
        Cout << "No se toma con prioridad la variable local ante la global" << endl;
        Cout << "Perdiste 8 puntos :c" << endl;
    }
    else {
        punteo = punteo + 8;
        Cout << "Muy bien, prioridad de variable local correcta" << endl;
        Cout << "Haz sumado 8 puntos" << endl;
        Cout << "Punteo = " + punteo << endl;
    }

    //Secci?n de declaracion de variables
    Declaracion();
    //seccion de manejo de ?mbitos 2
    int amb1 = 3;
    Ambitos2();

    //Secci?n de expresiones aritm?ticas
    Aritmeticas();

    //Seccion de expresiones l?gicas
    Logicas();

    //Seccion de expresiones relacionales
    Relacionales();

    //punteo final
    Cout << "Punteo Final: " + punteo << endl;
    Cout << "-----------------------------------" << endl;
    Cout << "|   RESULTADO ARCHIVO 1 = " + (punteo*15)/100 + " pts  |" << endl;
    Cout << "-----------------------------------" << endl;

}

void Declaracion(){
    /*  SALIDA ESPERADA:
            ========= Metodo Declaracion =========
            Voy a ganar Compiladores 1 :D
            ======================================
    */
    Cout << "========= Metodo Declaracion =========" << endl;
    int n1 = 1;
    int n2 = 1;
    int n3 = 1;
    int n4 = 1;
    std::string str1 = "Voy a ganar Compiladores";
    std::string str2 = "Voy a ganar Compiladores";
    std::string str3 = "Voy a ganar Compiladores";
    std::string str4 = "Voy a ganar Compiladores";
    double db1 = 0.0;
    double db2 = 0.0;
    double db3 = 0.0;
    double db4 = 0.0;
    char chr1 = 's';
    char chr2 = 's';
    char chr3 = 's';
    char chr4 = 's';
    //si n modificar la asignaci?n
    if (db1 == db4) {
        Cout << str1 + chr2 + " " + n3 + " :D" << endl;
        punteo = punteo + 6;
        Cout << "Declaraci?n correcta" << endl;
        Cout << "Haz sumado 6 puntos" << endl;
    } else {
        Cout << "Problemas en el metodo declaracion :(" << endl;
        Cout << "Perdiste 6 pts :(" << endl;
    }
    Cout << "--------------------------------------" << endl;
    Cout << "Punteo = " + punteo << endl;
    Cout << "======================================" << endl;
}
void Ambitos2(){
    
    std::string amb1 = "Desde ambito2";
    Cout << "==============Ambitos 2===============" << endl;
    if (amb1 == "Desde ambito2") {
        Cout << amb1 << endl;
        punteo = punteo + 8;
    }
    else {
        Cout << "Tienes un error al manejar la variable amb1 :(" << endl;
        Cout << "Perdiste 8 puntos" << endl;
    }
    Cout << "Punteo = " + punteo << endl;
    Cout << "======================================" << endl;
}
void Aritmeticas(){
    //suma de std::strings con caracteres
    /* SALIDA ESPERADA
    ==============Aritmeticas=============
    Hola COMPI
    El valor de n1 = 52.1
    El valor de n3 = 70.0
    -Operaciones Basicas: valor esperado:   a)62   b)0   c)-19   d)256   resultados>
    a) 62
    b) 0
    c) -19
    d) 256
    ======================================
    */
    Cout << "==============Aritmeticas=============" << endl;
    std::string art1 = "Hola " + 'C' + "" + 'O' + "" + 'M' + "" + 'P' + "" + 'I';
    Cout << art1 << endl;
    if (art1 == "Hola COMPI") {
        punteo = punteo + 6;
    } else {
        Cout << "Perdiste 6 puntos en suma de cadena y caracter :c" << endl;
    }

    double n1 = 0.0 + true + true + 1 + 0.1 + '1';
    Cout << "El valor de n1 = " + n1 << endl;
    if (n1 == 52.1) {
        punteo = punteo + 6;
    } else {
        Cout << "Perdiste 6 puntos en suma de enteros boolos y caracteres :c" << endl;
    }

    int n2 = '2' - 1 - '1';
    if (n2 == 0) {
        punteo = punteo + 5;
    } else {
        Cout << "Perdiste 5 puntos en la resta de caracteres :c" << endl;
    }

    double n4 = (5750 * 2) - 11800 + 1.0;
    double n3 = (((3 * 3) + 4) - 80 + 40.00 * 2 + 358.50 - (29 / 14.50)) - (0.50) + n4;
    Cout << "El valor de n3 = " + n3 << endl;
    if (n3 == 70.0) {
        punteo = punteo + 6;
    }
    else {
        Cout << "Perdiste 6 puntos :c " << endl;
    }

    operacionesBasicas();
    operacionesAvanzadas();
    Cout << "Punteo = " + punteo << endl;
    Cout << "======================================" << endl;

}
void operacionesBasicas(){
    Cout << "Operaciones Aritmeticas 1: valor esperado:   a)62   b)0   c)-19   d)256   resultados>" << endl;
    double a;
    a = (20 - 10 + 8 / 2 * 3 + 10 - 10 - 10 + 50);
    double b;
    b = (50 / 50 * 50 + 50 - 100 + 100 - 100);
    double c;
    c = (100 / 20 * 9 - 78 + 6 - 7 + 8 - 7 + 7 * 1 * 2 * 3 / 3);
    double d;
    d = pow(2, 20 / 5 * 2);
    Cout << "a) " + a << endl;
    Cout << "b) " + b << endl;
    Cout << "c) " + c << endl;
    Cout << "d) " + d << endl;
    if (a == 62 && b == 0 && c == -19 && d == 256) {
        Cout << "Operaciones aritmeticas 1 bien :D" << endl;
        punteo = punteo + 8;
    } else {
        Cout << "Error para las operaciones basicas :(" << endl;
    }
}
void operacionesAvanzadas(){
    double aritmetica1 = 2.0;
    double aritmetica2 = -10.0;
    Cout << "Operaciones Aritmeticas 2: valor esperado>-20  41 \nresultado>" << endl;
    double aritmetica3 = aritmetica2 * aritmetica1;
    Cout << aritmetica3 + "" << endl;
    aritmetica1 = aritmetica3 / aritmetica1 + pow(50, 2) / 50 + 50 * 2 - 100 + 100 / 100 - 0;
    Cout << aritmetica1 + "" << endl;
    if (aritmetica3 == -20 && aritmetica1 == 41) {
        Cout << "Operaciones aritmeticas 2 bien :D" << endl;
        punteo = punteo + 8;
    } else {
        Cout << "Error Operaciones Aritmeticas" << endl;
    }
}
void Logicas(){
    Cout << "==============Logicas1=============" << endl;
    if (!!!!!!!!!!!!!!!!!!true) {
        punteo = punteo + 1;
        Cout << "Bien primera condicion:)" << endl;
    } else {
        Cout << "Perdiste 1 punto :c" << endl;
    }

    if (((true && true) || ((false && false) )) || (!true)  ) {
        punteo = punteo + 5;
        Cout << "Bien segunda condicion:)" << endl;
    } else {
        Cout << "Perdiste 5 puntos :c" << endl;
    }
    Cout << "======================================" << endl;
    Logicas2();
    Cout << "--------------------------------------" << endl;
    Cout << "Punteo = " + punteo << endl;
    Cout << "--------------------------------------" << endl;
}

void Logicas2(){
    int n0 = 16;
    Cout << "==============Logicas2=============" << endl;
    
    double n1;
    n1 = n0 / 16;
    n1 = n1 + true;
    bool condicion1 = n1 != 2; //esto es falso
    bool condicion2 = 0 == n1; //falso
    bool condicion3 = !true; //falso

    if (!(!(!(condicion1 || condicion2) || condicion3))) {
        Cout << "Nots y Ors correctos" << endl;
        punteo = punteo + 10;
    } else {
        Cout << "No Funciona nots y ands :(" << endl;
    }
    
    Cout << "======================================" << endl;

    Logicas3(n0);
}

void Logicas3(int n0){
    
    Cout << "==============Logicas3=============" << endl;

    bool condicion1 = false; //esto es falso
    bool condicion2 = false; //falso
    bool condicion3 = true; //verdadero

    if (!(!(!(condicion1 || condicion2) || condicion3))) {
        Cout << "NORS correctos" << endl;
        punteo = punteo + 8;
    } else {
        Cout << "No Funcionan NORS :(" << endl;
    }

    Cout << "======================================" << endl;
}

void Relacionales(){
    int n0 = 34;
    int n1 = 16;

    relaciones1(n0);
    relaciones2(n1);
}

void relaciones1(int salida)
{

    Cout << "==============relacionales1=============" << endl;
    double n0 = salida + 0.0;
    if (n0 < 34.44) {
        salida = salida + 15;
        if (salida > 44) {
            salida++;

        }
    }
    else {
        salida = 1;
    }

    if (salida != 1) {
        if (salida == 50) {
            Cout << "Salida Correcta Relacionales 1!" << endl;
            punteo = punteo + 10;
        }
        else {
            Cout << "Salida incorrecta!!" << endl;
        }
    }
    else {
        Cout << "Salida incorrecta!!" << endl;
    }
    Cout << "======================================" << endl;
}

void relaciones2(int n0){
    Cout << "vas bien, animo :D" << endl;

    Cout << "============Relacionales2=============" << endl;


    if(10 - 15 >= 0 && 44.44 == 44.44)
    {

        Cout << "Salida incorrecta primer Si relacionales2!!" << endl;

    }

    else {

        if(15 + 8 == 22 - 10 + 5 * 3 - 4 && 13 * 0 > -1)

        {

            if(10.0 != 11.0 - 1.01)

            {

                Cout << "Salida CORRECTA en relacionales2!!" << endl;
                punteo = punteo + 5;
            }

            else {

                Cout << "Salida incorrecta segundo Si relacionales 2!!" << endl;

            }



        }

        else {

            if(1 == 1)

            {

                Cout << "Salida incorrecta relacionales 2 3er si !!" << endl;

            }

            else {

                Cout << "Salida incorrecta relacionales 2 Sino3er si !!" << endl;

            }



        }



    }
    Cout << "======================================" << endl;

}