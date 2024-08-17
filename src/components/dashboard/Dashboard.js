import React, { useState } from "react";
import { Button, Typography, Tabs, Drawer, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../../redux/slices/widgetSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import DoughnutChart from "./DoughnutChart";
import graphImg from "../../assets/bar-chart.svg"
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const { Title: TypographyTitle } = Typography;
const Dashboard = () => {
    const widgetList = useSelector(state => state.widgets.categories);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(''); // state for widget title.
    const [description, setDescription] = useState(''); // state for widget description.

    // Manage checked/unchecked.
    const [checkedState, setCheckedState] = useState(
        widgetList.reduce((acc, widgetData) => {
            widgetData.widgets.forEach(widget => {
                acc[`${widgetData.id}-${widget.id}`] = true;
            });
            return acc;
        }, {})
    );
    const dispatch = useDispatch();
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    // Drawer open 
    const showDrawer = () => {
        setOpen(true);
    };

    // Drawer Close
    const onClose = () => {
        setOpen(false);
    };

    // Manage Checkbox
    const handleCheckboxChange = (categoryId, widgetId) => {
        const key = `${categoryId}-${widgetId}`;
        const isChecked = checkedState[key];

        if (isChecked) {
            handleRemoveWidget(categoryId, widgetId);
        }

        setCheckedState({
            ...checkedState,
            [key]: !isChecked,
        });
    };

    // Widgets in drawer within catagories.
    const items = widgetList.map((widgetData, index) => ({
        key: index.toString(),
        label: <span className="text-custom-gray font-medium">{widgetData.name}</span>,
        children: (
            <>
                {widgetData.widgets.map((widget, i) => (
                    <div key={i} className="flex items-center w-full border border-[#E5E5E5] p-2 rounded-md mb-2 gap-2">
                        <input type="checkbox" checked={true} onChange={() => handleCheckboxChange(widgetData.id, widget.id)} />
                        <span>{widget.title}</span>
                    </div>
                ))}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Widget Name"
                            className="border p-2 outline-0 w-full"
                        />
                        {titleError && <span className="text-red-500 mt-2 block">{titleError}</span>}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Widget Text"
                            className="border p-2 outline-0 w-full"
                        />
                        {descriptionError && <span className="text-red-500 mt-2 block">{descriptionError}</span>}
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => handleAddWidget(widgetData.id)}
                            className="bg-blue-500 text-white p-2 rounded w-full"
                        >
                            + Add Widget
                        </button>
                    </div>
                </div>
            </>
        ),
    }));

    // Add widgets 
    const handleAddWidget = (id) => {
        let valid = true;
        if (!title) {
            setTitleError('Please enter the title.');
            valid = false;
        } else {
            setTitleError('');
        }

        if (!description) {
            setDescriptionError('Please enter the description.');
            valid = false;
        } else {
            setDescriptionError('');
        }

        if (valid && id) {
            dispatch(addWidget({ categoryId: id, widget: { title, description } }));
            setTitle('');
            setDescription('');
            setOpen(false);
        }
    };

    // Remove Widgets
    const handleRemoveWidget = (categoryId, widgetId) => {
        dispatch(removeWidget({ categoryId, widgetId }));
    };

    const reloadData = () => { }
    const menu = () => { }
    const selectOption = () => { }

    return (
        <>
            <div className="bg-sky-100">
                <div className="md:flex justify-between items-center">
                    <div className="flex px-1 md:px-6 pt-4 font-bold text-md text-[#141414]">
                        <h1 >CNAPP Dashboard</h1>
                    </div>
                    <div className="flex gap-1 md:gap-2 px-1 md:px-6 pt-4 items-center">
                        <button onClick={() => showDrawer()} className="flex items-center gap-3 text-[12px] text-[#B1B7BE] font-bold border border-[#B1B7BE] bg-white px-2 py-1.5 outline-0 rounded-md">
                            Add Widget
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        <button onClick={() => reloadData()} className="flex items-center gap-3 cursor-not-allowed text-[12px] text-[#B1B7BE] font-bold border border-[#B1B7BE] bg-white px-1 py-1.5 outline-0 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>
                        <button onClick={() => menu()} className="flex items-center gap-3 cursor-not-allowed text-[12px] text-[#B1B7BE] font-bold border border-[#B1B7BE] bg-white px-1 py-1.5 outline-0 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </button>
                        <button onClick={() => selectOption()} className="flex items-center gap-1 cursor-not-allowed text-[12px] text-[#4A65FF] font-bold border border-[#4A65FF] bg-white px-2 py-1.5 outline-0 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Last 2 days
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#4A65FF" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                {
                    widgetList.map((data, i) => {
                        const widgetsToDisplay = data.filteredWidgets?.length > 0 ? data.filteredWidgets : data.widgets;
                        return (
                            <React.Fragment key={data.id}>
                                <div className="flex flex-col m-auto py-4">
                                    <h1 className="flex px-2 md:px-8 pb-2 font-bold text-md text-[#141414]">{data.name}</h1>
                                    <div className="flex overflow-x-scroll pb-5 scroll-bar">
                                        <div className="flex flex-nowrap ml-2 md:ml-8">
                                            <div className="inline-block pr-2 md:pr-8">
                                                <div className="w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                                    <div className="p-3 flex flex-col h-full justify-center">
                                                        <div className="px-1 pb-4">
                                                            <div className="m-auto flex justify-center">
                                                                <button onClick={() => showDrawer()} className="flex items-center gap-3 text-[12px] text-[#B1B7BE] font-bold border border-[#EEF1F1] px-2 py-1 rounded-lg">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                    </svg>
                                                                    Add Widget
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                widgetsToDisplay.map((card, index) => {
                                                    return (
                                                        <React.Fragment key={card.id}>
                                                            <div className="inline-block pr-8" >
                                                                <div className="w-96 h-48 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                                                    <div className="p-3 flex flex-col h-full">
                                                                        <div className="px-1 pb-4">
                                                                            <div className="flex justify-between items-center">
                                                                                <div className="font-semibold font-spline-sans-semibold text-[#3D3D3D] text-[14px] truncate">
                                                                                    <span>{card.title}</span>
                                                                                </div>
                                                                                <button
                                                                                    onClick={() => handleRemoveWidget(data.id, card.id)}
                                                                                    className="text-red-500 mt-2"
                                                                                >
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                                                    </svg>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        {card.graph_data?.length > 0 ? <div className="flex justify-between items-center">
                                                                            <DoughnutChart chartData={card.graph_data} />
                                                                        </div> :
                                                                            <div className="flex flex-col mt-4 items-center w-full text-[12px] text-[#B1B7BE]">
                                                                                <img src={graphImg} className="w-8" alt="graph-image" />
                                                                                <p>No graph data available</p>
                                                                            </div>
                                                                        }

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
            </div>

            <Drawer
                title="Add Widget"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <TypographyTitle className="text-custom-gray" level={5}>Personalise your dashboard by adding the following widget</TypographyTitle>
                <Tabs defaultActiveKey="0" items={items} />
            </Drawer>
        </>
    )
}

export default Dashboard;
