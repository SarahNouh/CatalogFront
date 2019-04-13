/**
 * @Author: sarahnouh
 * @Date:   2019-04-04T03:19:23+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-13T19:47:49+02:00
 */
export interface item {
  /**
   *The id of the item
   *@type number
   */
  id: number;
  /**
   *The name of the item
   *@type string
   */
  name: string;
  /**
   *The url of the image associated with  the item
   *@type string
   */
  image: string;
  /**
   *The color associated with the item
   *@type string
   */
  color: string;
  /**
   *The price of the item
   *@type string
   */
  price: string;
  /**
   *The currency of the item
   *@type string
   */
  currency: string;
  /**
   *The release date of the item
   *@type Date
   */
  releaseDate: Date;
  /**
   *The id of category that contains this item
   *@type number
   */
  categoryId: number;
  /**
   *The rating of the item
   *@type number
   */
  rating: number;
}
