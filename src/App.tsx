import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Grid from './components/Grid';
import { observe } from './observer';

function App() {
  const [itemPos, setItemPos] = useState<[number, number]>([0, 0])

  useEffect(() => observe((newPos: [number, number]) => setItemPos(newPos)));

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Grid itemPos={itemPos} />
      </DndProvider>
    </div>
  );
}

export default App;
