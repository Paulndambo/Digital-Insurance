import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DeviceInsurance from './DeviceInsurance'
import ActivateAccountPage from './components/ActivateAccountPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activate" element={<ActivateAccountPage />} />
        <Route path="/*" element={<DeviceInsurance />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
