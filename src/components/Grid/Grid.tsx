import React, { useState } from 'react';
import Cell from '../Cell';
import Item from '../Item';

const style: React.CSSProperties = {
  display: 'flex',
};

type GridProps = {
  itemPos: [number, number];
};

const CELL_WIDTH = 100;

/**
 * Grid component.
 */
const Grid: React.FC<GridProps> = ({ itemPos }) => {
  const renderCell = (i: number, [itemCol, itemRow]: [number, number]) => {
    const col = 0;
    const row = i;
    const isItemHere = itemCol === col && itemRow === row;
    const piece = isItemHere ? <Item /> : null;

    return (
      <Cell
        key={i}
        x={col}
        y={row}
      >
        {piece}
      </Cell>
    );
  }

  const [cellCount, setCellCount] = useState(0)
  const getCellCount = (element: HTMLDivElement) => {
    if (element) {
      setCellCount(Math.floor(element.offsetWidth / CELL_WIDTH));
    }
  }

  const cells = [];

  for (let i = 0; i < cellCount; i++) {
    cells.push(renderCell(i, itemPos));
  }

  return (
    <div
      ref={getCellCount}
      style={style}
    >
      {cells}
    </div>
  );
};

Grid.defaultProps = {
};

export default Grid;
