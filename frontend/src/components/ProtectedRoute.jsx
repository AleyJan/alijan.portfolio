import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

// Guards admin routes: waits for the token check, then redirects to /login
// if the visitor isn't authenticated.
export default function ProtectedRoute({ children }) {
  const { isAuthed, ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-espresso text-cream/60">
        Loading…
      </div>
    );
  }
  if (!isAuthed) return <Navigate to="/login" replace />;
  return children;
}
