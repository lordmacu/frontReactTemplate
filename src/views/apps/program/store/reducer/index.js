// ** Initial State
const initialState = {
  allData: [],
  countries: [],
  versions: [],
  data: [],
  total: 1,
  isEdit: 0,
  rowData: {},
  showView:false,
  params: {},
  selectedItem: null,
  version: null,
  people: [],
  popUpAsignatura: false,
  currentProgram: null,
  subjects:[]
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EDIT_ON':
      return { ...state, isEdit: action.data, rowData: action.rowData }
    case 'SET_USER_IMAGE_USER':
      return { ...state, userImage: action.data }
    case 'SET_ITEM_VERSION':
        return { ...state, version: action.data }
    case 'GET_ALL_DATA':
        return { ...state, allData: action.data.people }
    case 'GET_ALL_AGGREMENTS':
      return { ...state, aggrements: action.data.items }
      case 'GET_ALL_SUBJECTS':
      return { ...state, subjects: action.data.items }
    case 'GET_ALL_PEOPLE':
      return { ...state, people: action.data.items }
    case 'GET_ALL_VERSIONS':
      return { ...state, versions: action.data }
    case 'SET_POPUP_ASIGNATURA':
      return { ...state, popUpAsignatura: action.data, currentProgram:action.subject}
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ITEM':
      return { ...state, selectedItem: action.selectedItem }
    case 'ADD_ITEM':
      return { ...state }
    case 'DELETE_ITEM':
      return { ...state }
    default:
      return { ...state }
  }
}
export default items
