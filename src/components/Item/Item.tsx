import React from 'react';
import ItemModel from '../../models/ItemModel';

type ItemProps = {
  item: ItemModel,
};

/**
 * Item component.
 */
const Item: React.FC<React.PropsWithChildren<ItemProps>> = (props) => {
  const { item, children } = props;

  const style: React.CSSProperties = {
    height: 100 * item.rows + 'px',
    width: 100 * item.columns + 'px',
  }; 

  return (
    <div style={style}>
      {children}
    </div>
  );
};

Item.defaultProps = {
};

export default Item;
