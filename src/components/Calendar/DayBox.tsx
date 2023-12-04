import React, { useState } from "react";
import {format, isSameDay} from "date-fns";
import '../../styles/DayBox.css';
import TaskCard from "./TaskCard";
import { useTaskContext } from "../../context/TaskContext";
import { useLabelContext } from "../../context/LabelContext";



const DayBox: React.FC<any> = ({date}) => {
    const {tasks, addTask} = useTaskContext();
    const {labels} = useLabelContext();
   
    const dayTasks = tasks.filter((task)=>
        isSameDay(new Date(task.date), new Date(date))
    );
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const handleAddTask = () => {
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            title: newTaskTitle,
            labelIds: [],
            date: date
        }
        console.log(dayTasks);
        addTask(newTask);
        setNewTaskTitle("");
    }
    
    return(
        <div className="day-box">
            <div className="date">
                {format(date,"d")}
            </div>
            <div className="tasks">
                {dayTasks.map((task,index)=>(
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    labels = {labels.filter((label)=> task.labelIds.includes(label.id)  )}
                  
                     />
                ))}
                  <div>
             
                <input 
                type="text"
                value={newTaskTitle}
                onChange={(e)=>setNewTaskTitle(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
               
            </div>
            </div>
        </div>
    )
}
export default DayBox;