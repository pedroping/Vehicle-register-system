export interface IMaskError {
  requiredMask: string;
  actualValue: string;
}

export interface IMaxLengthError {
  requiredLength: number;
  actualLength: number;
}

export interface IMinLenghtError {
  requiredLength: number;
  actualLength: number;
}

export const FORM_ERRORS: { [key: string]: (...args: any) => string } = {
  required: () => 'Esse campo é obrigatório!',
  maxlength: (maxLengthError: IMaxLengthError) =>
    `Máximo de ${maxLengthError.requiredLength} caracteres permitidos. Quantidade atual ${maxLengthError.actualLength}`,
  minlength: (minlengthError: IMinLenghtError) =>
    `Minimo de ${minlengthError.requiredLength} caracteres permitidos. Quantidade atual ${minlengthError.actualLength}`,
};
