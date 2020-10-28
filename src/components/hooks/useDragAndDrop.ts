import { useDrag, useDrop } from "react-dnd"
import ItemModel from "../../models/ItemModel";

const GRID_ITEM = 'GRIG_ITEM';

type Payload = {
  item: ItemModel;
  hover: any;
};

export const useDragAndDrop = (ref: React.RefObject<HTMLDivElement>, payload: Payload) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: GRID_ITEM, ...payload },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: GRID_ITEM,
    hover: payload.hover,
  });

  drag(drop(ref));

  return {
    isDragging,
  }
}

export default useDragAndDrop;
