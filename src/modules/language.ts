enum Language {
  English = 'English',
  Arabic = 'العربية',
}

type Locale = 'en' | 'ar'

const isEnglish = (language: Language): boolean => language === Language.English
const isArabic = (language: Language): boolean => language === Language.Arabic

const localeOf = (language: Language): Locale => (isEnglish(language) ? 'en' : 'ar')

const changeLanguage = (language: Language): Language => (isEnglish(language) ? Language.Arabic : Language.English)

export { Language, changeLanguage, isArabic, isEnglish, localeOf }
export type { Locale }
