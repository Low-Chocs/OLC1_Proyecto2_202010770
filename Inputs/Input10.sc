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

    vec2[2][2] = "Hola";

    for(int i = 0; i < vec2.length(); i ++) {
        for(int j = 0; j < vec2[i].length(); j ++) {
            cout << '\"' + vec2[i][j] + '\"';
            if(j < vec2[i].length() - 1) {
                cout << " ";
            }
        }
        cout << "\n";
    }

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