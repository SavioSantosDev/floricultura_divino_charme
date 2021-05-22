import { Component, Input } from '@angular/core';

interface IBreadcrumb {
  namespace: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  @Input() links: IBreadcrumb[] = [];
}
