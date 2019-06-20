import * as networkActions from '../actions/network.actions';

 
export interface State {
  isOnline: boolean;
}
 
export const initialState: State = {
  isOnline: navigator.onLine
};
 
export function reducer(
  state = initialState,
  action: networkActions.NetworkActions
): State {
  switch (action.type) {
    case networkActions.NetworkActionTypes.SetIsOnline:
      return handleIsOnline(state, action);
 
    default:
      return state;
  }
}
 
function handleIsOnline(
  state: State,
  action: networkActions.SetIsOnline
): State {
  return {
    ...state,
    isOnline: action.payload
  };
}
 
export const getIsOnline = (state: State) => state.isOnline;