import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renderiza o título e incrementa o contador', async () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /count is 0/i })
    await userEvent.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })
})


