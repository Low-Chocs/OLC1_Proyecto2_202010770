## Precedencia de Operadores
| Nivel | Asociatividad | Token |
| -- | ----- | ------ |
| 10 | Izquierda  | `?` `:` |
| 9 | Izquierda  | `\|\|` |
| 8 | Izquierda  | `&&` |
| 7 | Derecha |  `!` |
| 6 | Izquierda  | `==` `!=` |
| 5 | Izquierda  | `<` `<=` `>` `>=` |
| 4 | Izquierda  | `+` `-` |
| 3 | Izquierda  | `*` `/` `%` |
| 2 | No Asociativa  | `pow` |
| 1 | Derecha  | `T_uminus` |
| 0 | Izquierda  | `.` `[` `]` `(` `)` |

## Gramática Libre De Contexto
```html
<INICIO> ::=
    <INSTRUCCIONESGLOBALES> <EOF> |
    <EOF>                         ;

<INSTRUCCIONESGLOBALES> ::=
    <INSTRUCCIONESGLOBALES> <INSTRUCCIONGLOBAL> |
    <INSTRUCCIONGLOBAL>                       ;

<INSTRUCCIONGLOBAL> ::=
    <DECLARACION>    ';' |
    <VECTOR>         ';' |
    <FUNCION>            |
    <LLAMADAEXECUTE> ';' ;

<INSTRUCCIONES> ::=
    <INSTRUCCIONES> <INSTRUCCION> |
    <INSTRUCCION>                 ;

<INSTRUCCION> ::=
    <DECLARACION>    ';' |
    <INCDEC>         ';' |
    <VECTOR>         ';' |
    <ASIGNACION>     ';' |
    <IF>                 |
    <SWITCH>             |
    <BUCLES>             |
    <TRANSFERENCIA>  ';' |
    <PRINT>          ';' |
    <LLAMADAFUNCION> ';' ;

<DECLARACION> ::=
    <TIPO> <IDENTIFICADORES> '=' <EXPRESION> |
    <TIPO> <IDENTIFICADORES>                 ;

<IDENTIFICADORES> ::=
    <IDENTIFICADORES> ',' T_id |
    T_id                       ;

<INCDEC> ::=
    T_id '++' |
    T_id '--' ;

<VECTOR> ::=
    <TIPO> T_id '[' ']' '[' ']' '=' 'new' <TIPO> '[' <EXPRESION> ']' '[' <EXPRESION> ']' |
    <TIPO> T_id '[' ']' '=' 'new' <TIPO> '[' <EXPRESION> ']'                             |
    <TIPO> T_id '[' ']' '[' ']' '=' <VECTORES>                                           |
    <TIPO> T_id '[' ']' '=' <VALOR>                                                      ;

<VECTORES> ::=
    '[' <VALORES> ']' ;

<VALORES> ::=
    <VALORES> ',' <VALOR> |
    <VALOR>               ;

<VALOR> ::=
    '[' <EXPRESIONES> ']' |
    <EXPRESION>           ;

<ASIGNACION> ::=
    T_id '[' <EXPRESION> ']' '[' <EXPRESION> ']' '=' <EXPRESION> |
    T_id '[' <EXPRESION> ']' '=' <EXPRESION>                     |
    T_id '=' <EXPRESION>                                         ;

<IF> ::=
    'if' '(' <EXPRESION> ')' <BLOQUE>                 |
    'if' '(' <EXPRESION> ')' <BLOQUE> 'else' <BLOQUE> |
    'if' '(' <EXPRESION> ')' <BLOQUE> 'else' <IF>     ;

<SWITCH> ::=
    'switch' '(' <EXPRESION> ')' '{' <BLOQUESWITCH> '}' ;

<BLOQUESWITCH> ::=
    <CASOS> <DEFAULT> |
    <CASOS>           |
    <DEFAULT>         ;

<CASOS> ::=
    <CASOS> <CASO> |
    <CASO>         ;

<CASO> ::=
    'case' <EXPRESION> ':' <INSTRUCCIONES> |
    'case' <EXPRESION> ':'                 ;

<DEFAULT> ::=
    'default' ':' <INSTRUCCIONES> |
    'default' ':'                 ;

<BUCLES> ::=
    'while' '(' <EXPRESION> ')' <BLOQUE>          |
    'do' <BLOQUE> 'while' '(' <EXPRESION> ')' ';' |
    'for' '(' <FORARGS> ')' <BLOQUE>              ;

<FORARGS> ::=
    <INICIALIZACION> ';' <EXPRESION> ';' <ACTUALIZACION> ;

<INICIALIZACION> ::=
    <TIPO> T_id '=' <EXPRESION> |
    <ASIGNACION>                ;

<ACTUALIZACION> ::=
    <INCDEC>     |
    <ASIGNACION> ;

<TRANSFERENCIA> ::=
    'break'              |
    'continue'           |
    'return'             |
    'return' <EXPRESION> ;

<FUNCION> ::=
    <TIPO>   T_id '(' <PARAMETROS> ')' <BLOQUE> |
    'void' T_id '(' <PARAMETROS> ')' <BLOQUE>   |
    <TIPO>   T_id '(' ')' <BLOQUE>              |
    'void' T_id '(' ')' <BLOQUE>                ;

<PARAMETROS> ::=
    <PARAMETROS> ',' <PARAMETRO> |
    <PARAMETRO>                  ;

<PARAMETRO> ::=
    <TIPO> T_id '[' ']' '[' ']' |
    <TIPO> T_id '[' ']'         |
    <TIPO> T_id                 ;

<BLOQUE> ::=
    '{' <INSTRUCCIONES> '}' |
    '{' '}'                 ;

<LLAMADAFUNCION> ::=
    T_id '(' <EXPRESIONES> ')' |
    T_id '(' ')'               ;

<PRINT> ::=
    'cout' '<<' <EXPRESION> '<<' 'endl' |
    'cout' '<<' <EXPRESION>             ;

<LLAMADAEXECUTE> ::=
    'execute' <LLAMADAFUNCION> ;

<TIPO> ::=
    'int'         |
    'double'      |
    'bool'        |
    'std::string' |
    'char'        ;

<EXPRESIONES> ::=
    <EXPRESIONES> ',' <EXPRESION> |
    <EXPRESION>                   ;

<EXPRESION> ::=
    <ARITMETICOS>       |
    <RELACIONALES>      |
    <LOGICAS>           |
    <TERNARIO>          |
    <CASTEO>            |
    <ACCESOVECTOR>      |
    <FUNCIONESNATIVAS>  |
    <LLAMADAFUNCION>    |
    T_id                |
    T_int               |
    T_double            |
    T_string            |
    T_char              |
    'true'              |
    'false'             |
    '(' <EXPRESION> ')' ;

<ARITMETICOS> ::=
    <EXPRESION> '+' <EXPRESION>               |
    <EXPRESION> '-' <EXPRESION>               |
    <EXPRESION> '*' <EXPRESION>               |
    <EXPRESION> '/' <EXPRESION>               |
    <EXPRESION> '%' <EXPRESION>               |
    '-' <EXPRESION> %prec T_uminus            |
    'pow' '(' <EXPRESION> ',' <EXPRESION> ')' ;

<RELACIONALES> ::=
    <EXPRESION> '==' <EXPRESION> |
    <EXPRESION> '!=' <EXPRESION> |
    <EXPRESION> '<=' <EXPRESION> |
    <EXPRESION> '>=' <EXPRESION> |
    <EXPRESION> '<'  <EXPRESION> |
    <EXPRESION> '>'  <EXPRESION> ;

<LOGICAS> ::=
    <EXPRESION> '||' <EXPRESION> |
    <EXPRESION> '&&' <EXPRESION> |
    '!' <EXPRESION>              ;

<TERNARIO> ::=
    <EXPRESION> '?' <EXPRESION> ':' <EXPRESION> ;

<CASTEO> ::=
    '(' <TIPO> ')' <EXPRESION> ;

<ACCESOVECTOR> ::=
    T_id '[' <EXPRESION> ']' '[' <EXPRESION> ']' |
    T_id '[' <EXPRESION> ']'                     ;

<FUNCIONESNATIVAS> ::=
    'toLower'       '(' <EXPRESION> ')'  |
    'toUpper'       '(' <EXPRESION> ')'  |
    'round'         '(' <EXPRESION> ')'  |
    <EXPRESION>     '.' 'length' '(' ')' |
    'typeOf'        '(' <EXPRESION> ')'  |
    'std::toString' '(' <EXPRESION> ')'  |
    <EXPRESION>     '.' 'c_str'  '(' ')' ;
```