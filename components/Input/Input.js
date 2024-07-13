import React, { useState } from "react";
import { View,Text, TextInput, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/addSlice";
import Button from "../UI/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalStyles } from "../../constants/style";
import IconButton from "../UI/IconButton";
import { getFormattedDate } from "../../util/date";

function AddExpenseForm({ goback }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date()); // Initialize with Date object
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.add.data);


  const toggleShowPicker = () => {
    setShowPicker((prevState) => !prevState);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate); // Store selected date as Date object
    }
  };

  const handleAddExpense = () => {
    if (description.trim() === "" || amount.trim() === "" || isNaN(amount)) {
      Alert.alert(
        "Invalid input",
        "Please enter a valid description and amount."
      );
      return;
    }

    const newExpense = {
      id: Math.random().toString(),
      description,
      amount: parseInt(amount),
      date: date.getTime(), // Convert Date object to timestamp
    };

    dispatch(addItem(newExpense));

    // Clear the inputs after submission
    setDescription("");
    setAmount("");
    setDate(new Date());
    goback();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor= "gray"
      />
    <View style={styles.dateContainer}>
        <Text style={{color:"white"}}>
        {getFormattedDate(date)} 
            </Text><IconButton
        icon="calendar"
        size={24}
        color="white"
        onPress={toggleShowPicker}
      />
    </View>
      
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
      <Button onPress={handleAddExpense}>Add Expense</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  input: {
    borderRadius: 4,
    minWidth: '80%',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: GlobalStyles.colors.primary400,
    backgroundColor: GlobalStyles.colors.primary50
  },
  buttonDate: {
    marginBottom: 20,
  },
  dateContainer:{
    minWidth:220,
      flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }
});

export default AddExpenseForm;
