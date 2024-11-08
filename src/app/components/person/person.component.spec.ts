import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  it('should have <p> with "Soy un parrafo"', () => {
    const personDebug = fixture.debugElement;
    const paragraphDebug: DebugElement = personDebug.query(By.css('p'))
    const paragraphElement = paragraphDebug.nativeElement as HTMLParagraphElement;
    expect(paragraphElement?.textContent).toEqual("Soy un parrafo")
  });

  it('should have <h3> with "Hola, personComponent"', () => {
    const personDebug = fixture.debugElement;
    const headingDebug: DebugElement = personDebug.query(By.css('h3'))
    const headingElement = headingDebug.nativeElement as HTMLHeadingElement
    expect(headingElement?.textContent).toEqual("Hola, personComponent")
  });

});
