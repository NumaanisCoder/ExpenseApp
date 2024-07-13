import { configureStore } from "@reduxjs/toolkit";
import addSlice from "./addSlice";

const store = configureStore({
    reducer: {
        add: addSlice
    }
});

export default store;
