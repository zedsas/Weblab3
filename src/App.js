import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CardList } from './components/CardList';
import './App.css';

function App() {
  const [cards, setCards] = useLocalStorage('cards', []);
  const [nextId, setNextId] = useLocalStorage('nextId', 1);
  
  const [inputTitle, setInputTitle] = useState('');
  const [inputDesc, setInputDesc] = useState('');

  const addCard = () => {
    const title = inputTitle.trim() || "Неизвестен";
    const description = inputDesc.trim() || "Без названия";

    const newCard = { id: nextId, title, description };
    
    setCards([...cards, newCard]);
    setNextId(nextId + 1);
    
    setInputTitle('');
    setInputDesc('');
  };

  const updateCard = (id, newTitle, newDesc) => {
    setCards(cards.map(card => 
      card.id === id 
        ? { ...card, title: newTitle, description: newDesc }
        : card
    ));
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className="wrapper">
      <div className="top-panel">
        <div className="fields">
          <input 
            className="text-input" 
            type="text" 
            placeholder="Название"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCard()}
          />
          <input 
            className="text-input" 
            type="text" 
            placeholder="Описание"
            value={inputDesc}
            onChange={(e) => setInputDesc(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCard()}
          />
        </div>
        <button 
          className="add-btn tooltip" 
          data-tooltip="Добавить"
          onClick={addCard}
        >
          +
        </button>
      </div>

      <CardList 
        cards={cards} 
        onUpdate={updateCard} 
        onDelete={deleteCard} 
      />
    </div>
  );
}

export default App;
