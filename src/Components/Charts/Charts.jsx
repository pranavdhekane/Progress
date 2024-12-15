import PhysicalRating from './PhysicalRate';
import EmotionalRating from './EmotionalRate';
import IntellectualRating from './IntellectualRate';
import Steps from './Steps';
import { Card } from '../ui/card';
import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

    function getLatestDays(data, days) {
        return data.slice(-days);
    }

    const [selectedValue, setSelectedValue] = useState("7_days");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setSelectedValue("7_days");
        setFilteredData(getLatestDays(data, 7));
    }, [data]);

    const handleDateRangeChange = (value) => {
        setSelectedValue(value);

        const daysMap = {
            "7_days": 7,
            "14_days": 14,
            "30_days": 30,
            "90_days": 90,
            "all": data.length,
        };

        setFilteredData(getLatestDays(data, daysMap[value]));
    };

    const getDateRange = (data) => {
        if (data.length === 0) return "";

        const firstDate = new Date(data[0].local_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        const lastDate = new Date(data[data.length - 1].local_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });

        return `${firstDate} - ${lastDate}`;
    };

    const dateRange = getDateRange(filteredData);

    return (
        <div className='mx-10 md:mx-20 my-5 '>
            <div className='my-5 mx-2 flex items-center flex-wrap sm:justify-center md:justify-end '>
                Select Data Range : &nbsp;
                <Select value={selectedValue} onValueChange={handleDateRangeChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7_days">Last 7 days</SelectItem>
                        <SelectItem value="14_days">Last 14 days</SelectItem>
                        <SelectItem value="30_days">Last month</SelectItem>
                        <SelectItem value="90_days">Last 3 months</SelectItem>
                        <SelectItem value="all">Last Year</SelectItem>
                    </SelectContent>
                </Select>

            </div>

            <div className='grid gap-2'>
                <div className=' grid sm:grid-cols-3 lg:grid-cols-3 gap-2'>
                    <PhysicalRating data={filteredData} range={dateRange}></PhysicalRating>
                    <EmotionalRating data={filteredData} range={dateRange}></EmotionalRating>
                    <IntellectualRating data={filteredData} range={dateRange}></IntellectualRating>
                </div>
                <div className='grid sm:grid-cols-2'>
                    <Steps data={filteredData} range={dateRange}></Steps>
                    <Card className='flex justify-center items-center p-20 sm:p-10 text-center text-white text-3xl font-bold'>
                    Today may seem worse, but remember that there is always LIGHT after the DARK...
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Charts;