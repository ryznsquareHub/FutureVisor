import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { FutureVisorLanding } from './FutureVisorLanding'
import { captureUtmOnce } from './lib/utm'
import { trackPageView } from './lib/tracker'

const AdminPage = lazy(() =>
  import('./admin/AdminPage').then((m) => ({ default: m.AdminPage })),
)

function RouteTracker() {
  const loc = useLocation()
  useEffect(() => {
    captureUtmOnce()
    void trackPageView()
  }, [loc.pathname, loc.search])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center text-sm text-slate-400">
                  로딩 중…
                </div>
              }
            >
              <AdminPage />
            </Suspense>
          }
        />
        <Route path="*" element={<FutureVisorLanding />} />
      </Routes>
    </BrowserRouter>
  )
}
