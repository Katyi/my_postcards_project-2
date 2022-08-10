import About from "../../../pages/About"
import Albums from "../../../pages/Albums"
import AlbumIdPage from "../../../pages/AlbumIdPage"

export const routes =[
  {path: '/about', component: About, exact: true},
  {path: '/albums', component: Albums, exact: true},
  {path: '/albums/:id', component: AlbumIdPage, exact: true},
]