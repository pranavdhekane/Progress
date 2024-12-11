import Styles from './Form.module.css';
import List from '../List/List';
import React, { useState } from 'react';

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
        <div id={Styles.formContainer}>
            <form onSubmit={handleFormSubmit}>
                <div id={Styles.title}>
                    <h1>Daily Progress</h1>
                    <label>
                        Date :
                        {today()}
                    </label>
                </div>
                <hr />

                <div id={Styles.ratings}>
                    <div>
                        <label htmlFor="emoRate">Emotional Rating</label>
                        <input type="number" name='emoRate' value={formData.emoRate} onChange={handleChange} placeholder='0-10' min ="0" max="10"/>
                    </div>

                    <div>
                        <label htmlFor="phyRate">Physical Rating</label>
                        <input type="number" name='phyRate' value={formData.phyRate} onChange={handleChange} placeholder='0-10' min ="0" max="10"/>
                    </div>
                    <div>
                        <label htmlFor="intRate">Intellectual Rating</label>
                        <input type="number" name='intRate' onChange={handleChange} value={formData.intRate} placeholder='0-10' min ="0" max="10"/>
                    </div>

                    <div>
                        <label htmlFor="steps">Steps</label>
                        <input type="number" name='steps' value={formData.steps} onChange={handleChange} placeholder='0' min ="0"/>
                    </div>
                </div>

                <div id={Styles.OtherExercise}>
                    <List title="Other exercises" tasks={exercise} setTasks={updateExer}/>
                </div>

                <div id={Styles.txts}>
                    <div>
                        <List title="Accomplishments" tasks={acc} setTasks={updateAcc}/>
                    </div>

                    <div>
                        <List title="Regrets" tasks={reg} setTasks={updateReg}/>
                    </div>
                </div>

                <label htmlFor="message">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder='Enter your message'></textarea>
                <br />

                <input id={Styles.submitBtn} onClick={() => handleSubmit()} value='submit' type='button' />
            </form>
        </div>
    );
}

export default Form