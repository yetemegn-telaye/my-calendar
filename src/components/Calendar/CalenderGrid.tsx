import React,{useState} from "react";
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format} from "date-fns";
import "../../styles/CalenderGrid.css";
import DayBox from "./DayBox";
import WeekDayHeader from "./WeekDayHeader";


const CalenderGrid: React.FC = ()=> {
const [currentMonth, setCurrentMonth] = useState<Date>(new Date());


const monthYear = format(currentMonth, 'MMMM yyyy');
const startDay = startOfWeek(startOfMonth(currentMonth));
const endDay = endOfWeek(endOfMonth(currentMonth));

const renderDays = () => {
    const days = [];
    for(let day=startDay;day<=endDay;day=addDays(day,1)){
        days.push(
            <DayBox
            key={day.toISOString()} 
            className="calendar-day"
            date= {day}
            />
        )
        
    }
    return days;
}

    return(
        <div className="calendar">
            <button onClick={()=>setCurrentMonth(addMonths(currentMonth,-1))}>Previous Month</button>
            <button onClick={()=>setCurrentMonth(addMonths(currentMonth,1))}>Next Month</button>
            <h2>{monthYear}</h2>
            <WeekDayHeader />
            <div className="month-grid">
                {renderDays()}
            </div>
        </div>
    )
}
export default CalenderGrid;