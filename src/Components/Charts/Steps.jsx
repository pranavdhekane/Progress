import React, {useState, useEffect} from 'react';
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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

function Steps(props) {
    
    
        const chartData = props.data.map((r) => {
            return {
                date: new Date(r.local_date).toLocaleDateString('en', {
                    // year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }),
                steps : r.steps,
            };
        });
    
    
        const chartConfig = {
            steps: {
                label: "Steps",
                color: "hsl(var(--chart-3))",
            },
        }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Steps</CardTitle>
                <CardDescription>{props.range}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} opacity={0.2}/>
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="steps" fill="var(--color-steps)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

Steps.propTypes = {
    data : PropTypes.array,
    range : PropTypes.string,
}

export default Steps