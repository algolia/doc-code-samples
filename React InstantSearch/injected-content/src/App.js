import React from 'react';
import { Route, Routes } from 'react-router';
import { NavLink } from 'react-router-dom';

import { routes } from './routes';

import './App.css';

function App() {
  return (
    <div>
      <header className="header">
        <div className="header-wrapper">
          <h1 className="header-title">
            <a href="/">Injected content</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </div>
        <nav className="navigation">
          <ul className="navigation-list">
            {routes.map(({ path, label }) => (
              <li key={path} className="navigation-item">
                <NavLink
                  to={path}
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : '',
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="container">
        <Routes>
          {routes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default App;
