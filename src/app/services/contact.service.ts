import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  async save(contact: any) {

    try {
      
      const resp = await this.http.post<any>(`${this.baseUrl}/contact`, {...contact}).toPromise();

      return resp.id;
    } catch (error) {

      throw error.error;
    }
  }
}
