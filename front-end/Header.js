```jsx
// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Cycle Sense</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center'
  }
};

export default Header;
```
