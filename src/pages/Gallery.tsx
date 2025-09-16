import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Eye, 
  Search, 
  Filter,
  Play,
  Clock,
  MapPin
} from "lucide-react";

// Extended panorama data with more details
const PANORAMAS = [
  { 
    id: 1, 
    name: "Lever de Soleil sur la Plage", 
    url: "https://images.unsplash.com/photo-1505533321630-975218a5f66f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Un magnifique lever de soleil sur une plage tropicale avec des eaux cristallines",
    category: "Nature",
    duration: "Exploration libre",
    location: "Maldives",
    thumbnail: "https://images.unsplash.com/photo-1505533321630-975218a5f66f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=300",
    featured: true
  },
  { 
    id: 2, 
    name: "Vue Panoramique des Montagnes", 
    url: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Paysage montagneux panoramique au coucher du soleil avec une vue à couper le souffle",
    category: "Montagne",
    duration: "Exploration libre",
    location: "Alpes Suisses",
    thumbnail: "https://images.unsplash.com/photo-1540611025311-01df3cef54b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=300",
    featured: false
  },
  { 
    id: 3, 
    name: "Horizon Urbain", 
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Skyline urbain moderne avec des gratte-ciels illuminés en soirée",
    category: "Ville",
    duration: "Exploration libre",
    location: "New York",
    thumbnail: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=300",
    featured: true
  },
  { 
    id: 4, 
    name: "Forêt Tropicale", 
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Au cœur d'une forêt tropicale luxuriante avec une biodiversité exceptionnelle",
    category: "Nature",
    duration: "Exploration libre",
    location: "Amazonie",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=300",
    featured: false
  },
  { 
    id: 5, 
    name: "Désert Sahara", 
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Dunes infinies du Sahara sous un ciel étoilé magnifique",
    category: "Désert",
    duration: "Exploration libre",
    location: "Maroc",
    thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=300",
    featured: false
  },
  { 
    id: 6, 
    name: "Aurores Boréales", 
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=4800",
    description: "Spectacle magique des aurores boréales dans le ciel arctique",
    category: "Phénomène",
    duration: "Exploration libre",
    location: "Islande",
    thumbnail: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=300",
    featured: true
  }
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFeatured, setShowFeatured] = useState(false);

  const categories = ["all", "Nature", "Montagne", "Ville", "Désert", "Phénomène"];

  const filteredPanoramas = PANORAMAS.filter(panorama => {
    const matchesSearch = panorama.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         panorama.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         panorama.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || panorama.category === selectedCategory;
    const matchesFeatured = !showFeatured || panorama.featured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Galerie 360°</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre collection de panoramas immersifs. Chaque expérience vous transporte 
            dans un univers unique à explorer en 360°.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-muted/30 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, description ou lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Toutes les catégories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant={showFeatured ? "default" : "outline"}
              onClick={() => setShowFeatured(!showFeatured)}
              className="whitespace-nowrap"
            >
              À la Une
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredPanoramas.length} panorama{filteredPanoramas.length > 1 ? 's' : ''} trouvé{filteredPanoramas.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPanoramas.map((panorama) => (
            <Card key={panorama.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={panorama.thumbnail}
                  alt={panorama.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button asChild size="lg" className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Link to={`/viewer?panorama=${panorama.id - 1}`}>
                      <Play className="mr-2 h-5 w-5" />
                      Explorer
                    </Link>
                  </Button>
                </div>
                {panorama.featured && (
                  <Badge className="absolute top-3 right-3">
                    À la Une
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {panorama.name}
                  </CardTitle>
                  <Badge variant="secondary">{panorama.category}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4 line-clamp-2">
                  {panorama.description}
                </CardDescription>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {panorama.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {panorama.duration}
                  </div>
                </div>
                
                <Button asChild className="w-full mt-4" variant="outline">
                  <Link to={`/viewer?panorama=${panorama.id - 1}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Voir en 360°
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPanoramas.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;