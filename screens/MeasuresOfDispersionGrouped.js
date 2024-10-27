import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';

const MeasuresOfDispersionGrouped = () => {
  const [data, setData] = useState([{id:1, lower: "", upper: "", frequency: "" }]);
  const [range, setRange] = useState(null);
  const [mean, setMean] = useState(null);
  const [meanDeviation, setMeanDeviation] = useState(null);
  const [variance, setVariance] = useState(null);
  const [standardDev, setStandardDev] = useState(null);
  const [invalidInput, setInvalidInput] = useState("");
  

  const calculateRange = () => {
    let nums = [];
    for (let i = 0; i < data.length; i++) {
      nums.push(parseFloat(data[i].lower));
      nums.push(parseFloat(data[i].upper));
    }
    let min = Math.min(...nums);
    let max = Math.max(...nums);
    setRange(max - min);
  };

  const calculateMean = () => {
    
    try{
      const totalFrequency = data.reduce(
        (sum, item) => sum + parseInt(item.frequency),
        0
      );
      const weightedSum = data.reduce(
        (sum, item) =>
          sum +
          (parseFloat(item.lower) + parseFloat(item.upper)) *
            0.5 *
            parseInt(item.frequency),
        0
      );
      const meanValue = weightedSum / totalFrequency;
  
      setMean(meanValue);
      calcMeanDeviation(meanValue, totalFrequency);
      calcVariance(meanValue, totalFrequency);
      calculateRange();
    }
    catch(err){
      setInvalidInput(err.message)
    }
  };

  const calcMeanDeviation = (mean, sumFreq) => {
    const devFromMean = data.reduce(
      (sum, item) =>
        sum +
        Math.abs(
          (parseFloat(item.lower) + parseFloat(item.upper)) * 0.5 - mean
        ) *
          parseInt(item.frequency),
      0
    );
    const meanDev = devFromMean / sumFreq;
    setMeanDeviation(meanDev);
  };

  const calcVariance = (mean, sumFreq) => {
    const summationfxsquared = data.reduce(
      (sum, item) =>
        sum +
        Math.pow(
          (parseFloat(item.lower) + parseFloat(item.upper)) * 0.5 - mean,
          2
        ) *
          parseInt(item.frequency),
      0
    );
    const varian = summationfxsquared / sumFreq;
    setVariance(varian);
    calcStandardDeviation(varian);
  };

  const calcStandardDeviation = (varian) => {
    const sd = Math.sqrt(varian);
    setStandardDev(sd);
  };

  // Function to remove a row
  const removeRow = (id) => {
    if (data.length === 1) {
      Alert.alert('Error', 'At least one row is required!');
      return;
    }
    setData(data.filter(row => row.id !== id)); 
  };

  // Function to update row values
  const updateRow = (id, field, value) => {
    setData(data.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
   
  };

  // Function to add a new row
  const addRow = () => {
    const newId = data.length + 1;
    setData([...data, {id:newId, lower: "", upper: "", frequency: "" }]);
  };

  const handleReset = () => {
    setData([{id:1, lower: "", upper: "", frequency: "" }]);
    setMean(null);
    setRange(null);
    setMeanDeviation(null);
    setStandardDev(null);
    setVariance(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}> Range, Mean, Mean Deviation, Variance, Standard Deviation (Grouped Data)
        Calculator</Text>

        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.row}>
                <TextInput
                style={styles.input}
                placeholder="Lower"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.lower}
                onChangeText={(text) => updateRow(item.id, 'lower', text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Upper"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.upper}
                onChangeText={(text) => updateRow(item.id, 'upper', text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Frequency"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.frequency}
                onChangeText={(text) => updateRow(item.id, 'frequency', text)}
                />
                <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeRow(item.id)}
                >
                <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
            )}
            scrollEnabled={false} // Disable FlatList scrolling
        />

        <TouchableOpacity style={styles.addButton} onPress={addRow}>
            <Text style={styles.addButtonText}>Add Row</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={calculateMean}
              style={styles.calcButton}
            >
            <Text style={styles.addButtonText}>Calculate</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={handleReset}
            style={styles.resetButton}
            >
            <Text style={styles.addButtonText}>Reset</Text>
            </TouchableOpacity>
      </View>
      {invalidInput && (
        <Text style={styles.invalidInputMsg}>{invalidInput}</Text>
      )} 
      {mean !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Mean(Not a measure of dispersion): {mean}</Text>
        </View>
      )}
      {range !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Range: {range}</Text>
        </View>
      )}

      {meanDeviation !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Mean Deviation: {meanDeviation}</Text>
        </View>
      )}

      {variance !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Variance: {variance}</Text>
        </View>
      )}
      {standardDev !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Standard Deviation: {standardDev}</Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
});
export default MeasuresOfDispersionGrouped;
