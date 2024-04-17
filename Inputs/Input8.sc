execute hanoi(7, "A", "B", "C");

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