execute inicial();

int numero = 6;

void inicial() {
    if(numero % 2 == 0) {
        cout << factorial(numero) << endl;
    } else {
        int factorial = 1;
        for(int i = 1; i <= numero; i ++) {
            factoria = factorial * i;
        }
        cout << factorial << endl;
    }
    cout << numero + (numero % 2 == 0 ? " es par" : " es impar") << endl;
}

int factorial(int n) {
    if(n > 0) {
        return n * factorial(n - 1);
    }
    return 1;
}