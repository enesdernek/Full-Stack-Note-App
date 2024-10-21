import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/appSlice'
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import noteListSlice from './slices/noteListSlice'
import noteSlice from './slices/noteSlice'


const rootReducer = combineReducers({
    app: appSlice,
    notelist: noteListSlice,
    note: noteSlice,
})


const persistConfig = {
    key: "root",
    storage,
    version: 1,
    blacklist: ['notelist', 'note']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)