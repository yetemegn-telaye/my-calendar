import React, { useState } from "react";
import {format, isSameDay} from "date-fns";
import '../../styles/DayBox.css';
import TaskCard from "./TaskCard";
import { useTaskContext } from "../../context/TaskContext";
import { useLabelContext } from "../../context/LabelContext";



const DayBox: React.FC<any> = ({date}) => {
    const {tasks, addTask, updateTask} = useTaskContext();
    const {labels,addLabel} = useLabelContext();
    const [labelColor, setLabelColor] = useState("");
    const [labelText, setLabelText] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
     

    const openPopup = () => {
        setIsPopupOpen(true);
    }

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    const dayTasks = tasks.filter((task)=>
        isSameDay(new Date(task.date), new Date(date))
    );
    const [newTaskTitle, setNewTaskTitle] = useState("");
    
    const handleAddTask = () => {
        const newLabel = {
            id: Math.floor(Math.random() * 1000),
            text: labelText,
            color: labelColor
        }
        const newTask = {
            id: Math.floor(Math.random() * 1000),
            title: newTaskTitle,
            labelIds: [newLabel.id],
            date: date
        }
        console.log(dayTasks);
        addTask(newTask);
        addLabel(newLabel);
        setNewTaskTitle("");
        setLabelText("");
        setLabelColor("");
    }
    
    const handleEditTask = (taskId: number, updatedTask: any) => {
        updateTask(taskId, updatedTask);
        setNewTaskTitle("");
    }
    const handleAddLabel = (taskId: number, newLabel: any) => {
        addLabel(newLabel);
        let labelAddedTask:any = tasks.find((task: any) => task.id === taskId);
        labelAddedTask?.labelIds.push(newLabel.id);
        updateTask(taskId, labelAddedTask);
    }

    return(
        <div className="day-box">
              <div className="date">
                {format(date,"d")}
            </div>
            { isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <button className="popup-close" onClick={closePopup}>X</button>
                        <div className="add-task-popup">
             
                <input 
                type="text"
                placeholder="Task name"
                value={newTaskTitle}
                onChange={(e)=>setNewTaskTitle(e.target.value)}
                />
                <input type="text" value={labelColor} placeholder="label color" onChange={(e)=>setLabelColor(e.target.value)} />
                <input type="text" value={labelText} placeholder="label text" onChange={(e)=>setLabelText(e.target.value)} />
                <button onClick={handleAddTask}>Add Task</button>
                
            </div>
            </div>
            </div>
            )}
            
          
            <div className="tasks">
                {dayTasks.map((task,index)=>(
                    <TaskCard 
                    key={task.id} 
                    task={task} 
                    labels = {labels.filter((label)=> task.labelIds.includes(label.id)  )}
                    onEditTask={handleEditTask}
                    onAddLabel={handleAddLabel}
                     />
                ))}
                
           
            </div>
            <button className="add-task-btn" onClick={openPopup}>+</button>
        </div>
    )
}
export default DayBox;