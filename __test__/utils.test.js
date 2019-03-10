import { isLatest } from '../utils';

describe('Utils', () => {
  describe('isLatest', () => {
    it('should return the bigger value', () => {
      const value1 = 1;
      const value2 = 2;

      const result1 = isLatest(value1, value2);
      const result2 = isLatest(value2, value1);
      const result3 = isLatest(value1, value1);

      expect(result1).toBeTruthy();
      expect(result2).toBeFalsy();
      expect(result3).toBeFalsy();
    })
  })
});
