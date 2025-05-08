import Myroute from './Myroute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@radix-ui/themes/styles.css";
  
function App() {
  return (
    <>
      <Myroute />
      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;
