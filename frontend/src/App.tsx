import { ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            <AppRoutes />
          </div>
        </section>
      </main>
    </>
  )
}

export default App;