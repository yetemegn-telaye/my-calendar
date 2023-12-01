import React,{useState} from "react";
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format} from "date-fns";
import "../../styles/CalenderGrid.css";
import DayBox from "./DayBox";
import WeekDayHeader from "./WeekDayHeader";

export interface Label {
    id: number;
    text: string;
    color: string;
}

export interface Task {
    id: number;
    title: string;
    labels: Label[];
}

interface TaskMap {
    [date: string]: Task[];
}

const CalenderGrid: React.FC = ()=> {
const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
const [labels,setLabels] = useState<Label[]>([
    {id: 1, text: "Work", color: "#FF0000"},
    {id: 2, text: "School", color: "#00FF00"},
]);
const [tasks,setTasks] = useState<TaskMap>({
    [format(new Date(), "yyyy-MM-dd")]: [
        {id: 1, title: "Task 1", labels: [labels[0]]},
        {id: 2, title: "Task 2", labels: [labels[1], labels[0]]},
    ]
});

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
            date={day}
            allTasks={tasks}
            setTask={setTasks}
            tasks={tasks[format(day,'yyyy-MM-dd')] || []}
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