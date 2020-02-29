import { CustomedNumberPipe } from './customed-number.pipe';

describe('CustomedNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomedNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
