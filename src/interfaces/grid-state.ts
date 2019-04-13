/**
 * @Author: sarahnouh
 * @Date:   2019-04-08T00:12:07+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-13T18:48:30+02:00
 */
import { item } from "./item";

export interface GridState {
  /**
   *An array of items that should be displayed in the grid
   *@type item[]
   */
  items: item[];
  /**
   *An array that indicates which item is currently active
   *@type string[]
   */
  active: string[];
  /**
   *the url to fetch items from
   *@type string
   */
  fetchUrl?: string;
  /**
   *a boolean set to true on window resizes to re-render the view and update the offset for the items if needed
   *@type number
   */
  itemsOffsetChange?: boolean;
}
