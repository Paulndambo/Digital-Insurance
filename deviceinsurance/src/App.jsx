import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DeviceInsurance from './DeviceInsurance'
import MobileWarning from './components/MobileWarning'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MobileWarning />
      <DeviceInsurance />
    </>
  )
}

export default App
