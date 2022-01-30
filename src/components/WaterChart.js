import React from "react";
import {Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const WaterChart = () => 
{
    return(
    <div> 
        <Line
        data={{
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday ',
            'Friday','Saturday','Sunday'],
            datasets:[{
                drawLine: true,
                type: "line",
                label: 'Water Amount',
                tension: 0.3,
                fill: true,
                data:[500,1500,750,1000,500,1250,800],
                backgroundColor:[
                    'rgba(147, 202, 237,0.2)',
                    'rgba(147, 202, 237,0.2)',
                    'rgba(147, 202, 237,0.2)',
                    'rgba(147, 202, 237,0.2)',
                    'rgba(147, 202, 237,0.2)',
                    'rgba(147, 202, 237,0.2)',
                    'rgba(147, 202, 237,0.2)',
                ],
            },
        ],
        }}
        height={400}
        width={150}
        options={{
            maintainAspectRatio: false,
            x:{
                type: "linear"
            }
        }}
        />
        
        


    </div>
    );
}

export default WaterChart;