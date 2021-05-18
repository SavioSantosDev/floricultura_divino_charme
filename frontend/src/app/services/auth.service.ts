import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

interface IAdmin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = `${environment.API}/admin`;
  private token = 'sdoifhq2903nposidnf9p832nosidnfiopasdf';
  private adminIsAuthenticated$ = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // ONLY FOR TEST
  private getAdmin(): Observable<IAdmin> {
    return this.http.get<IAdmin>(this.URL).pipe(take(1));
  }

  private checkAdmin(body: string): void {
    this.getAdmin().subscribe((admin) => {
      // Simulating a success response
      const response: IAdmin = JSON.parse(body);
      console.log(response);
      console.log(admin);

      if (response.email === admin.email && response.password === admin.password) {
        localStorage.setItem('token', this.token);
        this.adminIsAuthenticated$.next(true);
      } else {
        this.adminIsAuthenticated$.next(false);
      }
    });
  }

  /**
   * Returns an observable with true for the authenticated user and false otherwise.
   */
  login(body: string): Observable<boolean> {
    this.checkAdmin(body);
    return this.adminIsAuthenticated$.asObservable().pipe(take(1));
  }

  adminIsAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
