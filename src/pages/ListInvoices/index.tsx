import { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, FlatList, Alert, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Header } from "../../components/Header";
import { ListCard } from '../../components/ListCard';

interface IListInvoices {
  id: string,
  invoice: string,
  client: string,
  invoice_value: number;
}

export function ListInvoices() {
  const [status, setStatus] = useState('')
  const [invoiceData, setInvoiceData] = useState<IListInvoices[]>([])

  function handleDeleteInvoice(id: string) {
    Alert.alert("Exclusão", 'Tem certeza?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: () => {
          setStatus('E')
          setInvoiceData(inv =>
            invoiceData.filter(inv => inv.id !== id))
        },
      }
    ])
  }

  async function loadDataInvoice() {
    const data = await AsyncStorage.getItem('@si:invoice')
    if (data) {
      console.log(data)
      setInvoiceData(JSON.parse(data))
    }
  }

  useEffect(() => {
    loadDataInvoice()
  }, [])

  useFocusEffect(useCallback(() => {
    loadDataInvoice()
  }, []))

  useEffect(() => {
    async function saveInvoices() {
      await AsyncStorage.setItem('@si:invoice', JSON.stringify(invoiceData))
    }
    saveInvoices()
  }, [invoiceData])

  function totNF() {
    return invoiceData.reduce((total, v) => total += Number(v.invoice_value), 0).toFixed(2)
  }

  function totPis() {
    return invoiceData.reduce((total, v) => total += Number(v.invoice_value * 0.65 / 100), 0).toFixed(2)
  }

  function totCofins() {
    return invoiceData.reduce((total, v) => total += Number(v.invoice_value * 3 / 100), 0).toFixed(2)
  }

  function totCsll() {
    return invoiceData.reduce((total, v) => total += Number(v.invoice_value * 1 / 100), 0).toFixed(2)
  }

  function totIss() {
    return invoiceData.reduce((total, v) => total += Number(v.invoice_value * 4 / 100), 0).toFixed(2)
  }

  function totLiq() {
    return invoiceData.reduce((total, v) => total += Number(v.invoice_value), 0).toFixed(2)
  }
  return (
    <View style={styles.container}>
      <Header title='Listam de NF Serviço' />

      <View style={styles.content}>
          <Text style={styles.textCard}>Total do valor da NF: R$ {totNF()}</Text>
          <Text style={styles.textCard}>Total do valor do Pis: R$ {totPis()}</Text>
          <Text style={styles.textCard}>Total do valor do Cofins: R$ {totCofins()}</Text>
          <Text style={styles.textCard}>Total do valor do Csll: R$ {totCsll()}</Text>
          <Text style={styles.textCard}>Total do valor do Iss: R$ {totIss()}</Text>
          <Text style={styles.textCard}>Total do valor líquido da NF: R$ {(Number(totNF()) - Number(totPis()) - Number(totCofins()) - Number(totCsll()) - Number(totIss())).toFixed(2)}</Text>
        </View>


        <FlatList
          data={invoiceData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListCard
              item={item}
              onPress={() => handleDeleteInvoice(item.id)}
            />
          )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  },
  content: {
    marginTop: 5,
    marginLeft: 5,
    padding: 6,
  },
  textCard: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    flexDirection: 'row',
    marginBottom: 4
  },
})

