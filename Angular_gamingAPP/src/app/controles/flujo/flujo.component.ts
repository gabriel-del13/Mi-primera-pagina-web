import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flujo',
  templateUrl: './flujo.component.html',
  styleUrls: ['./flujo.component.css'],
  standalone: true,
  imports: [HttpClientModule]
})
export class FlujoComponent {
  private apiUrl = 'https://api.ejemplo.com'; // URL de tu API

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/datos`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/datos`, data);
  }

  // Otros métodos para PUT, DELETE, etc.
}     
