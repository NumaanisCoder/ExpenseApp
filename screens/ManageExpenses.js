import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";
import AddExpenseForm from "../components/Input/Input";
import EditExpenseForm from "../components/Input/EditInput";
import { deleteItem } from "../store/addSlice";
import { useDispatch } from "react-redux";


function ManageExpenses({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const dispatch = useDispatch();

 
  function cancelHandler(){
    navigation.goBack();
  }
  function confirmHandler(){
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
        {!isEditing && (
            <AddExpenseForm goback={confirmHandler}/>
        )}
        {isEditing && <EditExpenseForm goback={confirmHandler} id={editedExpenseId}/>}
    </View>
  );
}

export default ManageExpenses;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    }
})
