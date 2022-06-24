import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native'

import { TextInputMask } from 'react-native-masked-text'

type InputProps = TextInputProps

export function InputMaskInvoiceValue({ ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInputMask
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
        }}
        {...rest}
        style={styles.inputStyle} />
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10
  },
  inputStyle: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 14,
    marginTop: 2,
  }
})