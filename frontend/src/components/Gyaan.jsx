import React  , { useState } from 'react'
import "./Gyaan.css";
const Gyaan = () => {
    const [Text1, setText1] = useState('')
    const [Text2, setText2] = useState('')
    const [Text3, setText3] = useState('')
    const [Text4, setText4] = useState('')

    const [info , setInfo] = useState('');

    const handleSubmit2 = async (e) => {
        e.preventDefault()

        const data = {
            prompt: Text1
        }
        
        setText1('')
        await fetch("http://127.0.0.1:5000/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data => setInfo(data))
        .catch(error => console.error(error));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        document.getElementById("form1").className = "hide";
        document.getElementById("form2").className = "show";
        const data = {
            topic: Text1,
            time: Text2,
            level:Text3,
            addComm:Text4,
            prompt: ""
        }
        
        setText1('')
        setText2('')
        setText3('')
        setText4('')

        await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => setInfo(data))
        .catch(error => console.error(error));
    }

    const handleClear = async () => {
        setInfo('')
        setText1('');
        document.getElementById("form1").className = "show";
        document.getElementById("form2").className = "hide";
    }
    const handleDelete = async () => {
        await fetch('http://127.0.0.1:5000/chat', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }

  return (
    <>
        <h1>GYAAN PATH</h1>
        <div id="form1">
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='topic' value={Text1} onChange={e => setText1(e.target.value)}/>
                <input type='text' placeholder='time' value={Text2} onChange={e => setText2(e.target.value)}/>
                <input type='text' placeholder='level' value={Text3} onChange={e => setText3(e.target.value)}/>
                <input type='text' placeholder='additional comments' value={Text4} onChange={e => setText4(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
        <pre>{info["response"]}</pre>
        <div id="form2" class="hide">
            <form onSubmit={handleSubmit2}>
                <input type='text' placeholder='prompt' value={Text1} onChange={e => setText1(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
        
        <button onClick={handleClear}>Clear</button>
    </>
  )
}

export default Gyaan