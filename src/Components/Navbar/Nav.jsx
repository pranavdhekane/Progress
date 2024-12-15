import { useRef } from "react";
// import { Link } from 'react-router-dom';

function Nav() {
    
    const menuRef = useRef(null);

    function sideMenu() {
        const menu = menuRef.current;

        if (menu.classList.contains('w-3/5')) {
            menu.classList.remove('w-3/5');
            menu.classList.add('w-0');
            menu.firstElementChild.classList.add('hidden');
            menu.firstElementChild.classList.remove('visible');
        } else {
            menu.classList.remove('w-0');
            menu.classList.add('w-3/5');
            menu.firstElementChild.classList.remove('hidden');
            menu.firstElementChild.classList.add('visible');
        }
    }

    return (
        <div className="relative">
            <div className="flex justify-between items-center bg-black px-10 h-[15vh]">
                <h1 className="text-4xl text-white">Progress</h1>
                <ul className="space-x-7 hidden md:visible md:flex text-white items-center">
                    <li className="hover:text-gray-300">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-gray-300">
                        <a href="/submission">Submission</a>
                    </li>
                    <li className="hover:text-gray-300">
                        <a href="/charts">Charts</a>
                    </li>
                    <li className="bg-neutral-800 hover:bg-black  border-2 p-2 rounded-lg">
                        <a href="/form">List Today</a>
                    </li>
                    {/* <li className="border-2 border-white p-2 rounded-lg">
                        <input type="button" value="add today"/>
                    </li> */}
                </ul>
                <button className="text-white md:hidden text-xl" onClick={() => sideMenu()}>
                    ☰
                </button>
            </div>
            <div ref={menuRef} id="menu" className="h-screen bg-black w-0 absolute right-0 z-10 md:hidden ease-in duration-500">
                <ul className="p-3 [&>*]:p-2 [&>*]:text-white hidden">
                    <li className="hover:text-gray-500">
                        <a href="/">Home</a>
                    </li>
                    <li className="hover:text-gray-500">
                        <a href="/form">Form</a>
                    </li>
                    <li className="hover:text-gray-500">
                        <a href="/submission">Submissions</a>
                    </li>
                    <li className="hover:text-gray-500">
                        <a href="/charts">Charts</a>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default Nav