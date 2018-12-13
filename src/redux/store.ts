import { createStore } from "redux";
import { playingReducer } from "./reducers/playingReducer";

/**
 * Store que contiene el estado global de la aplicación.
 */
export const store = createStore(playingReducer);
