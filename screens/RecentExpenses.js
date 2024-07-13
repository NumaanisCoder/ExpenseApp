import { useSelector } from "react-redux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";



function RecentExpenses(){

    const data = useSelector(state=>state.add.data);

    const recentExpenses = data.filter((expense)=>{
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today,7);

        return expense.date > date7daysAgo;
    })
    return <ExpensesOutput expense={recentExpenses} expensesPeriod="Last 7 days"/>
}

export default RecentExpenses;