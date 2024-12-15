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


function PhysicalRate(props) {

    const chartData = props.data.map((r) => {
        return {
            date: new Date(r.local_date).toLocaleDateString('en', {
                // year: 'numeric',
                month: 'short',
                day: 'numeric',
            }),
            phy_rate: r.phy_rate,
        };
    });

    const chartConfig = {
        phy_rate: {
            label: "Physical Rating",
            color: "hsl(var(--chart-3))",
        },
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Physical Rating</CardTitle>
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
                        <CartesianGrid vertical={false} opacity={0.2} />
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
                            dataKey="phy_rate"
                            type="natural"
                            stroke="var(--color-phy_rate)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}

PhysicalRate.propTypes = {
    data: PropTypes.array,
    range : PropTypes.string
}


export default PhysicalRate;