import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DragFileDirective } from '@shared/directives';
import { fileToBase64, uploadFile } from '@shared/utils';
import { BehaviorSubject, switchMap } from 'rxjs';
@Component({
  selector: 'info-image-field',
  templateUrl: './image-field.component.html',
  styleUrls: ['./image-field.component.scss'],
  standalone: true,
  imports: [DragFileDirective, AsyncPipe, FontAwesomeModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageFieldComponent),
      multi: true,
    },
  ],
})
export class ImageFieldComponent implements ControlValueAccessor, OnInit {
  onChange?: (value: string | ArrayBuffer) => {};
  onTouch?: (value: string | ArrayBuffer) => {};
  image$ = new BehaviorSubject<string | ArrayBuffer>('');

  _uploadFile = uploadFile;
  _fileToBase64 = fileToBase64;

  constructor(library: FaIconLibrary) {
    library.addIcons(faTrash, faCloudArrowUp);
  }

  ngOnInit(): void {
    this.image$.pipe().subscribe((img) => {
      this.onChange?.(img);
      this.onTouch?.(img);
    });
  }

  writeValue(value: string) {
    if (value) this.image$.next(value);
  }

  registerOnChange(fn: (value: string | ArrayBuffer) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: string | ArrayBuffer) => {}) {
    this.onTouch = fn;
  }

  upLoadImg() {
    this._uploadFile()
      .pipe(switchMap((file) => this._fileToBase64(file)))
      .subscribe((img) => this.image$.next(img));
  }

  removeImage() {
    this.image$.next('');
  }

  onFileDrop(files: File[]) {
    const file = files[0];

    if (!file) return;

    this._fileToBase64(files[0]).subscribe((img) => this.image$.next(img));
  }
}
