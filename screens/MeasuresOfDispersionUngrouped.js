import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import styles from "./styles"

const MeasuresOfDispersionUngrouped = () => {
  const [data, setData] = useState([{id: 1, value: "", frequency: 1 }]);
  const [range, setRange] = useState(null);
  const [meanDeviation, setMeanDeviation] = useState(null);
  const [variance, setVariance] = useState(null);
  const [standardDev, setStandardDev] = useState(null);
  const [invalidInput, setInvalidInput] = useState("");
 
  const calculateRange = () => {
    let nums = [];
    for (let i = 0; i < data.length; i++) {
      nums.push(parseFloat(data[i].value));
    }
    let min = Math.min(...nums);
    let max = Math.max(...nums);
    setRange(max - min);
  };

  const calculateMean = () => {
    //if (data.length === 0) return;

    try{
      const totalFrequency = data.reduce(
        (sum, item) => sum + parseInt(item.frequency),
        0
      );
      const weightedSum = data.reduce(
        (sum, item) => sum + parseFloat(item.value) * parseInt(item.frequency),
        0
      );
      const meanValue = weightedSum / totalFrequency;
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
        sum + Math.abs(parseFloat(item.value) - mean) * parseInt(item.frequency),
      0
    );
    const meanDev = devFromMean / sumFreq;
    setMeanDeviation(meanDev);
  };

  const calcVariance = (mean, sumFreq) => {
    const summationfxsquared = data.reduce(
      (sum, item) =>
        sum + Math.pow(parseFloat(item.value) - mean, 2) * parseInt(item.frequency),
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
    setData([...data, { id: newId, value: '', frequency: 1 }]);
  };

  const handleReset = () => {
    setData([{id:1, value: "", frequency: 1 }]);
    setRange(null);
    setMeanDeviation(null);
    setStandardDev(null);
    setVariance(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Range, Mean Deviation, Variance, Standard Deviation (Ungrouped)Calculator</Text>
       <Text style={styles.additionalHeaderText}>You may ignore the frequency field if its value is not greater than 1</Text>
       <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Value</Text>
          <Text style={styles.subHeaderText}>Frequency</Text>
        </View>
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={styles.row}>
                <TextInput
                style={styles.input}
                placeholder="Value"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.value}
                onChangeText={(text) => updateRow(item.id, 'value', text)}
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


export default MeasuresOfDispersionUngrouped;
