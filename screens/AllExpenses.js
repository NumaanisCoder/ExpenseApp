import { useDispatch, useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadItems } from "../store/addSlice";

function AllExpenses(){

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const expenses = await AsyncStorage.getItem("expenses");
            dispatch(loadItems(JSON.parse(expenses) || []));
        };

        fetchData();
    }, []);

    const expenses = useSelector((state) => state.add.data);
    
    return <ExpensesOutput expense={expenses} expensesPeriod="Total"/>
}

export default AllExpenses;
