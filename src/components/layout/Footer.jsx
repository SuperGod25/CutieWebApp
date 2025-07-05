import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import CutieLogo from '@/components/ui/logo';

const Footer = () => {
  return (
    <footer className="bg-violet-50/50 border-t border-violet-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <CutieLogo className="h-8 w-8" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-purple-700">cutie</span>
                <span className="text-xs text-violet-600 leading-none">florărie și cafenea</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              florărie, cafenea și comunitate: un spațiu pentru incluziune, creativitate și conexiune în Cluj-Napoca.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-violet-700">Link-uri Rapide</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="text-muted-foreground hover:text-violet-600">Meniu</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-violet-600">Servicii</Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-violet-600">Evenimente</Link></li>
              <li><Link to="/reservations" className="text-muted-foreground hover:text-violet-600">Rezervări</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-violet-700">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Strada Comunității 123</li>
              <li>Centrul Vechi, Cluj-Napoca</li>
              <li>Telefon: +40 264 123 456</li>
              <li>Email: salut@cutie.ro</li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="font-semibold mb-4 text-violet-700">Conectează-te</h4>
            <div className="flex space-x-3 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/40264123456" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Program:</p>
              <p>Lun-Vin: 07:00-20:00</p>
              <p>Sâm-Dum: 08:00-21:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-violet-200 bg-violet-100/50">
        <div className="container mx-auto px-4 py-3">
          <div className="text-xs text-muted-foreground text-center">
            Dezvoltat cu ❤️ pentru comunitatea din Cluj-Napoca
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
