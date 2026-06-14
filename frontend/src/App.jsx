import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Redirects already-authenticated users away from the login page.
function GuestRoute({ children }) {
  const { admin, ready } = useAuth();
  if (!ready) return null;
  if (admin) return <Navigate to="/admin" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
