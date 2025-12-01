import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function CalculatorScreen({ navigation }) {
  const { theme } = useTheme();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState([]);

  const handleNumberPress = (num) => {
    if (newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      if (display === "0") {
        setDisplay(num.toString());
      } else {
        setDisplay(display + num);
      }
    }
  };

  const handleOperationPress = (op) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculateResult();
      setPreviousValue(result);
      setDisplay(result.toString());
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculateResult = () => {
    const current = parseFloat(display);
    const previous = previousValue;

    switch (operation) {
      case "+":
        return previous + current;
      case "-":
        return previous - current;
      case "×":
        return previous * current;
      case "÷":
        return current !== 0 ? previous / current : 0;
      case "%":
        return previous % current;
      case "^":
        return Math.pow(previous, current);
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculateResult();
      const calculation = `${previousValue} ${operation} ${display} = ${result}`;

      setHistory([calculation, ...history.slice(0, 9)]); // Keep last 10 calculations
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(true);
    }
  };

  const handleSpecialFunction = (func) => {
    const current = parseFloat(display);
    let result;

    switch (func) {
      case "√":
        result = Math.sqrt(current);
        break;
      case "x²":
        result = current * current;
        break;
      case "1/x":
        result = current !== 0 ? 1 / current : 0;
        break;
      case "+/-":
        result = current * -1;
        break;
      case "sin":
        result = Math.sin(current * (Math.PI / 180));
        break;
      case "cos":
        result = Math.cos(current * (Math.PI / 180));
        break;
      case "tan":
        result = Math.tan(current * (Math.PI / 180));
        break;
      case "log":
        result = Math.log10(current);
        break;
      case "ln":
        result = Math.log(current);
        break;
      case "π":
        setDisplay(Math.PI.toString());
        setNewNumber(true);
        return;
      case "e":
        setDisplay(Math.E.toString());
        setNewNumber(true);
        return;
      default:
        return;
    }

    setDisplay(result.toString());
    setNewNumber(true);
  };

  const clearHistory = () => {
    Alert.alert("Clear History", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", onPress: () => setHistory([]) },
    ]);
  };

  const buttons = [
    ["C", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["+/-", "0", ".", "="],
  ];

  const scientificButtons = [
    ["sin", "cos", "tan", "^"],
    ["√", "x²", "1/x", "log"],
    ["ln", "π", "e", "!"],
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Calculator
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Scientific & Basic calculations
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Display */}
        <View
          style={[
            styles.displayContainer,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          {operation && (
            <Text
              style={[styles.operationText, { color: theme.textSecondary }]}
            >
              {previousValue} {operation}
            </Text>
          )}
          <Text
            style={[styles.displayText, { color: theme.text }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {display}
          </Text>
        </View>

        {/* Scientific Functions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Scientific Functions
          </Text>
          {scientificButtons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.buttonRow}>
              {row.map((btn) => (
                <TouchableOpacity
                  key={btn}
                  style={[
                    styles.button,
                    styles.scientificButton,
                    {
                      backgroundColor: theme.primary + "20",
                      borderColor: theme.primary,
                    },
                  ]}
                  onPress={() => handleSpecialFunction(btn)}
                >
                  <Text
                    style={[
                      styles.scientificButtonText,
                      { color: theme.primary },
                    ]}
                  >
                    {btn}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Basic Calculator */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Basic Operations
          </Text>
          {buttons.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.buttonRow}>
              {row.map((btn) => {
                let buttonStyle = [
                  styles.button,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ];
                let textStyle = [styles.buttonText, { color: theme.text }];

                if (["÷", "×", "-", "+", "="].includes(btn)) {
                  buttonStyle = [
                    styles.button,
                    {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                  ];
                  textStyle = [styles.buttonText, { color: "#FFF" }];
                }

                if (["C", "⌫", "%"].includes(btn)) {
                  buttonStyle = [
                    styles.button,
                    { backgroundColor: "#FF6B6B", borderColor: "#FF6B6B" },
                  ];
                  textStyle = [styles.buttonText, { color: "#FFF" }];
                }

                return (
                  <TouchableOpacity
                    key={btn}
                    style={buttonStyle}
                    onPress={() => {
                      if (btn === "C") handleClear();
                      else if (btn === "⌫") handleBackspace();
                      else if (btn === "=") handleEquals();
                      else if (btn === ".") handleDecimal();
                      else if (btn === "+/-") handleSpecialFunction(btn);
                      else if (["÷", "×", "-", "+", "%", "^"].includes(btn))
                        handleOperationPress(btn);
                      else handleNumberPress(btn);
                    }}
                  >
                    <Text style={textStyle}>{btn}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* History */}
        {history.length > 0 && (
          <View style={styles.section}>
            <View style={styles.historyHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                History
              </Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={[styles.clearHistory, { color: "#FF6B6B" }]}>
                  Clear
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.historyContainer,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              {history.map((item, index) => (
                <Text
                  key={index}
                  style={[styles.historyItem, { color: theme.textSecondary }]}
                >
                  {item}
                </Text>
              ))}
            </View>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    elevation: 4,
  },
  backButton: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  displayContainer: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 25,
    minHeight: 100,
    justifyContent: "flex-end",
    elevation: 3,
  },
  operationText: {
    fontSize: 18,
    textAlign: "right",
    marginBottom: 5,
  },
  displayText: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "right",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    elevation: 2,
  },
  scientificButton: {
    height: 50,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
  },
  scientificButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  clearHistory: {
    fontSize: 14,
    fontWeight: "600",
  },
  historyContainer: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
  },
  historyItem: {
    fontSize: 14,
    paddingVertical: 5,
  },
  spacer: {
    height: 30,
  },
});
