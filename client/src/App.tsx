import {BrowserRouter,Route,Routes} from "react-router-dom"
import { Button } from "./components/ui/button"
import SignUp  from "./pages/signup"

export default function App(){
  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}