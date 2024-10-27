import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';

const MeasuresOfCentralTendencyUngroupedTabulated = () => {
  const [rows, setRows] = useState([{ id: 1, value: '', frequency: '' }]);
  const [invalidInput, setInvalidInput] = useState('');
  const [mean, setMean] = useState(null);
  const [mode, setMode] = useState(null);
  const [median, setMedian] = useState(null);
 
  // Function to add a new row
  const addRow = () => {
    const newId = rows.length + 1;
    setRows([...rows, { id: newId, value: '', frequency: '' }]);
  };

  // Function to remove a row
  const removeRow = (id) => {
    if (rows.length === 1) {
      Alert.alert('Error', 'At least one row is required!');
      return;
    }
    setRows(rows.filter(row => row.id !== id)); 
  };

  // Function to update row values
  const updateRow = (id, field, value) => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
   
  };


  // Function to calculate Mean, Mode, and Median
  const calculate = () => {
    
    try{
        const parsedData = rows.map(row => ({
            value: parseFloat(row.value),
            frequency: parseFloat(row.frequency),
          }));
      
         
          const allValues = parsedData
            .map(row => Array(row.frequency).fill(row.value))
            .flat()
            .sort((a, b) => a - b);
      
          const totalFrequency = parsedData.reduce((sum, row) => sum + row.frequency, 0);
          const sum = parsedData.reduce((sum, row) => sum + row.value * row.frequency, 0);
      
          const mean = sum / totalFrequency;
      
          const median = calculateMedian(allValues);
          const mode = calculateMode(allValues);
      
          // Alert.alert(
          //   'Results',
          //   `Mean: ${mean.toFixed(2)}\nMedian: ${median}\nMode: ${mode}`
          // );
          setMode(`Mode: ${mode}`);
          setMean(`Mean: ${mean.toFixed(2)}`);
          setMedian(`Median: ${median}`);  
         
    }
    catch(err){
        setInvalidInput(err.message)
    }
  };

  const calculateMedian = (values) => {
    const mid = Math.floor(values.length / 2);
    return values.length % 2 === 0
      ? (values[mid - 1] + values[mid]) / 2
      : values[mid];
  };

  const calculateMode = (values) => {
    const frequencyMap = values.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    const maxFrequency = Math.max(...Object.values(frequencyMap));
    const modes = Object.keys(frequencyMap)
      .filter(key => frequencyMap[key] === maxFrequency)
      .map(Number);

    return modes.length === values.length ? 'No Mode' : modes.join(', ');
  };
  const handleReset = () => {
    setRows([{ id: 1, value: '', frequency: '' }])
    setInvalidInput("");
    setMean(null);
    setMode(null);
    setMedian(null);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Mean, Median, and Mode Calculator</Text>

        <FlatList
            data={rows}
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
              onPress={calculate}
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
          <Text style={styles.outputText}>{mean}</Text>
        </View>
      )}

      {mode !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>{mode}</Text>
        </View>
      )}

      {median !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>{median}</Text>
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

export default MeasuresOfCentralTendencyUngroupedTabulated;




