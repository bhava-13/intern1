import Navbar from "../Components/Navbar.jsx";
import BookAppointment from "./Bookappointment.jsx";
import { Link } from "react-router-dom";
function Appointments(){
    return(
        <>
        <Navbar/>
        <h2>my appointments</h2>
        <Link to="/book"><button>Book your slot</button></Link>
        </>
    );
}
export default Appointments;
