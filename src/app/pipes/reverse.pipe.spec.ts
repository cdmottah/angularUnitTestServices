import { ReversePipe } from './reverse.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FormsModule } from "@angular/forms";


@Component({
  template: `
    <h5 >{{'amor' | reverse}}</h5>
    <input  [(ngModel)]="text" >
    <p>{{text | reverse}}</p>
    `
})
class HostComponent {
  text = 'attom'
}

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("roma")
    expect(rta).toEqual("amor")
    const rta2 = pipe.transform("123")
    expect(rta2).toEqual("321")
  })
});

describe('test to ReversePipe form hostComponent', () => {
  let fixture: ComponentFixture<HostComponent>
  let component: HostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule]
    })
      .compileComponents();
  })
  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  it('should be created', () => {
    expect(component).toBeTruthy();
  })
  it('should be the h5 element roma ', () => {
    const headingDebugElement = fixture.debugElement.query(By.css('h5'))
    const headingElement = headingDebugElement.nativeElement as HTMLHeadingElement;
    expect(headingElement.textContent).toEqual('roma')
  })
  it('should apply reverse pipe when typing the input ', () => {
    const inputDebugElement = fixture.debugElement.query(By.css('input'))
    const inputElement = inputDebugElement.nativeElement as HTMLInputElement
    const paragraphElement = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement
    expect(paragraphElement.textContent).toEqual('motta');
    inputElement.value = 'zorra'
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(paragraphElement.textContent).toEqual('arroz');

  })

})

