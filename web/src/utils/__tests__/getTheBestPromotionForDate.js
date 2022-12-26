import { getTheBestPromotionForDate } from '../getTheBestPromotionForDate';

describe('getTheBestPromotionForDate', () => {
  const currentDate = new Date();

  const promotions = [
    {
      id: '0',
      name: 'Promotion0',
      description: 'Promotion0_description',
      dateStart: new Date(
        currentDate.getTime(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000)
      ),
      dateEnd: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000),
      discount: {
        code: 'promo_code0',
        percentage: 5,
      },
    },
    {
      id: '1',
      name: 'Promotion1',
      description: 'Promotion1_description',
      dateStart: new Date(
        currentDate.getTime(currentDate.getTime() + 24 * 60 * 60 * 1000)
      ),
      dateEnd: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000),
      discount: {
        code: 'promo_code1',
        percentage: 7.5,
      },
    },
    {
      id: '2',
      name: 'Promotion2',
      description: 'Promotion2_description',
      dateStart: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000),
      dateEnd: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
      discount: {
        code: 'promo_code2',
        percentage: 10,
      },
    },
    {
      id: '3',
      name: 'Promotion3',
      description: 'Promotion3_description',
      dateStart: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
      discount: {
        code: 'promo_code3',
        percentage: 20,
      },
    },
    {
      id: '4',
      name: 'Promotion4',
      description: 'Promotion4_description',
      dateStart: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000),
      discount: {
        code: 'promo_code4',
        percentage: 40,
      },
    },
    {
      id: '5',
      name: 'Promotion5',
      description: 'Promotion5_description',
      dateStart: new Date(currentDate.getTime() - 3 * 24 * 60 * 60 * 1000),
      dateEnd: new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000),
      discount: {
        code: 'promo_code5',
        percentage: 30,
      },
    },
  ];

  it('should return null when there are no current promotions', () => {
    const bestPromotion = getTheBestPromotionForDate(
      currentDate,
      promotions.slice(0, 1)
    );

    expect(bestPromotion).toBeNull();
  });

  it('should return null when promotions of invalid dates are provided', () => {
    const bestPromotion = getTheBestPromotionForDate(
      currentDate,
      promotions.slice(1, 2)
    );

    expect(bestPromotion).toBeNull();
  });

  it('should return null when passed date for samples is provided', () => {
    const passedDate = new Date(currentDate - 7 * 24 * 60 * 60 * 1000);

    const bestPromotion = getTheBestPromotionForDate(passedDate, promotions);

    expect(bestPromotion).toBeNull();
  });

  it('should return the best promotion for given date', () => {
    const bestPromotion = getTheBestPromotionForDate(currentDate, promotions);

    expect(bestPromotion).toEqual(promotions[4]);
  });
});
