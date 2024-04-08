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

// -------> Simbolo Inicial
%start INICIO


%% // ------> Gramatica

INICIO :
    INSTRUCCIONES EOF |
    EOF ;

INSTRUCCIONES :
    INSTRUCCIONES INSTRUCCION |
    INSTRUCCION ;

INSTRUCCION :
    PRINT |
    error {console.error({tipo: 'SINTACTICO', inesperado: yytext ,  linea: this._$.first_line , columna: this._$.first_column});} ;

PRINT :
    R_cout '<<' EXPRESION '<<' R_endl ';' |
    R_cout '<<' EXPRESION ';' ;


EXPRESION :
    T_id     |
    T_int    |
    T_double |
    T_string |
    T_char   |
    R_true   |
    R_false  ;