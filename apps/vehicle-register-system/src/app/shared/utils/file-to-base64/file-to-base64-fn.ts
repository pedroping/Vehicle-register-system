import { Subject, take } from 'rxjs';

export function fileToBase64(file: File) {
  const image$ = new Subject<string | ArrayBuffer>();

  const reader = new FileReader();

  reader.onloadend = () => {
    image$.next(reader.result ?? '');
  };

  reader.readAsDataURL(file);

  return image$.asObservable().pipe(take(1));
}
