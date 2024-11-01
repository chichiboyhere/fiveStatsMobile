import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        padding: 20,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: "white"
      },
      additionalHeaderText: {
        color: "white",
        paddingBottom: 12
      },
      subHeader: {
        display: "flex",
        flexDirection: "row",
        width: "70%",
        marginLeft: 8,
        justifyContent: "space-between",
        paddingBottom: 8
      },
      subHeaderText: {
        fontSize: 12,
        color: "white"
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      textInput: {
        width: "100%",
        padding: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 4,
        marginBottom: 16,
        color: "white",
        autoComplete: "off"
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        flex: 1,
        color: 'white',
        textAlign: 'center',
        fontSize: 18
      },
      invalidInputMsg: {
        marginTop: 16,
        fontSize: 18,
        lineHeight: 28,
        color: "red"
      },
      removeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
      },
      removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
      },
      addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },
      buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 8
      },
      calcButton: {
        width: "45%",
        backgroundColor: "green",
        padding: 8,
        color: "white",
        borderRadius: 4,
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center", 
      },
      resetButton: {
        width:"45%",
        backgroundColor: "#eab308",
        color: "white",
        padding: 8,
        borderRadius:4,
        justifyContent: "center",
        alignItems: "center",
        },
      outputContainer: {
        padding:16,
        marginTop: 16,
        backgroundColor: "#dcfce7",
        borderWidth: 1,
        borderColor: "#4ade80",
        borderRadius: 4
        },
      outputText: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: "blue"
        }
})

export default styles