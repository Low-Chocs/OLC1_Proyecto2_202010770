// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares
id       [a-zA-Z_][a-zA-Z0-9_]*
char     ([^\n\"\\]|\\.)
entero   [\-]?[0-9]+\b
decimal  [\-]?[0-9]+\.[0-9]+\b
cadena   \"{char}*\"
caracter \'{char}\'

%%
// -----> Reglas Lexicas
'int'                                   {return 'R_int'}
'double'                                {return 'R_double'}
'bool'                                  {return 'R_bool'}
'char'                                  {return 'R_char'}
'std::string'                           {return 'R_string'}
'true'                                  {return 'R_true'}
'false'                                 {return 'R_false'}
'pow'                                   {return 'R_pow'}
'new'                                   {return 'R_new'}
'if'                                    {return 'R_if'}
'else'                                  {return 'R_else'}
'switch'                                {return 'R_switch'}
'case'                                  {return 'R_case'}
'default'                               {return 'R_default'}
'while'                                 {return 'R_while'}
'for'                                   {return 'R_for'}
'do'                                    {return 'R_do'}
'break'                                 {return 'R_break'}
'continue'                              {return 'R_continue'}
'return'                                {return 'R_return'}
'void'                                  {return 'R_void'}
'cout'                                  {return 'R_cout'}
'endl'                                  {return 'R_endl'}
'toLower'                               {return 'R_toLower'}
'toUpper'                               {return 'R_toUpper'}
'round'                                 {return 'R_round'}
'length'                                {return 'R_length'}
'typeOf'                                {return 'R_typeOf'}
'toString'                              {return 'R_toString'}
'c_str'                                 {return 'R_c_str'}
'execute'                               {return 'R_execute'}

{cadena}                                {yytext = yytext.substr(1,yyleng - 2);return 'T_string'}
{caracter}                              {yytext = yytext.substr(1,yyleng - 2);return 'T_char'}
{id}                                    {return 'T_id'}
{decimal}                               {return 'T_double'}
{entero}                                {return 'T_int'}

// SÍMBOLOS
"++"                                    {return '++'}
"--"                                    {return '--'}
'+'                                     {return '+'}
'-'                                     {return '-'}
'*'                                     {return '*'}
'/'                                     {return '/'}
'%'                                     {return '%'}
'('                                     {return '('}
')'                                     {return ')'}
'['                                     {return '['}
']'                                     {return ']'}
'{'                                     {return '{'}
'}'                                     {return '}'}
'=='                                    {return '=='}
'='                                     {return '='}
'.'                                     {return '.'}
','                                     {return ','}
':'                                     {return ':'}
';'                                     {return ';'}
'||'                                    {return '||'}
'&&'                                    {return '&&'}
'!='                                    {return '!='}
'!'                                     {return '!'}
'<<'                                    {return '<<'}
'<='                                    {return '<='}
'>='                                    {return '>='}
'<'                                     {return '<'}
'>'                                     {return '>'}
'?'                                     {return '?'}
\s+                                     {}
[ \n\r]                                 {}
\/\/.*                                  {} // comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     {} // comentario multilínea
// -----> FIN DE CADENA Y ERRORES
.                                       {console.log({tipo: 'LEXICO', inesperado: yytext, linea: yylloc.first_line, columna: yylloc.first_column})}
<<EOF>>                                 {return 'EOF'}


/lex

// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

//%left 'MAS' 'MENOS'
%left '?' ':'
%left '||'
%left '&&'
%right '!'
%left '==' '!='
%left '<' '<=' '>' '>='
%left '+' '-'
%left '*' '/' '%'
%nonassoc R_pow
%right T_uminus
%left '.' '[' ']' '(' ')'



// -------> Simbolo Inicial
%start INICIO


%% // ------> Gramatica

INICIO :
    INSTRUCCIONESGLOBALES EOF |
    EOF                       ;

INSTRUCCIONESGLOBALES :
    INSTRUCCIONESGLOBALES INSTRUCCIONGLOBAL |
    INSTRUCCIONGLOBAL                       ;

INSTRUCCIONGLOBAL :
    DECLARACION    ';' |
    VECTOR         ';' |
    FUNCION            |
    LLAMADAEXECUTE ';' |
    error {console.error({tipo: 'SINTACTICO', inesperado: yytext ,  linea: this._$.first_line , columna: this._$.first_column});} ;

INSTRUCCIONES :
    INSTRUCCIONES INSTRUCCION |
    INSTRUCCION               ;

INSTRUCCION :
    DECLARACION    ';' |
    INCDEC         ';' |
    VECTOR         ';' |
    ASIGNACION     ';' |
    IF                 |
    SWITCH             |
    BUCLES             |
    TRANSFERENCIA  ';' |
    PRINT          ';' |
    LLAMADAFUNCION ';' |
    error {console.error({tipo: 'SINTACTICO', inesperado: yytext ,  linea: this._$.first_line , columna: this._$.first_column});} ;

DECLARACION :
    TIPO IDENTIFICADORES '=' EXPRESION ;

IDENTIFICADORES :
    IDENTIFICADORES ',' T_id |
    T_id                     ;

INCDEC :
    T_id '++' |
    T_id '--' ;

VECTOR :
    TIPO T_id '[' ']' '[' ']' '=' R_new TIPO '[' EXPRESION ']' '[' EXPRESION ']' |
    TIPO T_id '[' ']' '=' R_new TIPO '[' EXPRESION ']'                           |
    TIPO T_id '[' ']' '[' ']' '=' VECTORES                                       |
    TIPO T_id '[' ']' '=' VALOR                                                  ;

VECTORES :
    '[' VALORES ']' ;

VALORES :
    VALORES ',' VALOR |
    VALOR             ;

VALOR :
    '[' EXPRESIONES ']' ;

ASIGNACION :
    T_id '[' EXPRESION ']' '[' EXPRESION ']' '=' EXPRESION |
    T_id '[' EXPRESION ']' '=' EXPRESION                   |
    T_id '=' EXPRESION                                     ;

IF:
    R_if '(' EXPRESION ')' BLOQUE               |
    R_if '(' EXPRESION ')' BLOQUE R_else BLOQUE |
    R_if '(' EXPRESION ')' BLOQUE R_else IF     ;

SWITCH:
    R_switch '(' EXPRESION ')' '{' CASEBLOCK '}' ;

CASEBLOCK:
    CASELIST DEFAULT |
    CASELIST         |
    DEFAULT          ;

CASELIST:
    CASELIST CASE |
    CASE          ;

CASE:
    R_case EXPRESION ':' INSTRUCTIONS |
    R_case EXPRESION ':'              ;

DEFAULT:
    RW_default ':' INSTRUCTIONS |
    RW_default ':'              ;

BUCLES :
    R_while '(' EXPRESION ')' BLOQUE          |
    R_do BLOQUE R_while '(' EXPRESION ')' ';' |
    R_for '(' FORARGS ')' BLOQUE              ;

FORARGS :
    INICIALIZACION ';' EXPRESION ';' ACTUALIZACION ;

INICIALIZACION :
    TIPO T_id '=' EXPRESION |
    ASIGNACION ;

ACTUALIZACION :
    INCDEC     |
    ASIGNACION ;

TRANSFERENCIA :
    R_break            |
    R_continue         |
    R_return           |
    R_return EXPRESION ;

FUNCION:
    TIPO   T_id '(' PARAMETROS ')' BLOQUE |
    R_void T_id '(' PARAMETROS ')' BLOQUE |
    TIPO   T_id '(' ')' BLOQUE            |
    R_void T_id '(' ')' BLOQUE            ;

PARAMETROS:
    PARAMETROS ',' PARAMETRO |
    PARAMETRO                ;

PARAMETRO:
    TIPO T_id ;

BLOQUE :
    '{' INSTRUCCIONES '}' |
    '{' '}'               ;

LLAMADAFUNCION:
    T_id '(' EXPRESIONES ')' |
    T_id '(' ')'             ;

PRINT :
    R_cout '<<' EXPRESION '<<' R_endl |
    R_cout '<<' EXPRESION             ;

LLAMADAEXECUTE :
    R_execute LLAMADAFUNCION ;

TIPO :
    R_int    |
    R_double |
    R_bool   |
    R_string |
    R_char   ;

EXPRESIONES :
    EXPRESIONES ',' EXPRESION |
    EXPRESION                 ;

EXPRESION :
    ARITMETICOS       |
    RELACIONALES      |
    LOGICAS           |
    TERNARIO          |
    CASTEO            |
    ACCESOVECTOR      |
    FUNCIONESNATIVAS  |
    LLAMADAFUNCION    |
    T_id              |
    T_int             |
    T_double          |
    T_string          |
    T_char            |
    R_true            |
    R_false           |
    '(' EXPRESION ')' ;

ARITMETICOS :
    EXPRESION '+' EXPRESION               |
    EXPRESION '-' EXPRESION               |
    EXPRESION '*' EXPRESION               |
    EXPRESION '/' EXPRESION               |
    EXPRESION '%' EXPRESION               |
    '-' EXPRESION %prec T_uminus          |
    R_pow '(' EXPRESION ',' EXPRESION ')' ;

RELACIONALES :
    EXPRESION '==' EXPRESION |
    EXPRESION '!=' EXPRESION |
    EXPRESION '<=' EXPRESION |
    EXPRESION '>=' EXPRESION |
    EXPRESION '<'  EXPRESION |
    EXPRESION '>'  EXPRESION ;

LOGICAS :
    EXPRESION '||' EXPRESION |
    EXPRESION '&&' EXPRESION |
    '!' EXPRESION            ;

TERNARIO :
    EXPRESION '?' EXPRESION ':' EXPRESION ;

CASTEO :
    '(' TIPO ')' EXPRESION ;

ACCESOVECTOR :
    T_id '[' EXPRESION ']' '[' EXPRESION ']' |
    T_id '[' EXPRESION ']'                   ;

FUNCIONESNATIVAS :
    R_toLower  '(' EXP ')'   |
    R_toUpper  '(' EXP ')'   |
    R_round    '(' EXP ')'   |
    EXP '.' R_length '(' ')' |
    R_typeOf   '(' EXP ')'   |
    R_toString '(' EXP ')'   |
    EXP '.' R_c_str  '(' ')' ;