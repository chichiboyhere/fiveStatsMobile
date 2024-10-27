import  { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView } from 'react-native';

const MeasuresOfCentralTendencyGrouped = () => {
  const [data, setData] = useState([{id: 1, lower: '', upper: '', frequency: '' }]);
  const [mean, setMean] = useState(null)
  const [mode, setMode] = useState(null)
  const [median, setMedian] = useState(null);
  const [invalidInput, setInvalidInput] = useState('');

  const handleChange = (id, field, value) => {
    setData(data.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleAddRow = () => {
    const newId = data.length + 1;
    setData([...data, { id: newId, lower: '', upper: '', frequency: '' }]);
  };

  const removeRow = (id) => {
   
    if (data.length === 1) {
      Alert.alert('Error', 'At least one row is required!');
      return;
    }
    setData(data.filter(row => row.id !== id)); 
  };

  const handleReset = () => {
    setData([{  id: 1, lower: '', upper: '', frequency: '' }])
    setMean(null)
    setMode(null)
    setMedian(null)
  }

  const handleCalculateMean = () => {
         
    try{
      const totalFrequency = data.reduce((sum, item) => sum + parseInt(item.frequency), 0);
      const weightedSum = data.reduce((sum, item) => sum + ((parseFloat(item.lower) + parseFloat(item.upper)) * 0.5 * parseInt(item.frequency)), 0);
      const meanValue = weightedSum / totalFrequency;
      setMean(meanValue)
      handleCalculateMedian();
      handleCalculateMode();
    }
    catch(err){
      setInvalidInput(err.message)
    }
   };

  const handleCalculateMedian = () => {
    let totalFrequency = 0;
    let cumulativeFrequency = [];
    data.forEach((row, index) => {
      totalFrequency += parseFloat(row.frequency);
      cumulativeFrequency[index] = totalFrequency;
     
    });

    const N = totalFrequency / 2;

    let medianClassIndex = cumulativeFrequency.findIndex((cf) => cf >= N);

    let x = parseFloat(data[medianClassIndex].lower) - parseFloat(data[medianClassIndex - 1].upper)
    let L;
    (x === 0)? L = parseFloat(data[medianClassIndex].lower) : L = parseFloat(data[medianClassIndex].lower) - (x * 0.5)
    //let L = parseFloat(data[medianClassIndex].lower);
    let F = parseFloat(data[medianClassIndex].frequency);
    let C = cumulativeFrequency[medianClassIndex - 1] || 0;
    let y = parseFloat(data[medianClassIndex].upper) - parseFloat(data[medianClassIndex].lower);
    let h;
    (x === 0) ? h = y : h = y + x

    let median = L + ((N - C) / F) * h;
    setMedian(median);
  };

  const handleCalculateMode = () => {
    let maxFrequency = 0;
    let modeClassIndex = 0;

    data.forEach((row, index) => {
      console.log(index)
      if (parseFloat(row.frequency) > maxFrequency) {
        maxFrequency = parseFloat(row.frequency);
        modeClassIndex = index;
      }
    });

    let x = parseFloat(data[modeClassIndex].lower) - parseFloat(data[modeClassIndex - 1].upper)
    let L;
    (x === 0)? L = parseFloat(data[modeClassIndex].lower) : L = parseFloat(data[modeClassIndex].lower) - (x * 0.5)

    let f1 = parseFloat(data[modeClassIndex].frequency);
    let f0 = parseFloat(data[modeClassIndex - 1]?.frequency || 0);
    let f2 = parseFloat(data[modeClassIndex + 1]?.frequency || 0);
    let y = parseFloat(data[modeClassIndex].upper) - parseFloat(data[modeClassIndex].lower);
    let h;
    (x === 0) ? h = y : h = y + x

    let mode = L + ((f1 - f0) / ((f1 - f0) + (f1 - f2))) * h;
    setMode(mode);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Mean, Median, and Mode (Grouped Data)</Text>

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
                onChangeText={(text) => handleChange(item.id, 'lower', text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Upper"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.upper}
                onChangeText={(text) => handleChange(item.id, 'upper', text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Frequency"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                value={item.frequency}
                onChangeText={(text) => handleChange(item.id, 'frequency', text)}
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

        <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
            <Text style={styles.addButtonText}>Add Row</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCalculateMean}
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
          <Text style={styles.outputText}>Mean: {mean}</Text>
        </View>
      )}

      {mode !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Mode: {mode}</Text>
        </View>
      )}

      {median !== null && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Median: {median}</Text>
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
})

export default MeasuresOfCentralTendencyGrouped;
