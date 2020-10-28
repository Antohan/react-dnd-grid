import React, { useRef } from 'react';
import { DropTargetMonitor } from 'react-dnd';
import ItemModel from '../../models/ItemModel';
import useDragAndDrop from '../hooks/useDragAndDrop';

type DraggableGridItemProps = {
  item: ItemModel;
  onDrop: (firstItemId: number, secondItemId: number) => void,
};

interface DreggableItem {
  hover: (otherItem: DreggableItem, monitor: DropTargetMonitor) => void;
  index: number;
  item: ItemModel;
  type: string;
}

/**
 * DraggableGridItem component.
 */
const DraggableGridItem: React.FC<React.PropsWithChildren<DraggableGridItemProps>> = (props) => {
  const { item, onDrop, children } = props;
  const ref = useRef<HTMLDivElement>(null);

  const { isDragging } = useDragAndDrop(ref, {
    item,
    hover: createDragHoverCallback(ref, item, onDrop),
  });

  const opacity = isDragging ? 0 : 1;
  const backgroundColor = item.color;

  return (
    <div
      ref={ref}
      style={{ ...style, opacity, backgroundColor }}
    >
      {children}
    </div>
  );
};

const createDragHoverCallback = (
  ref: React.RefObject<HTMLDivElement>,
  currentItem: ItemModel,
  onDrop: (firstItemId: number, secondItemId: number) => void,
) => {
  return (otherItem: DreggableItem, monitor: DropTargetMonitor) => {
    const dragIndex = otherItem.index;
    const hoverIndex = currentItem.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    if (!ref.current) {
      return;
    }

    const hoverBoundingRect = ref.current.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
    const clientOffset = monitor.getClientOffset();
    if (!clientOffset) {
      return;
    }
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;

    // Only perform the move when the mouse has crossed half of the items height or width
    // When dragging downwards or right to left, only move when the cursor is below 50%
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY && hoverClientX < hoverMiddleX) {
      return
    }

    // When dragging upwards or left to right, only move when the cursor is above 50%
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY && hoverClientX > hoverMiddleX) {
      return
    }

    // Time to actually perform the action
    // this is where you would want to reorder your list
    // In case you wan't to use the whole object, don't forget to
    // make a deep copy, because we are mutating the object on the last line
    onDrop(otherItem.item.id, currentItem.id);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    otherItem.index = currentItem.index;
  };
}

DraggableGridItem.defaultProps = {
};

const style: React.CSSProperties = {
  width: 'auto',
  minWidth: '100px',
  border: 'thin solid #e0e0e0',
  borderRadius: '5px',
  cursor: 'pointer',
  padding: '5px',
  overflow: 'hidden',
};

export default DraggableGridItem;
