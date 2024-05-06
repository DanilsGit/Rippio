import {Welcome} from './pages/Welcome'
import {PrincipalPage} from './pages/PrincipalPage'
import {CartModal} from './components/cartModal/CartModal'
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {

  return (
    <>
      <Welcome />
      <PrincipalPage />
    </>
  )
}

export default App
