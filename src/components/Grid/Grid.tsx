import React, { useCallback } from 'react';

/**
 * Grid component.
 */
const Grid: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const gridRefCallback = useCallback((element: HTMLDivElement) => {
    if (element) {
      adjustGridItemsHeight(element)
    }
  }, []);

  return (
    <div
      ref={gridRefCallback}
      style={style}
    >
      {children}
    </div>
  );
};

const adjustGridItemsHeight = (grid: HTMLDivElement) => {
  const items = grid.children as HTMLCollectionOf<HTMLDivElement>;

  for (let i = 0; i < items.length; i++) {
    let item = items[i] as any;
    if (!item.firstChild) {
      return;
    }
    // define height.
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    let rowSpan = Math.ceil((item.firstChild.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span " + rowSpan;

    // define width
    let colWidth = 100;
    let columnGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-column-gap'));
    let columnSpan = Math.ceil((item.firstChild.getBoundingClientRect().width + columnGap) / (colWidth + columnGap));
    item.style.gridColumnEnd = "span " + columnSpan;
  }
}

const style: React.CSSProperties = {
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: 'repeat(auto-fill, 100px)',
  gridAutoRows: '100px',
  padding: '10px',
};

export default Grid;
