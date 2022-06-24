import {
  View,
  TouchableOpacity,
  Text, StyleSheet,
  TouchableOpacityProps
} from 'react-native'

interface IListInvoices {
  id: string,
  invoice: string,
  client: string,
  invoice_value: number;
}

interface ListCardProps extends TouchableOpacityProps {
  item: IListInvoices;
}

export function ListCard({ item, ...rest}: ListCardProps) {
  const pis = item.invoice_value * 0.65 / 100;
  const cofins = item.invoice_value * 3 / 100;
  const iss = item.invoice_value * 4 / 100;
  const csll = item.invoice_value * 1 / 100;
  const liquido = item.invoice_value - pis - cofins - iss - csll;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonCard}
        key={item.id}
        {...rest}>

        <Text style={styles.titleCard}>Dados da NF:</Text>

        <View style={styles.separator} />

        <Text style={styles.textCard}>Nota Fiscal: {item.invoice}</Text>
        <Text style={styles.textCard}>Cliente: {item.client}</Text>
        <Text style={styles.textCard}>Valor da NF: R$ {item.invoice_value.toFixed(2)}</Text>
        <Text style={styles.textCard}>Valor do Pis: R$ {pis.toFixed(2)}</Text>
        <Text style={styles.textCard}>Valor do Cofins: R$ {cofins.toFixed(2)}</Text>
        <Text style={styles.textCard}>Valor do Csll: R$ {csll.toFixed(2)}</Text>
        <Text style={styles.textCard}>Valor do Iss: R$ {iss.toFixed(2)}</Text>
        <Text style={styles.textCard}>Valor Liquido da NF: R$ {liquido.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  buttonCard: {
    width: '100%',
    padding: 6,
    backgroundColor: '#969CB2',
    borderRadius: 10
  },
  textCard: {
    color: '#ffffff',
    fontSize: 18,
    flexDirection: 'row',
  },
  titleCard: {
    color: '#ff872c',
    fontSize: 26,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  separator: {
    marginTop: 10,
    borderBottomWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff'
  }
})




