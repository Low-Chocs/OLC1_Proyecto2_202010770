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

/*

SALIDA:

0,0  0,1  0,2  0,3  0,4
1,0  1,1  1,2  1,3  1,4
2,0  2,1  2,2  2,3  2,4
3,0  3,1  3,2  3,3  3,4
4,0  4,1  4,2  4,3  4,4

0,0  0,1  0,2  0,3  0,4
1,0  1,1  1,2  1,3  1,4
2,0  2,1  2,2  2,3  2,4
3,0  3,1  3,2  3,3  3,4
4,0  4,1  4,2  4,3  4,4

0,0  0,1  0,2  0,3  0,4
1,0  1,1  1,2  1,3  1,4
2,0  2,1  2,2  2,3  2,4
3,0  3,1  3,2  3,3  3,4
4,0  4,1  4,2  4,3  4,4

*/