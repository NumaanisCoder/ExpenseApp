import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItem } from "../../store/addSlice";
import Button from "../UI/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconButton from "../UI/IconButton";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/style";

function EditExpenseForm({ goback, id }) {
  const alldata = useSelector((state) => state.add.data);
  const currentList = alldata.find((item) => item.id === id);

  const navigation = useNavigation();



  const [description, setDescription] = useState(currentList ? currentList.description : '');
  const [date, setDate] = useState(currentList ? new Date(currentList.date) : new Date());
  const [amount, setAmount] = useState(currentList ? currentList.amount : '');
  const [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();

  const toggleShowPicker = () => {
    setShowPicker((prevState) => !prevState);
  };

  const deleteExpenseHandler = () => {
    navigation.navigate("ExpensesOverview"); 
    dispatch(deleteItem(id));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate); // Store selected date as Date object
    }
  };

  const handleAddExpense = () => {
    if (description.trim() === "" || isNaN(amount)) {
      Alert.alert("Invalid input", "Please enter a valid description and amount.");
      return;
    }

    const newExpense = {
      id: currentList.id, // Keep the original ID for editing
      description,
      amount: parseFloat(amount),
      date: date.getTime(), // Convert Date object to timestamp
    };

    dispatch(updateItem(newExpense));

    // Clear the inputs after submission
    setDescription("");
    setAmount("");
    setDate(new Date()); // Reset date to current date or clear it as needed
    goback(); // Navigate back or perform desired action
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
        placeholder="Amount"
        placeholderTextColor="gray"
        style={styles.input}
        value={amount.toString()}
        keyboardType="number-pad"
        onChangeText={setAmount}
      />
      <View style={styles.dateContainer}>
        <Text style={{ color: "white" }}>{getFormattedDate(date)}</Text>
        <IconButton
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
      <Button onPress={handleAddExpense}>Update Expense</Button>

      <View style={styles.deleteContainer}>
        <IconButton
          icon="trash"
          color={GlobalStyles.colors.error500}
          size={36}
          onPress={deleteExpenseHandler}
        />
      </View>
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
    minWidth: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: GlobalStyles.colors.primary400,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  dateContainer: {
    minWidth: 220,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});

export default EditExpenseForm;
