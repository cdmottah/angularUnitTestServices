import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleComponent } from './people.component';
import { Person } from '@models/person.model';
import { PersonComponent } from '../person/person.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list app-person component', () => {
    //Arrange
    component.people = [
      new Person('Cristian', 'Motta', 29, 90, 1.75),
      new Person('Camilo', 'pardo', 45, 85, 1.70),
      new Person('pepito', 'Perez', 45, 85, 1.70)
    ]


    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'))
    //Assert
    expect(debugElement.length).toEqual(3)
  })

  it('should raise selected person when click event', () => {
    //Arrange
    const personToMock = new Person('Cristian', 'Motta', 29, 90, 1.75);
    component.people = [
      personToMock,
      new Person('Camilo', 'pardo', 45, 85, 1.70),
    ]
    const buttonDebugList = fixture.debugElement.queryAll(By.css('app-person .btn-choose'))

    //Act
    buttonDebugList[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    const liDebugger = fixture.debugElement.query(By.css('li.test-selected-person-name'));
    const liElement = liDebugger.nativeElement

    //Assert
    expect(component.selectedPerson).toEqual(personToMock)
    expect(liElement.textContent).toContain('Cristian')
  })
});
