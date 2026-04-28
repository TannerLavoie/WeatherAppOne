import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App'

describe('App', () => {
    it('Shows the search text', () => {
        const testMessage = 'Search For Your City:'
        render(<App/>)

        expect(screen.getByText(testMessage)).toBeInTheDocument()
    })
})
