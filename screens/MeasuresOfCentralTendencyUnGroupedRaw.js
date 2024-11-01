import { useState } from "react";
import {View, Text,  TouchableOpacity, TextInput} from "react-native"
import styles from "./styles";

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
       
    </View>
  );
};

export default MeasuresOfCentralTendencyUngroupedRaw;
