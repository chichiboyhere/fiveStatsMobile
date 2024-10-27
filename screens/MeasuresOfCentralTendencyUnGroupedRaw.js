import { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native"

const MeasuresOfCentralTendencyUngroupedRaw = () => {
  const [input, setInput] = useState("");
  const [mean, setMean] = useState(null);
  const [mode, setMode] = useState(null);
  const [median, setMedian] = useState(null);
  const [invalidInput, setInvalidInput] = useState("");

  const handleDataProcessing = () => {
    const numbers = input
      .split(",")
      .map((num) => parseFloat(num.trim()))
      .filter((num) => !isNaN(num));
    if (numbers.length === 0) {
      setInvalidInput("Invalid input");
      return;
    }

    calculateMean(numbers);
    calculateMode(numbers);
    calculateMedian(numbers);
  };

  const calculateMean = (numbers) => {
    let sum = 0;
    for (let num of numbers) sum += num; // sum = sum + num
    let mean = sum / numbers.length;
    setMean(`Mean: ${mean}`);
  };

  const calculateMode = (numbers) => {
    const frequency = {};
    numbers.forEach((num) => {
      // ascribe 1 to the frequency of any new number and increase the frequency of an existing number by one
      frequency[num] = (frequency[num] || 0) + 1;
    });

    //console.log(frequency);
    const maxFrequency = Math.max(...Object.values(frequency)); // returns the maximum value of the frequency object
    const modes = Object.keys(frequency).filter(
      (num) => frequency[num] === maxFrequency
    ); // get the mode(s) from the keys of the frequency object where the frequency match the maximum frequency

    setMode(
      modes.length > 1 && maxFrequency > 1
        ? `Multiple modes: ${modes.join(", ")}`
        : maxFrequency === 1
        ? `Mode: No Modes`
        : `Mode: ${modes[0]}`
    );
  };

  const calculateMedian = (numbers) => {
    let sortedNumbers = numbers.sort((a, b) => a - b);
    let N = sortedNumbers.length;
    let x = (N + 1) / 2 - 1;
    let median;
    if (Number.isInteger(x)) {
      median = sortedNumbers[x];
    } else {
      x = parseInt(x);
      median = (sortedNumbers[x] + sortedNumbers[x + 1]) / 2;
    }
    setMedian(`Median: ${median}`);
  };

  const handleReset = () => {
    setInput("");
    setInvalidInput("");
    setMean(null);
    setMode(null);
    setMedian(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Mean, Mode and Median Calculator
      </Text>
      <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Enter numbers separated by commas"
        placeholderTextColor={"white"}
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleDataProcessing}
          style={styles.calcButton}
        >
          <Text>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReset}
          style={styles.resetButton}
        >
          <Text>Reset</Text>
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
       
    </View>
  );
};

export default MeasuresOfCentralTendencyUngroupedRaw;
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    header: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '700',
        marginBottom: 16,
        color: "white"
    },
    textInput: {
        width: "100%",
        padding: 8,
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 4,
        marginBottom: 16,
        color: "white"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 8
    },
    calcButton: {
        width: "45%",
        backgroundColor: "#3b82f6",
        padding: 8,
        color: "white",
        borderRadius: 4,
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    resetButton: {
        width:"45%",
        backgroundColor: "#eab308",
        color: "white",
        padding: 8,
        borderRadius:4,
        justifyContent: "center",
        alignItems: "center"
    },
    invalidInputMsg: {
        marginTop: 16,
        fontSize: 18,
        lineHeight: 28,
        color: "red"
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