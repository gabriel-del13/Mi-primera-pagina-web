import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GameInterface } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  games: GameInterface[]=[];  
  
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getGames().subscribe({
      next: (result) =>{
        this.games = result;
      },
      error: (err)=>{
        console.log(err);
      }
    })

  }
}
