import { Person } from "./person.model";

describe('test for Person', () => {
  let person: Person

  beforeEach(() => {
    person = new Person('Cristian', 'Motta', 29, 90, 1.75)
  })

  it('attrs', () => {
    expect(person.name).toEqual('Cristian');
    expect(person.lastName).toEqual('Motta');
    expect(person.age).toEqual(29);
  })

  describe('test for calcIMC', () => {
    it('should return a string: down', () => {
      //Arrange
      person.weight = 40;
      person.height = 1.7;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('down')

    })

    it('should return a string: normal', () => {
      //Arrange
      person.weight = 60;
      person.height = 1.7;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('normal')

    })
    it('should return a string: overWeight', () => {
      //Arrange
      person.weight = 75;
      person.height = 1.7;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('overWeight')

    })
    it('should return a string: overWeight level 1', () => {
      //Arrange
      person.weight = 83;
      person.height = 1.75;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('overWeight level 1')

    })
    it('should return a string: overWeight level 2', () => {
      //Arrange
      person.weight = 94;
      person.height = 1.75;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('overWeight level 2')

    })
    it('should return a string: overWeight level 3', () => {
      //Arrange
      person.weight = 130;
      person.height = 1.75;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('overWeight level 3')
    })
    it('should return a string: not found', () => {
      //Arrange
      person.weight = -10;
      person.height = 1.75;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('not found')
    })

  })

})
