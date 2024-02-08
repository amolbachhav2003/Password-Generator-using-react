import { useCallback, useState, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllow){
      str += "0123456789"
    }
    else if(charAllow){
      str += "!@#$%^&*-_=+[]{}`~"
    }

    for(let i = 0; i < length; i++){

      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)


  } , [length, numAllow, charAllow])

  const copyPasswordToClipBoard = useCallback( () => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 50)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow])

  return (
    <>
      <div id='main'>
        <h1>PASSWORD GENERATOR</h1>
        <input id='input' type="text" value={password} placeholder='PASSWORD' readOnly ref={passwordRef} />
        <button onClick={copyPasswordToClipBoard}>COPY</button>

          <div id="checkbox">
            <input type="range" min={8} max={50} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label id='label1'>Length: {length}</label>
            <input type="checkbox" defaultChecked={numAllow} id='numberInput' onChange={() => {setNumAllow((prev) => !prev)}} />
            <label>Numbers</label>
            <input type="checkbox" defaultChecked={charAllow} id='charInput' onChange={() => {setCharAllow((prev) => !prev)}} />
            <label>Character</label>
          </div>

      </div>
    </>
  )
}

export default App
