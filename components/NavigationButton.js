import { View, Text, StyleSheet } from 'react-native'

const NavigationButton = ({title}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default NavigationButton

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: 'blue'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
      },
})