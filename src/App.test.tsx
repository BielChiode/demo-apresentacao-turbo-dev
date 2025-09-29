import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renderiza o título e incrementa o contador', async () => {
    render(<App />)
    expect(screen.getByText('Hello world!')).toBeInTheDocument()
  })
})


