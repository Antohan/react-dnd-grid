import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DraggableGridItem from './components/DraggableGridItem';
import Grid from './components/Grid';
import Item from './components/Item';
import ItemModel from './models/ItemModel';

function App() {
  const [list, setList] = useState<ItemModel[]>([
    { id: 1, index: 1, columns: 1, rows: 1, color: '#E74C3C' },
    { id: 2, index: 2, columns: 1, rows: 1, color: '#BB8FCE' },
    { id: 3, index: 3, columns: 1, rows: 2, color: '#85C1E9' },
    { id: 4, index: 4, columns: 2, rows: 1, color: '#73C6B6' },
    { id: 5, index: 5, columns: 1, rows: 1, color: '#82E0AA' },
    { id: 6, index: 6, columns: 2, rows: 2, color: '#F5B041' },
    { id: 7, index: 7, columns: 1, rows: 1, color: '#CACFD2' },
    { id: 8, index: 8, columns: 1, rows: 1, color: '#B2BABB' },
    { id: 9, index: 9, columns: 1, rows: 1, color: '#566573' },
  ]);

  const onDrop = (firstItemId: number, secondItemId: number) => {
    let newList = Array.from(list);
    let firstItem = newList.find(item => item.id === firstItemId);
    let secondItem = newList.find(item => item.id === secondItemId);

    if (firstItem && secondItem) {
      const firstIndex = firstItem.index;

      firstItem.index = secondItem?.index;
      secondItem.index = firstIndex;
  
      setList(newList);
    }
  };

  const renderItems = list.sort(sortItems).map(item => (
    <DraggableGridItem
      key={item.id}
      item={item}
      onDrop={onDrop}
    >
      <Item item={item}>
        {item.id}
      </Item>
    </DraggableGridItem>
  ));

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Grid>
          {renderItems}
        </Grid>
      </DndProvider>
    </div>
  );
}

const sortItems = (a: ItemModel, b: ItemModel) => a.index - b.index;

export default App;
