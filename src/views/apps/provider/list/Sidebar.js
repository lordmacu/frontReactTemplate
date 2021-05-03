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
  getAllStatuses,
  getAllCountries
} from "../store/action"

const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  const store = useSelector((state) => state.providers)

  const baseUrl = "http://localhost:3000/api/"

  const [name, setName] = useState("")

  const [sigla, setSigla] = useState("")

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [startDateDefault, setStartDateDefault] = useState(new Date())
  const [endDateDefault, setEndDateDefault] = useState(new Date())
  const [selectedCountry, setSelectedCountry] = useState("1")
  const [country, setCountry] = useState("1")

  const [id, setId] = useState(0)

  const [contactForm, setContactForm] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [phone, setPhone] = useState(null)
  const [email, setEmail] = useState(null)
  const [web, setWeb] = useState(null)

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  const getCountry = (val) => {
    if (val.length > 3) {
      dispatch(
        getAllCountries({
          q: val
        })
      )
    }
  }

  const selectCountry = (val) => {
    getCountry(val)
  }

  const selectedItemCountry = (val) => {
    setSelectedCountry(val)
    setCountry(val)
  }

  useEffect(() => {
    if (!!store.rowData._id) {
      setId(store.rowData._id)
      setName(store.rowData.name)
      setContactForm(store.rowData.contactForm)
      setAddress(store.rowData.address)
      setCity(store.rowData.city)
      setPhone(store.rowData.phone)
      setEmail(store.rowData.email)
      setWeb(store.rowData.web)

      if (!!store.rowData.country) {
        const statusLocal = store.rowData.country
        statusLocal.label = statusLocal.name
        setCountry(statusLocal)
      }
    } else {
      setId(0)
    }
  }, [dispatch, store.isEdit])

  // ** Store Vars

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar proveedor"
    } else {
      return "Editar proveedor"
    }
  }

  const checkDisabled = () => {
    const disabled = false

    return disabled
  }

  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values) => {
    values["country"] = country._id
 
    values["active"] = true
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
                Nombre <span className="text-danger">*</span>
              </Label>
              <Input
                name="name"
                id="name"
                defaultValue={name}
                placeholder="Ingresar el nombre"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["name"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-2">
              <Label for="contactForm">Persona de contacto</Label>
              <Input
                name="contactForm"
                id="contactForm"
                defaultValue={contactForm}
                placeholder="Ingresar la persona de contacto"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["contactForm"] })}
              />
            </FormGroup>
          </Col>{" "}
        </Row>

        <FormGroup>
          <Label for="address">
            Dirección <span className="text-danger">*</span>
          </Label>
          <Input
            name="address"
            id="address"
            type="textarea"
            autoComplete={0}
            defaultValue={address}
            placeholder="Ingresar la dirección"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["address"] })}
          />
        </FormGroup>

        <Row>
          <Col>
            <FormGroup>
              <Label for="city">Ciudad: <span className="text-danger">*</span></Label>
              <Input
                name="city"
                id="city"
                autoComplete={0}
                defaultValue={city}
                type="text"
                placeholder="Ingresar la ciudad"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["city"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="country">País: <span className="text-danger">*</span></Label>
              <Select
                isClearable
                value={country}
                options={store.countries}
                onInputChange={selectCountry}
                onChange={selectedItemCountry}
                name="country"
                id="country"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["country"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="phone">
            Teléfono <span className="text-danger">*</span>
          </Label>
          <Input
            name="phone"
            id="phone"
            autoComplete={0}
            defaultValue={phone}
            type="tel"
            placeholder="Ingresar el teléfono"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["phone"] })}
          />
        </FormGroup>

        <Row>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="email">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                autoComplete={0}
                defaultValue={email}
                type="email"
                placeholder="Ingresar el email"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["email"] })}
              />
            </FormGroup>
          </Col>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="web">Website: </Label>

              <Input
                name="web"
                id="web"
                autoComplete={0}
                defaultValue={web}
                type="web"
                placeholder="Ingresar el website"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["web"] })}
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
