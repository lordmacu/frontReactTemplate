// ** React Imports
import { useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { getSSmallImageUser } from "@utils"
import Avatar from "@components/avatar"
import Moment from "react-moment"
import "moment-timezone"
import "moment/locale/es"
import { store } from "@store/storeConfig/store"

// ** stores & Actions
import { getItem, setEditOn } from "../store/action"
import { useSelector, useDispatch } from "react-redux"
import ReactToPrint from "react-to-print"
// ** Reactstrap
import {
  Row,
  Col,
  Alert,
  Card,
  FormGroup,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
  CardText
} from "reactstrap"

// ** Styles
import "@styles/react/apps/app-users.scss"

const ItemView = (props) => {
  // ** Vars
  const stores = useSelector((state) => state.programs),
    dispatch = useDispatch(),
    { id } = useParams()
  const componentRef = useRef()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getItem(id))
  }, [dispatch])

  const formatDate = (date) => {
    const d = new Date(date)

    let month = `${d.getMonth() + 1}`
    let day = `${d.getDate()}`
    const year = d.getFullYear()

    if (month.length < 2) month = `0${month}`
    if (day.length < 2) day = `0${day}`

    return [year, month, day].join("-")
  }

  return stores.selectedItem !== null && stores.selectedItem !== undefined ? (
    <div className="app-user-view">
      <div ref={componentRef}>
        <Row>
          <Col xl="12" lg="12" md="12">
            <Card>
              <CardBody>
                <CardTitle tag="h5" className="mb-2">
                  <Row>
                    <Col xl="6" lg="6" md="6">
                      <p>
                        {!!stores.selectedItem.name && (
                          <span>
                            <strong>Nombre:</strong> {stores.selectedItem.name}
                          </span>
                        )}
                      </p>
                      <p>
                        {!!stores.selectedItem.sigla && (
                          <span>
                            <strong>Sigla: </strong>
                            {stores.selectedItem.sigla}
                          </span>
                        )}
                      </p>
                    </Col>

                    <Col xl="6" lg="6" md="6">
                      <p>
                        {!!stores.selectedItem.startDate && (
                          <span>
                            Fecha inicio:{" "}
                            {formatDate(stores.selectedItem.startDate)}
                          </span>
                        )}
                      </p>
                      <p>
                        {!!stores.selectedItem.endDate && (
                          <span>
                            Fecha Fin: {formatDate(stores.selectedItem.endDate)}
                          </span>
                        )}
                      </p>
                    </Col>
                  </Row>
                </CardTitle>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  Información complementaria y contacto
                </CardTitle>
                <Row>
                  {!!stores.selectedItem.coordinatorAcad && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <strong>Coordinador Acad: </strong>
                        {stores.selectedItem.coordinatorAcad.name}
                      </span>
                    </Col>
                  )}

                  {!!stores.selectedItem.directorAcad && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <strong>Director Acad: </strong>
                        {stores.selectedItem.directorAcad.name}
                      </span>
                    </Col>
                  )}

                   {!!stores.selectedItem.agreement && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <strong>Convenio: </strong>
                        {stores.selectedItem.agreement.name}
                      </span>
                    </Col>
                  )}
                </Row>
                <Row>
                  {!!stores.selectedItem.period && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <strong>Periodo: </strong>
                        {stores.selectedItem.period}
                      </span>
                    </Col>
                  )}

                  {!!stores.selectedItem.year && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <strong>Año: </strong>
                        {stores.selectedItem.year}
                      </span>
                    </Col>
                  )}

                  {!!stores.selectedItem.price && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <strong>Precio: </strong>
                        {stores.selectedItem.price}
                      </span>
                    </Col>
                  )}
                </Row>

                <Row>
                  {!!stores.selectedItem.title && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <strong>Título: </strong>
                        {stores.selectedItem.title}
                      </span>
                    </Col>
                  )}
                </Row>

                <Row>
                  {!!stores.selectedItem.description && (
                    <Col className="mb-1" xs="12" lg="4" md="4">
                      <span>
                        <h3>Descripción: </h3>
                        {stores.selectedItem.description}
                      </span>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col xs="12" lg="12" md="12">
                    {!!stores.selectedItem.studentProfile && (
                      <span className="mr-2">
                        <h3>Perfil del estudiante: </h3>{" "}
                        {stores.selectedItem.studentProfile}
                      </span>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <Row>
        <Col>
          <Link
            to="/apps/program/list"
            className="user-name text-truncate mb-0"
            onClick={() => store.dispatch(setEditOn(0, {}))}
          >
            Volver
          </Link>
        </Col>
        <Col className="text-right">
          <ReactToPrint
            trigger={() => <Button>Imprimir</Button>}
            content={() => componentRef.current}
          />
        </Col>
      </Row>
    </div>
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
export default ItemView
