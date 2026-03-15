import { Suspense } from "react"
import { Loader } from "./components/loader/Loader"
import { AppRouter } from "./routes/AppRouter.jsx"
import { BrowserRouter } from "react-router-dom"
import { AppProviders } from "./providers/AppProviders.jsx"


function App() {
  return (
    <>
    <AppProviders>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </AppProviders>
    </>
  )
}

export default App
