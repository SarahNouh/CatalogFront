/**
 * @Author: sarahnouh
 * @Date:   2019-04-10T06:05:28+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-10T06:07:46+02:00
 */
import { Range } from "./range";

export interface filterProps {
  /**
   *the url to fetch all the colours from (to use in the colour filter)
   *@type string
   */
  fetchUrl: string;
  /**
   * A function called from the parent to handle changing the fetch url to filter and retreive new data
   *@type (colourValue: string, ratingValue: number) => void
   */
  handleFiltersChange: (
    colourValue: string,
    ratingValue: number,
    priceRange: Range | number
  ) => void;
}
