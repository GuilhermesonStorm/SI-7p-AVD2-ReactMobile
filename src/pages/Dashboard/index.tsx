import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { InputMaskInvoiceValue } from '../../components/InputMaskInvoiceValue'

// interface IListInvoices {
//   id: string,
//   invoice: string,
//   client: string,
//   invoice_value: number;
// }

export function Dashboard() {
  const [invoice, setInvoice] = useState('')
  const [client, setClient] = useState('')
  const [invoice_value, setInvoiceValue] = useState('')
  
  async function handleAddInvoice() {
    const invoiceData = {
      id: new Date().getTime(),
      invoice,
      client,
      invoice_value: formatInvoiceValue(invoice_value),
    }
    console.log(invoiceData)
    try {
      const data = await AsyncStorage.getItem('@si:invoice')
      const currentData = data ? JSON.parse(data) : []
      const dataFormatted = [
        ...currentData,
        invoiceData
      ]
      await AsyncStorage.setItem('@si:invoice',
        JSON.stringify(dataFormatted))
    } catch (err) {
      console.log(err)
      Alert.alert('Error ao salvar a Nota Fiscal')
    }
    setInvoice('')
    setClient('')
    setInvoiceValue('')
  }

  async function loadDataInvoice() {
    const data = await AsyncStorage.getItem('@si:invoice')
    const currentData = data ? JSON.parse(data) : []
  }

  function formatInvoiceValue(salary: string) {
    return parseFloat(
      salary
        .slice(2, salary.length)
        .replace('.', '')
        .replace(',', '.')
    )
  }

  useEffect(() => {
    loadDataInvoice()
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Cadastro de NF de Serviço' />
      <ScrollView>
        <Input
          placeholder='No Nota Fiscal'
          placeholderTextColor='#5636d3'
          value={invoice}
          autoCapitalize='words'
          onChangeText={value => setInvoice(value)}
        />

        <Input
          placeholder='Cliente'
          placeholderTextColor='#5636d3'
          value={client}
          onChangeText={value => setClient(value)}
        />

        <InputMaskInvoiceValue
          placeholder='Valor NF'
          placeholderTextColor='#5636d3'
          value={invoice_value}
          onChangeText={value => setInvoiceValue(value)}
        />

        <Button
          title='Incluir'
          onPress={handleAddInvoice}
        />
      </ScrollView>


    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})



