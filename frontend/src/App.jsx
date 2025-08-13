import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <a href="https://vite.dev" target="_blank" className="inline-block mr-4">
            <img src={viteLogo} className="logo w-16 h-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className="inline-block">
            <img src={reactLogo} className="logo react w-16 h-16" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Vite + React</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-600">
            Edit <code className="bg-gray-200 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-gray-500 mt-8 text-3xl font-bold underline decoration-blue-500">
          Hello World with Tailwind CSS! 🎉
        </p>
        
        <p className="text-gray-400 mt-4">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
