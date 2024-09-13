import { HiX } from 'react-icons/hi';
import { MdLogout } from "react-icons/md";
import { links } from '../data';
import { MdOutlineAccountCircle } from "react-icons/md";

const SidenNavbar = ({isSidebarOpen, closeSidebar} : {
    isSidebarOpen : any,
    closeSidebar : any
}) => {
  return (
    <div
			className={`transition-all  duration-500  fixed top-0 ${
				isSidebarOpen ? 'left-0' : '-left-64'
			}`}
		>
			<div className="flex h-screen overflow-y-auto flex-col bg-white  w-64 px-4 py-8 border-r min-h-screen relative">
				<button
					onClick={closeSidebar}
					className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
				>
					<HiX className="w-5 h-5" />
				</button>
				<h2 className="text-3xl font-semibold text-gray-800">
					QUIZ<span className="text-yellow-500 text-lg ml-1">CLONE</span>
				</h2>
				<div className="flex flex-col mt-6  justify-between flex-1">
					<nav className="text">
						{links.map((link, index) => {
							const { url, text, icon } = link;
							return (
								<a
									key={index}
									href={url}
									className={`capitalize flex items-center px-4 py-2 ${
										index === 0
											? 'bg-gray-200 text-gray-700'
											: null
									} ${
										index > 0
											? 'mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform'
											: null
									} rounded-md`}
								>
									{icon}
									<span className="mx-4 font-medium">
										{text}
									</span>
								</a>
							);
						})}
						<hr className="my-6" />
						<a
							href="/#"
							className="flex items-center px-4 py-2 mt-5 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
							onClick={() => {localStorage.setItem("userid", JSON.stringify(""))}}
						>
							<MdLogout className="w-5 h-5" />
							<span className="mx-4 font-medium">logout</span>
						</a>
					</nav>
					<div className="flex items-center px-4 -mx-2 mt-5">
						<MdOutlineAccountCircle></MdOutlineAccountCircle>
						<h4 className="mx-2 font-medium text-gray-800 hover:underline cursor-pointer">
							test
						</h4>
					</div>
				</div>
			</div>
		</div>
  )
}

export default SidenNavbar
