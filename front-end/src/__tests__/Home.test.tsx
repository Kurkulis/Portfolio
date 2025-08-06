import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Tipai duomenų struktūrai
interface HomeData {
    welcome: string
    subtitle: string
    description: string
    navItems: Array<{
        id: string
        text: string
        href: string
    }>
}

// Paprastas mock komponentas testavimui
const SimpleHome = ({ data }: { data: HomeData }) => (
    <section data-testid="home">
        <div data-testid="home-content">
            <h1 data-testid="home-welcome">{data.welcome}</h1>
            <h2 data-testid="home-subtitle">{data.subtitle}</h2>
            <p data-testid="home-description">{data.description}</p>
        </div>
        <div data-testid="nav-buttons">
            {data.navItems.map(item => (
                <button key={item.id} data-testid={`nav-button-${item.id}`}>
                    {item.text}
                </button>
            ))}
        </div>
        <button data-testid="home-language-toggle">LT</button>
    </section>
)

describe('Home komponentas testai', () => {
    const mockHomeData: HomeData = {
        welcome: 'Sveiki atvykę',
        subtitle: 'Programuotojas',
        description: 'Kuriu modernias web aplikacijas',
        navItems: [
            { id: 'about', text: 'Apie mane', href: '#about' },
            { id: 'projects', text: 'Projektai', href: '#projects' },
            { id: 'contact', text: 'Kontaktai', href: '#contact' }
        ]
    }

    // Patikriname ar pagrindinis turinys yra atvaizduotas
    it('atvaizduoja pagrindinį turinį', () => {
        render(<SimpleHome data={mockHomeData} />)

        expect(screen.getByTestId('home-welcome')).toHaveTextContent(mockHomeData.welcome)
        expect(screen.getByTestId('home-subtitle')).toHaveTextContent(mockHomeData.subtitle)
        expect(screen.getByTestId('home-description')).toHaveTextContent(mockHomeData.description)
    })

    // Patikriname ar navigacijos mygtukai yra atvaizduoti
    it('atvaizduoja navigacijos mygtukus', () => {
        render(<SimpleHome data={mockHomeData} />)

        mockHomeData.navItems.forEach(item => {
            expect(screen.getByTestId(`nav-button-${item.id}`)).toBeInTheDocument()
            expect(screen.getByText(item.text)).toBeInTheDocument()
        })
    })

    // Patikriname ar kalbos mygtukas yra atvaizduotas
    it('atvaizduoja kalbos perjungimo mygtuką', () => {
        render(<SimpleHome data={mockHomeData} />)
        
        expect(screen.getByTestId('home-language-toggle')).toBeInTheDocument()
    })
})


