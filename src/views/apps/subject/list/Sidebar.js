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
  getAllTypes,
  getAllStatuses
} from "../store/action"

const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  const store = useSelector((state) => state.subjects)

  const baseUrl = "http://localhost:3000/api/"

  const [name, setName] = useState("")

  const [sigla, setSigla] = useState("")

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [startDateDefault, setStartDateDefault] = useState(new Date())
  const [endDateDefault, setEndDateDefault] = useState(new Date())

  const [id, setId] = useState(0)
  const [version, setVersion] = useState("")
  const [credits, setCredits] = useState("")
  const [hours, setHours] = useState("")
  const [content, setContent] = useState("")
  const [types, setTypes] = useState([])
  const [statuses, setStatuses] = useState([])
  const [type, setType] = useState(null)
  const [status, setStatus] = useState(null)

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  useEffect(() => {
    if (!!store.rowData._id) {
      setId(store.rowData._id)
      setName(store.rowData.name)
      setSigla(store.rowData.sigla)

      const statusLocal = store.rowData.status
      statusLocal.label = statusLocal.name
      setStatus(statusLocal)

      setVersion(store.rowData.version)
      setCredits(store.rowData.credits)
      setHours(store.rowData.hours)
      setContent(store.rowData.content)

      if (!!store.rowData.type) {
        const typeLocal = store.rowData.type
        typeLocal.label = typeLocal.name
        setType(typeLocal)
      }
    } else {
      setId(0)
      setName(null)
      setSigla(null)
      setStatus(null)
      setType(null)
      setVersion(null)
      setCredits(null)
      setHours(null)
      setContent(null)
    }

    dispatch(getAllTypes({}))
    dispatch(getAllStatuses({}))
  }, [dispatch, store.isEdit])

  useEffect(() => {
    setTypes(store.types)
  }, [dispatch, store.types])

  useEffect(() => {
    setStatuses(store.statuses)
  }, [dispatch, store.statuses])

  // ** Store Vars

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar materia"
    } else {
      return "Editar materia"
    }
  }

  const checkDisabled = () => {
    let disabled = false

    if (status === null) {
      disabled = true
    }

    if (type === null) {
      disabled = true
    }

    return disabled
  }

  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values) => {
    values["status"] = status._id
    values["type"] = type._id
    values["startDate"] = startDate
    values["endDate"] = endDate
    values["id"] = id
    console.log(values)

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
              <Label for="version">Versión</Label>
              <Input
                name="version"
                id="version"
                defaultValue={version}
                placeholder="Ingresar la version"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["version"] })}
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
              <Label for="credits">Créditos:</Label>
              <Input
                name="credits"
                id="credits"
                autoComplete={0}
                defaultValue={credits}
                type="number"
                placeholder="Ingresar los creditos"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["credits"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="hours">Horas:</Label>
              <Input
                name="hours"
                id="hours"
                autoComplete={0}
                type="number"
                defaultValue={hours}
                placeholder="Ingresar las horas"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["hours"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="content">
            Contenido <span className="text-danger">*</span>
          </Label>
          <Input
            name="content"
            id="content"
            autoComplete={0}
            defaultValue={content}
            type="textarea"
            placeholder="Ingresar el contenido"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["content"] })}
          />
        </FormGroup>

        <Row>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="dni">
                Fecha Inicio <span className="text-danger">*</span>
              </Label>
              <Flatpickr
                name="startDate"
                id="startDate"
                autoComplete={0}
                defaultValue={startDateDefault}
                value={startDate}
                className={classnames("form-control", {
                  "is-invalid": errors.dob
                })}
                onChange={(date) => {
                  setStartDate(date)
                }}
              />
            </FormGroup>
          </Col>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="birth-date">Fecha fin</Label>

              <Flatpickr
                name="birthday"
                id="birthday"
                autoComplete={0}
                defaultValue={endDateDefault}
                value={endDate}
                className={classnames("form-control", {
                  "is-invalid": errors.dob
                })}
                onChange={(date) => {
                  setEndDate(date)
                }}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="type">
                Tipo <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable
                value={type}
                onChange={(val) => {
                  setType(val)
                }}
                options={store.types}
                name="type"
                id="type"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["type"] })}
              />
            </FormGroup>
          </Col>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="status">Status</Label>

              <Select
                isClearable
                value={status}
                onChange={(val) => {
                  setStatus(val)
                }}
                options={store.statuses}
                name="status"
                id="status"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["status"] })}
              />
            </FormGroup>
          </Col>
        </Row>

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
