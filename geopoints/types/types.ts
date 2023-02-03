interface Tag {
  id?: number;
  name: string;
  timesSearched?: number;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Point {
  id?: number;
  authorId?: number;
  title: string;
  description?: string;
  isPublic: boolean;
  lng: number;
  lat: number;
  imagePath: string;
  spotifyPath?: string;
  tags?: Tag[];
  list: List;
  listId?: number;
  likedBy?: User[];
}

interface List {
  id?: number;
  title: string;
  author: User;
  imagePath: string;
  authorId?: number;
  description: string;
  createdAt?: number;
  tags: Tag[];
  isPublic: boolean;
  spotifyPath?: string;
  points?: Point[];
}

interface User {
  id?: number;
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
