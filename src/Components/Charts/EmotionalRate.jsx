import React, { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import PropTypes from 'prop-types';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"


function EmotionalRate(props) {
    
    const chartData = props.data.map((r) => {
        return {
            date: new Date(r.local_date).toLocaleDateString('en', {
                // year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
            emo_rate: r.emo_rate,
        };
    });


    const chartConfig = {
        emo_rate: {
            label: "Emotional Rating",
            color: "hsl(var(--chart-3))",
        },
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Emotional Ratings</CardTitle>
                <CardDescription>December 2024 - ...</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} opacity={0.2}/>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            interval="preserveStartEnd"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Line
                            dataKey="emo_rate"
                            type="natural"
                            stroke="var(--color-emo_rate)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

EmotionalRate.propTypes = {
    data : PropTypes.array,
}

export default EmotionalRate;