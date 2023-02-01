interface Tag {
  id: number;
  name: string;
  timesSearched?: number;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Point {
  id: number;
  coordinates: Coordinates;
  title: string;
  description: string;
  date: number;
  tags: Tag[];
  imagePaths: string[];
  author: User;
  public: boolean;
  share_id?: string;
}

interface List {
  id: number;
  title: string;
  author: User;
  imagePath: string;
  description: string;
  createdAt: number;
  tags: Tag[];
  public: boolean;
  spotifyPath?: string;
  points: Point[];
}

interface User {
  id: number;
  email: string;
  userName: string;
  name?: string;
  bio?: string;
  imagePath?: string;
  password?: string;
  ownLists: List[];
  instagram?: string;
  facebook?: string;
  likedPoints: Point[];
  likedLists: List[];
}

export type { Tag, User, Coordinates, Point, List };
