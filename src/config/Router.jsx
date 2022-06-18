import { Routes as Router , Route } from 'react-router-dom'
import Catalog from '../pages/Catalog'
import Detail from '../pages/detail/Detail'
import Home from '../pages/Home'

const Routes = () => {
  return (
    <Router>
      <Route path='/:category/search/:keyword' element={<Catalog />}/>
      <Route path='/:category/:id' element={<Detail />}/>
      <Route path='/:category' element={<Catalog />}/>
      <Route path='/' element={<Home />}/>
    </Router>
  )
}

export default Routes