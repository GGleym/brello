export type TCard = {
  /** Идентификатор карточки */
  id: string;
  /** Заголовок карточки */
  title: string;
};

export type TBoardListItem = {
  /** Идентификатор колонки */
  id: string;
  /** Заголовок колонки */
  title: string;
  /** Список карточек */
  cards: TCard[];
};
