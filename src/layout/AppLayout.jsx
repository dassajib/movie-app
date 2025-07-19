import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { Suspense } from "react"
import NavBar from "../components/NavBar"
import Loading from "../components/Loading"

const AppLayout = () => {
  const location = useLocation()

  return (
    <div>
      <NavBar />
      <main className="min-h-screen px-4 py-6 sm:px-8">
        <Suspense fallback={<Loading />}>
          {/* animation component */}
          <AnimatePresence mode="wait" initial={false}>
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  )
}

export default AppLayout
