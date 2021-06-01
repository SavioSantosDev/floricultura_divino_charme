import { Component, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ICategory } from 'src/models/Category';
import { MenuLinksDirective } from './menu-links/menu-links.directive';
import { MenuLinksService } from './menu-links/menu-links.service';

@Component({
  selector: 'app-products-navbar',
  templateUrl: './products-navbar.component.html',
  styleUrls: ['./products-navbar.component.scss']
})
export class ProductsNavbarComponent implements OnDestroy {

  plants?: ICategory;
  pots?: ICategory;
  fertilizers?: ICategory;

  @ViewChild('fertilizersMenuTarget', { read: MenuLinksDirective })
  fertilizerMenu!: MenuLinksDirective;

  @ViewChild('potsMenuTarget', { read: MenuLinksDirective })
  potsMenu!: MenuLinksDirective;

  @ViewChild('plantsMenuTarget', { read: MenuLinksDirective })
  plantsMenu!: MenuLinksDirective;

  constructor(
    private http: HttpClient,
    private menuLinksService: MenuLinksService,
  ) {
    this.getPlants();
    this.getPots();
    this.getFertilizers();
  }

  openPlantsMenu() {
    if (this.plants) {
      this.menuLinksService.createAndInitializeComponent({
        viewContainerRef: this.plantsMenu.viewContainerRef,
        category: this.plants
      });
    }
  }

  openPotsMenu() {
    if (this.pots) {
      this.menuLinksService.createAndInitializeComponent({
        viewContainerRef: this.potsMenu.viewContainerRef,
        category: this.pots
      });
    }
  }

  openFertilizersMenu() {
    if (this.fertilizers) {
      this.menuLinksService.createAndInitializeComponent({
        viewContainerRef: this.fertilizerMenu.viewContainerRef,
        category: this.fertilizers
      });
    }
  }

  closeMenu() {
    this.menuLinksService.destroyComponent();
  }

  ngOnDestroy() {
    this.menuLinksService.purchaseModalUnsubscribe();
  }

  // TODO Arrumar os métodos abaixo depois que tiver um backend!

  private getCategory(categoryName: string) {
    return this.http.get<ICategory[]>(`${environment.API}/categories?name=${categoryName}`)
      .pipe(take(1))
  }

  private getPlants() {
    return this.getCategory('Plantas').subscribe(
      (data) => this.plants = data[0],
      (error) => console.error(error),
    );
  }

  private getPots() {
    return this.getCategory('Caqueiros').subscribe(
      (data) => this.pots = data[0],
      (error) => console.error(error),
    );
  }

  private getFertilizers() {
    return this.getCategory('Adubos').subscribe(
      (data) => this.fertilizers = data[0],
      (error) => console.error(error),
    );
  }

}
