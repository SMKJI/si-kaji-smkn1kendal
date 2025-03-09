
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="kontak" className="bg-secondary py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Si-Kaji</h2>
            <p className="text-muted-foreground text-sm">
              Sistem Informasi Kesiswaan SMKJI <br />
              SMKN 1 Kendal
            </p>
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} SMKN 1 Kendal. <br/>
                All rights reserved.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a 
                  href="#informasi" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Informasi
                </a>
              </li>
              <li>
                <a 
                  href="#fitur" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Fitur
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Akses</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/login" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Masuk
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Kontak</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground mb-2">
                Jl. Soekarno-Hatta, Kendal
                <br />
                Jawa Tengah, Indonesia
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Email: info@smkn1kendal.sch.id
              </p>
              <p className="text-sm text-muted-foreground">
                Telp: (0294) 381137
              </p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
