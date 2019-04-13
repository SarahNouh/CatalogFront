/**
 * @Author: sarahnouh
 * @Date:   2019-04-04T03:19:23+02:00
 * @Last modified by:   sarahnouh
 * @Last modified time: 2019-04-09T02:38:51+02:00
 */
export interface item {
  id: number;
  name: string;
  image: string;
  color: string;
  price: string;
  currency: string;
  releaseData: Date;
  categoryId: number;
  rating: number;
}
