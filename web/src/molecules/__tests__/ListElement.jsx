import React from 'react';
import { render } from '@testing-library/react';
import user from '@testing-library/user-event';
import ListElement from '../ListElement';
import { displayPrice } from '../../utils/money';

describe('ListElement', () => {
  let product;
  beforeEach(() => {
    product = {
      id: '0',
      name: 'Shoes',
      price: 25000,
      quantity: 2,
    };
  });

  it('should display the list element properly', () => {
    const { getByText } = render(
      <ListElement product={product} onAdd={jest.fn()} onRemove={jest.fn()} />
    );

    getByText(product.name);
    getByText(displayPrice(product.price));
    getByText('-1');
    getByText(product.quantity);
    getByText('+1');
    getByText(displayPrice(product.price * product.quantity));
  });

  it('should remove one item properly by the onRemove handler', () => {
    const onRemove = () => {
      product.quantity -= 1;
    };

    const { getByText } = render(
      <ListElement product={product} onAdd={jest.fn()} onRemove={onRemove} />
    );

    const addButton = getByText('-1');

    user.click(addButton);

    expect(product.quantity).toBe(1);
  });

  it('should add one item properly by the onAdd handler', () => {
    const onAdd = () => {
      product.quantity += 1;
    };

    const { getByText } = render(
      <ListElement product={product} onAdd={onAdd} onRemove={jest.fn()} />
    );

    const addButton = getByText('+1');

    user.click(addButton);

    expect(product.quantity).toBe(3);
  });
});
