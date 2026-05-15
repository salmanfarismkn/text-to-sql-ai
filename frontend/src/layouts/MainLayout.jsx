import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

/** Public layout wrapper — landing page */
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar transparent />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
