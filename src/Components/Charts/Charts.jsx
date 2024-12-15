import PhysicalRating from './PhysicalRate';
import EmotionalRating from './EmotionalRate';
import IntellectualRating from './IntellectualRate';
import Steps from './Steps';
import { Card } from '../ui/card';
import React, { useState, useEffect } from 'react';

function Charts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/getData')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to to fetch rating data');
                }
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.log('Error : ', error);
            });
    }, []);

    

    return (
        <div className='mx-10 md:mx-20 my-5 '>
            
            <div className='grid gap-2'>
                <div className=' grid sm:grid-cols-3 lg:grid-cols-3 gap-2'>
                    <PhysicalRating data = {data}></PhysicalRating>
                    <EmotionalRating data={data}></EmotionalRating>
                    <IntellectualRating data={data}></IntellectualRating>
                </div>
                <div className='grid sm:grid-cols-2'>
                    <Steps data={data}></Steps>
                    <Card className='flex justify-center items-center p-20 sm:p-10 text-center text-white text-3xl font-bold'>
                        Maybe Today seems worse but there is always light after the dark...
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Charts;