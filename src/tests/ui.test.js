import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import SingleMovie from '../components/SingleMovie';


test('renders a movie component correctly', () => {
    const { getByText } = render(<SingleMovie />)
    expect(getByText('back to movies')).toBeInTheDocument()
    
});