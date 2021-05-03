// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  isEdit: 0,
  rowData: {},
  showView: false,
  params: {},
  selectedItem: null,
  types: [],
  countries: [],
  statuses: []
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EDIT_ON":
      return { ...state, isEdit: action.data, rowData: action.rowData }
    case "SET_USER_IMAGE_USER":
      return { ...state, userImage: action.data }
    case "SET_ITEM_VERSION":
      return { ...state, version: action.data }
    case "GET_ALL_DATA":
      return { ...state, allData: action.data.people }
    case "GET_ALL_TYPES":
      return { ...state, types: action.data.items }
    case "GET_ALL_STATUSES":
      return { ...state, statuses: action.data.items }
    case 'GET_ALL_COUNTRIES':
        return { ...state, countries: action.data.items}
    case "GET_DATA":
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case "GET_ITEM":
      return { ...state, selectedItem: action.selectedItem }
    case "ADD_ITEM":
      return { ...state }
    case "DELETE_ITEM":
      return { ...state }
    default:
      return { ...state }
  }
}
export default items
