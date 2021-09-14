import {createAction, props} from "@ngrx/store";
import {User} from "../models/User";

export const loadListAction = createAction('[users] Load List', props);
export const loadListResultAction = createAction('[users] Load List Result',
  props<{ payload: User[]}>());

