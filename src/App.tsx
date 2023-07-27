import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterAndLogin from './components/RegisterAndLogin'
import Home from './components/Home'
function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='/' element={<RegisterAndLogin />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
export default App