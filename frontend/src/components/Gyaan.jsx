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
                <div>
                    <label htmlFor='text1' className="bg-white text-black mx-5 px-3 rounded-md">Topic</label>
                    <input type='text' name="text1" placeholder='dsa' value={Text1} onChange={e => setText1(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='text1' className="bg-white text-black mx-5 px-3 rounded-md">Time/Duration: </label>
                    <input type='text' name="text2" placeholder='3 months' value={Text2} onChange={e => setText2(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='text1' className="bg-white text-black mx-5 px-3 rounded-md">Level: </label>
                    <input type='text' name="text3" placeholder='newbie' value={Text3} onChange={e => setText3(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='text1' className="bg-white text-black mx-5 px-3 rounded-md">additional comments: </label>
                    <input type='text' name="text4" placeholder='from c++' value={Text4} onChange={e => setText4(e.target.value)}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
        <pre>{info["response"]}</pre>
        <div id="form2" class="hide">
            <form onSubmit={handleSubmit2}>
                <label htmlFor="prompt">Prompt: </label>
                <input type='text' name="prompt" placeholder='prompt' value={Text1} onChange={e => setText1(e.target.value)}/>
                <button>Submit</button>
            </form>
        </div>
        
        <button onClick={handleClear}>Clear</button>
    </>
  )
}

export default Gyaan