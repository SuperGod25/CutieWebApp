import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import CutieLogo from '@/components/ui/logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Acasă', href: '/' },
    { name: 'Meniu', href: '/menu' },
    { name: 'Servicii', href: '/services' },
    { name: 'Evenimente', href: '/events' },
    { name: 'Despre Noi', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard');

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin', { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo (always visible) */}
        <Link to="/" className="flex items-center space-x-3">
          <CutieLogo className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-purple-700">cutie</span>
            <span className="text-xs text-violet-600 leading-none">florărie și cafenea</span>
          </div>
        </Link>

        {/* Show nav buttons only on public pages */}
        {!isAdminRoute && (
          <>
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-violet-100 text-violet-700'
                      : 'text-muted-foreground hover:text-foreground hover:bg-violet-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-2">
              <Button asChild className="bg-violet-500 hover:bg-violet-600">
                <Link to="/reservations">Rezervă Acum</Link>
              </Button>
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </>
        )}

        {/* Show logout only on admin routes */}
        {isAdminRoute && (
          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </Button>
        )}
      </div>

      {/* Mobile nav - hidden for admin */}
      {!isAdminRoute && isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-violet-100 text-violet-700'
                      : 'text-muted-foreground hover:text-foreground hover:bg-violet-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-4 bg-violet-500 hover:bg-violet-600">
                <Link to="/reservations" onClick={() => setIsMenuOpen(false)}>
                  Rezervă Acum
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
