import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  template: '<ng-content></ng-content><div #target></div>',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnDestroy, AfterViewInit {

  @Input() options = {}; // Configurações do observer

  // Evento emitido quando os containers se colapsarem
  @Output() isIntersecting = new EventEmitter();

  // Elemento alvo que será utilizada como alvo a ser observado
  @ViewChild('target') target?: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  get element(): HTMLElement {
    return this.host.nativeElement;
  }


  constructor(private host: ElementRef<HTMLElement>) {
    this.initializeObserver();
  }


  // Observando o alvo assim que ele for inicializado
  ngAfterViewInit(): void {
    if (this.target) {
      this.observer?.observe(this.target.nativeElement);
    }
  }


  // Desconectar do observer para previnir vazamento de memória
  ngOnDestroy(): void {
    this.observer?.disconnect();
  }


  // Inicializando o observer com suas devidas configurações
  initializeObserver(): void {
    const options = {
      root: this.isHostScrollable() ? this.element : null,
      ...this.options
    };
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.isIntersecting.emit(); // Emitindo o vento ao se intersectarem
      }
    }, options);
  }


  // Se o container do elemento atual é 'scrollável'
  private isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }
}
