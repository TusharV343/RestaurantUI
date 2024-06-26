import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = 'http://localhost:9091'; // Adjust this as per your backend URL

  constructor(private http: HttpClient) {}

  getMenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getMenu`);
  }

  addMenu(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addMenu`, item);
  }

  updateMenu(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateMenu`, item);
  }

  deleteMenu(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/deleteMenu`, item);
  }
  addItemToCart(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addItemToCart`, item);
  }
}
