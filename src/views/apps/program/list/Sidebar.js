// ** React Import
import { useState, useEffect } from "react"
import InputPasswordToggle from "@components/input-password-toggle"
import { useDispatch, useSelector } from "react-redux"

// ** Custom Components
import Sidebar from "@components/sidebar"

import Select from "react-select"
import Uppy from "@uppy/core"
const XHRUpload = require("@uppy/xhr-upload")

import { DragDrop } from "@uppy/react"

// ** Utils
import { getImageUser } from "@utils"
import Flatpickr from "react-flatpickr"
import "@styles/react/libs/flatpickr/flatpickr.scss"

// ** Third Party Components
import classnames from "classnames"
import {
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Col,
  Row
} from "reactstrap"
import { useForm, Controller } from "react-hook-form"

// ** Store & Actions
import {
  addItem,
  addImage,
  udpateItem,
  getAllAggrements,
  getALlPeople
} from "../store/action"

const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  const store = useSelector((state) => state.programs)

  const baseUrl = "http://localhost:3000/api/"

  const [name, setName] = useState("")

  const [sigla, setSigla] = useState("")

  const [agreement, setAgreement] = useState(null)

  const [directorAcad, setdirectorAcad] = useState(null)
  const [coordinatorAcad, setCoordinatorAcad] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [startDateDefault, setStartDateDefault] = useState(new Date())
  const [endDateDefault, setEndDateDefault] = useState(new Date())

  const [price, setPrice] = useState(0)
  const [period, setPeriod] = useState(0)
  const [year, setYear] = useState(0)
  const [id, setId] = useState(0)

  const [description, setDescription] = useState("")
  const [studentProfile, setStudentProfile] = useState("")
  const [title, setTitle] = useState("")

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  useEffect(() => {
    if (!!store.rowData._id) {
      setId(store.rowData._id)
      setName(store.rowData.name)
      setSigla(store.rowData.sigla)

      if (!!store.rowData.agreement) {
        setAgreement({
          value: store.rowData.agreement.id,
          label: store.rowData.agreement.name,
          id: store.rowData.agreement._id
        })
      }

      if (!!store.rowData.directorAcad) {
        setdirectorAcad({
          value: store.rowData.directorAcad._id,
          label: store.rowData.directorAcad.name,
          id: store.rowData.directorAcad._id
        })
      }
      if (!!store.rowData.coordinatorAcad) {
        setCoordinatorAcad({
          value: store.rowData.coordinatorAcad._id,
          label: store.rowData.coordinatorAcad.name,
          id: store.rowData.coordinatorAcad._id
        })
      }

      setStartDate(store.rowData.startDate)
      setEndDate(store.rowData.endDate)
      setPrice(store.rowData.price)
      setPeriod(store.rowData.period)
      setYear(store.rowData.year)
      setDescription(store.rowData.description)
      setStudentProfile(store.rowData.studentProfile)
      setTitle(store.rowData.title)
    } else {
      setId(0)
      setSigla("")

      setName("")
      setdirectorAcad("")
      setCoordinatorAcad("")
      setStartDate(new Date())
      setEndDate(new Date())
      setPrice("")
      setPeriod("")
      setYear("")
      setDescription("")
      setStudentProfile("")
      setTitle("")
    }

    dispatch(
        getAllAggrements({
          q: ""
        })
      )
  }, [dispatch, store.isEdit])

  // ** Store Vars

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar programa"
    } else {
      return "Editar programa"
    }
  }
  const openImage = (val) => {
    window.open(getImageUser(userImage))
  }

  const getAggrement = (val) => {
    if (val.length > 3) {
      
    }
  }

  const selectAggrement = (val) => {
    getAggrement(val)
  }

  const selectedItemAggrement = (val) => {
    console.log(val)
    setAgreement(val)
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

  const selectedItemDirectorAcad = (val) => {
    setdirectorAcad(val)
  }
  const selectedItemCoordinatorAcad = (val) => {
    setCoordinatorAcad(val)
  }

  const checkDisabled = () => {
    let disabled = false

    if (agreement === null) {
      disabled = true
    }

    return disabled
  }

  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values) => {
    values["agreement"] = agreement._id
    values["directorAcad"] = directorAcad._id
    values["coordinatorAcad"] = coordinatorAcad._id
    values["startDate"] = startDate
    values["endDate"] = endDate
    values["id"] = id

    toggleSidebar()

    if (id === 0) {
      dispatch(addItem(values))
    } else {
      dispatch(udpateItem(values))
    }
  }
  //// falta fecha genero  pais curriculum
  return (
    <Sidebar
      size="lg"
      open={open}
      title={titlePanel()}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row>
          <Col>
            <FormGroup>
              <Label for="full-name">
                Sigla <span className="text-danger">*</span>
              </Label>
              <Input
                name="sigla"
                id="sigla"
                defaultValue={sigla}
                placeholder="Ingresar la sigla"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["sigla"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-2">
              <Label for="agreement">Universidad</Label>
              <Select
                isClearable
                value={agreement}
                options={store.aggrements}
                 onChange={selectedItemAggrement}
                name="agreement"
                id="agreement"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["agreement"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="lastName">
            Nombre <span className="text-danger">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            autoComplete={0}
            defaultValue={name}
            placeholder="Ingresar el nombre"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["lastName"] })}
          />
        </FormGroup>

        <Row>
          <Col>
            <FormGroup>
              <Label for="directorAcad">Director Acad:</Label>
              <Select
                isClearable
                value={directorAcad}
                options={store.people}
                onInputChange={selectUser}
                onChange={selectedItemDirectorAcad}
                name="directorAcad"
                id="directorAcad"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["directorAcad"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="coordinatorAcad">Coordinador Acad:</Label>
              <Select
                isClearable
                value={coordinatorAcad}
                options={store.people}
                onInputChange={selectUser}
                onChange={selectedItemCoordinatorAcad}
                name="coordinatorAcad"
                id="coordinatorAcad"
                innerRef={register({ required: true })}
                className={classnames({
                  "is-invalid": errors["coordinatorAcad"]
                })}
              />
            </FormGroup>
          </Col>
        </Row>

        
        <Row>
          <Col>
            <FormGroup>
              <Label for="price">
                Precio Total: <span className="text-danger">*</span>
              </Label>
              <Input
                name="price"
                id="price"
                autoComplete={0}
                defaultValue={price}
                placeholder="Ingresar el precio"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["price"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="title">
            Titulación: <span className="text-danger">*</span>
          </Label>
          <Input
            name="title"
            id="title"
            autoComplete={0}
            defaultValue={title}
            placeholder="Ingresar el título"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["title"] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="description">
            Descripción <span className="text-danger">*</span>
          </Label>
          <Input
            name="description"
            id="description"
            autoComplete={0}
            defaultValue={description}
            type="textarea"
            placeholder="Ingresar la descripción"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["description"] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="studentProfile">
            Perfil Estudiante: <span className="text-danger">*</span>
          </Label>
          <Input
            name="studentProfile"
            id="studentProfile"
            autoComplete={0}
            defaultValue={studentProfile}
            type="textarea"
            placeholder="Ingresar el perfil del estudiante"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["studentProfile"] })}
          />
        </FormGroup>
        
        <Row>
          <Col>
            <Button
              type="submit"
              className="mr-1"
              color="primary"
              disabled={checkDisabled()}
            >
              Guardar
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={toggleSidebar}
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewItems
