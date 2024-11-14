import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighLightDirective } from './high-light.directive';


@Component({
  template: `
    <h5 highLight>Directiva de highLight Por defecto</h5>
    <title highLight>Directiva de highLight Por defecto</title>
    <h5 highLight="yellow">Directiva con texto en amarillo</h5>
    <p highLight="blue"> parrafo con la directiva en azul</p>
    <p> parrafo sin highLight</p>
    `
})
class HostComponent {}

fdescribe('HighLightDirective from HostComponent', () => {
  let fixture: ComponentFixture<HostComponent>
  let component: HostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighLightDirective]
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

  it('should have four highlight elements and one do not',()=>{
    const debugElementList = fixture.debugElement.queryAll(By.directive(HighLightDirective));
    const debugElementWithoutDirective = fixture.debugElement.queryAll(By.css('*:not([highLight])'));
    expect(debugElementList.length).toEqual(4);
    expect(debugElementWithoutDirective.length).toEqual(1);
  })

  it('the first highlight element should have gray color',()=>{
    const debugElementList = fixture.debugElement.queryAll(By.directive(HighLightDirective));
    expect(debugElementList[0].nativeElement.style.backgroundColor).toEqual('gray');
  })
  it('the first highlight element should have default color',()=>{
    const debugElementList = fixture.debugElement.queryAll(By.directive(HighLightDirective));
    const titleDebugElement = debugElementList[1]
    const directive = titleDebugElement.injector.get(HighLightDirective)
    expect(titleDebugElement.nativeElement.style.backgroundColor).toEqual(directive.defaultColor);
  })
  it('the second highlight element should have yellow color',()=>{
    const debugElementList = fixture.debugElement.queryAll(By.directive(HighLightDirective));
    expect(debugElementList[2].nativeElement.style.backgroundColor).toEqual('yellow');
  })
  it('the third highlight element should have blue color',()=>{
    const debugElementList = fixture.debugElement.queryAll(By.directive(HighLightDirective));
    expect(debugElementList[3].nativeElement.style.backgroundColor).toEqual('blue');
  })

});
