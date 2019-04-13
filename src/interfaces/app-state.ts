/**
 * @Author: sarahnouh
 * @Date:   2019-04-14T01:21:42+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-14T01:22:37+02:00
 */
export interface AppState {
  /**
   *the url to fetch items from
   *@type string
   */
  productUrl: string;
  /**
   *the name of the currently selected category
   *@type string
   */
  categoryName: string;
}
