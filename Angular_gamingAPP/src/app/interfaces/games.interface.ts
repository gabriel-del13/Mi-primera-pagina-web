export interface PlatformsInterface{
    id: number; 
    name: string;
    icon: string;
}
export interface GameInterface{
    formatted_id: number;
    title: string;
    genre: string;
    description: string;
    release_date: Date;
    price: string;
    platforms: PlatformsInterface[];
    image:string;
}

export interface StockInterface{
    id: number;
    quantity: number;

}