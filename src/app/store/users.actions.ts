import {createAction, props} from "@ngrx/store";
import {User} from "../models/User";

//Az egesz listahoz
export const loadListAction = createAction('[users] Load List', props);
export const loadListResultAction = createAction('[users] Load List Result',
  props<{ payload: User[]}>());

//Egy userhez id alapjan
export const loadUserAction = createAction('[users] Load User', props<{payload: number}>());
export const loadUserResultAction = createAction('[users] Load User Result',
  props<{ payload: User}>());

//User frissites
export const updateUserAction = createAction('[users] Update User', props<{payload: User}>());
export const updateUserResultAction = createAction('[users] Update User Result', props<{payload: User}>());

//User letrehozas
export const createUserAction = createAction('[users] Create User', props<{payload: User}>());
export const createUserResultAction = createAction('[users] Create User Result', props<{payload: User}>());

//User torlese
export const deleteUserAction = createAction('[users] Delete User', props<{payload: User}>());
export const deleteUserResultAction = createAction('[users] Delete User Result');
