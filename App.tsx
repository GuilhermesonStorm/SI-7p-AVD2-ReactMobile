import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import { AppRoutes } from './src/routes/app.routes'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <AppRoutes />
    </NavigationContainer>
  )
}
