import { createSlice } from "@reduxjs/toolkit";

const aestheticsSlice = createSlice({
    name: "aesthetics",
    initialState: {
        color: "hsl(16,100%, 50.5%)",
        downColor: "hsl(196,100%,50.5%)"
    },
    reducers: {
        changeColour: (state) => {
            const randomNum = (Math.random() * 360);
            const flipNum = Math.abs(randomNum - 180);
            state.color = `hsl(${randomNum}, 100%, 50.5%)`;
            state.downColor = `hsl(${flipNum}, 100%, 50.5%)`;
        }
    }
})

export const aestheticsColor = (state) => state.aesthetics.color;
export const aestheticsDownColor = (state) => state.aesthetics.downColor;
export const { changeColour } = aestheticsSlice.actions;
export default aestheticsSlice.reducer;