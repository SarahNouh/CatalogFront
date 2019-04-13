/**
 * @Author: sarahnouh
 * @Date:   2019-04-08T00:01:21+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-13T19:06:32+02:00
 */
export interface GridProps {
  /**
   *The url of the api that has the grid content
   *@type string
   */
  fetchUrl: string;
  /**
   *The width of each item in the grid (indicates the item spans how many cols in the grid)
   *@type string
   */
  itemWidth: string;
  /**
   *A function to handle changing category
   *@type function
   */
  handleCategoryClick?: any;
  /**
   *The Name of the current category if any is selected otherwise it's "all products"
   *@type string
   */
  categoryName?: string;
}
