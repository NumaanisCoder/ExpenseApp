import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
    const sortedData = [...expenses].reverse(); // Create a copy and then reverse it
    return <FlatList data={sortedData} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />;
}

export default ExpensesList;
