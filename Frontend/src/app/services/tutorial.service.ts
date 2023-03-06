import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://127.0.0.1:8000/api/user';
const solutionUrl = 'http://127.0.0.1:8000/api/solution';
const analyzeUrl = 'http://127.0.0.1:8000/api/analyze';
const compareUrl = 'http://127.0.0.1:8000/api/compare';
const dashboardUrl = 'http://127.0.0.1:8000/api/dashboard';
const RegisterUrl = 'http://127.0.0.1:8000/api/registerUser';
const userpageUrl = 'http://127.0.0.1:8000/api/userpage';
const getuserUrl = 'http://127.0.0.1:8000/api/getuser';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  dashboard(id): Observable<any> {
    return this.http.get(`${dashboardUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  uploadsolution(data): Observable<any> {
    return this.http.post(solutionUrl, data);
  }
  
  registeruser(data): Observable<any> {
    return this.http.post(RegisterUrl, data);
  }

  getsolution(id): Observable<any> {
    return this.http.get(`${solutionUrl}/${id}`);
  }

  analyzesolution(data): Observable<any> {
    return this.http.post(analyzeUrl, data);
  }

  userpageUrl(id): Observable<any> {
    return this.http.get(`${userpageUrl}/${id}`);
  }
  
  userdetails(data): Observable<any> {
    return this.http.post(userpageUrl, data);
  }

  comparesolution(data): Observable<any> {
    return this.http.post(compareUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
