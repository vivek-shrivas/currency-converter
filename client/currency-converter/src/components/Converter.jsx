import { useState } from "react"
import {useRef} from 'react'
function Converter() {
    const [from, setFrom] = useState('inr');
    const [to, setTo] = useState('usd');
    const [amount, setAmount] = useState(0);
    const [convertedAmt,setConvertedAmt]=useState(0)

    // references

    const myInput = useRef(0);

    // setters 
    const setInputAmount = (e) => {
        setAmount(e.target.value)
    }

    const convertAmount = () => { 
        setConvertedAmt(amount*87)
    }

    return (
        <>
            <div>
                <h1>converter</h1>
                <label htmlFor="">Amount</label>
                <input type="text" ref={myInput} value={amount} onChange={setInputAmount}/>
                <label htmlFor="From">From</label>
                <select>
                    <option>{from}</option>
                </select>
                <label htmlFor="To" >To</label>
                <select>
                    <option>{to}</option>
                </select>
                <button onClick={convertAmount}>Convert Amount</button>
                <p>{convertedAmt}</p>
            </div>
        </>
    )
}


export default Converter