import { Card } from './Card';

export function CardList({ cards, onUpdate, onDelete }) {
  return (
    <div className="cards">
      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
