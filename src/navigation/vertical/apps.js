import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User
} from "react-feather"

export default [
  {
    header: "Módulos"
  },

  {
    id: "users",
    title: "Usuarios",
    icon: <User size={20} />,
    navLink: "/apps/user/list"
  },

  {
    id: "programs",
    title: "Programas",
    icon: <User size={20} />,
    navLink: "/apps/program/list"
  },
  {
    id: "subjects",
    title: "Asignatura",
    icon: <User size={20} />,
    navLink: "/apps/subject/list"
  },
  {
    id: "providers",
    title: "Proveedores",
    icon: <User size={20} />,
    navLink: "/apps/provider/list"
  },
  {
    id: "books",
    title: "Libros",
    icon: <User size={20} />,
    navLink: "/apps/books/list"
  }
]
