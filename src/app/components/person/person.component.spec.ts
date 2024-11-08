import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '@models/person.model';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Cristian"', () => {
    component.person = new Person('Cristian', 'Motta', 29, 89, 1.75)
    expect(component.person.name).toEqual("Cristian")
  });

  it('should have <p> to contain "1.75"', () => {
    component.person = new Person('', '', 0, 0, 1.75);
    const personDebug = fixture.debugElement;
    const paragraphDebug: DebugElement = personDebug.query(By.css('p'))
    const paragraphElement = paragraphDebug.nativeElement as HTMLParagraphElement;

    fixture.detectChanges();

    expect(paragraphElement?.textContent).toContain("1.75")
  });

  it('should have <h3> to contain "Andres"', () => {
    //Arrange
    component.person = new Person('Andres', 'Torres', 29, 89, 1.75)

    const personDebug = fixture.debugElement;
    const headingDebug: DebugElement = personDebug.query(By.css('h3'))
    const headingElement = headingDebug.nativeElement as HTMLHeadingElement
    //Act
    fixture.detectChanges();

    //Assert
    expect(headingElement?.textContent).toContain("Andres")
  });

  describe('test for calcIMC', () => {
    it('should exist', () => {
      expect(component.calcIMC).toBeTruthy();
    })

    it('should display a text with IMC when calcIMC is called', () => {
      //Arrange
      const expectedText = `overWeight level 3`
      component.person = new Person('Sara', 'Valentina', 30, 120, 1.65)
      const buttonElement = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement as HTMLButtonElement | null;

      //Act
      component.calcIMC();
      fixture.detectChanges();
      //Assert
      expect(buttonElement?.textContent).toContain(expectedText)
    });

    it('should display a text with IMC when do click', () => {
      //Arrange
      const expectedText = `overWeight level 3`
      component.person = new Person('Sara', 'Valentina', 30, 120, 1.65)
      const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
      const buttonElement = buttonDebug.nativeElement as HTMLButtonElement;

      //Act
      buttonDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      //Assert
      expect(buttonElement?.textContent).toContain(expectedText);
    });

    it('should calcIMC called once when do click', () => {
      //Arrange
      const mockElement = spyOn(component, 'calcIMC');
      component.person = new Person('Sara', 'Valentina', 30, 120, 1.65)
      const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));

      //Act
      buttonDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      //Assert
      expect(mockElement).toHaveBeenCalledTimes(1);
    });
  })

  describe('test for doClick', () => {
    it('should exist', () => {
      expect(component.calcIMC).toBeTruthy();
    })

    it('should raise selected event when click', (doneFn) => {
      //Arrange
      const expectedPerson = new Person('Sara', 'Valentina', 30, 120, 1.65)
      component.person = expectedPerson;
      const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));

      let selectedPerson: Person | undefined;
      component.onSelected.subscribe(person => {
        selectedPerson = person;

        //Assert
        expect(expectedPerson).toEqual(selectedPerson)
        doneFn();
      });
      //Act
      buttonDebug.triggerEventHandler('click', null)
      fixture.detectChanges();

    })
  })



});

@Component({
  template: '<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>'
})
class HostComponent {
  person = new Person('Camilo', 'sanchez', 25, 75, 1.80);
  selectedPerson: Person | undefined
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}


fdescribe('PersonComponent from HostComponent', () => {
  let fixture: ComponentFixture<HostComponent>
  let component: HostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent]
    })
      .compileComponents();
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  })
  it('should display person name',()=>{
    //Arrange
    const expectedName = 'Camilo'
    const HeadingDebug = fixture.debugElement.query(By.css('app-person h3'));
    const HeadingElement = HeadingDebug.nativeElement as HTMLHeadingElement
    //Act
    fixture.detectChanges();
    //Assert
    expect(HeadingElement.textContent).toContain(expectedName);
  })
  it('should raise selected event when clicked',()=>{
    //Arrange
    const expectedPerson = component.person
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));

    //Act
    buttonDebug.triggerEventHandler('click',null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(expectedPerson);
  })

});
