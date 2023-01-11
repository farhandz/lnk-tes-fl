import "../App.css";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);
  const history = useHistory();
  const [isPembilang , setIspembilang] = useState(false);
  
  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const percent = () => {
    preState
      ? setCurState(String((parseFloat(curState) / 100) * preState))
      : setCurState(String(parseFloat(curState) / 100));
  };

  function pembilang(nilai){
    nilai = Math.abs(nilai);
    let simpanNilaiBagi=0;
    let huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    let temp="";
 
    if (nilai < 12) {
        temp = " "+huruf[nilai];
    }
    else if (nilai <20) {
        temp = pembilang(nilai - 10) + " Belas";
    }
    else if (nilai < 100) {
        simpanNilaiBagi = Math.floor(nilai/10);
        temp = pembilang(simpanNilaiBagi)+" Puluh"+ pembilang(nilai % 10);
    }
    else if (nilai < 200) {
        temp = " Seratus" + pembilang(nilai - 100);
    }
    else if (nilai < 1000) {
        simpanNilaiBagi = Math.floor(nilai/100);
        temp = pembilang(simpanNilaiBagi) + " Ratus" + pembilang(nilai % 100);
    }
     else if (nilai < 2000) {
        temp = " Seribu" + pembilang(nilai - 1000);
    }
    else if (nilai < 1000000) {
        simpanNilaiBagi = Math.floor(nilai/1000);
        temp = pembilang(simpanNilaiBagi) + " Ribu" + pembilang(nilai % 1000);
    } 
    else if (nilai < 1000000000) {
        simpanNilaiBagi = Math.floor(nilai/1000000);
        temp =pembilang(simpanNilaiBagi) + " Juta" + pembilang(nilai % 1000000);
    } 
    else if (nilai < 1000000000000) {
        simpanNilaiBagi = Math.floor(nilai/1000000000);
        temp = pembilang(simpanNilaiBagi) + " Miliar" + pembilang(nilai % 1000000000);
    } 
    else if (nilai < 1000000000000000) {
        simpanNilaiBagi = Math.floor(nilai/1000000000000);
        temp = pembilang(nilai/1000000000000) + " Triliun" + pembilang(nilai % 1000000000000);
    }
 
    console.log(nilai, "ini dari console");
    return temp;

}


const onLogOut = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      
    axios.post('http://localhost:7000/api/v1/user/logout' , {
    }, {headers: headers}).then((response) => {
      localStorage.clear();
      history.push('/')
    }).catch((err) => {
      alert(err.response.data.message)
    })
}

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };
  return (
   
    <> 
    <div className="wrapper-button">
        <div>
            <input onChange={() => setIspembilang(!isPembilang)} type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label className="label-pembilang" for="vehicle1">ubah pembilang</label>
        </div>
        <button onClick={onLogOut} className="btn-logout">logout</button>
    </div>
   
    <div className='container'>
  <div className='wrapper'>
    <div className='screen'>
        {isPembilang ? pembilang((input !== "" || input === "0") ? input : preState) : input !== "" || input === "0" ? (
        <NumberFormat
          value={input}
          displayType={"text"}
          thousandSeparator={true}
        />
      ) : (
        <NumberFormat
          value={preState}
          displayType={"text"}
          thousandSeparator={true}
        />
      )}
    </div>
    <div className='btn light-gray' onClick={reset}>
      AC
    </div>
    <div className='btn light-gray' onClick={percent}>
      %
    </div>
    <div className='btn light-gray' onClick={minusPlus}>
      +/-
    </div>
    <div className='btn orange' onClick={operatorType}>
      /
    </div>
    <div className='btn' onClick={inputNum}>
      7
    </div>
    <div className='btn' onClick={inputNum}>
      8
    </div>
    <div className='btn' onClick={inputNum}>
      9
    </div>
    <div className='btn orange' onClick={operatorType}>
      X
    </div>
    <div className='btn' onClick={inputNum}>
      4
    </div>
    <div className='btn' onClick={inputNum}>
      5
    </div>
    <div className='btn' onClick={inputNum}>
      6
    </div>
    <div className='btn orange' onClick={operatorType}>
      +
    </div>
    <div className='btn' onClick={inputNum}>
      1
    </div>
    <div className='btn' onClick={inputNum}>
      2
    </div>
    <div className='btn' onClick={inputNum}>
      3
    </div>
    <div className='btn orange' onClick={operatorType}>
      -
    </div>
    <div className='btn zero' onClick={inputNum}>
      0
    </div>
    <div className='btn' onClick={inputNum}>
      .
    </div>
    <div className='btn' onClick={equals}>
      =
    </div>
  </div>
</div></>

  );
}

export default App;
