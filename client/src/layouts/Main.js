import TopNavbar from "./components/TopNavbar"
import Footer from "./components/Footer";

const Main = ({ children }) => {
    return (
        <div>
            <TopNavbar />
            {children}
            <Footer />
        </div>
    )
}

export default Main;