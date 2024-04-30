import {useEffect ,useRef ,useState } from 'react'

function App() {
    const [from, setFrom] = useState('inr');
    const [to, setTo] = useState('usd');
    const [currency, setCurrency] = useState({});
    const [amount, setAmount] = useState(0);
    const [convertedAmt,setConvertedAmt]=useState(0)

    // references
    const myInput = useRef(0);

    // setters 
    const setInputAmount = (e) => {
        setAmount(e.target.value)
    }


    // sending a request to the server for the currency conversion with three parameters in the URL 
    
    const convertCurrency = () => {
        const baseUrl = "/api/convert";
        const queryParams = new URLSearchParams({
            from: from,
            to: to,
            amount: amount
        });
        const finalUrl = baseUrl + "?" + queryParams.toString();
    
        fetch(finalUrl)
            .then(response => response.json())
            .then(data => {
                setConvertedAmt(data.convertedAmt);
            })
            .catch(error => console.error('Error converting currency:', error));
    };
    
    // useEffect to fetch the currency data from the server 

useEffect(() => { 
        fetch("/api").then(
            response => response.json()).then(
                data => { 
                    setCurrency(data)
            })
    },[])


    
    return (
        <>
            <div>
                <h1>converter</h1>
                <label htmlFor="">Amount</label>
                <input type="text" ref={myInput} value={amount} onChange={setInputAmount}/>
                <label htmlFor="From">From</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)}>
                    {   
                        Object.keys(currency).map((key, index) => {
                            return <option key={index} value={key}>{key}</option>
                        })
                    }
                </select>  <label htmlFor="To" >To</label>
                <select value={to} onChange={(e)=>setTo(e.target.value)}>
                    {   
                        Object.keys(currency).map((key, index) => {
                            return <option key={index} value={key}>{key}</option>
                        })
                    }
                </select>
            
                <button onClick={convertCurrency}>Convert Amount</button>
                <p>converted amount = {convertedAmt}</p>
            </div>
        </>
    )
}

export default App;