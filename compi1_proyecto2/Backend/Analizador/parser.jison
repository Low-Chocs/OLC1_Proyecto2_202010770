%{
    const { errores } = require('../Clases/Utilities/Salida')
%}

// ANALIZADOR LEXICO
%lex
%options case-insensitive 

id       [a-zA-Z_][a-zA-Z0-9_]*
char     ([^\n\"\\]|\\.)
entero   [0-9]+\b
decimal  [0-9]+\.[0-9]+\b
cadena   \"{char}*\"
caracter \'{char}\'

%%

// RESERVADAS
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
'std::toString'                         {return 'R_toString'}
'c_str'                                 {return 'R_c_str'}
'execute'                               {return 'R_execute'}
// DEMÁS TOKENS
{cadena}                                {yytext = yytext.substr(1, yyleng - 2); return 'T_string'}
{caracter}                              {yytext = yytext.substr(1, yyleng - 2); return 'T_char'}
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
.                                       {errores.push({tipo: 'LEXICO', descripcion: `El caracter "${yytext}" no pertenece al lenguaje`, linea: yylloc.first_line, columna: yylloc.first_column + 1})}
<<EOF>>                                 {return 'EOF'}

/lex

%{
    const { Tipo } = require('../Clases/Utilities/Tipo')
    // Instrucciones
    const { Print } = require('../Clases/Instrucciones/Print')
    const { Funcion } = require('../Clases/Instrucciones/Funcion')
    const { Bloque } = require('../Clases/Instrucciones/Bloque')
    const { Execute } = require('../Clases/Instrucciones/Execute')
    const { Break } = require('../Clases/Instrucciones/Break')
    const { Continue } = require('../Clases/Instrucciones/Continue')
    // Expresiones
    const { Primitivo } = require('../Clases/Expresiones/Primitivo')
    const { Llamada } = require('../Clases/Expresiones/Llamada')
    const { Return } = require('../Clases/Expresiones/Return')
    const { AccesoVar } = require('../Clases/Expresiones/AccesoVar')
%}

// ANALIZADOR SINTACTICO
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

%start INICIO

%%

// GRAMÁTICA

INICIO :
    INSTRUCCIONESGLOBALES EOF {return $1} |
    EOF                       {return []} ;

INSTRUCCIONESGLOBALES :
    INSTRUCCIONESGLOBALES INSTRUCCIONGLOBAL {$$.push($2)} |
    INSTRUCCIONGLOBAL                       {$$ = [$1]  } ;

INSTRUCCIONGLOBAL :
    DECLARACION    ';' {$$ = $1} |
    VECTOR         ';' {$$ = $1} |
    FUNCION            {$$ = $1} |
    LLAMADAEXECUTE ';' {$$ = $1} |
    error {errores.push({tipo: 'SINTACTICO', descripcion: `No se esperaba ${yytext}.` ,  linea: this._$.first_line , columna: this._$.first_column + 1})} ;

INSTRUCCIONES :
    INSTRUCCIONES INSTRUCCION {$$.push($2)} |
    INSTRUCCION               {$$ = [$1]  } ;

INSTRUCCION :
    DECLARACION    ';' {$$ = $1} |
    INCDEC         ';' {$$ = $1} |
    VECTOR         ';' {$$ = $1} |
    ASIGNACION     ';' {$$ = $1} |
    IF                 {$$ = $1} |
    SWITCH             {$$ = $1} |
    BUCLES             {$$ = $1} |
    TRANSFERENCIA  ';' {$$ = $1} |
    PRINT          ';' {$$ = $1} |
    LLAMADAFUNCION ';' {$$ = $1} |
    error {errores.push({tipo: 'SINTACTICO', descripcion: `No se esperaba ${yytext}.` ,  linea: this._$.first_line , columna: this._$.first_column + 1})} ;

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
    R_break            {$$ = new Break(@1.first_line, @1.first_column)       } |
    R_continue         {$$ = new Continue(@1.first_line, @1.first_column)    } |
    R_return           {$$ = new Return(@1.first_line, @1.first_column, null)} |
    R_return EXPRESION {$$ = new Return(@1.first_line, @1.first_column, $2)  } ;

FUNCION:
    TIPO   T_id '(' PARAMETROS ')' BLOQUE {$$ = new Funcion(@1.first_line, @1.first_column, $2, $4, $6, $1)       } |
    R_void T_id '(' PARAMETROS ')' BLOQUE {$$ = new Funcion(@1.first_line, @1.first_column, $2, $4, $6, Tipo.NULL)} |
    TIPO   T_id '(' ')' BLOQUE            {$$ = new Funcion(@1.first_line, @1.first_column, $2, [], $5, $1)       } |
    R_void T_id '(' ')' BLOQUE            {$$ = new Funcion(@1.first_line, @1.first_column, $2, [], $5, Tipo.NULL)} ;

PARAMETROS:
    PARAMETROS ',' PARAMETRO {$$.push($3)} |
    PARAMETRO                {$$ = [$1]  } ;

PARAMETRO:
    TIPO T_id {$$ = [$1, $2, @1.first_line, @1.first_column]} ;

BLOQUE :
    '{' INSTRUCCIONES '}' {$$ = new Bloque(@1.first_line, @1.first_column, $2)} |
    '{' '}'               {$$ = new Bloque(@1.first_line, @1.first_column, [])} ;

LLAMADAFUNCION:
    T_id '(' EXPRESIONES ')' {$$ = new Llamada(@1.first_line, @1.first_column, $1, $3)} |
    T_id '(' ')'             {$$ = new Llamada(@1.first_line, @1.first_column, $1, [])} ;

PRINT :
    R_cout '<<' EXPRESION '<<' R_endl {$$ = new Print(@1.first_line, @1.first_column, $3, true) } |
    R_cout '<<' EXPRESION             {$$ = new Print(@1.first_line, @1.first_column, $3, false)} ;

LLAMADAEXECUTE :
    R_execute LLAMADAFUNCION {$$ = new Execute(@1.first_line, @1.first_column, $2)} ;

TIPO :
    R_int    {$$ = Tipo.INT   } |
    R_double {$$ = Tipo.DOUBLE} |
    R_bool   {$$ = Tipo.BOOL  } |
    R_string {$$ = Tipo.STRING} |
    R_char   {$$ = Tipo.CHAR  } ;

EXPRESIONES :
    EXPRESIONES ',' EXPRESION {$$.push($3)} |
    EXPRESION                 {$$ = [$1]  } ;

EXPRESION :
    ARITMETICOS       |
    RELACIONALES      |
    LOGICAS           |
    TERNARIO          |
    CASTEO            |
    ACCESOVECTOR      |
    FUNCIONESNATIVAS  |
    LLAMADAFUNCION    {$$ = $1} |
    T_id              {$$ = new AccesoVar(@1.first_line, @1.first_column, $1)             } |
    T_int             {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.INT)   } |
    T_double          {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.DOUBLE)} |
    T_string          {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.STRING)} |
    T_char            {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.CHAR)  } |
    R_true            {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.BOOL)  } |
    R_false           {$$ = new Primitivo(@1.first_line, @1.first_column, $1, Tipo.BOOL)  } |
    '(' EXPRESION ')' {$$ = $1} ;

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