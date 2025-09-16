import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { 
  HelpCircle,
  Search,
  BookOpen,
  Keyboard,
  Mouse,
  Monitor,
  Eye,
  Settings,
  MessageCircle,
  Send,
  ChevronRight,
  Play,
  RotateCcw,
  Maximize2,
  Info
} from "lucide-react";

const Help = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqs = [
    {
      id: "getting-started",
      question: "Comment commencer à utiliser le visualiseur 360° ?",
      answer: "Pour commencer, rendez-vous sur la page Galerie ou cliquez directement sur 'Visualiseur 360°' dans le menu. Sélectionnez un panorama qui vous intéresse et cliquez sur 'Explorer' pour lancer l'expérience immersive.",
      category: "Démarrage",
      keywords: ["commencer", "démarrage", "premier", "utilisation"]
    },
    {
      id: "navigation",
      question: "Comment naviguer dans un panorama 360° ?",
      answer: "Utilisez votre souris pour faire glisser et regarder autour de vous. Vous pouvez également utiliser les flèches du clavier. La molette de la souris permet de zoomer. Pour une expérience optimale, utilisez le mode plein écran.",
      category: "Navigation",
      keywords: ["naviguer", "souris", "clavier", "contrôles", "zoom"]
    },
    {
      id: "controls",
      question: "Quels sont les contrôles disponibles ?",
      answer: "Les contrôles incluent : navigation à la souris, zoom avec la molette, flèches gauche/droite pour changer de panorama, touche F pour le plein écran, et touche I pour afficher les informations. Tous les contrôles sont personnalisables dans les paramètres.",
      category: "Contrôles",
      keywords: ["contrôles", "raccourcis", "clavier", "souris", "touches"]
    },
    {
      id: "quality",
      question: "Comment améliorer la qualité d'affichage ?",
      answer: "La qualité dépend de votre connexion internet et de votre appareil. Vous pouvez ajuster la qualité dans les paramètres (HD ou 4K). Pour une meilleure expérience, utilisez une connexion haut débit et un écran haute résolution.",
      category: "Qualité",
      keywords: ["qualité", "résolution", "performance", "HD", "4K"]
    },
    {
      id: "fullscreen",
      question: "Comment utiliser le mode plein écran ?",
      answer: "Cliquez sur l'icône plein écran dans les contrôles ou appuyez sur F. Pour sortir du mode plein écran, appuyez sur Échap ou cliquez à nouveau sur l'icône. Le mode plein écran peut être activé automatiquement dans les paramètres.",
      category: "Affichage",
      keywords: ["plein écran", "fullscreen", "écran", "immersion"]
    },
    {
      id: "auto-rotate",
      question: "Comment activer la rotation automatique ?",
      answer: "La rotation automatique peut être activée dans les informations du panorama (icône Info) ou dans les paramètres généraux. Vous pouvez ajuster la vitesse et la direction de rotation selon vos préférences.",
      category: "Fonctionnalités",
      keywords: ["rotation", "automatique", "vitesse", "direction"]
    },
    {
      id: "mobile",
      question: "L'application fonctionne-t-elle sur mobile ?",
      answer: "Oui, l'application est entièrement responsive et optimisée pour les appareils mobiles. Sur mobile, utilisez vos doigts pour naviguer dans les panoramas et le geste de pincement pour zoomer.",
      category: "Compatibilité",
      keywords: ["mobile", "tactile", "smartphone", "tablette", "responsive"]
    },
    {
      id: "performance",
      question: "Que faire si l'application est lente ?",
      answer: "Vérifiez votre connexion internet, fermez les autres onglets, réduisez la qualité dans les paramètres, et assurez-vous que votre navigateur est à jour. L'utilisation d'un navigateur moderne (Chrome, Firefox, Safari) est recommandée.",
      category: "Performance",
      keywords: ["lent", "performance", "lag", "optimisation", "vitesse"]
    }
  ];

  const shortcuts = [
    { key: "Clic + Glisser", action: "Regarder autour" },
    { key: "Molette", action: "Zoomer/Dézoomer" },
    { key: "← →", action: "Panorama précédent/suivant" },
    { key: "F", action: "Mode plein écran" },
    { key: "Échap", action: "Sortir du plein écran" },
    { key: "I", action: "Informations" },
    { key: "Espace", action: "Pause/Lecture rotation auto" }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message envoyé",
      description: "Nous avons reçu votre message et vous répondrons sous 24h.",
    });
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Centre d'Aide</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions et apprenez à maîtriser 
            toutes les fonctionnalités du visualiseur 360°.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Guide de démarrage</h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <Keyboard className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Raccourcis clavier</h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <Settings className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Paramètres</h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-medium">Support</h3>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Questions Fréquentes
                </CardTitle>
                <CardDescription>
                  Trouvez rapidement les réponses aux questions les plus courantes
                </CardDescription>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher dans la FAQ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {faq.category}
                          </Badge>
                          {faq.question}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Aucun résultat trouvé</h3>
                    <p className="text-muted-foreground">
                      Essayez des mots-clés différents ou contactez notre support.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Keyboard Shortcuts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Raccourcis Clavier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">
                        {shortcut.key}
                      </kbd>
                      <span className="text-muted-foreground">{shortcut.action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Lancer une démonstration
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Ouvrir les paramètres
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Tester le visualiseur
                </Button>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Contactez-nous
                </CardTitle>
                <CardDescription>
                  Une question spécifique ? Nous sommes là pour vous aider.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <Input
                    placeholder="Votre nom"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Sujet"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    required
                  />
                  <Textarea
                    placeholder="Votre message..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                  />
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;