import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  describe('Test for Multiply', () => {
    it('should return a nine', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.multiply(3, 3)
      //Assert
      expect(rta).toEqual(9)
    })
    it('should return a four', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.multiply(1, 4)
      //Assert
      expect(rta).toEqual(4)
    })
    it('should return a cero', () => {
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.multiply(0, 5)
      //Assert
      expect(rta).toEqual(0)
    })
  })
  describe('test for divide', () => {
    it('should return some numbers', () => {
      const calculator = new Calculator();
      expect(calculator.divide(6, 3)).toEqual(2)
      expect(calculator.divide(5, 2)).toEqual(2.5)
    })
    it('should return null', () => {
      const calculator = new Calculator();
      expect(calculator.divide(6, 0)).toBeNull();
      expect(calculator.divide(10000, 0)).toBeNull();
    })
  })
})

