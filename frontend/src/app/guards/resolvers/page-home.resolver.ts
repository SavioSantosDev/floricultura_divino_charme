import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PageHomeService } from 'src/app/services/page-home.service';
import { PageHome } from 'src/models/PageHome';

@Injectable({
  providedIn: 'root'
})
export class PageHomeResolver implements Resolve<PageHome> {

  constructor(private pageHomeService: PageHomeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageHome> {
    return this.pageHomeService.index();
  }
}
