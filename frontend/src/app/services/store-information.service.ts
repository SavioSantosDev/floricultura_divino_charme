import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { StoreInformation } from 'src/models/storeInformation/StoreInformation';

@Injectable({
  providedIn: 'root'
})
export class StoreInformationService {

  private readonly PATH = `${environment.API}store-information.json`;

  constructor(private http: HttpClient) { }

  /**
   * Retonar todas as informações da loja
   */
  index(): Observable<StoreInformation> {
    return this.http.get<StoreInformation>(this.PATH);
  }
}
