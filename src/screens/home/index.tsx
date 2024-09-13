import SidenNavbar from "../../components/SidenNavbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { nav_data } from "../../data";
import Functional from "../functional";
import TopNavbar from "../../components/TopNavbar";

const Home = () => {

  const [isSidebarOpen, setSideBarOpen] = useState(false);
  const [activeFunction, setActiveFunction] = useState<string>("");

  const toggleSidebar = () => {
    setSideBarOpen(!isSidebarOpen);
  }

  const handleFunction = (id : string) => {
    setActiveFunction(id);
  }

  return (
    <div className="bg-neutral-800 h-fit w-full overflow-x-hidden">

      {/* Top Navbar start */}
      <TopNavbar />
      
      {/* SideNavbar start */}
      <SidenNavbar 
        isSidebarOpen={isSidebarOpen}
        closeSidebar={toggleSidebar}
        />
      <div className={`p-5  ${isSidebarOpen ? 'invisible' : 'visible'}`}>
        <GiHamburgerMenu onClick={toggleSidebar} size={30} className="text-white"/>
      </div>
      {/* SideNavbar end */}

      {/* Main home page start */}
      { 
        !activeFunction ?
        <div className="px-5 h-96 font-Inter">
          <div className="md:grid md:grid-cols-2 grid gap-1 uppercase sm:text-xl lg:text-4xl h-96 my-20">
            {
            nav_data.map((item, index) => (
              <div key={index} className="bg-neutral-900 rounded-lg shadow-xl cursor-pointer md:hover:opacity-70 flex justify-center items-center" onClick={()=>handleFunction(item.id)}>
                <div className="w-fit">
                  <p className="text-white">
                    {item.text}
                  </p>
                  <hr className="h-1 border-none bg-yellow-600"/>
                </div>
              </div>
            ))
            }
          </div>
        </div> 
        : 
        null
      }
      {/* Main home page end */}

      {/* This is the functional component that will display different screens */}
      {activeFunction && <Functional  activeFunction={activeFunction} setActiveFunction = {setActiveFunction}/>}
      
    </div>
  )
}

export default Home
