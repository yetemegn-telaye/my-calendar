import React from "react";
import {format} from "date-fns";
import { Task } from "./CalenderGrid";
import '../../styles/DayBox.css';
import TaskCard from "./TaskCard";


interface DayProps {
    date: Date;
    setTask: any;
    tasks: Task[];
}

const DayBox: React.FC<any> = ({date,setTask, tasks, allTasks}) => {
    return(
        <div className="day-box">
            <div className="date">
                {format(date,"d")}
            </div>
            <div className="tasks">
                {tasks.map((task: any, index:any) => (
                  <TaskCard setTask={setTask} key={task.id} task={task} date={date} allTasks={allTasks} index={index}  />
                ))}
            </div>
        </div>
    )
}
export default DayBox;