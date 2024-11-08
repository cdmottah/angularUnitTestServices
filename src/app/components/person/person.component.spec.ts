import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
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



});
