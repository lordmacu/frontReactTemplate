import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import classnames from "classnames"
import Select from "react-select"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { deleteVersion, udpateItem, updateVersion } from "../store/action"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)

import Flatpickr from "react-flatpickr"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import {
  Card,
  CardBody,
  Collapse,
  ListGroupItem,
  Badge,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  Row,
  Form
} from "reactstrap"

const versionItem = (props) => {
  const [collapse, setCollapse] = useState(false)
  const [group, setGroup] = useState("")
  const [id, setId] = useState()
  const [period, setPeriod] = useState("")
  const [year, setYear] = useState("")
  const [program, setProgram] = useState("")
  const [sigla, setSigla] = useState("")
  const [startDateDefault, setStartDateDefault] = useState(new Date())
  const [endDateDefault, setEndDateDefault] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [name, setName] = useState("")
  const [endDate, setEndDate] = useState(new Date())
  const store = useSelector((state) => state.programs)
  const dispatch = useDispatch()

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  const onSubmit = (values) => {
    values["startDate"] = startDate
    values["endDate"] = endDate

    values["id"] = id

    dispatch(updateVersion(id, values))
  }

  const udpateItem = () => {
    const item = {
      name,
      period,
      endDate,
      startDate,
      group,
      sigla,
      year,
      id,
      program
    }
    console.log("actualizando", item)
  }

  useEffect(() => {
    const {
      name,
      period,
      endDate,
      startDate,
      group,
      sigla,
      year,
      _id,
      program
    } = props.item

    setStartDate(startDate)
    setName(name)
    setSigla(sigla)
    setPeriod(period)
    setEndDate(endDate)
    setGroup(group)
    setYear(year)
    setId(_id)
    setProgram(program)
  }, [props.item])

  useEffect(() => {
    console.log("asdfasdf asdf asdf asdf as ", store.version)
    if (store.version !== null) {
      MySwal.fire("Se ha actualizado con éxito", "", "info")
    }
 
  }, [dispatch, store.version])

  return (
    <div>
      <ListGroupItem
        tag="a"
        href="#"
        className="justify-content-between"
        onClick={() => {
          setCollapse(!collapse)
        }}
      >
        <Badge pill>{sigla}</Badge> {name}
      </ListGroupItem>
      <Collapse isOpen={collapse}>
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
                  onKeyDown={(e) => {
                    setName(e.target.value)
                  }}
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
                    <Label for="full-name">
                      Sigla <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="sigla"
                      id="sigla"
                      defaultValue={sigla}
                      onKeyDown={(e) => {
                        setSigla(e.target.value)
                      }}
                      placeholder="Ingresar la sigla"
                      innerRef={register({ required: true })}
                      className={classnames({
                        "is-invalid": errors["sigla"]
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="period">
                      Periodo: <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="period"
                      id="period"
                      autoComplete={0}
                      defaultValue={period}
                      placeholder="Ingresar el periodo"
                      innerRef={register({ required: true })}
                      className={classnames({
                        "is-invalid": errors["period"]
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="year">
                      Año: <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="year"
                      id="year"
                      autoComplete={0}
                      defaultValue={year}
                      placeholder="Ingresar el año"
                      innerRef={register({ required: true })}
                      className={classnames({
                        "is-invalid": errors["year"]
                      })}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="year">
                      Grupo: <span className="text-danger">*</span>
                    </Label>
                    <Input
                      name="group"
                      id="group"
                      autoComplete={0}
                      defaultValue={group}
                      placeholder="Ingresar el año"
                      innerRef={register({ required: true })}
                      className={classnames({
                        "is-invalid": errors["year"]
                      })}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="dni">
                      Fecha Inicio
                      <span className="text-danger">*</span>
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
                <Col>
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
                <Col className="text-right">
                  <Button type="submit">Actualizar Versión</Button>
                  <Button
                    className="ml-2"
                    color="danger"
                    onClick={() => {
                      MySwal.fire({
                        title: "¿Quieres borrar esta versión?",
                        icon: "info",
                        customClass: {
                          confirmButton: "btn btn-danger"
                        },

                        buttonsStyling: true,
                        confirmButtonText: "Si, Borrarlo"
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(deleteVersion(id, program))
                        } else if (result.isDenied) {
                          MySwal.fire("Changes are not saved", "", "info")
                        }
                      })
                    }}
                  >
                    Borrar Versión
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  )
}

export default versionItem
