import { lazy } from "react"
import { Redirect } from "react-router-dom"

const AppRoutes = [
  {
    path: "/apps/user/list",
    component: lazy(() => import("../../views/apps/user/list"))
  },
  {
    path: "/apps/user/edit",
    exact: true,
    component: () => <Redirect to="/apps/user/edit/1" />
  },
  {
    path: "/apps/user/edit/:id",
    component: lazy(() => import("../../views/apps/user/edit")),
    meta: {
      navLink: "/apps/user/edit"
    }
  },
  {
    path: "/apps/user/view",
    exact: true,
    component: () => <Redirect to="/apps/user/view/1" />
  },
  {
    path: "/apps/user/view/:id",
    component: lazy(() => import("../../views/apps/user/view")),
    meta: {
      navLink: "/apps/user/view"
    }
  },

  {
    path: "/apps/program/list",
    component: lazy(() => import("../../views/apps/program/list"))
  },
  {
    path: "/apps/program/edit",
    exact: true,
    component: () => <Redirect to="/apps/program/edit/1" />
  },
  {
    path: "/apps/program/edit/:id",
    component: lazy(() => import("../../views/apps/program/edit")),
    meta: {
      navLink: "/apps/program/edit"
    }
  },
  {
    path: "/apps/program/view",
    exact: true,
    component: () => <Redirect to="/apps/program/view/1" />
  },
  {
    path: "/apps/program/view/:id",
    component: lazy(() => import("../../views/apps/program/view")),
    meta: {
      navLink: "/apps/program/view"
    }
  },

  {
    path: "/apps/subject/list",
    component: lazy(() => import("../../views/apps/subject/list"))
  },
  {
    path: "/apps/subject/edit",
    exact: true,
    component: () => <Redirect to="/apps/subject/edit/1" />
  },
  {
    path: "/apps/subject/edit/:id",
    component: lazy(() => import("../../views/apps/subject/edit")),
    meta: {
      navLink: "/apps/subject/edit"
    }
  },
  {
    path: "/apps/subject/view",
    exact: true,
    component: () => <Redirect to="/apps/subject/view/1" />
  },
  {
    path: "/apps/subject/view/:id",
    component: lazy(() => import("../../views/apps/subject/view")),
    meta: {
      navLink: "/apps/subject/view"
    }
  },
  

  {
    path: "/apps/provider/list",
    component: lazy(() => import("../../views/apps/provider/list"))
  },
  {
    path: "/apps/provider/edit",
    exact: true,
    component: () => <Redirect to="/apps/provider/edit/1" />
  },
  {
    path: "/apps/provider/edit/:id",
    component: lazy(() => import("../../views/apps/provider/edit")),
    meta: {
      navLink: "/apps/provider/edit"
    }
  },
  {
    path: "/apps/provider/view",
    exact: true,
    component: () => <Redirect to="/apps/provider/view/1" />
  },
  {
    path: "/apps/provider/view/:id",
    component: lazy(() => import("../../views/apps/provider/view")),
    meta: {
      navLink: "/apps/provider/view"
    }
  },

   {
    path: "/apps/books/list",
    component: lazy(() => import("../../views/apps/book/list"))
  },
  {
    path: "/apps/books/edit",
    exact: true,
    component: () => <Redirect to="/apps/book/edit/1" />
  },
  {
    path: "/apps/books/edit/:id",
    component: lazy(() => import("../../views/apps/book/edit")),
    meta: {
      navLink: "/apps/books/edit"
    }
  },
  {
    path: "/apps/book/view",
    exact: true,
    component: () => <Redirect to="/apps/book/view/1" />
  },
  {
    path: "/apps/book/view/:id",
    component: lazy(() => import("../../views/apps/book/view")),
    meta: {
      navLink: "/apps/books/view"
    }
  }
]

export default AppRoutes
