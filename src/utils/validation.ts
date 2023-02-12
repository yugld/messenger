enum TextErrors {
    FIRTS_NAME = 'Валидация не пройдена',
    SECOND_NAME = 'Валидация не пройдена',
    LOGIN = 'Валидация не пройдена',
    EMAIL = 'Валидация не пройдена',
    PASSWORD = 'Валидация не пройдена',
    PHONE = 'Валидация не пройдена',
    MESSAGE = 'Не должно быть пустым',
    DEFAULT = 'Не должно быть пустым',
    DISPLAY_NAME = 'Валидация не пройдена',
}

enum RulesReg {
    FIRTS_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
    SECOND_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
    LOGIN = '^(?=.*[a-z])[a-zA-Z0-9_-]{3,20}$',
    EMAIL = '^[a-z0-9._%$#+-]+@[a-z0-9]*[a-z]+.[a-z]+$',
    PASSWORD = '^(?=.*[A-Z])(?=.*[0-9]).{8,40}$',
    PHONE = '^[0-9+][0-9]{9,14}$',
    MESSAGE = '[^s]',
    DEFAULT = '[^s]',
    DISPLAY_NAME = '^[А-ЯA-Z][а-яА-ЯёЁa-zA-Z-]+$',
}

export function Validation(typeInput: string): Array<string> {
  switch (typeInput) {
    case 'first_name':
      return [TextErrors.FIRTS_NAME, RulesReg.FIRTS_NAME];
    case 'second_name':
      return [TextErrors.SECOND_NAME, RulesReg.SECOND_NAME];
    case 'login':
      return [TextErrors.LOGIN, RulesReg.LOGIN];
    case 'email':
      return [TextErrors.EMAIL, RulesReg.EMAIL];
    case 'phone':
      return [TextErrors.PHONE, RulesReg.PHONE];
    case 'password':
      return [TextErrors.PASSWORD, RulesReg.PASSWORD];
    case 'passwordYet':
      return [TextErrors.PASSWORD, RulesReg.PASSWORD];
    case 'oldPassword':
      return [TextErrors.PASSWORD, RulesReg.PASSWORD];
    case 'newPassword':
      return [TextErrors.PASSWORD, RulesReg.PASSWORD];
    case 'display_name':
      return [TextErrors.DISPLAY_NAME, RulesReg.DISPLAY_NAME];
    case 'message':
      return [TextErrors.MESSAGE, RulesReg.MESSAGE];
  }

  return [TextErrors.DEFAULT, RulesReg.DEFAULT];
}
