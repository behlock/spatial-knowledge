enum Language {
  English = 'English',
  Arabic = 'العربية',
}

const isEnglish = (language: Language): boolean => language === Language.English;
const isArabic = (language: Language): boolean => language === Language.Arabic;

const changeLanguage = (language: Language): Language => {
  if (isEnglish(language)) {
    return Language.Arabic;
  }
  return Language.English;
};

export { Language, isEnglish, isArabic, changeLanguage};
