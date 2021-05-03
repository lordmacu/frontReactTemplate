// ** React Imports
import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {getSSmallImageUser } from '@utils'
import Avatar from '@components/avatar'
import Moment from 'react-moment'
import 'moment-timezone'
import 'moment/locale/es'
import { store } from '@store/storeConfig/store'

// ** stores & Actions
import { getItem, setEditOn } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'
import ReactToPrint from 'react-to-print'
 // ** Reactstrap
import { Row, Col, Alert, Card, FormGroup, CardBody, CardTitle, Button, CardSubtitle, CardText   } from 'reactstrap'


// ** Styles
import '@styles/react/apps/app-users.scss'

const ItemView = props => {
  // ** Vars
  const stores = useSelector(state => state.users),
    dispatch = useDispatch(),
    { id } = useParams()
    const componentRef = useRef()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getItem(id))
  }, [dispatch])

  return stores.selectedItem !== null && stores.selectedItem !== undefined ? (
    <div className='app-user-view'>
     <div   ref={componentRef} >
      <Row>
        <Col xl='12' lg='12' md='12'>
          <Card>
            <CardBody>
              <CardTitle tag="h5"  className="mb-2"> 
                <Row>
                  <Col xl='1' lg='1' md='1' className="text-center">
                  {!!stores.selectedItem.image &&  <Avatar  img={getSSmallImageUser(stores.selectedItem.image)} width='32' height='32'  />} 
                  </Col>
                  <Col xl='6' lg='6' md='6'>
                  <br className=" print-only"/>
                 
                  {!!stores.selectedItem.name && <span>{stores.selectedItem.name}</span>} {!!stores.selectedItem.lastName && <span >{stores.selectedItem.lastName}</span>} 
                  </Col>
                </Row>
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Row>
                  <Col className="mb-1"  xs='12' lg='4' md='4'>{!!stores.selectedItem.dni && <span ><strong>Dni:</strong> {stores.selectedItem.dni}</span>}</Col>
                  <Col  className="mb-1"  xs='12' lg='4' md='4'>{!!stores.selectedItem.title && <span><strong>Título Universitario:</strong> {stores.selectedItem.title}</span>}</Col>
                  <Col   xs='12' lg='4' md='4'> {!!stores.selectedItem.university && <span ><strong>Universidad:</strong> {stores.selectedItem.university}</span>}</Col>
                </Row>
              </CardSubtitle>
              {!!stores.selectedItem.birthday &&
             
                  <Row className="mb-1">
                    <Col>
                      <span> <strong>Fecha de nacimiento: </strong>  <Moment locale="es">{stores.selectedItem.birthday}</Moment> </span>
                    </Col>
                    <Col>
                     <strong>Ubicación: </strong>   {!!stores.selectedItem.city}<span> {stores.selectedItem.city} - </span> {!!stores.selectedItem.state}<span> {stores.selectedItem.state} - </span> {!!stores.selectedItem.country}<span> {stores.selectedItem.country.name} </span> {!!stores.selectedItem.zipCode}<span> {stores.selectedItem.zipCode} </span>
                    </Col>
                  </Row>
                 
           
              }
               {!!stores.selectedItem.gender &&
                <CardText>
                 <strong>Género: </strong>  {stores.selectedItem.gender === 'femenine' && <span>Femenino</span>}  {stores.selectedItem.gender === 'masculine' && <span>Masculino</span>}
                </CardText>
              }           
                  <Row>
                    <Col>{!!stores.selectedItem.addressHome && <span className="mr-2"><strong>Dirección de domicilio: </strong>  {stores.selectedItem.addressHome} </span>}</Col>
                    <Col>{!!stores.selectedItem.addressOffice && <span><strong>Dirección de Oficina: </strong>  {stores.selectedItem.addressOffice} </span>}</Col>
                  </Row>

            </CardBody>
        
          </Card>

          <Card>
            <CardBody>
              <CardTitle tag="h5"> 
                Información complementaria y contacto
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                <Row>
                <Col className="mb-1"  xs='12' lg='4' md='4'>{!!stores.selectedItem.principalEmail && <span ><strong>Email principal:</strong> {stores.selectedItem.principalEmail}</span>}</Col>
                {!!stores.selectedItem.secundaryEmail && <Col className="mb-1"  xs='12' lg='4' md='4'> <span ><strong>Email Segundario:</strong> {stores.selectedItem.secundaryEmail}</span></Col>}
                {!!stores.selectedItem.phone && <Col className="mb-1"  xs='12' lg='4' md='4'> <span ><strong>Teléfono:</strong> {stores.selectedItem.phone}</span></Col>}
                {!!stores.selectedItem.mobile && <Col className="mb-1"  xs='12' lg='4' md='4'> <span ><strong>Móvil:</strong> {stores.selectedItem.mobile}</span></Col>}
                  </Row>
              </CardSubtitle>

                  <Row>
                  <Col className="mb-2"  xs='12' lg='12' md='12'>{!!stores.selectedItem.curriculum && <span className="mr-2"><h3>Curriculum: </h3>  {stores.selectedItem.commentary} </span>}</Col>
                  <Col  xs='12' lg='12' md='12'>{!!stores.selectedItem.commentary && <span className="mr-2"><h3>Comentarios: </h3>  {stores.selectedItem.curriculum} </span>}</Col>
                 </Row>
               
  
             </CardBody>
        
          </Card>
        </Col>
        
      </Row>
      </div>
      
      <Row>
        <Col>
          <Link
                  to='/apps/user/list'
                  className='user-name text-truncate mb-0'
                  onClick={() => store.dispatch(setEditOn(0, {}))}
                >
              Volver
          </Link>
        </Col>
        <Col className="text-right">
            <ReactToPrint
                     
                    trigger={() => <Button >Imprimir</Button>}
                    content={() => componentRef.current}
                  />
        </Col>
       
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Item not found</h4>
      <div className='alert-body'>
        El item con el id : {id} no existe, por favor buscalo en : <Link to='/apps/user/list'>la lista de items</Link>
      </div>
    </Alert>
  )
}
export default ItemView
