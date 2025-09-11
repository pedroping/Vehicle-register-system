import { Subject, take } from 'rxjs';

export function uploadFile() {
  const file$ = new Subject<File>();

  // const input = document.createElement('input');
  // input.type = 'file';
  // input.click();

  // input.onchange = () => {
  //   if (input.files) file$.next(input.files[0]);
  // };

  return file$.asObservable().pipe(take(1));
}
