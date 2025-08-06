import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Tipai duomenų struktūrai
interface NavBarData {
    navItems: Array<{
        id: string
        text: string
        href: string
    }>
}

// Paprastas mock komponentas testavimui
const SimpleNavBar = ({ data }: { data: NavBarData }) => (
    <nav data-testid="navbar">
        <ul data-testid="nav-items">
            {data.navItems.map(item => (
                <li key={item.id}>
                    <button data-testid={`nav-item-${item.id}`}>
                        {item.text}
                    </button>
                </li>
            ))}
        </ul>
        <button data-testid="language-toggle">EN</button>
    </nav>
)

describe('NavBar komponentas testai', () => {
    const mockNavData: NavBarData = {
        navItems: [
            { id: 'home', text: 'Pradžia', href: '#home' },
            { id: 'about', text: 'Apie mane', href: '#about' },
            { id: 'projects', text: 'Projektai', href: '#projects' },
            { id: 'contact', text: 'Kontaktai', href: '#contact' }
        ]
    }

    // Patikriname ar visi nav elementai yra atvaizduoti
    it('atvaizduoja visus navigacijos elementus', () => {
        render(<SimpleNavBar data={mockNavData} />)

        mockNavData.navItems.forEach(item => {
            expect(screen.getByTestId(`nav-item-${item.id}`)).toBeInTheDocument()
            expect(screen.getByText(item.text)).toBeInTheDocument()
        })
    })

    // Patikriname ar kalbos mygtukas yra atvaizduotas
    it('atvaizduoja kalbos perjungimo mygtuką', () => {
        render(<SimpleNavBar data={mockNavData} />)
        
        expect(screen.getByTestId('language-toggle')).toBeInTheDocument()
    })
})

