import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App/>', () => {
  it('Render Page Title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to Your File Server!')).toBeInTheDocument();
  });
});

