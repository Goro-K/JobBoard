import { 
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
    } from "react-router-dom";


// Pages

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Layouts

import RootLayout from './layouts/RootLayout';
// import AuthLayout from './layouts/AuthLayout';
// import JobLayout from './layouts/JobLayout';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    ),
);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App;