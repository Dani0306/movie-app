import 'swiper/swiper.min.css'
// import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Rotuer from './config/Router'

const App = () => {

  return (
    <main>
      <Rotuer />
      <Header />
      <Footer  />
    </main>
  )
}

export default App