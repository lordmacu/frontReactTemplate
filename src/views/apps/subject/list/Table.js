// ** React Imports
import { Fragment, useState, useEffect } from "react"
import { getImageUser } from "@utils"
import { useForm, Controller } from "react-hook-form"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

// ** Invoice List Sidebar
import Sidebar from "./Sidebar"
import classnames from "classnames"

// ** Columns
import { columns } from "./columns"

// ** Store & Actions
import {
  getAllData,
  getData,
  setEditOn,
  setPopUpTeacher,
  addProfessor,
  deleteTeacherPost,
  getItem,
  setPrincpalTeacher,
  setPopUpStudent,
  getALlPeople,
  addStudent,
  deleteStudentPost
} from "../store/action"
import { useDispatch, useSelector } from "react-redux"

// ** Third Party Components
import ReactPaginate from "react-paginate"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import {
  Card,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup
} from "reactstrap"
import Select from "react-select"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"

// ** Table Header

const List = () => {
  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.subjects)

  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [columnsSearch, setColumnsSearch] = useState(["name", "sigla"])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role"
  })
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan"
  })
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0
  })
  const [modalTeacher, setmodalTeacher] = useState(false)
  const [modalStudents, setModalStudents] = useState(false)

  const [tutorsDropDown, setTutorsDropDown] = useState(false)
  const [tutorSelected, setTutorSelected] = useState(null)
  const [isPrincipalTeacher, setIsPrincipalTeacher] = useState(null)
  const [currentSubject, setCurrentSubjec] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const toggleTeacherModal = () => {
    dispatch(setPopUpTeacher(false))
  }

  const toggleStudentModal = () => {
    dispatch(setPopUpStudent(false))
  }

  const getUsers = (val) => {
    if (val.length > 3) {
      dispatch(
        getALlPeople({
          q: val
        })
      )
    }
  }

  const selectUser = (val) => {
    getUsers(val)
  }

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        columns: columnsSearch,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
  }, [dispatch, store.data.length])

  useEffect(() => {}, [dispatch, store.showView])

  useEffect(() => {
    console.log("estos son los tutores", store.tutors)

    setTutorsDropDown(store.tutors)
  }, [dispatch, store.tutors])

  useEffect(() => {
    dispatch(setEditOn(0, {}))
    setCurrentSubjec(store.selectedItem)
  }, [dispatch, store.selectedItem])

  useEffect(() => {
    setmodalTeacher(store.popUpTeacher)
    setTutorSelected(null)
    setCurrentSubjec(store.currentSubject)
  }, [dispatch, store.popUpTeacher])

  useEffect(() => {
    setModalStudents(store.popUpStudent)
    setTutorSelected(null)
    setCurrentSubjec(store.currentSubject)
  }, [dispatch, store.popUpStudent])

  useEffect(() => {
    dispatch(setEditOn(0, {}))
  }, [])

  const showEdit = (row) => {
    toggleSidebar()
  }

  useEffect(() => {
    if (store.isEdit !== 0) {
      showEdit(store.rowData)
    }
  }, [dispatch, store.isEdit])

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(
      getData({
        columns: columnsSearch,

        page: page.selected + 1,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        columns: columnsSearch,

        page: currentPage,
        perPage: value,
        sort: "_id",
        sortDirection: "desc",
        q: searchTerm
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val)
    dispatch(
      getData({
        columns: columnsSearch,

        page: currentPage,
        perPage: rowsPerPage,
        sort: "_id",
        sortDirection: "desc",
        q: val
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pr-1"
        }
      />
    )
  }

  const sorting = (column, direction, event) => {
    dispatch(
      getData({
        columns: columnsSearch,

        page: currentPage,
        perPage: rowsPerPage,
        sort: column.selector,
        sortDirection: direction,
        q: searchTerm
      })
    )
  }
  const deleteTeacher = (teacher, subject) => {
    dispatch(
      deleteTeacherPost({
        teacher,
        subject
      })
    ).then(() => {
      dispatch(getItem(subject))
    })
  }

   const deleteStudent = (student, subject) => {
    dispatch(
      deleteStudentPost({
        student,
        subject
      })
    ).then(() => {
      dispatch(getItem(subject))
    })
  }

  const setPrincipal = (teacher, subject) => {
    dispatch(
      setPrincpalTeacher({
        teacher,
        subject
      })
    ).then(() => {
      dispatch(getItem(subject))
    })
  }

  const addTeacher = () => {
    if (!!tutorSelected) {
      dispatch(
        addProfessor({
          tutorSelected,
          subject: store.currentSubject._id,
          isPrincipalTeacher
        })
      ).then(() => {
        dispatch(getItem(store.currentSubject._id))

        setTutorSelected(null)
        setIsPrincipalTeacher(false)

        MySwal.fire({
          title: "Se ha agregado un profesor con éxito",
          icon: "info",
          buttonsStyling: true,
          confirmButtonText: "Ok"
        })

        // dispatch(setPopUpTeacher(false))
      })
    }
  }

  
  const addStudentFunction = () => {
    if (!!selectedStudent) {
      dispatch(
        addStudent({
          selectedStudent,
          subject: store.currentSubject._id
          
        })
      ).then(() => {
        dispatch(getItem(store.currentSubject._id))

        setSelectedStudent(null)
 
        MySwal.fire({
          title: "Se ha agregado el estudiante con éxito",
          icon: "info",
          buttonsStyling: true,
          confirmButtonText: "Ok"
        })

        // dispatch(setPopUpTeacher(false))
      })
    }
  }


  const filterTutors = (items) => {
    const itemsFinal = []

    if (!!currentSubject) {
      items.forEach((element) => {
        let isInTutors = true
        currentSubject.tutors.forEach((item) => {
          if (element._id === item._id) {
            isInTutors = false
          }
        })
        if (isInTutors) {
          itemsFinal.push(element)
        }
      })
    }

    return itemsFinal
  }
  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  return (
    <Fragment>
      <Modal isOpen={modalStudents} toggle={toggleStudentModal}>
        <ModalHeader toggle={toggleStudentModal}>
          Agregar estudiantes
        </ModalHeader>
        {currentSubject && (
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="status">Profesor</Label>
 
                    <Select
                      value={selectedStudent || ""}
                      onChange={(val) => {
                        setSelectedStudent(val)
                      }}
                      onInputChange={selectUser}
                      options={(store.people)}
                      name="tutors"
                      id="tutors"
                    />
                 
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Button
                    color="primary"
                    onClick={addStudentFunction}
                    disabled={selectedStudent === null}
                  >
                    Agregar estudiante
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <hr />
            {currentSubject !== null &&
              currentSubject.students.map((tutor) => (
                <Row className="mb-2">
                  <Col>{tutor.name}</Col>

                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={() => {
                        deleteStudent(tutor._id, currentSubject._id)
                      }}
                    >
                      Borrar
                    </Button>
                  </Col>
                </Row>
              ))}
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="secondary" onClick={toggleStudentModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalTeacher} toggle={toggleTeacherModal}>
        <ModalHeader toggle={toggleTeacherModal}>
          Agregar profesores
        </ModalHeader>
        {currentSubject && (
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="status">Profesor</Label>

                  {!!store.tutors && (
                    <Select
                      value={tutorSelected || ""}
                      onChange={(val) => {
                        setTutorSelected(val)
                      }}
                      options={filterTutors(store.tutors)}
                      name="tutors"
                      id="tutors"
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg="3">
                <FormGroup>
                  <Label for="status">¿Es principal?</Label>

                  <CustomInput
                    type="checkbox"
                    id="audioMuted"
                    checked={isPrincipalTeacher}
                    onChange={() => {
                      setIsPrincipalTeacher(!isPrincipalTeacher)
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Button
                    color="primary"
                    onClick={addTeacher}
                    disabled={tutorSelected === null}
                  >
                    Agregar profesor
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <hr />
            {currentSubject !== null &&
              currentSubject.tutors.map((tutor) => (
                <Row className="mb-2">
                  <Col>{tutor.name}</Col>
                  <Col>
                    <Button
                      color="primary"
                      onClick={() => {
                        setPrincipal(tutor._id, currentSubject._id)
                      }}
                      disabled={currentSubject.principalTutor._id === tutor._id}
                    >
                      principal
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      color="danger"
                      onClick={() => {
                        deleteTeacher(tutor._id, currentSubject._id)
                      }}
                    >
                      Borrar
                    </Button>
                  </Col>
                </Row>
              ))}
          </ModalBody>
        )}

        <ModalFooter>
          <Button color="secondary" onClick={toggleTeacherModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <Card>
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          sortServer={true}
          columns={columns}
          sortIcon={<ChevronDown />}
          onSort={sorting}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
              <Row>
                <Col xl="6" className="d-flex align-items-center p-0">
                  <div className="d-flex align-items-center w-100">
                    <Label for="rows-per-page">Mostrar</Label>
                    <CustomInput
                      className="form-control mx-50"
                      type="select"
                      id="rows-per-page"
                      value={rowsPerPage}
                      onChange={handlePerPage}
                      style={{
                        width: "5rem",
                        padding: "0 0.8rem",
                        backgroundPosition:
                          "calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0"
                      }}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </CustomInput>
                    <Label for="rows-per-page">Resultados</Label>
                  </div>
                </Col>
                <Col
                  xl="6"
                  className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
                >
                  <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
                    <Label className="mb-0" for="search-invoice">
                      Buscador:
                    </Label>
                    <Input
                      id="search-invoice"
                      className="ml-50 w-100"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => handleFilter(e.target.value)}
                    />
                  </div>
                  <Button.Ripple
                    color="primary"
                    onClick={() => {
                      dispatch(setEditOn(Math.random(), {}))
                    }}
                  >
                    Agregar nuevo
                  </Button.Ripple>
                </Col>
              </Row>
            </div>
          }
        />
      </Card>
      <Sidebar size="lg" open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default List
