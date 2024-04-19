execute arreglos();

void arreglos() {
    int vec1[] = new int[5];
    std::string vec2[][] = new std::string[4][3];
    std::string cadena = "HOLA MUNDO";
    char vec3[] = cadena.c_str();
    bool vec4[] = [true, false, true, false, false];
    char vec5[][] = [['h', 'o', 'l', 'a'], "HOLA".c_str()];

    vec3[4] = '_';

    cout << "CHR: ASCII" << endl;
    for(int i = 0; i < vec3.length(); i ++) {
        cout << '\"' + vec3[i] + '\"' + ": " + (int) vec3[i] << endl;
    }
    cout << "\n";

    for(int i = 0; i < vec5.length(); i ++) {
        for(int j = 0; j < vec5[i].length(); j ++) {
            cout << vec5[i][j];
            if(j < vec5[i].length() - 1) {
                cout << " - ";
            }
        }
        cout << "\n";
    }
    cout << "\n";

    vec2[0][0] = toUpper("Hola");
    vec2[0][1] = toLower("hola");
    vec2[0][2] = toUpper("Hola");
    vec2[1][0] = toLower("Hola");
    vec2[1][1] = toUpper("hola");
    vec2[1][2] = toLower("Hola");
    vec2[2][0] = toUpper("Hola");
    vec2[2][1] = toLower("hola");
    vec2[2][2] = toUpper("Hola");
    vec2[3][0] = toLower("Hola");
    vec2[3][1] = toUpper("hola");
    vec2[3][2] = toLower("Hola");

    for(int i = 0; i < vec2.length(); i ++) {
        for(int j = 0; j < vec2[i].length(); j ++) {
            cout << (i == j ? '\"' : ' ') + vec2[i][j] + (i == j ? '\"' : ' ');
            if(j < vec2[i].length() - 1) {
                cout << " ";
            }
        }
        cout << "\n";
    }
    cout << "\n";

    vec1[0] = 82;
    vec1[1] = 10;
    vec1[2] = 13;
    vec1[3] = 50;
    vec1[4] = 41;

    cout << "VEC1 DESORDENADO" << endl;
    cout << "[";
    for(int i = 0; i < vec1.length(); i ++) {
        cout << vec1[i];
        if(i < vec1.length() - 1) {
            cout << ", ";
        }
    }
    cout << "]\n" << endl;

    int tmp;
    for(int i = 1; vec1.length() > 1 && i < vec1.length(); i ++) {
        for(int j = i; j >= 1; j --) {
            if(vec1[j] < vec1[j - 1]) {
                tmp = vec1[j];
                vec1[j] = vec1[j - 1];
                vec1[j - 1] = tmp;
                continue;
            }
            break;
        }
    }

    cout << "VEC1 ORDENADO" << endl;
    cout << "[";
    for(int i = 0; i < vec1.length(); i ++) {
        cout << vec1[i];
        if(i < vec1.length() - 1) {
            cout << ", ";
        }
    }
    cout << "]" << endl;
}

/*

SALIDA:

CHR: ASCII
"H": 72
"O": 79
"L": 76
"A": 65
"_": 95
"M": 77
"U": 85
"N": 78
"D": 68
"O": 79

h - o - l - a
H - O - L - A

"HOLA"  hola   HOLA
 hola  "HOLA"  hola
 HOLA   hola  "HOLA"
 hola   HOLA   hola

VEC1 DESORDENADO
[82, 10, 13, 50, 41]

VEC1 ORDENADO
[10, 13, 41, 50, 82]

*/