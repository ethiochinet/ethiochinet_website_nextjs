import { useLocale } from '@/components/providers/LocaleProvider';

export function useTranslation() {
  const { t } = useLocale();
  return { t };
}