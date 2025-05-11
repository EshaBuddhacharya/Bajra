import React, { useState } from 'react';

function EditableDiv({text}) {
  const [content, setContent] = useState(text);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      className='p-2'
      style={{
        border: '1px dashed gray',
        borderRadius: '10px',
        display: 'inline-block',
        color: content === '' ? 'gray' : 'black',
      }}
      onInput={(e) => setContent(e.currentTarget.textContent)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {content === '' && !isFocused ? 'Enter name...' : content}
    </div>
  );
}

export default EditableDiv;
