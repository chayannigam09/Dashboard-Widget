import { createSlice } from '@reduxjs/toolkit';

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('widgetDashboardState', serializedState);
    } catch (e) {
        console.warn('Could not save state to localStorage', e);
    }
};

const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('widgetDashboardState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn('Could not load state from localStorage', e);
        return undefined;
    }
};

// Dummy JSON Data 
const initialState = loadStateFromLocalStorage() || {
    categories: [
        {
            "id": 1,
            "name": "CSPM Executive Dashboard",
            "description": "CSPM Executive Dashboard",
            "deleted_at": null,
            "widgets": [
                {
                    "id": 1,
                    "title": "Cloud Accounts",
                    "category_id": 1,
                    "graph_data": [
                        {
                            "name": "Connected",
                            "count": "2",
                            "color": "#0977EC"
                        },{
                            "name": "Not Connected",
                            "count": "2",
                            "color": "#C7DAEE"
                        },
                    ],
                    "deleted_at": null,
                },
                {
                    "id": 2,
                    "title": "Cloud Account Risk Assessment",
                    "category_id": 1,
                    "graph_data": [
                        {
                            "name": "Failed",
                            "count": "1689",
                            "color": "#029E24"
                        },
                        {
                            "name": "Warning",
                            "count": "681",
                            "color": "#C7DAEE"
                        },
                        {
                            "name": "Not available",
                            "count": "36",
                            "color": "#E34234"
                        },
                        {
                            "name": "Passed",
                            "count": "7253",
                            "color": "#FFD700"
                        },
                    ],
                    "deleted_at": null,
                },
            ]
        },
        {
            "id": 2,
            "name": "CWPP Dashboard",
            "description": "CWPP Dashboard",
            "deleted_at": null,
            "widgets": [
                {
                    "id": 1,
                    "title": "Top 5 Namespaces Specific Alerts",
                    "category_id": 2,
                    "graph_data": [],
                    "deleted_at": null,
                },
                {
                    "id": 2,
                    "title": "Workload Alert",
                    "category_id": 2,
                    "graph_data": [],
                    "deleted_at": null,
                },
            ]
        },
        {
            "id": 3,
            "name": "Registry Scan",
            "description": "Registry Scan",
            "deleted_at": null,
            "widgets": [
                {
                    "id": 1,
                    "title": "Image Risk Assessment",
                    "category_id": 3,
                    "graph_data": [
                        {
                            "name": "Critical",
                            "count": "9",
                            "color": "#029E24"
                        },
                        {
                            "name": "Non-Critical",
                            "count": "8",
                            "color": "#C7DAEE"
                        },
                    ],
                    "deleted_at": null,
                },
                {
                    "id": 2,
                    "title": "Image Security Issues",
                    "category_id": 3,
                    "graph_data": [],
                    "deleted_at": null,
                },
                {
                    "id": 3,
                    "title": "Image Preview",
                    "category_id": 3,
                    "graph_data": [],
                    "deleted_at": null,
                },
                {
                    "id": 4,
                    "title": "Image Reader",
                    "category_id": 3,
                    "graph_data": [],
                    "deleted_at": null,
                },
            ]
        },
        {
            "id": 4,
            "name": "Documentation",
            "description": "Documentation",
            "deleted_at": null,
            "widgets": [
                {
                    "id": 1,
                    "title": "Text File",
                    "category_id": 4,
                    "graph_data": [
                        {
                            "name": "Test",
                            "count": "2",
                            "color": "#C7DAEE"
                        },
                        {
                            "name": "Test-1",
                            "count": "10",
                            "color": "#FFD700"
                        }
                    ],
                    "deleted_at": null,
                }
            ]
        }
    ]
};

const widgetSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const { categoryId, widget } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets.push({ ...widget, id: new Date().getTime() });
            }
            saveStateToLocalStorage(state); // state after adding a widget
        }, // Add Widgets
        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.categories.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
            }
            saveStateToLocalStorage(state); // state after removing a widget
        }, // Remove widgets
        searchWidgets: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            console.log(searchTerm);
            
            if (searchTerm==='') {
                // Reset to show all widgets when cleard the field
                return initialState;
            } else {
                // Filter widgets based on the search term
                state.categories = state.categories.map(category => {
                    const filteredWidgets = category.widgets.filter(widget =>
                        widget.title.toLowerCase().includes(searchTerm)
                    );
                    return {
                        ...category,
                        filteredWidgets,
                    };
                }).filter(category => category.filteredWidgets.length > 0);
            }
        }, // Search widgets
    },
});

export const { addWidget, removeWidget, searchWidgets } = widgetSlice.actions;
export default widgetSlice.reducer;