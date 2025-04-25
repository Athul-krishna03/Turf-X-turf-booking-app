import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  userReducer  from "./slices/user.slice";
import adminReducer from "./slices/admin.slice";
import turfReducer  from "./slices/turf.slice"
const rootPersistConfig={
    key:"session",
    storage,
}

const rootReducer = combineReducers({
    user:userReducer,
    admin:adminReducer,
    turf:turfReducer
})

const persistedReducer = persistReducer(rootPersistConfig,rootReducer);
export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions:["persist/PERSIST","persist/REHYDRATE"]
            },
        }),

});

export const persistor = persistStore(store); 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;