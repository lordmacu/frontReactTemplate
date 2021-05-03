import axios from "axios"
import themeConfig from "@configs/themeConfig"

const baseUrl = themeConfig.apiUrl
// ** Get all Data

export const setEditOn = (val, row) => {
  return async (dispatch) => {
    dispatch({ type: "SET_EDIT_ON", data: val, rowData: row })
  }
}

export const addImage = (image) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER_IMAGE_USER",
      data: image
    })
  }
}

export const getAllTypes = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}types/get`, params).then((response) => {
      dispatch({
        type: "GET_ALL_TYPES",
        data: response.data
      })
    })
  }
}

export const getAllStatuses = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}statuses/get`, params).then((response) => {
      dispatch({
        type: "GET_ALL_STATUSES",
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}providers/get`, params).then((response) => {
      dispatch({
        type: "GET_DATA",
        data: response.data.docs,
        totalPages: response.data.totalDocs,
        params
      })
    })
  }
}

// ** Get Item
export const getItem = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}providers/get/${id}`)
      .then((response) => {
        dispatch({
          type: "GET_ITEM",
          selectedItem: response.data.items
        })
      })
      .catch((err) => console.log(err))
  }
}

// ** Add new item
export const addItem = (item) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseUrl}providers/create`, item)
      .then((response) => {
        dispatch({
          type: "ADD_ITEM",
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
      .catch((err) => console.log(err))
  }
}

export const getAllCountries = (params) => {
  return async dispatch => {
    
    await axios.post(`${baseUrl}countries/get`, params).then(response => {
       dispatch({
        type: 'GET_ALL_COUNTRIES',
        data: response.data
      })
    })
  }
}


export const udpateItem = (item, props) => {
  return (dispatch, getState) => {
    axios
      .put(`${baseUrl}providers/update/${item.id}`, item)
      .then((response) => {
 
        dispatch(getItem(null))

        dispatch(getData(getState().providers.params))
      })

      .catch((err) => console.log(err))
  }
}

// ** Delete user
export const deleteItem = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(`${baseUrl}providers/remove/${id}`, { id })
      .then((response) => {
        dispatch({
          type: "DELETE_ITEM"
        })
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
  }
}

export const cloneItem = (id) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseUrl}providers/clone`, { id })
      .then((response) => {
        console.log(response.data)
        dispatch(setEditOn(Math.random(), response.data.items))
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
  }
}
