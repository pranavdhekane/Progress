import React, { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import PropTypes, { arrayOf, object, objectOf } from 'prop-types';
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


function Amc(props) {
    const chartData = props.all.map((r) => {
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
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
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

Amc.propsTypes = {
   data : PropTypes.shape({
    date : PropTypes.string,
    e : PropTypes.number,
   }),
   all : PropTypes.array,
}

export default Amc;