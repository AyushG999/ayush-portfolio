import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigation = [
    { name: 'Home', to: '/', current: true },
    ...(user
      ? [
          { name: 'Create Post', to: '/create', current: false },
          { name: 'My Posts', to: '/profile', current: false },
        ]
      : []),
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-white font-bold text-xl">BlogApp</Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300">Welcome, {user.username}</span>
                    <button
                      onClick={logout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-x-4">
                    <Link
                      to="/login"
                      className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-500"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
