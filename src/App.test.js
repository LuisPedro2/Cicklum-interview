import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {App} from './App';


beforeEach(()=>{
  render(<App/>)
});


it('renders form properly', () => {
  expect(screen.getByPlaceholderText ('Home Team')).toBeInTheDocument();
  expect(screen.getByPlaceholderText ('Away Team')).toBeInTheDocument();
  expect(screen.queryAllByPlaceholderText ('-')).toBeDefined();
  expect(screen.getByRole('button')).toBeInTheDocument()
});



