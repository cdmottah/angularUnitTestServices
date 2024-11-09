import { Component, OnInit } from '@angular/core';
import { Person } from '@models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Person[] = [
    new Person('Cristian', 'Motta', 29, 90, 1.75),
    new Person('Camilo', 'Perez', 45, 85, 1.70)
  ]
  selectedPerson: Person | null = null
  constructor() { }

  ngOnInit(): void {
  }


  choose(person: Person) {
    this.selectedPerson = person
  }
}
