export interface PlatformsInterface{
    id: number; 
    name: string;
    icon:string;
}
export interface GameInterface{
    formatted_id: number;
    title: string;
    genre: string;
    release_date: Date;
    price: string;
    platforms: PlatformsInterface[];
    image:string;
}