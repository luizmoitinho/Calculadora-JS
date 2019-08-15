
            var inicializacao =  document.querySelector('body');
            var expressao_final = [],precendencia=[];
            var operadores = new Array('+','-','*','/'), delimitadores =  new Array('(',')','[',']','{','}');
            var visor = document.querySelector('#operacao-visor');

            function limpar_input(){
                let visor = document.querySelector('#operacao-visor');
                visor.value="";
                precendencia=[];
            }
            function insert_input(obj){
                let expressao =  visor.value;
                if(precendencia[precendencia.length-1]==')'){
                    visor.value+=obj.value;
                }         
                else
                    visor.value+=obj.textContent;           
            }
            function condicao_parenteses(obj){    
                let expressao =  visor.value;
                let isNumber = parseInt(expressao[expressao.length-1]) ||parseInt(expressao[expressao.length-1])==0 ? true:false;
                let indice =  precendencia.indexOf('(');
                // devo achar todos os parenteses, e calcular o quanto é pra fechar.
                //if(){
                    if(isNumber && indice!=-1){
                        precendencia.push(')');
                        console.log(precendencia)
                        visor.value+=')';
                    }
                    else if(expressao[expressao.length-1]==')'){
                        var exp_aux =  expressao.split('');
                        if(!isExpressao(exp_aux,'(',')')){
                            precendencia.push(')');
                            visor.value+=')';
                        }
                        else{
                            precendencia.push('(');
                            visor.value+='*(';
                        }

                    console.log("copia ="+exp_aux);    
                    }
                    else if(isNumber){
                        precendencia.push('(');
                        visor.value+='*(';
                    }
                    else{
                        precendencia.push('(');
                        console.log(precendencia);
                        visor.value+='(';
                    }
                //}
            }
            function isExpressao(exp_aux,item1,item2){
                var valido=false;
                for(let i=0;i<exp_aux.length;i++){
                    if(exp_aux[i]==item1){
                        let j=i+1;
                        while(exp_aux[j]!=item2 && j<exp_aux.length)
                             j++;
                        
                        if(j<exp_aux.length){
                            exp_aux[i] ='x';
                            exp_aux[j]='x';
                            valido=true;
                             
                        }
                        else
                            valido = false;
                       console.log(exp_aux);  
                    }
                    
                 }
                 console.log(valido)
                 return valido;
                 
            }

            function condicao_colchetes(obj){
                let expressao =  visor.value;
                let isNumber = parseInt(expressao[expressao.length-1]) ||parseInt(expressao[expressao.length-1])==0 ? true:false;
                if(precendencia.indexOf(']')!=-1){
                    precendencia.push('[');
                    visor.value += ' * [';
                }
                else if(isExpressao(exp_aux1,'[',']')){
                    if()
                        precendencia.push('[');
                        visor.value += ' * [';

                }
                else if(precendencia.indexOf('[')!=-1){
                    let exp_aux1 =  precendencia.slice();
                    //existe um colchete aberto e o ultimo valor digitado é um numero
                    if(isExpressao(exp_aux1,'(',')')&& (isExpressao(exp_aux1,'[',']'))){
                        precendencia.push(']');
                        visor.value+=']';
                    }
                    else{
                        msgErro('#info-visor');
                    }
                }
                else if(isNumber){
                    precendencia.push('[');
                    visor.value += ' * [';
                }
                else if(expressao[expressao.length-1]=="" || expressao[expressao.length-1]==null){
                    precendencia.push('[');
                    visor.value += '[';
                }
                else {
                    msgErro('#info-visor');
                }
            }
            function msgErro(elemento){
               alert("Operação inválida!");
            }
            function condicao_delimitador(exp,item){
                let valido
                for(let i=0;i<exp.length;i++){
                    if(exp[i]==item){
                         let j=i+1;
                         while(exp[j]!=item  && j<exp.length){
                             j++;
                         }
                         if(j<exp.length){
                            exp[i] = 'x';
                            exp[j]='x';
                             valido=true;
                         }
                         else
                             valido=false;   
                    }
                 }
                 return valido;
            }
            inicializacao.onload = function(){ 
                var teclado_numerico =  document.querySelector('.teclado-numerico');
                var teclado_operador =  document.querySelector('.teclado-operadores');
                document.querySelector("#operacao-visor").value="2 * ( - 5 + ( 10 * 7 ) * 2 )";
                create_teclado_numerico(teclado_numerico)
                create_teclado_operador(teclado_operador);
                function create_teclado_numerico(obj){
                    operador =  create_operadores(' ','()','condicao_parenteses(this)');
                    obj.appendChild(operador);
                    operador =  create_operadores(' ',' [] ','condicao_colchetes(this)');
                    obj.appendChild(operador);
                    operador =  create_operadores(' ',' {} ','condicao_parenteses(this)');
                    obj.appendChild(operador);
                    create_numeros(7);
                    create_numeros(8);
                    create_numeros(9);   
                    create_numeros(6);
                    create_numeros(5);
                    create_numeros(4);
                    create_numeros(1);
                    create_numeros(2);
                    create_numeros(3);
                    operador =  create_operadores('c',' c','limpar_input()');
                    obj.appendChild(operador);
                    create_numeros(0);
                    operador =  create_operadores('.',' .','limpar_input()');
                    obj.appendChild(operador);

                }
                function create_teclado_operador(obj){
                    operador =  create_operadores(' + ',' + ','');
                    obj.appendChild(operador);

                    operador =  create_operadores(' - ',' - ','');
                    obj.appendChild(operador);

                    operador =  create_operadores(' / ',' / ','');
                    obj.appendChild(operador);

                    operador =  create_operadores(' * ',' * ','');
                    obj.appendChild(operador);

                    operador =  create_operadores(' = ',' = ','calcular()');
                    obj.appendChild(operador);            
                }   
                function create_operadores(id,texto,func){
                    var element = document.createElement('button');
                    element.insertAdjacentHTML('afterbegin',texto);
                    element.setAttribute("value"," "+texto+" ");
                    element.setAttribute("id",id);
                    if(func=="")
                        element.setAttribute('onclick','insert_input(this);');
                    else
                        element.setAttribute('onclick',func);
                    element.setAttribute("class",'formato-operador');
                    return element;
                }
                function create_numeros(elem){
                    var numero = document.createElement("div");
                    numero.insertAdjacentHTML('afterbegin',elem);
                    numero.setAttribute("class",'formato-numero')
                    numero.setAttribute("id",elem)
                    numero.setAttribute('onclick','insert_input(this);');
                    teclado_numerico.appendChild(numero);
                }
            }
            function calcular(){
                var expressao = document.querySelector('#operacao-visor').value;
                expressao = expressao.split(" ");
                console.log(expressao);
                var saida = new Array(), pilha_temp = new Array();
                for(let i=0;i<expressao.length;i++){
                    if(parseInt(expressao[i])){
                        //nada - 10 
                        while(operadores.indexOf(expressao[i])==-1 && delimitadores.indexOf(expressao[i])==-1 && i<expressao.length){
                            //captura o valor com mais de uma casa decimal.
                            saida.push(expressao[i]);
                            i++;  
                        }
                       // console.log("s :"+saida);
                        i--;
                    }
                    else if(operadores.indexOf(expressao[i])!=-1){
                       if( (!parseInt(expressao[i-1]))&& (expressao[i]=='-' || expressao[i]=='+' ) && (parseInt(expressao[i+1]) || !expressao[i+1])){
                            alert("")
                            saida.push(expressao[i]+expressao[i+1]);
                            i+=1;
                       }
                       else if(pilha_temp.length==0){
                            pilha_temp.push(expressao[i]);
                            console.log(">"+pilha_temp[pilha_temp.length-1])
                        }
                        else if(maior_precendencia(pilha_temp[pilha_temp.length-1],expressao[i])){
                            saida.push(pilha_temp.pop());
                            pilha_temp.push(expressao[i]);
                        }
                        else
                            pilha_temp.push(expressao[i]);
                    }
                    else if(expressao[i]=='(')
                        pilha_temp.push(expressao[i]);
                    else if(expressao[i]==')'){
                        while(pilha_temp[pilha_temp.length-1]!='('){
                            saida.push(pilha_temp.pop());
                        }
                        pilha_temp.pop();
                    }
                    console.log(saida)
                }
                //ajusta o valor final para chamada na notacaoPolonesa();
                while(pilha_temp.length!=0)
                    saida.push(pilha_temp.pop());
                console.log("Saida: "+saida);
                //console.log("Pilha: "+pilha_temp)
               document.querySelector('#operacao-visor').value = desempilha_calcula(saida);
            }

            function maior_precendencia(s1,s2){
                if(((s1 == '*' && s2=="/") || (s1 == '/' && s2=="*")))
                    return false;
                if(s1 == '+' && s2=="-")
                    return false; 
                if(s1 == '-' && s2=="+")
                    return false;
                if(operadores.indexOf(s1) > operadores.indexOf(s2))
                    return true;
                else
                    return false
            }
            function desempilha_calcula(expressao){
                //var array_expressao = expresao.split(' ');
                var pilha_temp = new Array();
                for(let i=0;i<expressao.length;i++){
                    if(expressao[i]=="") continue;
                    else if(operadores.indexOf(expressao[i])==-1){
                        pilha_temp.push(expressao[i]);
                        console.log(expressao[i])
                    }
                    else{
                        //Achou um operador, logo efetuar a operação entre os valores e acrescentar ao fundo da pilha
                        let n1,n2;
                        n2 =  pilha_temp.pop();
                        n1 =  pilha_temp.pop();
                        console.log("# "+n1+''+expressao[i]+''+ n2);
                        switch(expressao[i]){
                            case '+':
                                pilha_temp.push(parseFloat(n1)+parseFloat(n2));
                                console.log("pilha 1:"+pilha_temp);
                                break;
                            case '-':
                                pilha_temp.push(parseFloat(n1)-parseFloat(n2));
                                console.log("pilha 2:"+pilha_temp);
                                break;
                            case '*':
                                pilha_temp.push(parseFloat(n1)*parseFloat(n2));
                                console.log("pilha 3:"+pilha_temp);
                                break;
                            case '/':
                                pilha_temp.push(parseFloat(n1)/parseFloat(n2));
                                console.log("pilha 4:"+pilha_temp);
                                break;  
                            default:
                                pilha_temp.push(parseFloat(n1)+parseFloat(n2));
                                break;    
                                        
                         }
                    }                

                }
                if(parseFloat(pilha_temp[0]))
                    return pilha_temp[0];
                else
                    return pilha_temp[0].toFixed(2);
            }

