export interface PlatformInterface{
    id: number; 
    name: string;
}

export interface GameInterface{
    id: number;
    title: string;
    genre: string;
    release_date: Date;
    price: number;
    platforms: PlatformInterface[];
    image:string;
}