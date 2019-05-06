import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_DELEGATION: "DELEGATIONS_ADD_DELEGATION",
  FETCH_MY_DELEGATIONS: "DELEGATIONS_FETCH_MY_DELEGATIONS",
  FETCH_DELEGATION: "DELEGATIONS_FETCH_DELEGATION",
  SET_DATES_ARE_VALID: "DELEGATIONS_SET_DATES_ARE_VALID",
  SET_DELEGATIONS: "DELEGATIONS_SET_DELEGATIONS",
  SET_IS_SORT_FILTER_PANEL_COLLAPSED: "DELEGATIONS_SET_IS_SORT_FILTER_PANEL_COLLAPSED",
  SET_TEMP_DELEGATIONS: "DELEGATIONS_SET_TEMP_DELEGATIONS"
};

const addNewDelegation = delegation => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_DELEGATION, {
      url: "/delegations",
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: delegation
    })
  );
};

const fetchMyDelegations = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_MY_DELEGATIONS, {
      url: "/delegations/my",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const fetchDelegation = delegationId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_DELEGATION, {
      url: `/delegations/${delegationId}`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const setDatesAreValid = datesAreValid => dispatch => {
  return dispatch({
    type: ACTIONS.SET_DATES_ARE_VALID,
    payload: datesAreValid
  });
};

const setDelegations = delegations => dispatch => {
  return dispatch({
    type: ACTIONS.SET_DELEGATIONS,
    payload: delegations
  });
};

const setIsSortFilterPanelCollapsed = isSortFilterPanelCollapsed => dispatch => {
  return dispatch({
    type: ACTIONS.SET_IS_SORT_FILTER_PANEL_COLLAPSED,
    payload: isSortFilterPanelCollapsed
  });
};

const setTempDelegations = tempDelegations => dispatch => {
  return dispatch({
    type: ACTIONS.SET_TEMP_DELEGATIONS,
    payload: tempDelegations
  });
};

export {
  addNewDelegation,
  fetchMyDelegations,
  fetchDelegation,
  setDatesAreValid,
  setDelegations,
  setIsSortFilterPanelCollapsed,
  setTempDelegations
};
