
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
                if(precendencia.indexOf(']')!=-1){
                    precendencia.push('[');
                    visor.value += '*[';
                }
                if(precendencia.indexOf('[')!=-1){
                    let exp_aux1 =  precendencia.slice();
                    exp_aux1.push(']');
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
                    visor.value += '*[';
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
               // document.querySelector(elemento).innerHTML = 'Operação inválida';
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

                    operador =  create_operadores('=','=','calcular()');
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


                        
            function calcular(){
                var expressao = document.querySelector('#operacao-visor').value;
                var saida="", pilha_temp = new Array();
                for(let i=0;i<expressao.length;i++){
                    if(parseInt(expressao[i])){
                        while(operadores.indexOf(expressao[i])==-1 && delimitadores.indexOf(expressao[i])==-1 && i<expressao.length){
                            //captura o valor com mais de uma casa decimal.
                            saida+=expressao[i];
                            i++;  
                        }
                        console.log("s "+saida);
                        i--;
                    }
                    else if(operadores.indexOf(expressao[i])!=-1){
                        // é um simbolo
                        if(pilha_temp.length==0)
                            pilha_temp.push(expressao[i]);
                        else if(maior_precendencia(pilha_temp[pilha_temp.length-1],expressao[i])){
                            saida += pilha_temp.pop();
                            pilha_temp.push(expressao[i]);
                        }
                        else
                            pilha_temp.push(expressao[i]);
                    }
                    else if(expressao[i]=='(')
                        pilha_temp.push(expressao[i]);
                    else if(expressao[i]==')'){
                        while(pilha_temp[pilha_temp.length-1]!='('){
                            saida+=pilha_temp.pop();
                        }
                        pilha_temp.pop();
                    }
                }
                //ajusta o valor final para chamada na notacaoPolonesa();
                while(pilha_temp.length!=0)
                    saida+=" "+pilha_temp.pop();
                document.querySelector('#operacao-visor').value = notacao_polonesa(saida);
            }

            function maior_precendencia(s1,s2){
              if(((s1 == '*' && s2=="/") || (s1 == '/' && s2=="*")))
                    return false;
              if((s1 == '+' && s2=="-") || (s1 == '-' && s2=="+"))
                   return false; 
              if(operadores.indexOf(s1) > operadores.indexOf(s2))
                  return true;
              else
                return false
            }
            function notacao_polonesa(expressao){
                //var array_expressao = expresao.split(' ');
                expressao =  expressao.split(" ");
                console.log(expressao)
                var pilha_temp = new Array();
                for(let i=0;i<expressao.length;i++){
                    if(operadores.indexOf(expressao[i])==-1){
                        pilha_temp.push(expressao[i]);
                    }
                    else{
                        //Achou um operador, logo efetuar a operação entre os valores e acrescentar ao fundo da pilha
                        let n1,n2;
                        n2 =  pilha_temp.pop();
                        n1 =  pilha_temp.pop();
                        console.log("op"+n1+''+expressao[i]+''+ n2)
                        switch(expressao[i]){
                            case '+':
                                pilha_temp.push(parseFloat(n1)+parseFloat(n2));
                                console.log("pilha :"+pilha_temp);
                                break;
                            case '-':
                                pilha_temp.push(parseFloat(n1)-parseFloat(n2));
                                break;
                            case '*':
                                pilha_temp.push(parseFloat(n1)*parseFloat(n2));
                                break;
                            case '/':
                                pilha_temp.push(parseFloat(n1)/parseFloat(n2));
                                break;
                        }
                    }                    

                }
                if(parseFloat(pilha_temp[0]))
                    return pilha_temp[0];
                else
                    return pilha_temp[0].toFixed(2);
            }
/*
            function Tarvore(){
                var self = this;
                var T = 23;

                this.insere1 = function(item){
                    console.log("item: "+item);
                    self.T = self.insere2(self.T,item,null)
                }
                this.insere2 = function(t,item,pai){
                    if(t==null){
                        console.log('if: 1');
                        t =  new Tnodo();
                        t.criaNodo(item,pai); 
                    }
                    else{
                        console.log('if: 2');
                        pai =t;
                        if(parseInt(item)){
                            t.esq = this.insere2(t.esq,item,pai);
                        }
                        else if(operadores.indexOf(item) != -1 ){
                            t.dir = this.insere2(t.dir,item,pai);
                            console.log('if:  3');
                        }
                    }
                    return t;
                }
            }
            
            function Tnodo(){
                self = this;
                this.esq;
                this.dir;
                this.valor;
                this.pai;
                this.criaNodo = function(valor,pai){
                    self.esq=null;
                    self.dir=null;
                    self.valor=valor;
                    self.pai=pai;
                }
            }




            function preOrdem(nodo){
                if(nodo!=null){
                    console.log(" - "+nodo.valor);
                    preOrdem(nodo.esq);
                    preOrdem(nodo.dir);
                }
            }*/