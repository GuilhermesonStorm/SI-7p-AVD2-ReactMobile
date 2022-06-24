import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

import { Dashboard } from '../pages/Dashboard'
import { ListInvoices } from '../pages/ListInvoices'

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff872c',
        tabBarInactiveTintColor: '#969cb2',
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88
        }
      }}
    >
      <Screen
        name="Cadastro"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <AntDesign
              name='adduser'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="Listagem"
        component={ListInvoices}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather
              name='list'
              size={size}
              color={color}
            />
          )
        }}
      />

    </Navigator>
  )
}