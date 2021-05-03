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
import { addItem, getAllCountries, addImage, udpateItem } from "../store/action"

const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  const store = useSelector((state) => state.users)

  const baseUrl = "http://localhost:3000/api/"

  const [name, setName] = useState("")

  const [lastName, setLastName] = useState("")
  const [addressHome, setAddressHome] = useState("")
  const [addressOffice, setAddressOffice] = useState("")
  const [birthday, setBirthday] = useState("")
  const [city, setCity] = useState("")
  const [commentary, setCommentary] = useState("")
  const [country, setCountry] = useState("")
  const [curriculum, setCurriculum] = useState("")
  const [dni, setDni] = useState("")
  const [userImage, setUserImage] = useState("")
  const [id, setId] = useState(0)

  const [mobile, setMobile] = useState("")
  const [phone, setPhone] = useState("")
  const [principalEmail, setPrincipalEmail] = useState("")
  const [secundaryEmail, setSecundaryEmail] = useState("")
  const [statePerson, setStatePerson] = useState("")
  const [title, setTitle] = useState("")
  const [university, setUniversity] = useState("")
  const [zipCode, setZipCode] = useState("")

  const [gender, setGender] = useState("masculine")

  const [date, setDate] = useState(new Date())

  const [activeTab, setActiveTab] = useState("1")

  const [selectedCountry, setSelectedCountry] = useState("1")

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  useEffect(() => {
    if (!!store.rowData._id) {
      setId(store.rowData._id)
      setName(store.rowData.name)

      setLastName(store.rowData.lastName)
      setAddressHome(store.rowData.addressHome)
      setAddressOffice(store.rowData.addressOffice)
      setBirthday(store.rowData.birthday)
      setCity(store.rowData.city)
      setCommentary(store.rowData.commentary)
      setCountry(store.rowData.country)
      setSelectedCountry(store.rowData.country)
      setCurriculum(store.rowData.curriculum)
      setDni(store.rowData.dni)
      setUserImage(store.rowData.image)
      setMobile(store.rowData.mobile)
      setPhone(store.rowData.phone)
      setPrincipalEmail(store.rowData.principalEmail)
      setSecundaryEmail(store.rowData.secundaryEmail)
      setStatePerson(store.rowData.state)
      setTitle(store.rowData.title)
      setUniversity(store.rowData.university)
      setZipCode(store.rowData.zipCode)
      setGender(store.rowData.gender)
    } else {
      setId(0)
      setGender("masculine")

      setName("")

      setLastName("")
      setAddressHome("")
      setAddressOffice("")
      setBirthday("")
      setCity("")
      setCommentary("")
      setCountry("")
      setSelectedCountry("")
      setCurriculum("")
      setDni("")
      setUserImage("")
      setMobile("")
      setPhone("")
      setPrincipalEmail("")
      setSecundaryEmail("")
      setStatePerson("")
      setTitle("")
      setUniversity("")
      setZipCode("")

      setActiveTab("1")
    }
  }, [dispatch, store.isEdit])

  // ** Store Vars

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

  const changeCurriculum = (val) => {
    setCurriculum(val)
  }

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar persona"
    } else {
      return "Editar persona"
    }
  }
  const openImage = (val) => {
    window.open(getImageUser(userImage))
  }

  const checkDisabled = () => {
    let disabled = true

    if (!!country) {
      disabled = false
    }

    if (!!date) {
      disabled = false
    }

    return disabled
  }

  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  uppy.use(XHRUpload, {
    endpoint: `${baseUrl}archives/upload`,
    formData: true,
    fieldName: "files"
  })

  uppy.on("complete", (result) => {
    const urlImage = result.successful[0].response.body.image
    setUserImage(urlImage)
  })

  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values) => {
    values["birthday"] = date
    values["gender"] = gender
    values["country"] = selectedCountry._id
    values["image"] = userImage
    values["id"] = id

    toggleSidebar()

    if (id === 0) {
      dispatch(addItem(values))
    } else {
      dispatch(udpateItem(values))

      //console.log(values)
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
        <Nav tabs className="nav-right">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1")
              }}
            >
              Detalles Personales
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2")
              }}
            >
              Ubicación{" "}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4")
              }}
            >
              Información Complementaria
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3")
              }}
            >
              Contacto
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="mt-2">
          <TabPane tabId="1">
            <FormGroup>
              <Label for="full-name">
                Nombres <span className="text-danger">*</span>
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

            <FormGroup>
              <Label for="lastName">
                Apellidos <span className="text-danger">*</span>
              </Label>
              <Input
                name="lastName"
                id="lastName"
                autoComplete={0}
                defaultValue={lastName}
                placeholder="Ingresar el nombre"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["lastName"] })}
              />
            </FormGroup>
            <Row>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="dni">
                    Carnet de Identidad <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="dni"
                    id="dni"
                    autoComplete={0}
                    defaultValue={dni}
                    placeholder="Ingresar el nombre"
                    innerRef={register({ required: true })}
                    className={classnames({ "is-invalid": errors["dni"] })}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="birth-date">Fecha de nacimiento</Label>

                  <Flatpickr
                    data-enable-time
                    name="birthday"
                    id="birthday"
                    autoComplete={0}
                    defaultValue={birthday}
                    value={date}
                    className={classnames("form-control", {
                      "is-invalid": errors.dob
                    })}
                    onChange={(date) => {
                      setDate(date)
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xs="12" lg="6" md="6">
                <FormGroup
                  className="mb-2"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <Label for="gender">Género</Label>
                  <Input
                    type="select"
                    id="gender"
                    name="gender"
                    defaultValue={gender}
                  >
                    <option value="masculine">Masculíno</option>
                    <option value="femenine">Femeníno</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="password">Contraseña</Label>
                  <InputPasswordToggle
                    name="password"
                    autoComplete={0}
                    id="password"
                    className="mb-2"
                    htmlFor="basic-default-password"
                  />
                </FormGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <FormGroup>
              <Label for="addressHome">
                Dirección Domicilio <span className="text-danger">*</span>
              </Label>
              <Input
                autoComplete={0}
                name="addressHome"
                id="addressHome"
                type="textarea"
                defaultValue={addressHome}
                placeholder="Ingresar la dirección de domicilio"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["addressHome"] })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="addressOffice">Dirección Oficina</Label>
              <Input
                autoComplete={0}
                defaultValue={addressOffice}
                name="addressOffice"
                id="addressOffice"
                type="textarea"
                placeholder="Ingresar la dirección de oficina"
                innerRef={register({ required: false })}
                className={classnames({
                  "is-invalid": errors["addressOffice"]
                })}
              />
            </FormGroup>

            <Row>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="city">Ciudad</Label>
                  <Input
                    autoComplete={0}
                    name="city"
                    id="city"
                    defaultValue={city}
                    placeholder="Ingresar la ciudad"
                    innerRef={register({ required: false })}
                    className={classnames({ "is-invalid": errors["city"] })}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="state">Estado/Provincia</Label>
                  <Input
                    name="state"
                    id="state"
                    autoComplete={0}
                    defaultValue={statePerson}
                    placeholder="Ingresar la ciudad"
                    innerRef={register({ required: false })}
                    className={classnames({ "is-invalid": errors["state"] })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="zipCode">Código Postal</Label>
                  <Input
                    autoComplete={0}
                    name="zipCode"
                    id="zipCode"
                    defaultValue={zipCode}
                    placeholder="Ingresar el código postal"
                    innerRef={register({ required: false })}
                    className={classnames({ "is-invalid": errors["zipCode"] })}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="country">
                    País <span className="text-danger">*</span>
                  </Label>

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
          </TabPane>
          <TabPane tabId="3">
            <FormGroup>
              <Label for="principalEmail">
                Email Principal <span className="text-danger">*</span>
              </Label>
              <Input
                autoComplete={0}
                name="principalEmail"
                id="principalEmail"
                type="email"
                defaultValue={principalEmail}
                placeholder="Ingresar el email principal"
                innerRef={register({ required: true })}
                className={classnames({
                  "is-invalid": errors["principalEmail"]
                })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="secundaryEmail">Email Segundario</Label>
              <Input
                autoComplete={0}
                name="secundaryEmail"
                id="secundaryEmail"
                type="email"
                defaultValue={secundaryEmail}
                placeholder="Ingresar el email segundario"
                innerRef={register({ required: false })}
                className={classnames({
                  "is-invalid": errors["secundaryEmail"]
                })}
              />
            </FormGroup>

            <Row>
              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="phone">
                    Teléfono <span className="text-danger">*</span>
                  </Label>
                  <Input
                    autoComplete={0}
                    name="phone"
                    defaultValue={phone}
                    id="phone"
                    placeholder="Ingresar el teléfono"
                    innerRef={register({ required: true })}
                    className={classnames({ "is-invalid": errors["phone"] })}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" lg="6" md="6">
                <FormGroup>
                  <Label for="mobile">Móvil</Label>
                  <Input
                    autoComplete={0}
                    name="mobile"
                    id="mobile"
                    defaultValue={mobile}
                    placeholder="Ingresar el móvil"
                    innerRef={register({ required: false })}
                    className={classnames({ "is-invalid": errors["mobile"] })}
                  />
                </FormGroup>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="4">
            <FormGroup>
              <Label for="title">Título profesional</Label>
              <Input
                autoComplete={0}
                name="title"
                id="title"
                defaultValue={title}
                placeholder="Ingresar el título profesional"
                innerRef={register({ required: false })}
                className={classnames({ "is-invalid": errors["title"] })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="university">Universidad</Label>
              <Input
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                name="university"
                id="university"
                defaultValue={university}
                placeholder="Ingresar la universidad"
                innerRef={register({ required: false })}
                className={classnames({ "is-invalid": errors["university"] })}
              />
            </FormGroup>

            <FormGroup>
              <Row>
                <Col xs="12" lg="6" md="6">
                  <Label for="image">Foto</Label>
                  <DragDrop
                    name="image"
                    id="image"
                    uppy={uppy}
                    locale={{
                      strings: {
                        // Text to show on the droppable area.
                        // `%{browse}` is replaced with a link that opens the system file selection dialog.
                        dropHereOr: "Click para %{browse} una imágen",
                        // Used as the label for the link that opens the system file selection dialog.
                        browse: "subir"
                      }
                    }}
                  />
                </Col>

                <Col xs="12" lg="6" md="6">
                  <div className="container-avatar">
                    <img
                      onClick={openImage}
                      width={100}
                      className="mt-2"
                      src={getImageUser(userImage)}
                    />
                  </div>
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Label for="curriculum">Curriculum</Label>
              <Input
                name="curriculum"
                id="curriculum"
                type="textarea"
                defaultValue={curriculum}
                placeholder="Ingresar la universidad"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["curriculum"] })}
              />
            </FormGroup>

            <FormGroup>
              <Label for="commentary">Comentarios</Label>
              <Input
                name="commentary"
                id="commentary"
                type="textarea"
                defaultValue={commentary}
                placeholder="Ingresar la universidad"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["commentary"] })}
              />
            </FormGroup>
          </TabPane>
        </TabContent>

        <Button
          type="submit"
          className="mr-1"
          color="primary"
          disabled={checkDisabled()}
        >
          Guardar
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewItems
