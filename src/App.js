import './App.css'
import { useState } from 'react'

const keys = [
  {
  id: 'add',
  value: '+',
  digit: false,
  operator: true
  },
  {
  id: 'subtract',
  value: '-',
  digit: false,
  operator: true
  },
  {
  id: 'multiply',
  value: '*',
  digit: false,
  operator: true
  },
  {
  id: 'divide',
  value: '/',
  digit: false,
  operator: true
  },
  {
  id: 'seven',
  value: 7,
  digit: true,
  operator: false
  },
  {
  id: 'eight',
  value: 8,
  digit: true,
  operator: false
  },
  {
  id: 'nine',
  value: 9,
  digit: true,
  operator: false
  },
  {
  id: 'equals',
  value: '=',
  digit: false,
  operator: false
  },
    {
  id: 'four',
  value: 4,
  digit: true,
  operator: false
  },
  {
  id: 'five',
  value: 5,
  digit: true,
  operator: false
  },  
  {
  id: 'six',
  value: 6,
  digit: true,
  operator: false
  },
  
  {
  id: 'decimal',
  value: '.',
  digit: false,
  operator: false
  },
  {
  id: 'one',
  value: 1,
  digit: true,
  operator: false
  },
  {
  id: 'two',
  value: 2,
  digit: true,
  operator: false
  },
  {
  id: 'three',
  value: 3,
  digit: true,
  operator: false
  },
  {
  id: 'clear',
  value: 'AC',
  digit: false,
  operator: false
  },
  {
  id: 'zero',
  value: 0,
  digit: true,
  operator: false
  },
]

const App = () => {
  const [display, setDisplay] = useState(0)
  const [latestEntry, setLatestEntry] = useState()
  const [input, setInput] = useState("")
  const [value1, setValue1] = useState("")
  const [operator, setOperator] = useState("")
  const [result, setResult] = useState("")

  const evaluate = (value, operator, input) => {
    switch(operator) {
      case '+':
        return Number(value) + Number(input)
      case '-':
        return Number(value) - Number(input)
      case '*':
        return Number(value) * Number(input)
      case '/':
        return Number(value) / Number(input)
      default: 
        console.log('Invalid operator')
    }
  }


  const handleClick = (item) => {
    
    if (item.digit) {
      if (item.id === 'zero') {
        if (input === ""){ // if input is empty string
          setInput(item.value.toString()) 
          setDisplay("0")
        }
        else if (input !== "" && input !== "0") 
        { // if input is not empty string
          setInput(input + item.value.toString()) 
          setDisplay(input + item.value.toString())
        }
      }
      
      else { // if digit is not zero
        setInput(input.toString() + item.value) 
        setDisplay(input.toString() + item.value)
      }
    }
    
    else { // if item is not a digit
      if (item.id === 'clear') { // AC clears everything
        setInput("") 
        setValue1("")
        setDisplay(0)
        setLatestEntry()
        setOperator("")
        setResult("")
      }
      
      else if (item.id === 'decimal'){
        if (input === "") {
          if (latestEntry !== "-") {
            setInput("0.") 
          }
        }
        else { // input not empty string
          if (input.includes('.')){
            // do nothing, do not add any more decimals
          }
          else if (latestEntry === "-") {
              setInput("-0.")
          }
          else {
            setInput(input + item.value) 
          }       
        }
      }


      else if (item.operator === true) { // item is + - * / 
        if (latestEntry === '+' 
          || latestEntry === '*' || latestEntry === '/'  ) {      
          if (item.value === '+' || item.value === '*' || item.value === '/' ) {
            setOperator(item.value) // set operator if it is not - 
          }
          else {
            setInput("-" + input.toString())
            setOperator(latestEntry)
          }
        }
        else if (latestEntry === "-"){  // latest entry is "-"
          if (item.value === '+' || item.value === '*' || item.value === '/' ) {
            setOperator(item.value)
          }
          else {
            setOperator(latestEntry)
            if (input !== "") {
              setInput("-" + input.toString())              
            }
          }
        }
        else {
          setOperator(item.value)
        }
        
        if (input === "-") {
          // remove it
          setInput("")
        } 
        
        if (input !== "" && (input !== "-") && value1 !== "") {
            const calculation = evaluate(value1, operator, input)
            setResult(calculation)
            setInput("")
            setValue1(calculation)
            setDisplay(calculation)
          }
          else if (input !== "" && input !== "-" && value1 === "") {
            setValue1(input) // move input to value1 
            setInput("") // and and set input to empty string
          }
          else if (input === "" && value1 === "") {
            // do nothing
          }
      }
 

      else if (item.id === "equals") 
      {
        if (value1 !== "" && operator !== "" && input !=="" ) { 
          const calculation = evaluate(value1, operator, input)
          setValue1(calculation)
          setInput("")
          setResult(calculation)
          setDisplay(calculation)
        }
        else if (value1 === "" && operator !== "" && input !=="" ) {
          setValue1(input)
          setInput("")
          setOperator("")
          setDisplay(input)                                           
        }
        else if (value1 === "" && operator === "" && input !=="" ) {
          setValue1(input)
          setInput("")
          setOperator("")
          setDisplay(input)                                           
        }
      }
    }
    setLatestEntry(item.value)
  }
  
     
  return (
    <div className='app'>
      <div id="testing">
        <div id='latestEntry'>Latest entry: {latestEntry}</div>
        <div id='input'>Input: {input}</div>
        <div id='value1'>Value1: {value1}</div>
        <div id='operator'>Operator: {operator}</div>
        <div id='result'>Result: {result}</div>
      </div>
      <div id="calculator">
        <div id='display'>{display}</div>
        <div id="keys">
        {keys.map((item, index) => (<button onClick={()=> handleClick(item)} key={index} className="key" id={item.id}>{item.value}</button>))}  
          </div>
      </div>
    </div>
  )
}

export default App
