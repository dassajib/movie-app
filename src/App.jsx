import AppRoutes from "./appRoutes/AppRoutes"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-center" />
    </>
  )
}

export default App
