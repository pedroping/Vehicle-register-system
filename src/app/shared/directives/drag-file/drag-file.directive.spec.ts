/* tslint:disable:no-unused-variable */

import { Component, DebugElement, ElementRef } from '@angular/core';
import { DragFileDirective } from './drag-file.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'app-test',
    imports: [DragFileDirective],
    template: ` <div dragFile></div> `
})
class TestComponent {}

describe('Directive: DragFile', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dragElement: DebugElement;
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, DragFileDirective],
      providers: [
        DragFileDirective,
        {
          provide: ElementRef,
          useValue: {
            nativeElement: document.createElement('div'),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    elementRef = TestBed.inject(ElementRef);
    dragElement = fixture.debugElement.query(By.directive(DragFileDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new DragFileDirective();
    expect(directive).toBeTruthy();
  });

  it('should trigger dragover event', () => {
    dragElement.triggerEventHandler('dragover', new Event('dragover'));
    fixture.detectChanges();

    expect((dragElement.nativeElement as HTMLElement).className).toContain(
      'onDrag'
    );
  });

  it('should trigger dragleave event', () => {
    dragElement.triggerEventHandler('dragleave', new Event('dragleave'));
    fixture.detectChanges();

    expect((dragElement.nativeElement as HTMLElement).className).not.toContain(
      'onDrag'
    );
  });

  it('should trigger drop event and not emit files', () => {
    const directive = fixture.debugElement.injector.get(DragFileDirective);

    dragElement.triggerEventHandler('drop', {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: null,
    });
    fixture.detectChanges();

    const outputFilesSpy = jasmine.createSpy('outputFiles');

    directive.outputFiles.subscribe(outputFilesSpy);

    expect(outputFilesSpy).not.toHaveBeenCalled();
  });

  it('should trigger drop event and emit files', () => {
    dragElement.triggerEventHandler('drop', {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: getFileList(),
    });
    fixture.detectChanges();

    expect((dragElement.nativeElement as HTMLElement).className).not.toContain(
      'onDrag'
    );
  });
});

const getFileList = () => {
  const dt = new DataTransfer();
  dt.items.add(new File([], 'file.csv'));
  return dt;
};
