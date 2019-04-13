/**
 * @Author: sarahnouh
 * @Date:   2019-04-10T06:09:24+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-12T02:34:07+02:00
 */
import { Range } from "./range";
import { optionType } from "../interfaces/select-option";

export interface filtersState {
  /**
   *the colours retreived from the url after fetching
   *@type optionType[]
   */
  coloursArray: optionType[];
  /**
   *An array to indicate the currently selected rating in the filters if any
   *@type string[]
   */
  activeRating: string[];
  /**
   * The min and max value to the prices range filters
   *@type Range | number
   */
  priceRange: Range | number;
  /**
   * Indicates the currently selected colour if any
   *@type string
   */
  selectedColour: string;
  /**
   * a boolean to indicate whether a price range is selected or not
   * needed as the priceRange would always have a value whether a range is selected or not
   *@type boolean
   */
  priceIsSelected: boolean;
}
