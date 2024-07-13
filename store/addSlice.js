import { createSlice } from "@reduxjs/toolkit";


const addSlice = createSlice({
    name: "addSlice",
    initialState: {
        data: []  // Load initial data from AsyncStorage
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = {
                ...action.payload,
                createdAt: new Date().toISOString() // Add createdAt date
            };
            state.data.push(newItem);
        },
        deleteItem: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action) => {
            const index = state.data.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = {
                    ...action.payload,
                    createdAt: state.data[index].createdAt // Preserve original createdAt date
                };
        
            }
        },
        loadItems: (state, action) => {
            state.data = action.payload;
        }
    }
});

// Action creators
export const { addItem, deleteItem, updateItem, loadItems } = addSlice.actions;

// Export the reducer
export default addSlice.reducer;
