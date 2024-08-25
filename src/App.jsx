import React, { useCallback, useEffect, useState, useRef } from 'react';

function App() {

  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordReference = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*-_+=~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordReference.current?.select()
    passwordReference.current?.setSelectionRange(0, 80)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 mt-40 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center text-xl mb-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-6'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordReference}
          />
          <button className='bg-blue-700 text-white px-2 py-2 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-4'>
          <div>
            <input type="range"
              min={6}
              max={80}
              value={length}
              className='cursor-pointer mx-1'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length ({length})</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id='characterInput'
              onChange={() => { setCharacterAllowed((prev) => !prev) }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
};

export default App;