import { reducersState } from "@store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export type AsyncDispatch = ThunkDispatch<reducersState, void, AnyAction>;