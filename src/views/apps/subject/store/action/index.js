import axios from "axios"
import themeConfig from "@configs/themeConfig"

const baseUrl = themeConfig.apiUrl
// ** Get all Data

export const setEditOn = (val, row) => {
  return async (dispatch) => {
    dispatch({ type: "SET_EDIT_ON", data: val, rowData: row })
  }
}

export const setPopUpTeacher = (val, subject) => {
  return async (dispatch) => {
     dispatch({
      type: "SET_POPUP_TEACHER",
      data: val,
      subject
    })
  }
}

export const setPopUpStudent = (val, subject) => {
  return async (dispatch) => {
     dispatch({
      type: "SET_POPUP_STUDENT",
      data: val,
      subject
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

export const getData = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}subjects/get`, params).then((response) => {
   
      
      dispatch({
        type: "GET_DATA",
        data: response.data.docs,
        totalPages: response.data.totalDocs,
        params
      })
    })
  }
}

export const deleteTeacherPost = (params) => {
  return async (dispatch, getState) => {
    await axios
      .post(`${baseUrl}subjects/deleteTutor`, params).then((response) => {
             dispatch(getData(getState().subjects.params))

    })
  }
}
export const deleteStudentPost = (params) => {
  return async (dispatch, getState) => {
    await axios
      .post(`${baseUrl}subjects/deleteStudent`, params).then((response) => {
             dispatch(getData(getState().subjects.params))

    })
  }
}

export const setPrincpalTeacher = (params) => {
  return async (dispatch, getState) => {
    await axios
      .post(`${baseUrl}subjects/setPrincpalTeacher`, params).then((response) => {
      dispatch(getData(getState().subjects.params))
    })
  }
}


export const addProfessor = (params) => {
  return async (dispatch, getState) => {
    await axios.post(`${baseUrl}subjects/addTutor`, params).then((response) => {
        dispatch(getData(getState().subjects.params))

    })
  }
}


export const addStudent = (params) => {
  return async (dispatch, getState) => {
    await axios.post(`${baseUrl}subjects/addStudent`, params).then((response) => {
        dispatch(getData(getState().subjects.params))

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

export const getAllTutors = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}tutors/getAll`, params).then((response) => {
      dispatch({
        type: "GET_ALL_TUTORS",
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


// ** Get Item
export const getItem = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}subjects/get/${id}`)
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
      .post(`${baseUrl}subjects/create`, item)
      .then((response) => {
        dispatch({
          type: "ADD_ITEM",
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().subjects.params))
      })
      .catch((err) => console.log(err))
  }
}


export const udpateItem = (item, props) => {

   
  return (dispatch, getState) => {
    axios
      .put(`${baseUrl}subjects/update/${item.id}`, item)
      .then((response) => {
 
        dispatch(getItem(null))

        dispatch(getData(getState().subjects.params))
      })

      .catch((err) => console.log(err))
  }
}

// ** Delete user
export const deleteItem = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(`${baseUrl}subjects/remove/${id}`, { id })
      .then((response) => {
        dispatch({
          type: "DELETE_ITEM"
        })
      })
      .then(() => {
        dispatch(getData(getState().subjects.params))
      })
  }
}

export const cloneItem = (id) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseUrl}subjects/clone`, { id })
      .then((response) => {
        console.log(response.data)
        dispatch(setEditOn(Math.random(), response.data.items))
      })
      .then(() => {
        dispatch(getData(getState().subjects.params))
      })
  }
}
