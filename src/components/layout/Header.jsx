import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isVenueManager, user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/venues', label: 'Venues' },
    ...(isVenueManager ? [{ to: '/manager', label: 'Dashboard' }] : []),
  ];

  function handleLogout() {
    logout();
    setMenuOpen(false);
    toast.success('You have been logged out.');
    navigate('/');
  }

  const navLinkClass = ({ isActive }) =>
    cn(
      'rounded-sm px-1 py-2 text-neutral-700 hover:text-primary-900',
      isActive && 'font-medium text-primary-900'
    );

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-300 bg-white">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between px-5 lg:px-20">
        <Link to="/" className="font-display text-2xl font-semibold text-primary-900">
          Holidaze
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <NavLink to="/profile" className={navLinkClass}>
                {user?.name ?? 'Profile'}
              </NavLink>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button onClick={() => navigate('/register')}>Get started</Button>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-sm p-2 text-neutral-700 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="border-t border-neutral-300 bg-white px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="outline" onClick={() => { setMenuOpen(false); navigate('/profile'); }}>
                  {user?.name ?? 'Profile'}
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => { setMenuOpen(false); navigate('/login'); }}>
                  Log in
                </Button>
                <Button onClick={() => { setMenuOpen(false); navigate('/register'); }}>
                  Get started
                </Button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

export { Header };
