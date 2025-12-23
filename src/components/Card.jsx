import { useState } from 'react';
import { sendToTelegram } from '../services/telegram';

export function Card({ id, title, description, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [sendTooltip, setSendTooltip] = useState("Отправить");

  const handleSave = () => {
    const newTitle = editTitle.trim() || "Неизвестен";
    const newDesc = editDesc.trim() || "Без названия";
    onUpdate(id, newTitle, newDesc);
    setIsEditing(false);
  };

  const handleSend = async () => {
    await sendToTelegram(title, description);
    setSendTooltip("Отправлено");
    setTimeout(() => setSendTooltip("Отправить"), 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        {isEditing ? (
          <input
            className="card-title-edit"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h2 className="card-title">{title}</h2>
        )}
        
        <button 
          className="close-btn tooltip" 
          data-tooltip="Удалить"
          onClick={() => onDelete(id)}
        >
          ✕
        </button>
      </div>

      {isEditing ? (
        <input
          className="card-desc-edit"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className="card-desc">{description}</p>
      )}

      <div className="card-footer">
        <button 
          className="icon-btn tooltip" 
          data-tooltip={sendTooltip}
          onClick={handleSend}
        >
          ⇪
        </button>
        <button 
          className="icon-btn tooltip"
          data-tooltip={isEditing ? "Сохранить" : "Редактировать"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          ✎
        </button>
      </div>
    </div>
  );
}
