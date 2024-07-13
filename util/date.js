import returnDay from "./returnDay";

export function getFormattedDate(date) {
    const newDate = new Date(date);
    
    // Ensure month and date are in the correct format
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // Months are zero-based in JavaScript
    const Theday = newDate.getDay();;
  
    return `${returnDay(Theday)}, ${day}-${month}-${newDate.getFullYear()}`;
  }

export function getDateMinusDays(date,days){
  return new Date(date.getFullYear(),date.getMonth(),date.getDate() - days);
}
  