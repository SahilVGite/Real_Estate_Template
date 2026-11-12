import AppProviders from './context/AppProviders'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}
