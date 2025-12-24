import { Dog, Heart, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Dog className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl font-semibold">
                PawPals
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-4">
              Finding loving homes for adorable dogs since 2020. Your next best
              friend is waiting!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#gallery"
                  className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  Our Dogs
                </a>
              </li>
              <li>
                <a
                  href="/#booking"
                  className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  Book a Visit
                </a>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-primary" />
                123 Pet Lane, Dog City
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-primary" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-primary" />
                hello@pawpals.com
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4">Visit Hours</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Monday - Friday: 9am - 6pm</li>
              <li>Saturday: 10am - 5pm</li>
              <li>Sunday: 12pm - 4pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2024 PawPals. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/50 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary" /> for dog lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
