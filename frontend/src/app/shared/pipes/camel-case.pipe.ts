import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  /**
   * Inicialmente utilizado para transformar os nomes dos produtos em CamelCase
   */
  transform(value: string, ...args: unknown[]): string {
    // Separar as palavras pelo hifen ou espaço em um array
    let words = value.split(/\-|\s/);

    // Deixar a inicial de cada palavra do array maiuscula
    words = words.map((word: string) => this.capitalize(word));

    // Juntar todas as palavras em uma string separando-as por um espaço
    const wordTransform = words.join(' ');

    return wordTransform;
  }

  // Deixar a inicial da palavra maiuscula
  capitalize(value: string): string {
    return `${value.substr(0, 1).toUpperCase()}${value.substr(1)}`;
  }

}
