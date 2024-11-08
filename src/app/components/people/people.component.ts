import { Component, OnInit } from '@angular/core';
import { Person } from '@models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  readonly person: Person = new Person('Cristian', 'Motta', 29, 90, 1.75)
  constructor() { }

  ngOnInit(): void {
  }

}
