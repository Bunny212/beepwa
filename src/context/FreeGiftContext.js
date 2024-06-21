// File: src/context/FreeGiftContext.js
import React, { createContext, useContext, useReducer } from 'react';

const FreeGiftContext = createContext();

const initialState = {
  isFreeGiftAdded: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FREE_GIFT':
      return { ...state, isFreeGiftAdded: true };
    case 'REMOVE_FREE_GIFT':
      return { ...state, isFreeGiftAdded: false };
    default:
      return state;
  }
};

const FreeGiftProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FreeGiftContext.Provider value={{ state, dispatch }}>
      {children}
    </FreeGiftContext.Provider>
  );
};

const useFreeGiftContext = () => {
  const context = useContext(FreeGiftContext);
  if (!context) {
    throw new Error('useFreeGiftContext must be used within a FreeGiftProvider');
  }
  return context;
};

export { FreeGiftProvider, useFreeGiftContext };
