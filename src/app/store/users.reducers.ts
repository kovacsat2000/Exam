import {User} from "../models/User";
import {
  createUserResultAction,
  loadListResultAction,
  loadUserResultAction,
  updateUserResultAction
} from "./users.actions";

export const usersFeatureName = 'users';

export interface UsersState {
  //Az osszes usert tartalmazo lista
  listData: User[];
  //Egy usert tartalmaz
  userData: User;
}

export const initialState: UsersState = {
  listData: [],
  userData: {
    id: 0,
    firstName: "",
    lastName: "",
    nationality: "",
    mothersName: ""
  }
}

export function usersReducer<T, S>(state: UsersState, action: any): UsersState {
  switch (action.type) {
    case loadListResultAction.type:
      return {...state, listData: action.payload};
    case loadUserResultAction.type:
      return {...state, userData: action.payload};
    case updateUserResultAction.type:
      return {
        ...state
      }
    case createUserResultAction.type:
      return {
        ...state
      }
    default: {
      return {
        ...state
      }
    }
  }
}
