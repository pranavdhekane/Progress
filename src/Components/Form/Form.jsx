// import Styles from './Form.module.css';
import List from '../List/List';
import React, { useState } from 'react';
import { Button } from '../ui/button';

function Form() {
    const date = new Date();

    function today() {
        return ` ${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`;
    }

    const [acc, setAcc] = useState([]);
    const [reg, setReg] = useState([]);
    const [exercise, setExercise] = useState([]);

    const updateAcc = (newItems) => {
        setAcc(newItems);
    }

    const updateReg = (newItems) => {
        setReg(newItems);
    }

    const updateExer = (newItems) => {
        setExercise(newItems);
    }

    const [formData, setFormData] = useState({
        steps: '',
        otherExercise: exercise,
        emoRate: '',
        phyRate: '',
        intRate: '',
        message: "",
        date: null,
        accomplishments: acc,
        regrets: reg,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, [name]: value,
        });
    }; 

    const handleFormSubmit = (e) => {
        if(e.key === "Enter")
        e.preventDefault();
    };

    function handleSubmit() {
        if (checkWrongData()) {
            alert('Invalid data. Please check your inputs.');
            return;
        }
    
        // Prepare the form data
        const dataToSend = {
            ...formData,
            regrets: reg,        // Use the updated reg
            accomplishments: acc, // Use the updated acc
            otherExercise: exercise, // Use the updated exercise
        };

        console.log(JSON.stringify(dataToSend));
    
        // Send the data to the server
        fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to submit the form');
                }
            })
            .then((data) => {
                alert('Form submitted successfully!');
                console.log('Server Response:', data);
    
                // Reset the form fields
                setAcc([]);
                setReg([]);
                setExercise([]);
                setFormData({
                    steps: '',
                    otherExercise: [],
                    emoRate: '',
                    phyRate: '',
                    intRate: '',
                    message: '',
                    date: null,
                    accomplishments: [],
                    regrets: [],
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to submit the form. Please try again.');
            });
    }
    

    function checkWrongData() {
        if(formData.intRate > 10 || formData.intRate < 0)
            return true;

        if(formData.phyRate > 10 || formData.phyRate < 0)
            return true;

        if(formData.emoRate > 10 || formData.emoRate < 0)
            return true;

        if(formData.steps < 0)
            return true;

        return false;
    }

    return (
        // <div id={Styles.formContainer}>
        <div className='min-h-[75vh] flex justify-center items-center p-5'>
            <form onSubmit={handleSubmit} className='min-w-[70vw] bg-black text-white p-10 grid gap-y-2 shadow-[10px_10px_1px_rgb(90,90,90)]'>
                {/* <div id={Styles.title}> */}
                <div className='flex justify-between items-center flex-wrap gap-2'>
                    <h1 className='text-3xl'>Daily Progress</h1>
                    <label>
                        Date :
                        {today()}
                    </label>
                </div>
                <hr className='my-3'/>

                {/* <div id={Styles.ratings}> */}
                <div className='grid sm:grid-cols-2 [&>div>input]:w-full [&>div>input]:min-h-8 [&>div>input]:px-5 [&>div>input]:rounded-sm [&>div>input]:bg-black [&>div>input]:border gap-x-5 gap-y-2 '>
                    <div>
                        <label htmlFor="emoRate">Emotional Rating</label>
                        <input type="number" name='emoRate' value={formData.emoRate} onChange={handleChange} placeholder='0-10' min ="0" max="10"  onKeyDown={handleFormSubmit}/>
                    </div>

                    <div>
                        <label htmlFor="phyRate">Physical Rating</label>
                        <input type="number" name='phyRate' value={formData.phyRate} onChange={handleChange} placeholder='0-10' min ="0" max="10"  onKeyDown={handleFormSubmit}/>
                    </div>
                    <div>
                        <label htmlFor="intRate">Intellectual Rating</label>
                        <input type="number" name='intRate' onChange={handleChange} value={formData.intRate} placeholder='0-10' min ="0" max="10"  onKeyDown={handleFormSubmit}/>
                    </div>

                    <div>
                        <label htmlFor="steps">Steps</label>
                        <input type="number" name='steps' value={formData.steps} onChange={handleChange} placeholder='0' min ="0"  onKeyDown={handleFormSubmit}/>
                    </div>
                </div>

                {/* <div id={Styles.OtherExercise}> */}
                <div>
                    <List title="Other exercises" tasks={exercise} setTasks={updateExer}/>
                </div>

                {/* <div id={Styles.txts}> */}
                <div className='grid gap-y-2 gap-x-5 sm:grid-cols-2'>
                    <div>
                        <List title="Accomplishments" tasks={acc} setTasks={updateAcc}/>
                    </div>

                    <div>
                        <List title="Regrets" tasks={reg} setTasks={updateReg}/>
                    </div>
                </div>


                <label htmlFor="message">Message</label>
                <textarea className='w-full rounded-sm px-5 py-3 bg-black border' name="message" value={formData.message} onChange={handleChange} placeholder='Enter your message'></textarea>

                {/* <input id={Styles.submitBtn} onClick={() => handleSubmit()} value='submit' type='button' /> */}
                <input  onClick={() => handleSubmit()} value='submit' type='button' className='w-full border-2 border-white my-2 bg-primary hover:bg-primary/90 py-2 text-sm rounded-md font-semibold'/>
                {/* <Button onClick={() => handleSubmit()} className='w-full border-2 border-white my-2'>submit</Button> */}
            </form>
        </div>
    );
}

export default Form