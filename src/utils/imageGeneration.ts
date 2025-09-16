// Image generation utilities for panoramic content

export interface GenerateImageParams {
  prompt: string;
  width?: number;
  height?: number;
  model?: string;
}

export const generatePanoramicImage = async (params: GenerateImageParams): Promise<string> => {
  try {
    // For now, we'll simulate the API call and return a placeholder
    // In a real implementation, this would call the actual image generation API
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    // For demonstration, return a placeholder panoramic image
    // In production, this would return the generated image URL
    const placeholderImages = [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2048&h=1024",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2048&h=1024",
      "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2048&h=1024",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2048&h=1024"
    ];
    
    return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate panoramic image');
  }
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'Le fichier doit être une image' };
  }
  
  // Check file size (20MB limit)
  if (file.size > 20 * 1024 * 1024) {
    return { valid: false, error: 'La taille du fichier ne doit pas dépasser 20 MB' };
  }
  
  return { valid: true };
};

export const downloadImage = (url: string, filename: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};