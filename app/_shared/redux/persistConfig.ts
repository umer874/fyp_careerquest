// redux/persistConfig.ts
import { persistReducer } from 'redux-persist';

let storage;

if (typeof window !== 'undefined') {
  // Only import localStorage when window is available
  storage = require('redux-persist/lib/storage').default;
} else {
  storage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  }
}

export default storage;
