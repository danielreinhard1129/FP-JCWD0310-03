// import { configureStore } from '@reduxjs/toolkit';
// import useReducer from './slices/userSlice';

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// export const makeStore = () => {
//   return configureStore({
//     reducer: {
//       user: useReducer,
//     },
//   });
// };

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];


// ********************//

// const createNoopStorage = () => {
//   return {
//     getItem() {
//       return Promise.resolve(null);
//     },
//     setItem(_key: String, value: number) {
//       return Promise.resolve(value);
//     },
//     removeItem() {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window !== 'undifined'
//     ? createWebStorage('local')
//     : createNoopStorage();

// const presistConfig = {
//   key: 'kucekin',
//   storage,
//   timeout: 2000,
// };

// const rootReducer = combineReducers({
//   user: userReducer,
// });

// const makeConfiguredStore = () =>
//   configureStore({
//     reducer: rootReducer,
//   });

// export const makeStore = () => {
//   const isServer = typeof window === 'undifined';
//   if (isServer) {
//     return makeConfiguredStore();
//   } else {
//     const persistedReducer = persistReducer(presistConfig, rootReducer);
//     let store = configureStore({
//       reducer: persistedReducer,
//       middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//           serializableCheck: false,
//         }),
//     });
//     (store as any)._persistor = persistStore(store);
//     return store;
//   }
// };

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];


// -----//

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from "./slices/userSlice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "sosmed-store",
  storage,
  timeout: 2000,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
    (store as any).__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];