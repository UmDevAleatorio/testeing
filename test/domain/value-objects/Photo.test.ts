import { Photo } from '@domain/value-objects/Photo';

describe('Value Object: Photo', () => {
  it('should create a valid photo URL', () => {
    const photo = Photo.create('http://example.com/imagem.jpg');
    expect(photo.url).toBe('http://example.com/imagem.jpg');
  });

  it('should throw an error for an invalid URL', () => {
    expect(() => Photo.create('url-invalida')).toThrow('URL da foto inválida.');
  });
});