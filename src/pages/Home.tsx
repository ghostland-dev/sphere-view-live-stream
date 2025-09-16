import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Image, 
  Settings, 
  Maximize2,
  RotateCcw,
  Navigation as NavigationIcon,
  ArrowRight,
  Star,
  Zap,
  Shield
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Eye,
      title: "Visualisation 360°",
      description: "Explorez des panoramas en haute résolution avec des contrôles intuitifs"
    },
    {
      icon: NavigationIcon,
      title: "Contrôles Avancés",
      description: "Navigation fluide avec rotation automatique et contrôles de vitesse"
    },
    {
      icon: Maximize2,
      title: "Mode Plein Écran",
      description: "Immersion totale avec le mode plein écran optimisé"
    },
    {
      icon: Image,
      title: "Galerie Complète",
      description: "Accédez rapidement à tous vos panoramas favoris"
    },
    {
      icon: Settings,
      title: "Personnalisation",
      description: "Ajustez l'expérience selon vos préférences"
    },
    {
      icon: RotateCcw,
      title: "Rotation Auto",
      description: "Mode de rotation automatique configurable"
    }
  ];

  const stats = [
    { icon: Star, label: "Qualité HD", value: "4K+" },
    { icon: Zap, label: "Performance", value: "60 FPS" },
    { icon: Shield, label: "Fiabilité", value: "99.9%" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">
              Version 1.0 • Nouvelle expérience immersive
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Explorez le Monde en 360°
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Découvrez une nouvelle dimension avec notre visualiseur VR 360° de haute qualité. 
            Naviguez dans des panoramas époustouflants avec des contrôles intuitifs et une immersion totale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/viewer">
                Commencer l'Exploration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/gallery">
                Voir la Galerie
                <Image className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fonctionnalités Avancées
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez toutes les fonctionnalités qui font de notre visualiseur 
              l'outil parfait pour l'exploration immersive.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Explorer ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plongez dans l'univers de la réalité virtuelle 360° et découvrez 
            des paysages époustouflants comme jamais auparavant.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/viewer">
                Lancer le Visualiseur
                <Eye className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;