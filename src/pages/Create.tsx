import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Wand2, 
  Upload, 
  Download, 
  Image, 
  Sparkles,
  FileImage,
  Camera,
  Palette,
  Save,
  Eye,
  Trash2,
  Plus
} from "lucide-react";

interface CustomPanorama {
  id: string;
  name: string;
  url: string;
  description: string;
  created: string;
  source: 'ai' | 'upload';
}

const Create = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiStyle, setAiStyle] = useState("realistic");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customPanoramas, setCustomPanoramas] = useState<CustomPanorama[]>(() => {
    const saved = localStorage.getItem('customPanoramas');
    return saved ? JSON.parse(saved) : [];
  });

  const aiStyles = [
    { value: "realistic", label: "Réaliste", description: "Photographie haute définition" },
    { value: "artistic", label: "Artistique", description: "Style peinture digitale" },
    { value: "fantasy", label: "Fantastique", description: "Mondes imaginaires" },
    { value: "cyberpunk", label: "Cyberpunk", description: "Futuriste et néon" },
    { value: "nature", label: "Nature", description: "Paysages naturels époustouflants" },
  ];

  const saveCustomPanorama = (panorama: Omit<CustomPanorama, 'id' | 'created'>) => {
    const newPanorama: CustomPanorama = {
      ...panorama,
      id: crypto.randomUUID(),
      created: new Date().toISOString(),
    };
    
    const updated = [...customPanoramas, newPanorama];
    setCustomPanoramas(updated);
    localStorage.setItem('customPanoramas', JSON.stringify(updated));
    
    toast({
      title: "Panorama sauvegardé",
      description: "Votre création a été ajoutée à votre collection personnelle.",
    });
  };

  const deleteCustomPanorama = (id: string) => {
    const updated = customPanoramas.filter(p => p.id !== id);
    setCustomPanoramas(updated);
    localStorage.setItem('customPanoramas', JSON.stringify(updated));
    
    toast({
      title: "Panorama supprimé",
      description: "Le panorama a été retiré de votre collection.",
    });
  };

  const generateAIPanorama = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Prompt requis",
        description: "Veuillez décrire le panorama que vous souhaitez créer.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    try {
      const stylePrompts = {
        realistic: "Ultra high resolution 360° panoramic photograph",
        artistic: "Digital art painting in 360° panoramic format",
        fantasy: "Fantasy magical world in 360° panoramic view",
        cyberpunk: "Cyberpunk futuristic cityscape in 360° panoramic style",
        nature: "Breathtaking natural landscape in 360° panoramic view"
      };

      const enhancedPrompt = `${stylePrompts[aiStyle as keyof typeof stylePrompts]}, ${aiPrompt}, 360 degree panoramic view, equirectangular projection, immersive environment, high detail, professional quality`;

      // Generate the panoramic image
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: enhancedPrompt,
          width: 2048,
          height: 1024, // 2:1 ratio for panoramic
          model: 'flux.dev' // Use higher quality for panoramas
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération');
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      
      setGenerationProgress(100);
      setGeneratedImage(imageUrl);
      
      toast({
        title: "Panorama généré !",
        description: "Votre panorama 360° a été créé avec succès.",
      });

    } catch (error) {
      console.error('Erreur de génération:', error);
      toast({
        title: "Erreur de génération",
        description: "Impossible de générer le panorama. Vérifiez votre connexion.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Type de fichier invalide",
        description: "Veuillez sélectionner une image (JPG, PNG, WebP).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      toast({
        title: "Fichier trop volumineux",
        description: "La taille maximale autorisée est de 20 MB.",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    toast({
      title: "Fichier chargé",
      description: `${file.name} est prêt à être ajouté à votre collection.`,
    });
  };

  const saveUploadedPanorama = () => {
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      saveCustomPanorama({
        name: uploadedFile.name.replace(/\.[^/.]+$/, ""),
        url: imageUrl,
        description: "Panorama téléchargé depuis votre appareil",
        source: 'upload'
      });
      setUploadedFile(null);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const downloadPanorama = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Téléchargement démarré",
      description: "Le panorama est en cours de téléchargement.",
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center">
              <Wand2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold">Studio de Création</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Créez vos propres panoramas 360° avec l'IA ou téléchargez vos images existantes. 
            Donnez vie à vos visions immersives.
          </p>
        </div>

        <Tabs defaultValue="ai-generation" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-generation" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Génération IA
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Téléchargement
            </TabsTrigger>
            <TabsTrigger value="collection" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Ma Collection
            </TabsTrigger>
          </TabsList>

          {/* AI Generation Tab */}
          <TabsContent value="ai-generation">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Génération par IA
                  </CardTitle>
                  <CardDescription>
                    Décrivez le panorama de vos rêves et laissez l'IA le créer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">Description du panorama</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="Ex: Une plage tropicale au coucher du soleil avec des palmiers et des eaux cristallines..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Style artistique</Label>
                    <Select value={aiStyle} onValueChange={setAiStyle}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {aiStyles.map(style => (
                          <SelectItem key={style.value} value={style.value}>
                            <div>
                              <div className="font-medium">{style.label}</div>
                              <div className="text-sm text-muted-foreground">{style.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Génération en cours...</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <Progress value={generationProgress} />
                    </div>
                  )}

                  <Button 
                    onClick={generateAIPanorama} 
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Palette className="mr-2 h-4 w-4 animate-spin" />
                        Génération...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Générer le Panorama
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Image Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Aperçu du Résultat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedImage ? (
                    <div className="space-y-4">
                      <div className="aspect-[2/1] bg-muted rounded-lg overflow-hidden">
                        <img 
                          src={generatedImage} 
                          alt="Panorama généré"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => downloadPanorama(generatedImage, "panorama-ai")}
                          className="flex-1"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </Button>
                        <Button 
                          onClick={() => saveCustomPanorama({
                            name: `IA: ${aiPrompt.slice(0, 30)}...`,
                            url: generatedImage,
                            description: aiPrompt,
                            source: 'ai'
                          })}
                          className="flex-1"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Sauvegarder
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[2/1] bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Camera className="h-12 w-12 mx-auto mb-2" />
                        <p>Votre panorama généré apparaîtra ici</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Téléchargement de Panorama
                </CardTitle>
                <CardDescription>
                  Importez vos propres images panoramiques (format 2:1 recommandé)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <FileImage className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Glissez votre image ici</p>
                    <p className="text-sm text-muted-foreground">
                      ou cliquez pour sélectionner un fichier
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, WebP • Max 20 MB • Ratio 2:1 recommandé
                    </p>
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="mt-4"
                  />
                </div>

                {uploadedFile && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileImage className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{uploadedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button onClick={saveUploadedPanorama}>
                          <Plus className="mr-2 h-4 w-4" />
                          Ajouter à la Collection
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collection Tab */}
          <TabsContent value="collection">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Ma Collection Personnelle</h2>
                  <p className="text-muted-foreground">
                    {customPanoramas.length} panorama{customPanoramas.length > 1 ? 's' : ''} dans votre collection
                  </p>
                </div>
              </div>

              {customPanoramas.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-medium mb-2">Collection vide</h3>
                    <p className="text-muted-foreground mb-6">
                      Commencez par créer ou télécharger votre premier panorama
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Générer avec l'IA
                      </Button>
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger une Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {customPanoramas.map((panorama) => (
                    <Card key={panorama.id} className="group hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <div className="aspect-[2/1] bg-muted rounded-t-lg overflow-hidden">
                          <img 
                            src={panorama.url} 
                            alt={panorama.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <Badge 
                          className="absolute top-2 right-2" 
                          variant={panorama.source === 'ai' ? 'default' : 'secondary'}
                        >
                          {panorama.source === 'ai' ? '🤖 IA' : '📁 Upload'}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-1 line-clamp-1">{panorama.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {panorama.description}
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Créé le {new Date(panorama.created).toLocaleDateString()}
                        </p>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="mr-2 h-3 w-3" />
                            Voir
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => downloadPanorama(panorama.url, panorama.name)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => deleteCustomPanorama(panorama.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Create;