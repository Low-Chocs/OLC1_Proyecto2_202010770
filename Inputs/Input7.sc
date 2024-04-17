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
    if(n > 0) {
        return n * factorial(n - 1);
    }
    return 1;
}

int fibonacci(int n) {
    if(n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

bool par(int n) {
    if(n == 0) {
        return true;
    }
    return impar(n - 1);
}

bool impar(int n) {
    if(n == 0) {
        return false;
    }
    return par(n - 1);
}

int ackermann(int m, int n) {
    if(m == 0) {
        return n + 1;
    }
    if(n == 0) {
        return ackermann(m - 1, 1);
    }
    return ackermann(m - 1, ackermann(m, n - 1));
}

/*

RESULTADO

factorial(6) = 720
fibonacci(7) = 13
par(5) = false
ackermann(3, 4) = 125

*/