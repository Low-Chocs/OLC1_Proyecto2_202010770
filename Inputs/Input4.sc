execute inicial();

int a = 3;
int b = 4;
int c = 5;

void inicial() {
    int d = 6;
    int e = 7;
    cout << "factorial(" + d + ") = " + factorial(d) << endl;
    cout << "fibonacci(" + e + ") = " + fibonacci(e) + "\n";
    cout << "par(" + c + ") = " + par(c) + "\n";
    cout << "ackermann(" + a +", " + b + ") = " + ackermann(a, b) + "\n";
}


int factorial(int n) {
    return n > 0 ? n * factorial(n - 1) : 1;
}

int fibonacci(int n) {
    return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

bool par(int n) {
    return n == 0 ? true : impar(n - 1);
}

bool impar(int n) {
    return n == 0 ? false : par(n - 1);
}

int ackermann(int m, int n) {
    return m == 0 ? n + 1 : (n == 0 ? ackermann(m - 1, 1) : ackermann(m - 1, ackermann(m, n - 1)));
}

/*

SALIDA:

factorial(6) = 720
fibonacci(7) = 13
par(5) = false
ackermann(3, 4) = 125

*/