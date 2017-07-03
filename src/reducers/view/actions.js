export const VIEW_CHANGE = 'VIEW_CHANGE';

export function viewChange(view) {
  return { 
  	type: VIEW_CHANGE, 
  	view 
  };
}
