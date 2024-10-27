import { View, StyleSheet, TouchableOpacity, Text} from "react-native"

const Topics = ({navigation}) => {
    return(
      <View style={styles.container}>
         <TouchableOpacity
          style={styles.buttonDeco} 
          onPress={() => navigation.navigate('MeasuresOfCentralTendencyUngroupedRaw')}
          >
          <Text style={styles.buttonText}> Measures Of Central Tendency Ungrouped (Raw Data)</Text>
          </TouchableOpacity>
         <TouchableOpacity
          style={styles.buttonDeco} 
          onPress={() => navigation.navigate('MeasuresOfCentralTendencyUngroupedTabulated')}
        >
          <Text style={styles.buttonText}>Measures Of Central Tendency Ungrouped (Tabulated)</Text>
          </TouchableOpacity>
        <TouchableOpacity
         style={styles.buttonDeco} 
          onPress={() => navigation.navigate('MeasuresOfCentralTendencyGrouped')}
        >
          <Text style={styles.buttonText}>Measures Of Central Tendency Grouped</Text>
          </TouchableOpacity>
        <TouchableOpacity
         style={styles.buttonDeco} 
          onPress={() => navigation.navigate('MeasuresOfDispersionUngrouped')}
        >
          <Text style={styles.buttonText}>Measures Of Dispersion Ungrouped</Text>
          </TouchableOpacity>
        <TouchableOpacity
         style={styles.buttonDeco} 
          onPress={() => navigation.navigate('MeasuresOfDispersionGrouped')}
        >
          <Text style={styles.buttonText}>Measures Of Dispersion Grouped</Text>
          </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonDeco : {
    backgroundColor: "cornflowerblue",
    borderWidth: 2,
    borderColor: "white",
    margin: 8,
    width: "100%",
    borderRadius: 16,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 18,
    color: "white"
  }

})
export default Topics