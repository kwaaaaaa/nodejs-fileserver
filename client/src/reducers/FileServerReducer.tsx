type Action = {
  readonly type: 'UPLOAD_FILES'
  readonly payload: string[]
} | {
  readonly type: 'DELETE_FILE'
  readonly payload: string
} | {
  readonly type: 'GET_FILES'
  readonly payload: string[]
}

const FileServerReducer = (state: string[], action: Action) => {
  switch (action.type) {
    case 'UPLOAD_FILES':
      return [ ...state, ...action.payload ].sort();
    case 'DELETE_FILE':
      return state.filter(file => file !== action.payload).sort();
    case 'GET_FILES':
      return action.payload.sort();
    default:
      return state;
  }
}

export default FileServerReducer;