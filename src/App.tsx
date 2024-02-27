import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { AuthProvider } from './contexts/JWTAuthContext';
import { MatxTheme } from './components';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <MatxTheme>
        <AuthProvider>{content}</AuthProvider>
      </MatxTheme>
    </SettingsProvider>
  )
}

export default App
