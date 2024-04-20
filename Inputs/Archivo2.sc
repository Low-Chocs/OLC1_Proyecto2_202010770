void FactorialIterativo(int n2){
    cout << "==============Para Calificar Ciclos=============" << endl;
    cout << "----------------CICLO WHILE Y FOR---------------" << endl;

    int numeroFactorial = n2;
    while (numeroFactorial > -1) {
        mostrarFactorial(numeroFactorial);
        numeroFactorial--;
    }
    cout << "------------------------------------------------" << endl;
    SentenciasAnidadas();
    cout << "======================================" << endl;
}

execute Principal(7);

void Principal(int start){
    cout << "***************ARCHIVO 2**************" << endl;
    cout << "VALOR: 15 PTS" << endl;
    FactorialIterativo(start);
    RecursividadBasica();
    multiPlicacionPorSumas(7,9);
    cout << "**************************************" << endl;
}


void mostrarFactorial(int n2){
    int fact = 1;
    std::string cadena1 = "El factorial de: " + n2 + " = ";
    if (n2 != 0) {
        for (int i = n2; i > 0; i--) {
            fact = fact * i;
            cadena1 = cadena1 + i;
            if (i > 1) {
                cadena1 = cadena1 + " * ";

            } else {
                cadena1 = cadena1 + " = ";
            }
        }
    }
    cadena1 = cadena1 + fact;
    cout << cadena1 << endl;
}

void SentenciasAnidadas(){
    cout << "-----------------CICLO DO WHILE-----------------" << endl;
    int numero1 = 0; //cambiar numero para ir mostrando figuras
    cout << "-------------------SWITCH CASE------------------" << endl;
    do {
        switch (numero1) {
            case 0:
                figura0(10);
                break;
            case 1:
                figura1(10);
                break;
            case 2:
                figura2();
                cout << "" << endl;
                break;
            case 3:
                ciclosContinueBreak();
                cout << "" << endl;
                break;
            default:
                cout << "Esto se va a imprimir 2 veces :3" << endl;
        }
        numero1 = numero1 + 1;
    } while (numero1 < 6);
    cout << "------------------------------------------------" << endl;
}

void figura0(int numero){
    cout << "-----------------WHILE ANIDADO------------------" << endl;
    int i = 0;
    while (i < numero) {
        int j = 0;
        int numeroMostrar = 1;
        std::string unaFila = "";
        while (j <= i) {
            unaFila = unaFila + " " + numeroMostrar;
            numeroMostrar = numeroMostrar + 1;
            j = j + 1;
        }
        cout << unaFila << endl;
        i = i + 1;
    }
    cout << "Si la figura es un triangulo de numeros ya salio :3" << endl;
    cout << "------------------------------------------------" << endl;
}

void figura1(int n){

    std::string cadenaFigura = "";
        double i; 
        i=-3*n/2;
        //iniciando dibujo
        while(i<=n){
            cadenaFigura = "";
            double j; 
            j=-3*n/2;
            while(j<=3*n){
                double absolutoi;
                absolutoi = i;
                double absolutoj;
                absolutoj = j;
                if(i < 0)
                {
                    absolutoi = i * -1;
                }
                if(j < 0)
                {
                    absolutoj = j * -1;
                }
                if((absolutoi + absolutoj < n)
                        || ((-n / 2 - i) * (-n / 2 - i) + (n / 2 - j) * (n / 2 - j) <= n * n / 2)
                        || ((-n / 2 - i) * (-n / 2 - i) + (-n / 2 - j) * (-n / 2 - j) <= n * n / 2)) {
                    cadenaFigura = cadenaFigura + "* ";
                }
                else
                {
                    cadenaFigura = cadenaFigura + ". ";
                }
                j=j+1;
            }
            cout << cadenaFigura << endl;
            i=i+1;
        }
        cout << "Si la figura es un coraz?n, eres un crack :3" << endl;
    
}

void figura2(){
    std::string cadenaFigura = "";
    std::string c = "* ";
    std::string b = "  ";
    int altura = 10;
    int ancho = 1;
    for (int i = 0; i < altura / 4; i++) {
        for (int k = 0; k < altura - i; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i * 2 + ancho; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int i2 = 0; i2 < altura / 4; i2++) {
        for (int k = 0; k < (altura - i2) - 2; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i2 * 2 + 5; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int i3 = 0; i3 < altura / 4; i3++) {
        for (int k = 0; k < (altura - i3) - 4; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i3 * 2 + 9; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }

    cadenaFigura = "";
    for (int i4 = 0; i4 < altura / 4; i4++) {
        for (int k = 0; k < (altura - i4) - 6; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < i4 * 2 + 13; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }
    cadenaFigura = "";
    for (int i5 = 0; i5 < altura / 4; i5++) {
        for (int k = 0; k < altura - 2; k++) {
            cadenaFigura = cadenaFigura + b;
        }
        for (int j = 0; j < 5; j++) {
            cadenaFigura = cadenaFigura + c;
        }

        cout << cadenaFigura << endl;
        cadenaFigura = "";
    }

    cout << "Si la figura es un Arbol eres un master <3" << endl;

}

void ciclosContinueBreak(){
    cout << "============Validar Continue y Break===========" << endl;
    int i = 0;

    while (i < 10) { //repetir 10 veces
        int j = i;
        if (i != 7 && i != 5) {
            while (!(j <= 0)) {
                j = j - 2;
            }
            if (j == 0) {
                cout << "El numero: " + i + " es par" << endl;
            } else if (j != 0) {
                cout << "El numero: " + i + " es impar" << endl;

            }
        } else {
            if (i == 7) {

                cout << "Hay un break para el numero 7 :3" << endl;
                break;
                cout << "Esto no deberia imprimirse por el continue :/" << endl;
            } else if (i == 5) {
                cout << "me voy a saltar el 5 porque hay un continue :3" << endl;
                i = i + 1;
                continue;
            }
        }
        i = i + 1;

    }
    if (i == 7) {
        cout << "Si el ultimo numero impreso es un 7, lo has hecho bien :D" << endl;

    } else {
        cout << "No funciona tu Break o Continue, perdiste puntos :(" << endl;
    }
    cout << "======================================" << endl;
    //h=55$

}

double r_toRadians;
double r_sine;

void toRadians(double angle){
    r_toRadians = angle * 3.141592653589793 / 180;
}

void sine(double x){
    double sin = 0.0;
    int fact;
    for (int i = 1; i <= 10; i++) {
        fact = 1;
        for (int j = 1; j <= 2 * i - 1; j++) {
            fact = fact * j;
        }
        sin = sin + (pow(x, 2 * i - 1) / fact);

    }
    r_sine = sin;
}

void drawTree(double x1, double y1, double angle, int depth) {
    if (depth != 0) {
        toRadians(angle);
        sine(3.141592653589793 / 2 + r_toRadians);
        double x2 = x1 + (r_sine * depth * 10.0);
        toRadians(angle);
        sine(r_toRadians);
        double y2 = y1 + (r_sine * depth * 10.0);
        cout << x1 + " " + y1 + " " + x2 + " " + y2 + "" << endl;
        drawTree(x2, y2, angle - 20, depth - 1);
        drawTree(x2, y2, angle + 20, depth - 1);
    }

}

void RecursividadBasica() {
    cout << "===============RECURSIVIDAD BASICA=================" << endl;
    drawTree(250.0, 500.0, -90.0, 4);
    cout << "======================= FIN =======================" << endl;
}

void multiPlicacionPorSumas(int m, int n){
    cout << "===============MULTIPLICACION POR SUMAS==============" << endl;
    int mul = 0;
    //Establecemos condici?n de que (m y n) no sean cero.
    if ((m != 0) && (n != 0)) {
        //Utilizamos un for para ejecutar el ciclo de sumas.
        for (int i = 0; i < n; i++) {
            // += representa (mul = mul + m), solo acorta lo anterior.
            mul = mul + m;
        }
    }
    //Retornamos el resultado.
    //Si m o n es cero, retornar? cero.
    cout << m + "x" + n + " = " + mul << endl;
    cout << "========================= FIN =======================" << endl;
}

/*

SALIDA:

***************ARCHIVO 2**************
VALOR: 15 PTS
==============Para Calificar Ciclos=============
----------------CICLO WHILE Y FOR---------------
El factorial de: 7 = 7 * 6 * 5 * 4 * 3 * 2 * 1 = 5040
El factorial de: 6 = 6 * 5 * 4 * 3 * 2 * 1 = 720
El factorial de: 5 = 5 * 4 * 3 * 2 * 1 = 120
El factorial de: 4 = 4 * 3 * 2 * 1 = 24
El factorial de: 3 = 3 * 2 * 1 = 6
El factorial de: 2 = 2 * 1 = 2
El factorial de: 1 = 1 = 1
El factorial de: 0 = 1
------------------------------------------------
-----------------CICLO DO WHILE-----------------
-------------------SWITCH CASE------------------
-----------------WHILE ANIDADO------------------
 1
 1 2
 1 2 3
 1 2 3 4
 1 2 3 4 5
 1 2 3 4 5 6
 1 2 3 4 5 6 7
 1 2 3 4 5 6 7 8
 1 2 3 4 5 6 7 8 9
 1 2 3 4 5 6 7 8 9 10
Si la figura es un triangulo de numeros ya salio :3
------------------------------------------------
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . * * * . . . . . . . * * * . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . * * * * * * * . . . * * * * * * * . . . . . . . . . . . . . . . . . . . . . .
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . .
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . .
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . .
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . .
. . . * * * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . .
. . . * * * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . .
. . . * * * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . .
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . .
. . . . * * * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . .
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . .
. . . . . * * * * * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . .
. . . . . . . * * * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . * * * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . * * * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . * * * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . * * * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . * * * * * * * . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . * * * * * . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . * * * . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . * . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
Si la figura es un coraz?n, eres un crack :3
                    *
                  * * *
                * * * * *
                * * * * *
              * * * * * * *
            * * * * * * * * *
            * * * * * * * * *
          * * * * * * * * * * *
        * * * * * * * * * * * * *
        * * * * * * * * * * * * *
      * * * * * * * * * * * * * * *
    * * * * * * * * * * * * * * * * *
                * * * * *
                * * * * *
                * * * * *
Si la figura es un Arbol eres un master <3

============Validar Continue y Break===========
El numero: 0 es par
El numero: 1 es impar
El numero: 2 es par
El numero: 3 es impar
El numero: 4 es par
me voy a saltar el 5 porque hay un continue :3
El numero: 6 es par
Hay un break para el numero 7 :3
Si el ultimo numero impreso es un 7, lo has hecho bien :D
======================================

Esto se va a imprimir 2 veces :3
Esto se va a imprimir 2 veces :3
------------------------------------------------
======================================
===============RECURSIVIDAD BASICA=================
250 500 250 407.9480439077082
250 407.9480439077082 239.31406202799965 307.8471746908033
239.31406202799965 307.8471746908033 224.18926216484266 212.19110133437974
224.18926216484266 212.19110133437974 211.6955916596029 144.01486829323312
224.18926216484266 212.19110133437974 220.62728284084255 178.82414492874477
239.31406202799965 307.8471746908033 239.31406202799965 261.8211966446574
239.31406202799965 261.8211966446574 235.75208270399955 228.45424023902243
239.31406202799965 261.8211966446574 242.87604135199976 246.32952396143438
250 407.9480439077082 260.6859379720004 361.47302585803914
260.6859379720004 361.47302585803914 260.6859379720004 315.44704781189324
260.6859379720004 315.44704781189324 257.12395864800027 282.08009140625825
260.6859379720004 315.44704781189324 264.2479172960005 299.9553751286702
260.6859379720004 361.47302585803914 275.81073783515734 341.71859712289154
275.81073783515734 341.71859712289154 279.37271715915745 326.2269244396685
275.81073783515734 341.71859712289154 288.3044083403971 336.24006238401114
======================= FIN =======================
===============MULTIPLICACION POR SUMAS==============
7x9 = 63
========================= FIN =======================
**************************************

*/