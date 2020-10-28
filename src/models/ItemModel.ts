export default interface ItemModel {
  /**
   * Item ID.
   */
  id: number;
  /**
   * Item color.
   */
  color: string;
  /**
   * Sequential number in the grid.
   */
  index: number;
  /**
   * Item width.
   */
  columns: number;
  /**
   * Item height.
   */
  rows: number;
};
