import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[dragFile]',
  standalone: true,
})
export class DragFileDirective {
  @Output() outputFiles = new EventEmitter<File[]>();

  @HostBinding('class.onDrag') onDragHover = false;

  @HostListener('dragover', ['$event']) onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.onDragHover = true;
  }

  @HostListener('dragleave', ['$event']) ondrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.onDragHover = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.onDragHover = false;
    if (!event.dataTransfer) return;
    const files = Array.from(event.dataTransfer.files);
    this.outputFiles.emit(files);
  }
}
