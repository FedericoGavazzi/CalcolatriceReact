import React, { useReducer, useContext} from "react";
import "./App.css";

const AppContext = React.createContext(null)

export function App(props) {
  const [state, dispatch] = useReducer(AppReducer, { display: '' })
 
  function Display() {
    const { state, dispatch } = useContext(AppContext)
    return (
      <div
        className="display border border-dark"
        id="display">
          {state.display}
      </div>
    )
  }
  
  function Numero(props) {
    const testo = props.testo
    return (
      <div
        className="btn num" onClick={() => dispatch({ type: 'SCRIVI', payload: { testo } })}>
          {testo}
      </div>
      
    )
  }

  function Tasto(props) {
    const testo = props.testo
    if(props.testo == '='){
      return (
        <div className="btn oper uguale" onClick={() => dispatch({ type: 'SCRIVI', payload: { testo } })}>
         {testo}
        </div>
      )  
    }
    return (
      <div className="btn oper" onClick={() => dispatch({ type: 'SCRIVI', payload: { testo } })}>
       {testo}
      </div>
    )
  }

  return (
    <div className="App border border-dark">
      <h6 className="titolo text-left">{props.titolo}</h6>
      <AppContext.Provider value={{ state, dispatch }}>
        <Display>{state.display}</Display>
      <div className="contenitore">
        <div>
          <Tasto testo={'deg'}></Tasto>
          <Tasto testo={'sin'}></Tasto>
          <Tasto testo={'cos'}></Tasto>
          <Tasto testo={'tan'}></Tasto>
        </div>
        <div>
          <Tasto testo={'√'}></Tasto>
          <Tasto testo={'^'}></Tasto>
          <Tasto testo={'log'}></Tasto>
          <Tasto testo={'ln'}></Tasto>
        </div>
        <div>
          <Tasto testo={'('}></Tasto>
          <Tasto testo={')'}></Tasto>
          <Tasto testo={'C'}></Tasto>
          <Tasto testo={"DEL"}></Tasto>
        </div>
        <div>
          <Numero testo={'7'}></Numero>
          <Numero testo={'8'}></Numero>
          <Numero testo={'9'}></Numero>
          <Tasto testo={'÷'}></Tasto>
        </div>
        <div>
          <Numero testo={'4'}></Numero>
          <Numero testo={'5'}></Numero>
          <Numero testo={'6'}></Numero>
          <Tasto testo={'×'}></Tasto>
        </div>
        <div>
          <Numero testo={'1'}></Numero>
          <Numero testo={'2'}></Numero>
          <Numero testo={'3'}></Numero>
          <Tasto testo={'-'}></Tasto>
        </div>
        <div>
          <Tasto testo={'='}></Tasto>
          <Numero testo={'0'}></Numero>
          <Tasto testo={'.'}></Tasto>
          <Tasto testo={'+'}></Tasto>
        </div>
      </div>
      </AppContext.Provider>
    </div>
  );
}

function AppReducer(state, action) {
  let NewState = {...state}
  if (action.type == 'SCRIVI') {
    NewState.display = DisplayWrite(NewState.display ,action.payload.testo)
  }
  return NewState
}

function DisplayWrite(exp, val) {
  if (val == 'C') {
    return exp = ""
  } else if (val == "DEL") {
    exp = exp.substring(0, exp.length - 1)
    if (exp == '')
      return exp = ''
    return exp
  } else if (val == '=') {
    return exp = daInAPos(exp)
  } else if (val != 'C' || val != "DEL" || val != '=') {
    
    return exp += val
  }
}

const toRad = Math.PI / 180;
const toDegree = 180 / Math.PI;
const actualAngle = toRad;
let degree = false;
let risultati = [0];

function changeAngle() {
    if (degree) {
        btnAngle.innerText = "rad";
        degree = false;
    } else {
        btnAngle.innerText = "deg";
        degree = true;
    }
}

function isOperand(x) {
    return (x == '+' || x == '-' || x == '×' || x == '÷' || x == '^' || x == '%' || x == '√');
}

function isFunction(x) {
    return (x == "cos" || x == "sin" || x == "tan" || x == "log" || x == "ln");
}

function precedence(a, b) {
    if (a == '+' || a == '-')
        return false;
    else
        return b == '+' || b == '-';
}

function eseguiOp(b, a, x) {
    if (x == '+') {
        if (a == null) return Number(0) + Number(b);
        return Number(a) + Number(b);
    }
    if (x == '-') {
        if (a == null) return Number(0) - Number(b);
        return Number(a) - Number(b);
    }
    if (x == '×')
        return Number(a) * Number(b);
    if (x == '÷')
        return Number(a) / Number(b);
    if (x == '^')
        return Math.pow(a, b);
    if (x == '√')
        return Math.sqrt(b);
    if (x == '%')
        return Number(a) % Number(b);
    return 0;
}

function eseguiFun(n, x) {
    let risultato = 0;
    if (x == "sin") {
        if (degree) {
            risultato = Math.sin(n * toRad);
        } else {
            risultato = Math.sin(n);
        }
    }
    if (x == "cos") {
        if (degree) {
            risultato = Math.cos(n * toRad);
        } else {
            risultato = Math.cos(n);
        }
    }
    if (x == "tan") {
        if (degree) {
            if ((n % 360) == 90 || (n % 360) == -270)
                return "+infinito";
            else if ((n % 360) == 270 || (n % 360) == -90)
                return "-infinito";
            return Math.tan(n * toRad);
        }
        risultato = Math.tan(n);
    }
    if(x == "ln"){
      risultato = Math.log(n);
    }
    if (x == "log") {
        risultato = Math.log10(n);
    }
    
    return risultato;
}


function daInAPos(infix) {
    let posfix = [];
    let stackChar = [];
    //Conversione a posfissa
    stackChar.push('(');
    for (var i = infix.length; i > 0; i--)
        infix += ")";
    for (var i = 0; stackChar.length != 0; i++) {
        let x = infix[i];
        if (!isNaN(x) || x == '.') {
            let numero = "";
            while (!isNaN(x) || x == '.') {
                numero += x;
                i++;
                x = infix[i];
            }
            posfix.push(numero);
            i--;
        } else if (infix.slice(i, i + 3) == "Ans") {
            posfix.push("Ans");
            i += 2;
        } else if (x == '(')
            stackChar.push('(');
        else if (x == ')') {
            let a = stackChar.pop();
            while (isOperand(a) || isFunction(a)) {
                posfix.push(a);
                a = stackChar.pop();
            }
        } else if (isNaN(x)) {
            if (isFunction(infix.slice(i, i + 3))) {
                x = infix.slice(i, i + 3);
                i += 2;
            }
            let a = stackChar.pop();
            while (isOperand(a) || isFunction(a)) {
                if (!precedence(x, a)) {
                    posfix.push(a);
                    a = stackChar.pop();
                } else {
                    stackChar.push(a);
                    break;
                }
            }
            if (!isOperand(a) || !isFunction(a))
                stackChar.push(a);
            stackChar.push(x);
        }
    }
    for (let i = 0; i < posfix.length; i++) {
        if (isOperand(posfix[i]) && posfix[i] == posfix[i + 1])
            posfix.splice(i, 1);
    }
    return daPosADouble(posfix);
}

function daPosADouble(posfix) {
    let stackInt = [];
    let risultato;

    let i = 0;
    posfix.forEach(x => {
        if (x == "Ans") {
            let n = risultati.pop();
            risultati.push(n);
            stackInt.push(n);
        } else if (!isNaN(x)) {
            stackInt.push(x);
        } else if (isFunction(x)) {
            let n = stackInt.pop();
            let risultato = eseguiFun(n, x);
            stackInt.push(risultato);
        } else if (x == '√') {
            let n = stackInt.pop();
            let risultato = eseguiOp(n, 0, x);
            stackInt.push(risultato);
        } else {
            let a = stackInt.pop();
            let b = stackInt.pop();
            let risultato = eseguiOp(a, b, x);
            if (risultato == "+infinito" || risultato == "-infinito")
                return risultato;
            stackInt.push(risultato);
        }
    });
    risultato = stackInt.pop();
    risultati.push(risultato);
    return risultato;
}

