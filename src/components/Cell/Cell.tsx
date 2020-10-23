import React from 'react';
import { useDrop } from 'react-dnd';
import { moveItem } from '../../observer';

import { ItemTypes } from '../Item';

const style: React.CSSProperties = {
  minWidth: '100px',
  width: '100px',
  minHeight: '100px',
  height: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // border: 'thin solid #ccc',
};

type CellProps = {
  x: number,
  y: number,
};

/**
 * Cell component.
 */
const Cell: React.FC<React.PropsWithChildren<CellProps>> = ({ x, y, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop: () => moveItem(x, y),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const backgroundColor = isOver ? '#22ff23' : 'transparent';
  
  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
    >
      {children}
    </div>
  );
};

Cell.defaultProps = {
};

export default Cell;
