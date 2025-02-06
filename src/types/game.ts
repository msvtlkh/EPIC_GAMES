export interface Image {
    coverHorizontal: string;
    coverVertical: string;
    media: string[];
    capsuleIcon: string;
}
  
export interface Requirements {
    system: string;
    cpu: string;
    ram: string;
    videocard: string;
    diskspace: string;
    _id: string;
}
  
export interface Game {
    images: Image;
    _id: string;
    name: string;
    price: number;
    developer: string;
    publisher: string;
    description: string;
    genres: string[];
    playerRating: number;
    reviews: string[];
    platform: string[];
    releaseDate: string;
    totalSales: number;
    wishlishCount: number;
    languages: string[];
    __v: number;
    minRequirements: Requirements;
    recRequirements: Requirements;
    stripePriceId: string;
}
  
export interface GetAllGamesResponse {
    success: boolean;
    data: {
      games: Game[];
    };
}

//searchedGames
export interface CardInterface {
    verticalImage: string
    name: string
    price: number
    id: string
}

//GameById

export interface GetGameByIdResponse {
    success: boolean;
    data: {
      game: Game;
    };
}

