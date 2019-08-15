var inicializacao = document.querySelector('body');
var expressao_final = [], precendencia = [];
var operadores = new Array('+', '-', '*', '/'), delimitadores = new Array('(', ')', '[', ']', '{', '}');
var visor = document.querySelector('#operacao-visor');
var calculadora = document.querySelector("body");

inicializacao.onload = function () {
    var teclado_numerico = document.querySelector('.teclado-numerico');
    var teclado_operador = document.querySelector('.teclado-operadores');
    document.querySelector("#operacao-visor").value;
    create_teclado_numerico(teclado_numerico)
    create_teclado_operador(teclado_operador);

    function create_teclado_numerico(obj) {
        operador = create_operadores(' ', '()', 'condicao_parenteses()');
        obj.appendChild(operador);
        operador = create_operadores('', ' [] ', 'condicao_colchetes()');
        obj.appendChild(operador);
        operador = create_operadores('', ' {} ', 'condicao_chaves()');
        obj.appendChild(operador);
        create_numeros(7);
        create_numeros(8);
        create_numeros(9);

        create_numeros(4);
        create_numeros(5);
        create_numeros(6);

        create_numeros(1);
        create_numeros(2);
        create_numeros(3);

        operador = create_operadores('c', ' c', 'limpar_input()');
        obj.appendChild(operador);
        create_numeros(0);
        operador = create_operadores('.', '.', 'insert_input(this)');
        obj.appendChild(operador);

    }

    function create_teclado_operador(obj) {
        operador = create_operadores(' + ', '+', '');
        obj.appendChild(operador);

        operador = create_operadores(' - ', '-', '');
        obj.appendChild(operador);

        operador = create_operadores(' / ', '/', '');
        obj.appendChild(operador);

        operador = create_operadores(' * ', '*', '');
        obj.appendChild(operador);

        operador = create_operadores(' = ', ' = ', 'calcular()');
        obj.appendChild(operador);
    }

    function create_operadores(id, texto, func) {
        var element = document.createElement('button');
        element.insertAdjacentHTML('afterbegin', texto);
        element.setAttribute("value", " " + texto + " ");
        element.setAttribute("id", id);
        if (func == "")
            element.setAttribute('onclick', 'insert_input(this);');
        else
            element.setAttribute('onclick', func);
        element.setAttribute("class", 'formato-operador');
        return element;
    }

    function create_numeros(elem) {
        var numero = document.createElement("div");
        numero.insertAdjacentHTML('afterbegin', elem);
        numero.setAttribute("class", 'formato-numero')
        numero.setAttribute("id", elem)
        numero.setAttribute('onclick', 'insert_input(this);');
        teclado_numerico.appendChild(numero);
    }
}

// var aux = new Array(49,32, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 43, 40, 41, 42, 47);
function teclado(obj) {
    console.log(event.keyCode)
    if (event.keyCode != 13 && event.keyCode != 32) {
        return false;
    }
}

function limpar_input() {
    let visor = document.querySelector('#operacao-visor');
    visor.value = "";
    precendencia = [];
}

function insert_input(obj) {
    visor.value += obj.textContent;
}

function isExpressao(exp_aux, item1, item2) {
    var valido = false;
    for (let i = 0; i < exp_aux.length; i++) {
        if (exp_aux[i] == item1) {
            let j = i + 1;
            while (exp_aux[j] != item2 && j < exp_aux.length)
                j++;
            if (j < exp_aux.length) {
                exp_aux[i] = 'x';
                exp_aux[j] = 'x';
                valido = true;
            } else
                valido = false;
            console.log(exp_aux);
        }
    }
    console.log(valido)
    return valido;

}

function condicao_parenteses(obj) {
    let expressao = visor.value;
    let isNumber = parseInt(expressao[expressao.length - 1]) || parseInt(expressao[expressao.length - 1]) == 0 ? true : false;
    let indice = precendencia.indexOf('(');
    if (isNumber && indice != -1) {
        precendencia.push(')');
        console.log(precendencia)
        visor.value += ')';
    } else if (expressao[expressao.length - 1] == ')') {
        var exp_aux = expressao.split('');
        if (!isExpressao(exp_aux, '(', ')')) {
            precendencia.push(')');
            visor.value += ')';
        } else {
            precendencia.push('(');
            visor.value += '*(';
        }

        console.log("copia =" + exp_aux);
    } else if (isNumber) {
        precendencia.push('(');
        visor.value += '*(';
    } else {
        precendencia.push('(');
        console.log(precendencia);
        visor.value += '(';
    }
}

function condicao_colchetes() {
    let expressao = visor.value;
    let isNumber = parseInt(expressao[expressao.length - 1]) || parseInt(expressao[expressao.length - 1]) == 0 ? true : false;
    let indice = precendencia.indexOf('[');
    var exp_aux = expressao.split('');
    if(exp_aux.length==0)   {
        precendencia.push('[');
        console.log(precendencia);
        visor.value += '[';
    }
    else if (isNumber && indice != -1) {
        precendencia.push(']');
        console.log(precendencia)
        visor.value += ']';
    }else if(isExpressao(exp_aux,'(',')')){
        if(exp_aux[exp_aux.length-1]==']'){
            if(exp_aux[exp_aux.length-1]=='{') return;
            precendencia.push('*[');
            console.log(precendencia)
            visor.value += '*[';
        }
        else if(operadores.indexOf(exp_aux[exp_aux.length-1])!=-1){
            precendencia.push('[');
            console.log(precendencia)
            visor.value += '[';
        }
        else{
            precendencia.push(']');
            console.log(precendencia);
            visor.value += ']';
        }

    } 
    else {
        exp_aux = expressao.split('');
        // !isExpressao(exp_aux,'(',')')
        if(exp_aux[exp_aux.length-1]=='[') return;
        else if(operadores.indexOf(exp_aux[exp_aux.length-1])!=-1 || exp_aux[exp_aux.length-1]=='{' ){
            precendencia.push('[');
            console.log(precendencia);
            visor.value += '[';
        }
        else{
            if(exp_aux[exp_aux.length-1]=='{') return;
            precendencia.push('*[');
            console.log(precendencia)
            visor.value += '*[';
        }

    }

}

function condicao_chaves() {
    let expressao = visor.value;
    let isNumber = parseInt(expressao[expressao.length - 1]) || parseInt(expressao[expressao.length - 1]) == 0 ? true : false;
    let indice = precendencia.indexOf('{');
    var exp_aux = expressao.split('');
    if(exp_aux.length==0)   {
        precendencia.push('{');
        console.log(precendencia);
        visor.value += '{';
    }
    else if (isNumber && indice != -1) {
        precendencia.push('}');
        console.log(precendencia)
        visor.value += '}';
    }else if(isExpressao(exp_aux,'[',']') && isExpressao(exp_aux,'(',')')){

        if(exp_aux[exp_aux.length-1]=='}'){
            precendencia.push('*{');
            console.log(precendencia)
            visor.value += '*{';
        }
        else if(operadores.indexOf(exp_aux[exp_aux.length-1])!=-1){
            precendencia.push('{');
            console.log(precendencia)
            visor.value += '{';
        }
        else{
            precendencia.push('}');
            console.log(precendencia);
            visor.value += '}';
        }

    } 
    else {
        exp_aux = expressao.split('');
        // !isExpressao(exp_aux,'(',')')
        if(exp_aux[exp_aux.length-1]=='{') return;
        else if(operadores.indexOf(exp_aux.pop())!=-1){
            precendencia.push('{');;
            visor.value += '{';
        }
        else{
            exp_aux = expressao.split('');
            if(isExpressao(exp_aux,'{','}')){
                precendencia.push('*{');
                visor.value += '*{';
            }
            else{
                precendencia.push('}');
                visor.value += '}';
            }

        }

    }
}


function valida_espacos(elem) {
    let exp = new Array();
    let aux = "";
    for (let i = 0; i < elem.length; i++) {
        aux = "";
        if (parseInt(elem[i]) || parseInt(elem[i]) == 0) {
            while (delimitadores.indexOf(elem[i]) == -1 && operadores.indexOf(elem[i]) == -1 && i < elem.length) {
                aux += elem[i];
                i++;
            }
            exp.push(aux);
            i--;

        } else
            exp.push(elem[i]);
    }
    return exp;
}

function replace(elem,x,y){
    for(let i=0;i<elem.length;i++){
        if(elem[i] == x ){
            elem[i]=y;
        }
    }
    return elem;
}

function calcular() {
    var expressao = document.querySelector('#operacao-visor').value;
    expressao = valida_espacos(expressao);
    expressao = replace(expressao,'[','(');
    expressao = replace(expressao,']',')');
    expressao = replace(expressao,'{','(');
    expressao = replace(expressao,'}',')');
    var saida = new Array(), pilha_temp = new Array();
    for (let i = 0; i < expressao.length; i++) {
        if (parseInt(expressao[i]) || parseInt(expressao[i]) == 0) {
            saida.push(expressao[i]);
        } else if (operadores.indexOf(expressao[i]) != -1) {
            if ((!parseInt(expressao[i - 1])) && (expressao[i] == '-' || expressao[i] == '+') && (parseInt(expressao[i + 1]) || !expressao[i + 1]) && (operadores.indexOf(expressao[i + 2]) != -1 || delimitadores.indexOf(expressao[i + 2]) != -1)) {
                saida.push(expressao[i] + expressao[i + 1]);
                i++;
            } else if (pilha_temp.length == 0) {
                pilha_temp.push(expressao[i]);
            } else if (maior_precendencia(pilha_temp[pilha_temp.length - 1], expressao[i])) {
                saida.push(pilha_temp.pop());
                pilha_temp.push(expressao[i]);
            } else
                pilha_temp.push(expressao[i]);
        } else if (expressao[i] == '(')
            pilha_temp.push(expressao[i]);
        else if (expressao[i] == ')') {
            while (pilha_temp[pilha_temp.length - 1] != '(') {
                saida.push(pilha_temp.pop());
            }
            pilha_temp.pop();
        }
    }
    while (pilha_temp.length != 0)
        saida.push(pilha_temp.pop());
    document.querySelector('#operacao-visor').value = desempilha_calcula(saida);
}

function desempilha_calcula(expressao) {
    //var array_expressao = expresao.split(' ');
    var pilha_temp = new Array();
    for (let i = 0; i < expressao.length; i++) {
        if (expressao[i] == "") continue;
        else if (operadores.indexOf(expressao[i]) == -1) {
            pilha_temp.push(expressao[i]);
        } else {
            //Achou um operador, logo efetuar a operação entre os valores e acrescentar ao fundo da pilha
            let n1, n2;
            n2 = pilha_temp.pop();
            n1 = pilha_temp.pop();
            switch (expressao[i]) {
                case '+':
                    pilha_temp.push(parseFloat(n1) + parseFloat(n2));
                    break;
                case '-':
                    pilha_temp.push(parseFloat(n1) - parseFloat(n2));
                    break;
                case '*':
                    pilha_temp.push(parseFloat(n1) * parseFloat(n2));
                    break;
                case '/':
                    if (n2 == 0) {
                        erroDivisaoZero();
                        return "";
                    }
                    pilha_temp.push(parseFloat(n1) / parseFloat(n2));
                    break;
                default:
                    pilha_temp.push(parseFloat(n1) + parseFloat(n2));
                    break;

            }
        }

    }
    if (parseInt(pilha_temp[0]) || parseInt(pilha_temp[0]) == 0)
        return pilha_temp[0];
    else if (parseFloat(pilha_temp[0]) || parseFloat(pilha_temp[0]) == 0)
        return pilha_temp[0].toFixed(2);
    else {
        msgErro();
        return "";


    }

}

function msgErro() {
    alert("Operação inválida!");
}

function erroDivisaoZero() {
    alert("Não é possível realizar divisões por zero!");
}

function maior_precendencia(s1, s2) {
    if (((s1 == '*' && s2 == "/") || (s1 == '/' && s2 == "*")))
        return false;
    if (s1 == '+' && s2 == "-")
        return false;
    if (s1 == '-' && s2 == "+")
        return false;
    if (operadores.indexOf(s1) > operadores.indexOf(s2))
        return true;

}
