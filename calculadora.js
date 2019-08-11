
            var inicializacao =  document.querySelector('body');
            var expressao_final = [],precendencia=[];
            var visor = document.querySelector('#operacao-visor');

            function limpar_input(){
                let visor = document.querySelector('#operacao-visor');
                visor.value="";
                precendencia=[];
            }
            function insert_input(obj){
                let expressao =  visor.value;
                if(precendencia[precendencia.length-1]==')'){
                    visor.value+='*'+obj.textContent;
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

                
                if(precendencia.indexOf('[')!=-1){
                    let exp_aux1 =  precendencia.slice();
                    exp_aux1.push(']');
                    //existe um colchete aberto e o ultimo valor digitado é um numero
                    if(isExpressao(exp_aux1,'(',')')&& (isExpressao(exp_aux1,'[',']') && exp_aux1.indexOf(']')==-1)){
                        precendencia.push(']');
                        visor.value+=']';
                    }
                    else{
                        msgErro('#info-visor');
                    }
                }
                else if(isNumber){
                    precendencia.push('[');
                    visor.value += '*[';
                }
                else {
                    msgErro('#info-visor');

                }

               // let exp_aux = expressao.split('');
               // var parenteses_validade =  fechamento_parenteses(exp_aux);

            }
            function msgErro(elemento){
                document.querySelector(elemento).innerHTML = 'Operação inválida';
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
                    operador =  create_operadores('+',' + ','');
                    obj.appendChild(operador);

                    operador =  create_operadores('-',' - ','');
                    obj.appendChild(operador);

                    operador =  create_operadores('/','  /  ','');
                    obj.appendChild(operador);

                    operador =  create_operadores('*','  * ','');
                    obj.appendChild(operador);

                    operador =  create_operadores('=','=','limpar_input()');
                    obj.appendChild(operador);            
                }
                
                function create_operadores(id,texto,func){
                    var element = document.createElement('button');
                    element.insertAdjacentHTML('afterbegin',texto);
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