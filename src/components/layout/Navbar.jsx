import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import  { navLists } from '../../utils';
import CurrentUser from '../users/CurrentUser';
import  assets from '../../utils';

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    return (
        <header className="fixed top-0 left-0 right-0 bg-white w-full py-3 sm:px-10 px-5 flex justify-between border-b border-gray-300 shadow-md z-10 rounded-2xl">
            <img src={assets.eyeImg} alt="Eye" width={30} className="cursor-pointer" />
            <div className="flex flex-1 justify-center items-center max-sm:hidden">
                {navLists.map((nav) => (
                    <div key={nav} className="px-1 text-sm cursor-pointer text-gray hover:text-black transition-all">
                        {nav}
                    </div>
                ))}
            </div>
            <div className="flex items-baseline max-sm:justify-end max-sm:flex-1 space-x-4">
                {!isLoggedIn && (
                    <>
                        <Button type="default" shape="round" href='/login'>
                            <LoginOutlined />
                        </Button>
                        <Button type="primary" shape="round" href='/register'>
                            <UserAddOutlined />
                        </Button>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Button shape="round" onClick={logout}>Cerrar sesión</Button>
                        <CurrentUser />
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
