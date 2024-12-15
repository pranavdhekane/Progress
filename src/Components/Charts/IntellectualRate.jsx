import React, { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import PropTypes from 'prop-types'

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


function IntellectualRate(props) {

    const chartData = props.data.map((r) => {
        return {
            date: new Date(r.local_date).toLocaleDateString('en', {
                // year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
            int_rate: r.int_rate,
        };
    });


    const chartConfig = {
        int_rate: {
            label: "Intellectual Rating",
            color: "hsl(var(--chart-3))",
        },
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Intellectual Rating</CardTitle>
                <CardDescription>{props.range}</CardDescription>
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
                            dataKey="int_rate"
                            type="natural"
                            stroke="var(--color-int_rate)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            
        </Card>
    )
}

IntellectualRate.propTypes = {
    data : PropTypes.array,
    range : PropTypes.string
}

export default IntellectualRate;