/**
 * @Author: sarahnouh
 * @Date:   2019-04-08T00:01:21+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-11T05:28:53+02:00
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
  categoryName?: string;
}
