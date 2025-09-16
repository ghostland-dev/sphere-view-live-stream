import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Info,
  Eye,
  Zap,
  Shield,
  Users,
  Award,
  Globe,
  Heart,
  Github,
  Twitter,
  Mail,
  Star,
  Cpu,
  Monitor,
  Smartphone
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Eye,
      title: "Technologie WebGL",
      description: "Rendu 3D haute performance directement dans votre navigateur"
    },
    {
      icon: Zap,
      title: "Performance Optimisée",
      description: "Chargement rapide et navigation fluide en 60 FPS"
    },
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Aucune donnée personnelle collectée, respect de votre vie privée"
    },
    {
      icon: Globe,
      title: "Accessible",
      description: "Compatible avec tous les navigateurs modernes"
    }
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "Développeuse Frontend",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Thomas Martin",
      role: "Spécialiste 3D",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sophie Laurent",
      role: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const stats = [
    { icon: Users, label: "Utilisateurs", value: "10K+" },
    { icon: Eye, label: "Panoramas vus", value: "50K+" },
    { icon: Star, label: "Note moyenne", value: "4.9/5" },
    { icon: Globe, label: "Pays", value: "25+" }
  ];

  const techStack = [
    { name: "React", category: "Frontend" },
    { name: "Three.js", category: "3D" },
    { name: "WebGL", category: "Rendu" },
    { name: "TypeScript", category: "Langage" },
    { name: "Tailwind CSS", category: "Styles" },
    { name: "Vite", category: "Build" }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
              <Info className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">À Propos</h1>
              <Badge variant="secondary" className="mt-2">Version 1.0.0</Badge>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            VR Viewer 360° est une application web moderne qui révolutionne la façon dont vous explorez 
            et partagez des expériences panoramiques. Conçue avec les dernières technologies web, 
            elle offre une immersion totale directement dans votre navigateur.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              Démocratiser l'accès à la réalité virtuelle en créant des outils simples, 
              performants et accessibles qui permettent à chacun de créer, partager et 
              explorer des expériences immersives extraordinaires.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Caractéristiques Techniques
              </CardTitle>
              <CardDescription>
                Les technologies qui rendent l'expérience possible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Stack Technologique
              </CardTitle>
              <CardDescription>
                Les outils et frameworks utilisés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium text-sm">{tech.name}</div>
                    <div className="text-xs text-muted-foreground">{tech.category}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              L'Équipe
            </CardTitle>
            <CardDescription>
              Les personnes passionnées derrière ce projet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compatibility */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Compatibilité
            </CardTitle>
            <CardDescription>
              Fonctionne sur tous vos appareils
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Monitor className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-medium mb-2">Ordinateurs</h3>
                <p className="text-sm text-muted-foreground">
                  Chrome, Firefox, Safari, Edge
                </p>
              </div>
              <div className="text-center p-4">
                <Smartphone className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-medium mb-2">Mobile</h3>
                <p className="text-sm text-muted-foreground">
                  iOS Safari, Android Chrome
                </p>
              </div>
              <div className="text-center p-4">
                <Eye className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-medium mb-2">VR Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Compatible WebXR
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Heart className="h-5 w-5" />
              Nous Contacter
            </CardTitle>
            <CardDescription>
              Vous avez des questions ou des suggestions ? Nous aimerions vous entendre !
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contact@vrviewer360.com
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 VR Viewer 360°. Créé avec ❤️ pour l'exploration immersive.</p>
          <p className="mt-2">
            Open Source • Respectueux de la vie privée • Accessible à tous
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;