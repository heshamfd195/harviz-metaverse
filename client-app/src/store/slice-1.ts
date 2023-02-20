import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _authentication:{
    id:"",
    name:"Hesham"
  }


};

const appStateSlice = createSlice({
  name: "appState",
  initialState:initialState,
  reducers: {
    setAuth(state,actions){
      state._authentication.name=actions.payload
    }

  },
});

export const appStateActions = appStateSlice.actions;

export default appStateSlice.reducer;
