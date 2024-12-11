import s from './List.module.css';
import PropTypes from 'prop-types';
import React, {useState} from 'react';

function List(props){
    const [newTask, setNewTask] = useState('');

    function handleInputChange(e){
        setNewTask(e.target.value);
    }
    
    function addTask() {
        if(newTask.trim() !== ""){
            props.setTasks([...props.tasks, newTask]);
            setNewTask("");
        }
    }

    function handleKeyDown(e){
        if(e.key === "Enter"){
            addTask();
        } 
    }

    function deleteTask(index){
        props.setTasks(props.tasks.filter((_, i) => i !== index));
    }

    return(
        <div className={s.container}>
            <label>
                {props.title}
            </label>
            <input type="text" placeholder='Press enter to add' value = {newTask} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <ul>
                {
                    props.tasks.map((task, index) => 
                        <li key={index} onClick={()=>deleteTask(index)}>
                            {task}
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

List.propTypes = {
    title : PropTypes.string, 
    tasks : PropTypes.arrayOf(PropTypes.string), 
    setTasks : PropTypes.func, 
}

export default List
