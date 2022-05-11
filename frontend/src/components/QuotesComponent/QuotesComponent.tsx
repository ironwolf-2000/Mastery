import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@bem-react/classname';

import motivationMessages from '../../data/entitiesMotivationMessages.json';
import { nextRandomInt } from '../../utils';
import { IMotivationMessageParams, IQuotesComponentProps } from './QuotesComponent.types';

import './QuotesComponent.scss';

const blk = cn('QuotesComponent');

export const QuotesComponent = ({ entityType }: IQuotesComponentProps) => {
  const { t } = useTranslation();

  const allMessages: IMotivationMessageParams[] = useMemo(
    () => motivationMessages[`${entityType}s`],
    [entityType]
  );

  const [count, setCount] = useState(1);
  const [messageId, setMessageId] = useState(Math.floor(Math.random() * allMessages.length));

  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setTimeout(() => setFadeIn(false), 57000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(true);
      setCount(count + 1);
      setMessageId(nextRandomInt(0, allMessages.length - 1, messageId));

      setTimeout(() => setFadeIn(false), 57000);
    }, 60000);

    return () => clearInterval(interval);
  }, [allMessages, count, messageId]);

  return (
    <article className={blk({ fadeIn, fadeOut: !fadeIn })}>
      <header className={blk('Header')}>
        {t('Quote')} {count}
      </header>
      <p className={blk('Content')}>“{allMessages[messageId].text}”</p>
      <footer className={blk('Footer')}>{allMessages[messageId].author}</footer>
    </article>
  );
};
