execute hanoi(5, "A", "B", "C");

int c = 1;

void hanoi(int n, std::string origen, std::string medio, std::string destino){
    if(n == 1) {
        cout << (c > 9 ? c : " " + c) + ") Mover disco 1: desde " + origen + " hasta " + destino << endl;
        c ++;
        return;
    }
    hanoi(n - 1, origen, destino, medio);
    cout << (c > 9 ? c : " " + c) + ") Mover disco " + n + ": desde " + origen + " hasta " + destino << endl;
    c ++;
    hanoi(n - 1, medio, origen, destino);
}

/*

SALIDA:

 1) Mover disco 1: desde A hasta C
 2) Mover disco 2: desde A hasta B
 3) Mover disco 1: desde C hasta B
 4) Mover disco 3: desde A hasta C
 5) Mover disco 1: desde B hasta A
 6) Mover disco 2: desde B hasta C
 7) Mover disco 1: desde A hasta C
 8) Mover disco 4: desde A hasta B
 9) Mover disco 1: desde C hasta B
10) Mover disco 2: desde C hasta A
11) Mover disco 1: desde B hasta A
12) Mover disco 3: desde C hasta B
13) Mover disco 1: desde A hasta C
14) Mover disco 2: desde A hasta B
15) Mover disco 1: desde C hasta B
16) Mover disco 5: desde A hasta C
17) Mover disco 1: desde B hasta A
18) Mover disco 2: desde B hasta C
19) Mover disco 1: desde A hasta C
20) Mover disco 3: desde B hasta A
21) Mover disco 1: desde C hasta B
22) Mover disco 2: desde C hasta A
23) Mover disco 1: desde B hasta A
24) Mover disco 4: desde B hasta C
25) Mover disco 1: desde A hasta C
26) Mover disco 2: desde A hasta B
27) Mover disco 1: desde C hasta B
28) Mover disco 3: desde A hasta C
29) Mover disco 1: desde B hasta A
30) Mover disco 2: desde B hasta C
31) Mover disco 1: desde A hasta C

*/