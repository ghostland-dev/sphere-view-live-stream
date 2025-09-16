import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon,
  Eye,
  Volume2,
  Monitor,
  Palette,
  RotateCcw,
  Save,
  RotateCw
} from "lucide-react";

interface UserSettings {
  autoRotate: boolean;
  rotationSpeed: number;
  rotationDirection: 'clockwise' | 'counterclockwise';
  defaultQuality: string;
  enableSounds: boolean;
  volume: number;
  theme: string;
  defaultView: string;
  showInstructions: boolean;
  enableKeyboardControls: boolean;
  mouseSensitivity: number;
  enableFullscreenOnStart: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>({
    autoRotate: false,
    rotationSpeed: 1,
    rotationDirection: 'clockwise',
    defaultQuality: 'hd',
    enableSounds: true,
    volume: 50,
    theme: 'system',
    defaultView: 'gallery',
    showInstructions: true,
    enableKeyboardControls: true,
    mouseSensitivity: 1,
    enableFullscreenOnStart: false
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('vrViewerSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('vrViewerSettings', JSON.stringify(settings));
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été enregistrées avec succès.",
    });
  };

  const resetSettings = () => {
    const defaultSettings: UserSettings = {
      autoRotate: false,
      rotationSpeed: 1,
      rotationDirection: 'clockwise',
      defaultQuality: 'hd',
      enableSounds: true,
      volume: 50,
      theme: 'system',
      defaultView: 'gallery',
      showInstructions: true,
      enableKeyboardControls: true,
      mouseSensitivity: 1,
      enableFullscreenOnStart: false
    };
    setSettings(defaultSettings);
    localStorage.removeItem('vrViewerSettings');
    toast({
      title: "Paramètres réinitialisés",
      description: "Tous les paramètres ont été restaurés aux valeurs par défaut.",
    });
  };

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Paramètres</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Personnalisez votre expérience de visualisation 360°
          </p>
        </div>

        <div className="grid gap-6">
          {/* Viewing Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Paramètres de Visualisation
              </CardTitle>
              <CardDescription>
                Configurez l'expérience de visualisation panoramique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Qualité par défaut</Label>
                  <Select 
                    value={settings.defaultQuality} 
                    onValueChange={(value) => updateSetting('defaultQuality', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hd">HD (1080p)</SelectItem>
                      <SelectItem value="4k">4K (2160p)</SelectItem>
                      <SelectItem value="auto">Automatique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Vue par défaut</Label>
                  <Select 
                    value={settings.defaultView} 
                    onValueChange={(value) => updateSetting('defaultView', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gallery">Galerie</SelectItem>
                      <SelectItem value="viewer">Visualiseur direct</SelectItem>
                      <SelectItem value="home">Page d'accueil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rotation automatique</Label>
                    <p className="text-sm text-muted-foreground">Activer la rotation automatique des panoramas</p>
                  </div>
                  <Switch
                    checked={settings.autoRotate}
                    onCheckedChange={(checked) => updateSetting('autoRotate', checked)}
                  />
                </div>

                {settings.autoRotate && (
                  <>
                    <div className="space-y-2">
                      <Label>Vitesse de rotation: {settings.rotationSpeed}x</Label>
                      <Slider
                        value={[settings.rotationSpeed]}
                        onValueChange={(value) => updateSetting('rotationSpeed', value[0])}
                        min={0.1}
                        max={3}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Direction de rotation</Label>
                      <Select 
                        value={settings.rotationDirection} 
                        onValueChange={(value: 'clockwise' | 'counterclockwise') => updateSetting('rotationDirection', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clockwise">
                            <div className="flex items-center gap-2">
                              <RotateCw className="h-4 w-4" />
                              Sens horaire
                            </div>
                          </SelectItem>
                          <SelectItem value="counterclockwise">
                            <div className="flex items-center gap-2">
                              <RotateCcw className="h-4 w-4" />
                              Sens antihoraire
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Controls Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Contrôles
              </CardTitle>
              <CardDescription>
                Paramètres des contrôles et de l'interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Afficher les instructions</Label>
                    <p className="text-sm text-muted-foreground">Afficher les conseils d'utilisation</p>
                  </div>
                  <Switch
                    checked={settings.showInstructions}
                    onCheckedChange={(checked) => updateSetting('showInstructions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Contrôles clavier</Label>
                    <p className="text-sm text-muted-foreground">Activer la navigation au clavier</p>
                  </div>
                  <Switch
                    checked={settings.enableKeyboardControls}
                    onCheckedChange={(checked) => updateSetting('enableKeyboardControls', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Plein écran au démarrage</Label>
                    <p className="text-sm text-muted-foreground">Lancer directement en mode plein écran</p>
                  </div>
                  <Switch
                    checked={settings.enableFullscreenOnStart}
                    onCheckedChange={(checked) => updateSetting('enableFullscreenOnStart', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sensibilité de la souris: {settings.mouseSensitivity}x</Label>
                  <Slider
                    value={[settings.mouseSensitivity]}
                    onValueChange={(value) => updateSetting('mouseSensitivity', value[0])}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio
              </CardTitle>
              <CardDescription>
                Paramètres audio et sonores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Activer les sons</Label>
                  <p className="text-sm text-muted-foreground">Sons d'interface et d'ambiance</p>
                </div>
                <Switch
                  checked={settings.enableSounds}
                  onCheckedChange={(checked) => updateSetting('enableSounds', checked)}
                />
              </div>

              {settings.enableSounds && (
                <div className="space-y-2">
                  <Label>Volume: {settings.volume}%</Label>
                  <Slider
                    value={[settings.volume]}
                    onValueChange={(value) => updateSetting('volume', value[0])}
                    min={0}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Apparence
              </CardTitle>
              <CardDescription>
                Thème et préférences visuelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Thème</Label>
                <Select 
                  value={settings.theme} 
                  onValueChange={(value) => updateSetting('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="system">Système</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" onClick={resetSettings}>
              Réinitialiser
            </Button>
            <Button onClick={saveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder les paramètres
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;