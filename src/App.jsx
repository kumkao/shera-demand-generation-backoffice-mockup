import { Fragment, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getSpecsModel } from './lib/specs'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PrivateLayout from './layouts/PrivateLayout'
import './App.css'

const specsModel = getSpecsModel()

const getDefaultView = (route) => {
  if (route.hasListView) {
    return 'list'
  }

  if (route.hasDetailView) {
    return 'detail'
  }

  if (route.hasReportView) {
    return 'report'
  }

  return 'list'
}

const getDefaultRoutePath = (route) => `${route.route}/${getDefaultView(route)}`

function ModuleRoutePage({ route, mode }) {
  const navigate = useNavigate()
  const { id } = useParams()

  if (mode === 'list') {
    if (!route.ListComponent) {
      return <Navigate to={getDefaultRoutePath(route)} replace />
    }

    const ListComponent = route.ListComponent
    return <ListComponent onOpenDetail={(nextId) => navigate(`${route.route}/detail/${nextId}`)} />
  }

  if (mode === 'detail') {
    if (!route.DetailComponent) {
      return <Navigate to={getDefaultRoutePath(route)} replace />
    }

    const DetailComponent = route.DetailComponent
    return <DetailComponent selectedId={id || null} />
  }

  if (mode === 'report') {
    if (!route.ReportComponent) {
      return <Navigate to={getDefaultRoutePath(route)} replace />
    }

    const ReportComponent = route.ReportComponent
    return <ReportComponent />
  }

  return <Navigate to={getDefaultRoutePath(route)} replace />
}

function PrivateArea({ username, onLogout }) {
  const routes = useMemo(() => Array.from(specsModel.routes.values()), [])

  return (
    <PrivateLayout
      navItems={specsModel.navItems}
      userMenu={specsModel.userMenu}
      appVersion={specsModel.appVersion}
      username={username}
      onLogout={onLogout}
    >
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {routes.map((route) => {
          if (!route.route || route.route === '/home') {
            return null
          }

          return (
            <Fragment key={route.route}>
              <Route path={route.route} element={<Navigate to={getDefaultRoutePath(route)} replace />} />
              <Route path={`${route.route}/list`} element={<ModuleRoutePage route={route} mode="list" />} />
              <Route path={`${route.route}/detail/:id?`} element={<ModuleRoutePage route={route} mode="detail" />} />
              <Route path={`${route.route}/report`} element={<ModuleRoutePage route={route} mode="report" />} />
            </Fragment>
          )
        })}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </PrivateLayout>
  )
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState(() => sessionStorage.getItem('mock-username') || '')
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('mock-auth') === '1')

  const handleLogin = ({ username: nextUsername }) => {
    const name = nextUsername || 'Admin User'
    setUsername(name)
    setIsAuthenticated(true)
    sessionStorage.setItem('mock-auth', '1')
    sessionStorage.setItem('mock-username', name)
    navigate('/home', { replace: true })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    sessionStorage.removeItem('mock-auth')
    sessionStorage.removeItem('mock-username')
    navigate('/login', { replace: true })
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} loginSpec={specsModel.loginSpec} />
  }

  if (location.pathname === '/login') {
    return <Navigate to="/home" replace />
  }

  return <PrivateArea username={username} onLogout={handleLogout} />
}

export default App
