import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacityProps
} from 'react-native'

type InputProps = TextInputProps

// interface ButtonProps extends TouchableOpacityProps {
//   title: string;
// }
// export function Button({title, ...rest}: ButtonProps){}

export function Input({ ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
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