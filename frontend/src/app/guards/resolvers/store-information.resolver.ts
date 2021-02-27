import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { StoreInformation } from 'src/models/storeInformation/StoreInformation';
import { StoreInformationService } from 'src/app/services/store-information.service';


@Injectable({
  providedIn: 'root'
})
export class StoreInformationResolver implements Resolve<StoreInformation> {

  constructor(private storeInformationService: StoreInformationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StoreInformation> {
    return this.storeInformationService.index();
  }
}
