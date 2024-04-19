void funcionesEspecialesYNativas(){
    cout << "**************SECCION DE CASTEOS***************" << endl;
    Casteos();
    cout << "************FIN DE SECCION DE CASTEOS*************" << endl;
    cout << "**************SECCION DE NATIVAS***************" << endl;
    FuncionesNativas();
    cout << "************FIN DE SECCION DE NATIVAS*************" << endl;
}

void funcionesNativas() {
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
    cout << "tamaño: "+cadena.length() << endl;
    cout << "------------------TOSTRING-------------------" << endl;
    int numero=105;
    cout << "tipo: "+typeof(numero) << endl;
    cout << "tipo: "+typeof(std::toString(numero)) << endl;
}

void Casteos(){
    cout << "int a "+typeof((double) 1789) << endl;
    cout << "double a "+ typeof((int) 258.2) << endl;
    cout << "char a "+ typeof((double) 'F') << endl;
    cout << "int a "+typeof((char) 98) << endl;
    cout << "double a "+typeof(std::toString(2589.97)) << endl;
}

execute funcionesEspecialesYNativas();

/*

SALIDA:

**************SECCION DE CASTEOS***************
int a double
double a int
char a double
int a char
double a std::string
************FIN DE SECCION DE CASTEOS*************
**************SECCION DE NATIVAS***************
------------------TOLOWER-------------------
SIN TOLOWER
con tolower
------------------TOUPPER-------------------
sin toupper
CON TOUPPER
------------------ROUND-------------------
sin round: 26.5
con round 27
sin round: 26.4
con round 26
-----------------TYPEOF--------------------
tipo: std::string
tipo: int
tipo: double
tipo: char
tipo: boolean
------------------LENGTH-------------------
tamaño: 14
------------------TOSTRING-------------------
tipo: int
tipo: std::string
************FIN DE SECCION DE NATIVAS*************

*/