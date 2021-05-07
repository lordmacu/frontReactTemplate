import axios from "axios"
import themeConfig from "@configs/themeConfig"

const baseUrl = themeConfig.apiUrl
// ** Get all Data

export const setEditOn = (val, row) => {
  return async (dispatch) => {
    dispatch({ type: "SET_EDIT_ON", data: val, rowData: row })
  }
}

export const setPopUpAsignatura = (val, subject) => {
  return async (dispatch) => {
     dispatch({
      type: "SET_POPUP_ASIGNATURA",
      data: val,
      subject
    })
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
// ** Get data on page or row change
export const getData = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}programs/get`, params).then((response) => {
      dispatch({
        type: "GET_DATA",
        data: response.data.docs,
        totalPages: response.data.totalDocs,
        params
      })
    })
  }
}

export const updateVersion = (id, data) => {
  return (dispatch, getState) => {
    axios
      .put(`${baseUrl}versions/update/${id}`, data)
      .then((response) => {
          dispatch({
          type: "SET_ITEM_VERSION",
          data: response.data
        })
   
      }).then((response) => {
          dispatch({
          type: "SET_ITEM_VERSION",
          data: null
          })
        
        console.log("aqui estoy ")
   
      })

      .catch((err) => console.log(err))
  }
}

export const deleteSubjectPost = (params) => {
  return async (dispatch, getState) => {
    await axios
      .post(`${baseUrl}programs/deleteSubjectPost`, params).then((response) => {
        dispatch(getData(getState().programs.params))

    })
  }
}

export const getAllVersions = (params) => {
  return async (dispatch) => {
    await axios
      .post(`${baseUrl}versions/program/${params}`, {})
      .then((response) => {
        dispatch({
          type: "GET_ALL_VERSIONS",
          data: response.data.docs
        })

        console.log(response)
      })
  }
}

export const getAllAggrements = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}aggrements/get`, params).then((response) => {
      dispatch({
        type: "GET_ALL_AGGREMENTS",
        data: response.data
      })
    })
  }
}

export const getALlPeople = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}people/find`, params).then((response) => {
      dispatch({
        type: "GET_ALL_PEOPLE",
        data: response.data
      })
    })
  }
}

export const addSubject = (params) => {
  return async (dispatch, getState) => {
    await axios.post(`${baseUrl}programs/addSubject`, params).then((response) => {
        dispatch(getData(getState().programs.params))

    })
  }
}


export const getSubject = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}subjects/find`, params).then((response) => {
      console.log("sdfasdf asd ", response.data)
      dispatch({
        type: "GET_ALL_SUBJECTS",
        data: response.data
      })
    })
  }
}


// ** Get Item
export const getItem = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}programs/get/${id}`)
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
      .post(`${baseUrl}programs/create`, item)
      .then((response) => {
        dispatch({
          type: "ADD_ITEM",
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().programs.params))
      })
      .catch((err) => console.log(err))
  }
}

export const deleteVersion = (id, program) => {
  return (dispatch, getState) => {
    axios
      .delete(`${baseUrl}versions/remove/${id}`, { id })
      .then((response) => {
        dispatch(getAllVersions(program))
      })

      .catch((err) => console.log(err))
  }
}

export const addVersion = (item) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseUrl}versions/create`, item)
      .then((response) => {
        dispatch(getAllVersions(item.id))
      })
      .then(() => {
        //     dispatch(getData(getState().programs.params))
      })
      .catch((err) => console.log(err))
  }
}

export const udpateItem = (item, props) => {
  return (dispatch, getState) => {
    axios
      .put(`${baseUrl}programs/update/${item.id}`, item)
      .then((response) => {
        props.history.push("/apps/program/list")

        dispatch(getItem(null))

        dispatch(getData(getState().programs.params))
      })

      .catch((err) => console.log(err))
  }
}

// ** Delete user
export const deleteItem = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(`${baseUrl}programs/remove/${id}`, { id })
      .then((response) => {
        dispatch({
          type: "DELETE_ITEM"
        })
      })
      .then(() => {
        dispatch(getData(getState().programs.params))
      })
  }
}

export const cloneItem = (id) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseUrl}programs/clone`, { id })
      .then((response) => {
        console.log(response.data)
        dispatch(setEditOn(Math.random(), response.data.items))
      })
      .then(() => {
        dispatch(getData(getState().programs.params))
      })
  }
}
