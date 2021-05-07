// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import {getImageUser } from '@utils'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
// ** Columns
import { columns } from './columns'

import Select from "react-select"

// ** Styles
 
// ** Store & Actions
import { getAllData, getData, setEditOn, setPopUpAsignatura, getSubject, addSubject, getItem, deleteSubjectPost } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Label, CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup  } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Table Header
 

const List = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.programs)


  // ** States
  const [searchTerm, setSearchTerm] = useState('')
  const [columnsSearch, setColumnsSearch] = useState(["name", "gender", "city"])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
  const [currentPlan, setCurrentPlan] = useState({ value: '', label: 'Select Plan' })
  const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: 0 })
  const [modalAsignatura, setModalAsignatura] = useState(false)
  const [currentProgram, setCurrentProgram] = useState(false)
  const [selectedAsignatura, setSelectedAsignatura] = useState(false)
  const [listSignatures, setListSignatures] = useState(false)

  const toggle = () => setModalAsignatura(!modalAsignatura)
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
 
    dispatch(
      getData({
        columns:columnsSearch,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
        q: searchTerm
      })
    )
  }, [dispatch, store.data.length])


  useEffect(() => {
    
     
  }, [dispatch, store.showView])

  useEffect(() => {
    dispatch(
      setEditOn(0, {})
    )

    setCurrentProgram(store.selectedItem)
     
  }, [dispatch, store.selectedItem])

  useEffect(() => {
 
    dispatch(
      setEditOn(0, {})
    )
  }, [])

  
  const showEdit = (row) => {
    toggleSidebar()
  }
 
    useEffect(() => {
    setModalAsignatura(store.popUpAsignatura)
   // setTutorSelected(null)
   // setCurrentSubjec(store.currentSubject)
  }, [dispatch, store.popUpAsignatura])

  useEffect(() => {
     if (store.isEdit !== 0) {
      showEdit(store.rowData)
    }
  }, [dispatch, store.isEdit])
   
  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        columns:columnsSearch,

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

  
  const toggleStudentModal = () => {
    dispatch(setPopUpAsignatura(false))
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        columns:columnsSearch,

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
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        columns:columnsSearch,

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
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }

  const sorting = (column, direction, event) => {
 
    dispatch(
      getData({
        columns:columnsSearch,

        page: currentPage,
        perPage: rowsPerPage,
        sort: column.selector,
        sortDirection:direction,
        q: searchTerm
      })
    )
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

   const getSubjects = (val) => {
    if (val.length > 1) {
      dispatch(
        getSubject({
          q: val
        })
      )
    }
   }
  
    const addSubjectmethod = () => {
    if (!!selectedAsignatura) {
      dispatch(
        addSubject({
          selectedAsignatura,
          program: store.currentProgram._id
          
        })
      ).then(() => {
        dispatch(getItem(store.currentProgram._id))

        setSelectedAsignatura(null)
 
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

  const selectSubject = (val) => {
    getSubjects(val)
  }

   const deleteSubject = (subject, program) => {
    dispatch(
      deleteSubjectPost({
        subject,
        program
      })
    ).then(() => {
      dispatch(getItem(program))
    })
  }
 
  useEffect(() => {
    setPopUpAsignatura(store.popUpAsignatura)
    //setTutorSelected(null)
    setCurrentProgram(store.currentProgram)

    console.log("aqkfdasdf asdf asdf asdfasf ", store.currentProgram)
  }, [dispatch, store.popUpAsignatura])
  

   useEffect(() => {
    
     
     setListSignatures(store.subjects)
  }, [dispatch, store.subjects])

  return (
    <Fragment>
        <Modal isOpen={modalAsignatura} toggle={toggleStudentModal} >
        <ModalHeader toggle={toggleStudentModal}>Agregar asignaturas</ModalHeader>
         {currentProgram && (
          <ModalBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="status">Asignatura</Label>
 
                
                    <Select
                     
                      value={selectedAsignatura || ""}
                      onChange={(val) => {
                        setSelectedAsignatura(val)
                      }}
                      onInputChange={selectSubject}
                     
                      options={(listSignatures)}
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
                    onClick={ addSubjectmethod}
                 
                    disabled={selectedAsignatura === null}
                  >
                    Agregar asignatura
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <hr />
            {currentProgram !== null &&
              currentProgram.subjects.map((subject) => (
                <Row className="mb-2">
                  <Col>{subject.name}</Col>

                  <Col className="text-right">
                    <Button
                      color="danger"
                      onClick={() => {
                        deleteSubject(subject._id, currentProgram._id)
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
           <Button color="secondary" onClick={toggleStudentModal}>Cancel</Button>
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
          className='react-dataTable'
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
              <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                  <div className='d-flex align-items-center w-100'>
                    <Label for='rows-per-page'>Mostrar</Label>
                    <CustomInput
                      className='form-control mx-50'
                      type='select'
                      id='rows-per-page'
                      value={rowsPerPage}
                      onChange={handlePerPage}
                      style={{
                        width: '5rem',
                        padding: '0 0.8rem',
                        backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
                      }}
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                    </CustomInput>
                    <Label for='rows-per-page'>Resultados</Label>
                  </div>
                </Col>
                <Col
                  xl='6'
                  className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
                >
                  <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
                    <Label className='mb-0' for='search-invoice'>
                      Buscador:
                    </Label>
                    <Input
                      id='search-invoice'
                      className='ml-50 w-100'
                      type='text'
                      value={searchTerm}
                      onChange={e => handleFilter(e.target.value)}
                    />
                  </div>
                  <Button.Ripple color='primary' onClick = {() => {
                     
                     dispatch(
                      setEditOn(Math.random(), {})
                    )
                  }}>
                    Agregar nuevo
                  </Button.Ripple>
                    
                </Col>
              </Row>
            </div>
          }
        />
      </Card>

      <Sidebar     
            size='lg' 
            open={sidebarOpen} 
            toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default List
