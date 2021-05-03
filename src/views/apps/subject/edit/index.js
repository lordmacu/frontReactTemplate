// ** React Imports
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux"

// ** Third Party Components
import { User, Info, Share2 } from "react-feather"

// ** React Import
import InputPasswordToggle from "@components/input-password-toggle"

// ** Custom Components
import Sidebar from "@components/sidebar"

import Select from "react-select"
import Uppy from "@uppy/core"
const XHRUpload = require("@uppy/xhr-upload")
import SunEditor from "suneditor-react"
import "suneditor/dist/css/suneditor.min.css"
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
  Card,
  CardBody,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  TabContent,
  ListGroupItem,
  Badge,
  TabPane,
  Alert,
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
  getItem
} from "../store/action"

// ** Styles
import "@styles/react/apps/app-general.scss"

const ItemEdit = (props) => {
  // ** States & Vars

  const store = useSelector((state) => state.subjects)
  const stores = useSelector((state) => state.subjects)
  const { id } = useParams()
  const dispatch = useDispatch()
  //  const { id } = useParams()

  const baseUrl = "http://localhost:3000/api/"

  const [name, setName] = useState("")

  const [sigla, setSigla] = useState("")

  const [agreement, setAgreement] = useState(null)
  const [activeTab, setActiveTab] = useState(1)

  const [directorAcad, setdirectorAcad] = useState(null)
  const [coordinatorAcad, setCoordinatorAcad] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [startDateDefault, setStartDateDefault] = useState(new Date())
  const [endDateDefault, setEndDateDefault] = useState(new Date())

  const [price, setPrice] = useState(0)
  const [period, setPeriod] = useState(0)
  const [year, setYear] = useState(0)

  const [description, setDescription] = useState("")
  const [studentProfile, setStudentProfile] = useState("")
  const [title, setTitle] = useState("")
  const [versions, setVersions] = useState([])

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  useEffect(() => {
    setVersions(store.versions)
  }, [dispatch, store.versions])

  useEffect(() => {
    if (!!store.selectedItem) {
      dispatch(getAllVersions(id))

      // setId(store.selectedItem._id)
      setName(store.selectedItem.name)
      setSigla(store.selectedItem.sigla)

      if (!!store.selectedItem.agreement) {
        setAgreement({
          value: store.selectedItem.agreement.id,
          label: store.selectedItem.agreement.name,
          id: store.selectedItem.agreement._id
        })
      }

      if (!!store.selectedItem.directorAcad) {
        setdirectorAcad({
          value: store.selectedItem.directorAcad._id,
          label: store.selectedItem.directorAcad.name,
          id: store.selectedItem.directorAcad._id
        })
      }
      if (!!store.selectedItem.coordinatorAcad) {
        setCoordinatorAcad({
          value: store.selectedItem.coordinatorAcad._id,
          label: store.selectedItem.coordinatorAcad.name,
          id: store.selectedItem.coordinatorAcad._id
        })
      }

      setStartDate(store.selectedItem.startDate)
      setEndDate(store.selectedItem.endDate)
      setPrice(store.selectedItem.price)
      setPeriod(store.selectedItem.period)
      setYear(store.selectedItem.year)
      setDescription(store.selectedItem.description)

      setStudentProfile(store.selectedItem.studentProfile)
      setTitle(store.selectedItem.title)
    } else {
      // setId(0)
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
  }, [dispatch, store.selectedItem])

  // ** Store Vars

  const addVersionMethod = (val) => {
    dispatch(
      addVersion({
        id
      })
    )
  }

  const getAggrement = (val) => {
    if (val.length > 3) {
      dispatch(
        getAllAggrements({
          q: val
        })
      )
    }
  }

  const selectAggrement = (val) => {
    getAggrement(val)
  }

  const selectedItemAggrement = (val) => {
    console.log(val)
    setAgreement(val)
  }
 

  const selectUser = (val) => {
  
    
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

  const toggle = (values) => {
    setActiveTab(values)
  }
  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values) => {
    values["agreement"] = agreement._id
    values["directorAcad"] = directorAcad._id
    values["coordinatorAcad"] = coordinatorAcad._id
    values["startDate"] = startDate
    values["endDate"] = endDate
    values["description"] = description
    values["studentProfile"] = studentProfile
    values["id"] = id

    if (id === 0) {
      dispatch(addItem(values))
    } else {
      dispatch(udpateItem(values, props))
    }
  }
  const versionsStore = useSelector((state) => state.versions)

  // ** Function to toggle tabs

  // ** Function to get user on mount
  useEffect(() => {
    setActiveTab("1")
    setVersions([])
    setVersions((versions) => versions.concat({ name: "version", index: 1 }))
    setVersions((versions) => versions.concat({ name: "version", index: 2 }))
    setVersions((versions) => versions.concat({ name: "version", index: 3 }))
    dispatch(getItem(id))
  }, [dispatch])
  return stores.selectedItem !== null && stores.selectedItem !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <span className="align-middle d-none d-sm-block">
                    Información
                  </span>
                </NavLink>
              </NavItem>
              <NavLink active={activeTab === "2"} onClick={() => toggle("2")}>
                <span className="align-middle d-none d-sm-block">
                  Versiones
                </span>
              </NavLink>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Card>
                  <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                          className={classnames({
                            "is-invalid": errors["lastName"]
                          })}
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
                              className={classnames({
                                "is-invalid": errors["directorAcad"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="coordinatorAcad">
                              Coordinador Acad:
                            </Label>
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
                        <Col>
                          <FormGroup>
                            <Label for="price">
                              Precio Total:
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="price"
                              id="price"
                              autoComplete={0}
                              defaultValue={price}
                              placeholder="Ingresar el precio"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["price"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="price">Nota de aprobación</Label>
                            <Input
                              name="price"
                              id="price"
                              autoComplete={0}
                              defaultValue={0}
                              placeholder="Ingresar el precio"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["price"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="price">Número de asignaturas</Label>
                            <Input
                              name="price"
                              id="price"
                              autoComplete={0}
                              defaultValue={0}
                              placeholder="Ingresar el precio"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["price"]
                              })}
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <Label for="directorAcad">Universidad</Label>
                            <Select
                              isClearable
                              value={""}
                              options={store.people}
                              onInputChange={selectUser}
                              onChange={selectedItemDirectorAcad}
                              name="directorAcad"
                              id="directorAcad"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["directorAcad"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="p-2">
                          <Button.Ripple
                            tag="label"
                            className="mr-50 cursor-pointer"
                            color="primary"
                            outline
                          >
                            Reglamento
                            <Input
                              type="file"
                              name="file"
                              id="uploadImg"
                              hidden
                            />
                          </Button.Ripple>
                        </Col>
                        <Col className="p-2">
                          <Button.Ripple
                            tag="label"
                            className="mr-50 cursor-pointer"
                            color="primary"
                            outline
                          >
                            Brochure
                            <Input
                              type="file"
                              name="file"
                              id="uploadImg"
                              hidden
                            />
                          </Button.Ripple>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Label for="title">
                          Titulación: <span className="text-danger">*</span>
                        </Label>

                        {title && (
                          <SunEditor
                            name="title"
                            setOptions={{
                              height: 300,
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ]
                            }}
                            id="title"
                            autoComplete={0}
                            defaultValue={title}
                            placeholder="Ingresar el título"
                            innerRef={register({ required: true })}
                            onChange={setTitle}
                            className={classnames({
                              "is-invalid": errors["title"]
                            })}
                          />
                        )}

                        {!title && (
                          <SunEditor
                            setOptions={{
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ],
                              height: 300
                            }}
                            name="title"
                            id="title"
                            autoComplete={0}
                            defaultValue={""}
                            placeholder="Ingresar el título"
                            innerRef={register({ required: true })}
                            onChange={setTitle}
                            className={classnames({
                              "is-invalid": errors["title"]
                            })}
                          />
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label for="description">
                          Descripción <span className="text-danger">*</span>
                        </Label>

                        {description && (
                          <SunEditor
                            setOptions={{
                              height: 300,
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ]
                            }}
                            name="description"
                            id="description"
                            autoComplete={0}
                            defaultValue={description}
                            placeholder="Ingresar la descripción"
                            innerRef={register({ required: true })}
                            onChange={setDescription}
                            className={classnames({
                              "is-invalid": errors["description"]
                            })}
                          />
                        )}

                        {!description && (
                          <SunEditor
                            setOptions={{
                              height: 300,
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ]
                            }}
                            name="description"
                            id="description"
                            autoComplete={0}
                            defaultValue={""}
                            placeholder="Ingresar la descripción"
                            innerRef={register({ required: true })}
                            onChange={setDescription}
                            className={classnames({
                              "is-invalid": errors["description"]
                            })}
                          />
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label for="studentProfile">
                          Perfil Estudiante:{" "}
                          <span className="text-danger">*</span>
                        </Label>

                        {studentProfile && (
                          <SunEditor
                            setOptions={{
                              height: 300,
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ]
                            }}
                            name="studentProfile"
                            id="studentProfile"
                            autoComplete={0}
                            defaultValue={studentProfile}
                            onChange={setStudentProfile}
                            type="textarea"
                            placeholder="Ingresar el perfil del estudiante"
                            innerRef={register({ required: true })}
                            className={classnames({
                              "is-invalid": errors["studentProfile"]
                            })}
                          />
                        )}

                        {!studentProfile && (
                          <SunEditor
                            setOptions={{
                              height: 300,
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ]
                            }}
                            name="studentProfile"
                            id="studentProfile"
                            autoComplete={0}
                            defaultValue={""}
                            onChange={setStudentProfile}
                            type="textarea"
                            placeholder="Ingresar el perfil del estudiante"
                            innerRef={register({ required: true })}
                            className={classnames({
                              "is-invalid": errors["studentProfile"]
                            })}
                          />
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label for="studentProfile">Observaciones</Label>

                        {studentProfile && (
                          <SunEditor
                            setOptions={{
                              height: 300,
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ]
                            }}
                            name="studentProfile"
                            id="studentProfile"
                            autoComplete={0}
                            defaultValue={studentProfile}
                            onChange={setStudentProfile}
                            type="textarea"
                            placeholder="Ingresar el perfil del estudiante"
                            innerRef={register({ required: true })}
                            className={classnames({
                              "is-invalid": errors["studentProfile"]
                            })}
                          />
                        )}

                        {!studentProfile && (
                          <SunEditor
                            setOptions={{
                              height: 300,
                              buttonList: [
                                [
                                  "font",
                                  "align",
                                  "fontSize",
                                  "table",
                                  "textStyle",
                                  "align"
                                ],
                                ["image"]
                              ]
                            }}
                            name="studentProfile"
                            id="studentProfile"
                            autoComplete={0}
                            defaultValue={""}
                            onChange={setStudentProfile}
                            type="textarea"
                            placeholder="Ingresar el perfil del estudiante"
                            innerRef={register({ required: true })}
                            className={classnames({
                              "is-invalid": errors["studentProfile"]
                            })}
                          />
                        )}
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
                          <Button type="reset" color="secondary" outline>
                            Cancelar
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Item not found</h4>
      <div className="alert-body">
        El item con el id : {id} no existe, por favor buscalo en :{" "}
        <Link to="/apps/user/list">la lista de items</Link>
      </div>
    </Alert>
  )
}
export default ItemEdit
