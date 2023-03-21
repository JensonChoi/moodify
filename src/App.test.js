import { render, screen } from '@testing-library/react'
import App from './App'
import Home from './pages/Home'

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders login button', () => {
  render(<Home />)
  const linkElement = screen.getByText(/login/i)
  expect(linkElement).toBeInTheDocument()
})
