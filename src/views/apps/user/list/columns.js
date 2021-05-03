// ** React Imports
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { getSSmallImageUser } from "@utils"

const MySwal = withReactContent(Swal)

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
import { getItem, deleteItem, setEditOn } from "../store/action"
import { store } from "@store/storeConfig/store"

// ** Third Party Components
import { Button } from "reactstrap"
import { Trash2, Edit } from "react-feather"

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
  if (!!row.image) {
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
  } else {
    return <span></span>
  }
}

export const columns = [
  {
    name: "Actions",
    minWidth: "20px",
    maxWidth: "150px",
    selector: "_id",
    sortable: true,
    cell: (row) => (
      <div>
        <Button.Ripple
          className="btn-icon mr-50"
          outline
          color="primary"
          onClick={() => {
            store.dispatch(setEditOn(Math.random(), row))
          }}
        >
          <Edit size={14} />
        </Button.Ripple>

        <Button.Ripple
          className="btn-icon"
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
    name: "Nombre",
    minWidth: "297px",
    selector: "name",
    sortable: true,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row._id}`}
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
    name: "Género",
    minWidth: "172px",
    selector: "gender",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.gender}</span>
  },
  {
    name: "Ciudad",
    minWidth: "138px",
    selector: "city",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.city}</span>
  },
  {
    name: "País",
    minWidth: "138px",
    selector: "country",
    sortable: true,
    cell: (row) => {
      if (!!row.country) {
        return <span className="text-capitalize">{row.country.name}</span>
      } else {
        return <span className="text-capitalize">Ninguno</span>
      }
    }
  }
]
