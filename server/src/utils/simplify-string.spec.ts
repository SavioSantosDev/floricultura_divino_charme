import simplifyString from './simplify-string';

const valuesForTest = [
  ['Lírios', 'lirios'],
  ['  - Olá   Mu*@#ndo -', 'ola-mundo'],
  ['Orquídeas', 'orquideas'],
  ['Maçã', 'maca'],
  ['Pé de  Manga', 'pe-de-manga'],
  ['áÀãâ ÁÀÂÃ ÉÈÊèéê ìòî Ñ', 'aaaa-aaaa-eeeeee-ioi-n'],
];

describe('Simplify string', () => {
  it('should remove accents, symbols, unnecessary spaces etc.', () => {
    valuesForTest.forEach((value) => {
      const sut = simplifyString(value[0]);
      expect(sut).toBe(value[1]);
    });
  });

  it('should return empty string with undefined or invalid parameter', async () => {
    const value1: any = undefined;
    const value2: any = true;
    const value3: any = 12345;
    const sut1 = simplifyString(value1);
    const sut2 = simplifyString(value2);
    const sut3 = simplifyString(value3);

    expect(sut1).toBe('');
    expect(sut2).toBe('');
    expect(sut3).toBe('');
  });
});
