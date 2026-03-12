import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import { Loader } from "./components/loader/Loader"
import { AppRouter } from "./routes/AppRouter"


function App() {

  return (
    <>
     <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App
