import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Menu, 
  Home, 
  Eye, 
  Image, 
  Settings, 
  HelpCircle,
  Info,
  Wand2
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/viewer", label: "Visualiseur 360°", icon: Eye },
    { href: "/gallery", label: "Galerie", icon: Image },
    { href: "/create", label: "Créer", icon: Wand2 },
    { href: "/settings", label: "Paramètres", icon: Settings },
    { href: "/help", label: "Aide", icon: HelpCircle },
    { href: "/about", label: "À propos", icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ href, label, icon: Icon, mobile = false }: {
    href: string;
    label: string;
    icon: any;
    mobile?: boolean;
  }) => (
    <Link
      to={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        isActive(href)
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      } ${mobile ? "text-lg" : ""}`}
      onClick={() => mobile && setIsOpen(false)}
    >
      <Icon className={mobile ? "h-6 w-6" : "h-4 w-4"} />
      {label}
    </Link>
  );

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary-foreground" />
            </div>
            VR Viewer 360°
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-2 font-bold text-xl mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Eye className="h-5 w-5 text-primary-foreground" />
                  </div>
                  VR Viewer 360°
                </div>
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} mobile />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;