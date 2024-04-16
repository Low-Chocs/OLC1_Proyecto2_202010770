execute inicial();

void inicial() {
    cout << valorEntero(120) << endl;
    cout << valorDecimal(3.1416) << endl;
    cout << valorString("Hola Mundo") << endl;
    cout << valorChar('R') << endl;
    cout << valorBool(true) << endl;
    cout << valorBool(false) << endl;
}

int valorEntero(int n) {
    return n;
}

double valorDecimal(double n) {
    return n;
}

std::string valorString(std::string n) {
    return n;
}

char valorChar(char n) {
    return n;
}

bool valorBool(bool n) {
    return n;
}