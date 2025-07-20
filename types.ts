
export interface MarkerType {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  content: string; // Will store HTML content
  color: string; // Hex color code
  icon: string; // Key for an icon component
}

export interface PageType {
  id: string;
  imageSrc: string;
  markers: MarkerType[];
}
