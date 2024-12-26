// import s from './List.module.css';
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
            e.preventDefault();
            addTask();
        } 
    }

    function deleteTask(index){
        props.setTasks(props.tasks.filter((_, i) => i !== index));
    }

    return(
        <div >
        {/* <div className={s.container}> */}
            <label>
                {props.title}
            </label>
            <input type="text" placeholder='Press enter to add' value = {newTask} onChange={handleInputChange} onKeyDown={handleKeyDown} className='w-full min-h-8 px-5 rounded-sm bg-black border'/>
            <ul>
                {
                    props.tasks.map((task, index) => 
                        <li key={index} onClick={()=>deleteTask(index)}>
                            <span className='text-red-500 px-2 text-sm'>x</span> {task}
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
