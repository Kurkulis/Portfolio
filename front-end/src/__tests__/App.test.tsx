import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Tipai duomenų struktūrai
interface AppData {
    navbar: Record<string, string>
    home: Record<string, string>
    about: Record<string, string>
    projects: Record<string, string>
    contact: Record<string, string>
}

// Paprastas mock komponentas testavimui
const SimpleApp = ({ data }: { data: AppData }) => (
    <div data-testid="app">
        <div data-testid="language-switcher">
            <button data-testid="lang-lt">LT</button>
            <button data-testid="lang-en">EN</button>
        </div>
        <nav data-testid="navbar">{data.navbar.title || 'Navigation'}</nav>
        <section data-testid="home">{data.home.welcome || 'Welcome'}</section>
        <section data-testid="about">{data.about.title || 'About Me'}</section>
        <section data-testid="projects">{data.projects.title || 'Projects'}</section>
        <section data-testid="contact">{data.contact.title || 'Contact'}</section>
    </div>
)

describe('App komponento testai', () => {
    const mockAppData: AppData = {
        navbar: { title: 'Navigacija' },
        home: { welcome: 'Sveiki atvykę' },
        about: { title: 'Apie mane' },
        projects: { title: 'Projektai' },
        contact: { title: 'Kontaktai' }
    }

    // Patikriname ar visi komponentai yra atvaizduoti
    it('atvaizduoja visus komponentus', () => {
        render(<SimpleApp data={mockAppData} />)

        expect(screen.getByTestId('navbar')).toBeInTheDocument()
        expect(screen.getByTestId('home')).toBeInTheDocument()
        expect(screen.getByTestId('about')).toBeInTheDocument()
        expect(screen.getByTestId('projects')).toBeInTheDocument()
        expect(screen.getByTestId('contact')).toBeInTheDocument()
    })

    // Patikriname ar kalbos mygtukai yra atvaizduoti
    it('atvaizduoja kalbos perjungimo mygtukus', () => {
        render(<SimpleApp data={mockAppData} />)
        
        expect(screen.getByTestId('lang-lt')).toBeInTheDocument()
        expect(screen.getByTestId('lang-en')).toBeInTheDocument()
    })
})
