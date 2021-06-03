import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { StoreInformation } from 'src/models/StoreInformation';

@Injectable({
  providedIn: 'root'
})
export class StoreInformationService {

  private readonly URL = `${environment.API}/store_informations`;

  constructor(private http: HttpClient) { }


  index(): Observable<StoreInformation> {
    return this.http.get<StoreInformation>(this.URL);
  }
}
