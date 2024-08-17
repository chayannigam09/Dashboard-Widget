import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (props) => {
    const labels = props.chartData?.map(item => item.name);
    const data = props.chartData?.map(item => Number(item.count));
    const color = props.chartData?.map(item => item.color);
    const totalCount = data.reduce((sum, count) => sum + count, 0);

    // Chart Data
    const doughnutChartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: color,
                borderWidth: 0,
            },
        ],
    };
    // Chart OPtions
    const doughnutChartOptions = {
        cutout: '70%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
        maintainAspectRatio: false,
    };


    return (
        <>
            <div className="relative h-28 w-28">
                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-xl font-bold">{totalCount}</div>
                    <div className="text-sm text-gray-600">Total</div>
                </div>
            </div>
            <div className="mr-4  font-spline-sans-semibold text-[#3D3D3D]">
                <ul className="list-none text-sm">
                    {
                        data.map((res, i) => {
                            return <li key={i}><span style={{ color: color[i] }}>●</span> {labels[i]} ({res})</li>
                        })
                    }
                </ul>
            </div>
        </>
    )
};
export default DoughnutChart;