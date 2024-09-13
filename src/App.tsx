import { Route, Routes } from "react-router-dom"
import Login from "./screens/login"
import Home from "./screens/home"
import Play from "./screens/play"
import Results from "./screens/results"

function App() {
  return(
    <div className="app">
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/home" element={ <Home/> } />
        <Route path="/play/:quizid" element={ <Play/> } />
        <Route path="/results" element={ <Results/> } />
      </Routes>
    </div>
  )
}

export default App
