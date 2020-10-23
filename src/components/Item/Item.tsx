import React from 'react';
import { useDrag } from 'react-dnd';

const style: React.CSSProperties = {
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  backgroundColor: '#003faa',
};

type ItemProps = {
};

export const ItemTypes = {
  ITEM: 'item',
};

/**
 * Item component.
 */
const Item: React.FC<ItemProps> = (props) => { 
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.ITEM },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.8 : 1;

  return (
    <div
      ref={drag}
      style={{ ...style, opacity }}
    />
  );
};

Item.defaultProps = {
};

export default Item;
