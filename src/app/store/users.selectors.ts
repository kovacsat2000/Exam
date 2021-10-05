import {createFeatureSelector, createSelector} from "@ngrx/store";
import {usersFeatureName, UsersState} from "./users.reducers";

const featureSelector = createFeatureSelector<UsersState>(usersFeatureName);

const listData = createSelector(featureSelector, (state: UsersState) => state.listData);

const userData = createSelector(featureSelector, (state: UsersState) => state.userData);

export const usersSelectors = {
  listData,
  userData
};
