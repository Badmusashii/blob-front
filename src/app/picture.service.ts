import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  constructor(private httpClient: HttpClient) {}

  getImage() {
    return this.httpClient.get('http://localhost:8080', {
      responseType: 'blob',
    });
  }

  postImage(formData: FormData) {
    return this.httpClient.post('http://localhost:8080', formData);
  }
}
