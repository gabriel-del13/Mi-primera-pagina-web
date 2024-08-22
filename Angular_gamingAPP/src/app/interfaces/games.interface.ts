export interface PlatformsInterface{
    id: number; 
    name: string;
}
export interface GameInterface{
    formatted_id: number;
    title: string;
    genre: string;
    release_date: Date;
    price: number;
    platforms: PlatformsInterface[];
    image:string;
}