import {createFeatureSelector, createSelector} from "@ngrx/store";
import {usersFeatureName, UsersState} from "./users.reducers";

const featureSelector = createFeatureSelector<UsersState>(usersFeatureName);

const listData = createSelector(featureSelector, (state: UsersState) => state.listData);

export const usersSelectors = {
  listData
};
