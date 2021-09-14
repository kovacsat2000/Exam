import {User} from "../models/User";
import {loadListAction, loadListResultAction} from "./users.actions";

export const usersFeatureName = 'users';

export interface UsersState {
  listData: User[];
}

export const initialState = {
  listData: []
} as UsersState;

export function usersReducer<T, S>(state: UsersState, action: any): UsersState {
  switch (action.type) {
    case loadListResultAction.type:
      return {...state, listData: action.payload};
    default: {
      return {
        ...state
      }
    }
  }
}
