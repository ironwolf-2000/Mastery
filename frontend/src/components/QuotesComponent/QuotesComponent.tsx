import { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';

import motivationQuotesEn from '../../data/motivation-quotes-en.json';
import motivationQuotesRu from '../../data/motivation-quotes-ru.json';
import { LanguageContext } from '../App';
import { nextRandomInt } from '../../utils';
import { IMotivationMessageParams, IQuotesComponentProps } from './QuotesComponent.types';

import './QuotesComponent.scss';

const blk = cn('QuotesComponent');
const motivationQuotes = {
  en: motivationQuotesEn,
  ru: motivationQuotesRu,
};

export const QuotesComponent = ({ entityType }: IQuotesComponentProps) => {
  const { t } = useTranslation();
  const lang = useContext(LanguageContext);

  const allQuotes: IMotivationMessageParams[] = useMemo(
    () => motivationQuotes[lang][`${entityType}s`],
    [entityType, lang]
  );

  const [count, setCount] = useState(1);
  const [quoteId, setQuoteId] = useState(Math.floor(Math.random() * allQuotes.length));

  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setTimeout(() => setFadeIn(false), 57000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(true);
      setCount(count + 1);
      setQuoteId(nextRandomInt(0, allQuotes.length - 1, quoteId));

      setTimeout(() => setFadeIn(false), 57000);
    }, 60000);

    return () => clearInterval(interval);
  }, [allQuotes, count, quoteId]);

  return allQuotes.length ? (
    <article className={blk({ fadeIn, fadeOut: !fadeIn })}>
      <header className={blk('Header')}>
        {t('Quote')} {count}
      </header>
      <p className={blk('Content')}>“{allQuotes[quoteId].text}”</p>
      <footer className={blk('Footer')}>{allQuotes[quoteId].author}</footer>
    </article>
  ) : null;
};
