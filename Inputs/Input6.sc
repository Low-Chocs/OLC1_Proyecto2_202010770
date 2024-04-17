execute bucles();

void bucles() {
    bucleFor();
    cout << "\n";
    bucleWhile();
    cout << "\n";
    bucleDoWhile();
}

void bucleFor() {
    int j;
    for(int i = 0; i < 5; i ++) {
        for(j = 0; j < 5; j ++) {
            cout << I + "," + j + "  ";
        }
        cout << "\n";
    }
}

void bucleWhile() {
    int i, j = 0;
    while(i < 5) {
        j = 0;
        while(j < 5) {
            cout << I + "," + j + "  ";
            j ++;
        }
        cout << "\n";
        i ++;
    }
}

void bucleDoWhile() {
    int i, j = 0;
    do {
        j = 0;
        while(j < 5) {
            cout << I + "," + j + "  ";
            j ++;
        }
        cout << "\n";
        i ++;
    } while(i < 5);
}

hola mundo