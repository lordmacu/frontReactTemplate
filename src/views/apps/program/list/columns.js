// ** React Imports
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { getSSmallImageUser } from "@utils"

const MySwal = withReactContent(Swal)

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
import { getItem, deleteItem, setEditOn, cloneItem, setPopUpAsignatura} from "../store/action"
import { store } from "@store/storeConfig/store"

// ** Third Party Components
import { Button } from "reactstrap"
import { Trash2, Edit, Copy } from "react-feather"

// ** Renders Client Columns
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary"
    ],
    color = states[stateNum]

  if (row.image.length) {
    return (
      <Avatar
        className="mr-1"
        img={getSSmallImageUser(row.image)}
        width="32"
        height="32"
      />
    )
  } else {
    return (
      <Avatar
        color={color || "primary"}
        className="mr-1"
        content={row.name || "John Doe"}
        initials
      />
    )
  }
}

const formatDate = (date) => {
  const d = new Date(date)

  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join("-")
}

export const columns = [
  {
    name: "Actions",
    minWidth: "250px",
    maxWidth: "2500px",
    selector: "_id",
    sortable: true,
    cell: (row) => (
      <div>

        <Button.Ripple
          className="btn-icon mr-50"
          outline
          color="primary"
          onClick={() => {
            store.dispatch(setPopUpAsignatura(true, row))
          }}
        >
          Asignatura
        </Button.Ripple>
        <Link
          to={`/apps/program/edit/${row._id}`}
          className="user-name text-truncate mb-0"
          onClick={() => store.dispatch(getItem(row._id))}
        >
          <Button.Ripple className="btn-icon mr-50" outline color="primary">
            <Edit size={14} />
          </Button.Ripple>
        </Link>

        <Button.Ripple
          className="btn-icon mr-50"
          outline
          color="danger"
          onClick={() => {
            MySwal.fire({
              title: "¿Quieres borrar este item?",
              icon: "info",
              customClass: {
                confirmButton: "btn btn-danger"
              },

              buttonsStyling: true,
              confirmButtonText: "Si, Borrarlo"
            }).then((result) => {
              if (result.isConfirmed) {
                store.dispatch(deleteItem(row._id))
              } else if (result.isDenied) {
                MySwal.fire("Changes are not saved", "", "info")
              }
            })
          }}
        >
          <Trash2 size={14} />
        </Button.Ripple>
 
      </div>
    )
  },
  {
    name: "Sigla",
    // minWidth: "70px",
    selector: "sigla",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.sigla}</span>
  },
  {
    name: "Nombre",
    minWidth: "200px",
    selector: "name",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div className="d-flex flex-column">
          <Link
            to={`/apps/program/view/${row._id}`}
            className="user-name text-truncate mb-0"
            onClick={() => store.dispatch(getItem(row._id))}
          >
            <span className="font-weight-bold">{row.name}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">
            {row.lastname}
          </small>
        </div>
      </div>
    )
  },
  
  {
    name: "Fecha inicio",
    minWidth: "40px",
    selector: "country",
    sortable: true,
    cell: (row) => {
      if (!!row.startDate) {
        return (
          <span className="text-capitalize">{formatDate(row.startDate)}</span>
        )
      } else {
        return <span className="text-capitalize">Ninguno</span>
      }
    }
  },
  {
    name: "Fecha fin",
    minWidth: "50px",
    selector: "endDate",
    sortable: true,
    cell: (row) => {
      if (!!row.endDate) {
        return (
          <span className="text-capitalize">{formatDate(row.endDate)}</span>
        )
      } else {
        return <span className="text-capitalize">Ninguno</span>
      }
    }
  }
]
