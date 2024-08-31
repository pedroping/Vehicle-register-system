export interface IMaskError {
  requiredMask: string;
  actualValue: string;
}

export interface IMaxLengthError {
  requiredLength: number;
  actualLength: number;
}

export const FORM_ERRORS: { [key: string]: (...args: any) => string } = {
  required: () => 'Esse campo é obrigatório!',
  mask: (maskError: IMaskError) =>
    `Valor inválido, tente seguir esse padrão: ${maskError.requiredMask}.`,
  maxlength: (maxLengthError: IMaxLengthError) =>
    `Máximo de ${maxLengthError.requiredLength} caracteres permitidos. Quantidade atual ${maxLengthError.actualLength}`,
};
