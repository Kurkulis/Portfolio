import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Tipai duomenų struktūrai
interface AboutMeData {
  title: string
  description: string
  hobbies: Array<{
    id: string
    name: string
    icon?: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    year: string
    description?: string
  }>
}

// Paprastas mock komponentas testavimui
const SimpleAboutMe = ({ data }: { data: AboutMeData }) => (
  <section data-testid="about-me">
    <h2 data-testid="about-title">{data.title}</h2>
    <p data-testid="about-description">{data.description}</p>
    
    <div data-testid="hobbies-section">
      <h3>Pomėgiai</h3>
      <ul data-testid="hobbies-list">
        {data.hobbies.map(hobby => (
          <li key={hobby.id} data-testid={`hobby-${hobby.id}`}>
            <span data-testid={`hobby-name-${hobby.id}`}>{hobby.name}</span>
          </li>
        ))}
      </ul>
    </div>

    <div data-testid="education-section">
      <h3>Išsilavinimas</h3>
      <div data-testid="education-list">
        {data.education.map(edu => (
          <div key={edu.id} data-testid={`education-${edu.id}`} className="education-item">
            <h4 data-testid={`education-institution-${edu.id}`}>{edu.institution}</h4>
            <p data-testid={`education-degree-${edu.id}`}>{edu.degree}</p>
            <span data-testid={`education-year-${edu.id}`}>{edu.year}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

describe('AboutMe komponentas testai', () => {
  const mockAboutMeData: AboutMeData = {
    title: 'Apie mane',
    description: 'Esu programuotojas su aistra technologijoms',
    hobbies: [
      { id: 'coding', name: 'Programavimas', icon: '💻' },
      { id: 'reading', name: 'Skaitymas', icon: '📚' }
    ],
    education: [
      {
        id: 'university',
        institution: 'Vilniaus Universitetas',
        degree: 'Informatikos bakalauras',
        year: '2020-2024'
      }
    ]
  }

  // Patikriname ar visi pomėgiai yra atvaizduoti
  it('atvaizduoja visus pomėgius', () => {
    render(<SimpleAboutMe data={mockAboutMeData} />)

    mockAboutMeData.hobbies.forEach(hobby => {
      expect(screen.getByTestId(`hobby-${hobby.id}`)).toBeInTheDocument()
      expect(screen.getByTestId(`hobby-name-${hobby.id}`)).toHaveTextContent(hobby.name)
    })
  })

  // Patikriname ar išsilavinimo informacija yra atvaizduota
  it('atvaizduoja išsilavinimo informaciją', () => {
    render(<SimpleAboutMe data={mockAboutMeData} />)

    mockAboutMeData.education.forEach(edu => {
      expect(screen.getByTestId(`education-${edu.id}`)).toBeInTheDocument()
      expect(screen.getByTestId(`education-institution-${edu.id}`)).toHaveTextContent(edu.institution)
      expect(screen.getByTestId(`education-degree-${edu.id}`)).toHaveTextContent(edu.degree)
      expect(screen.getByTestId(`education-year-${edu.id}`)).toHaveTextContent(edu.year)
    })
  })

  // Patikriname ar pagrindinė informacija yra atvaizduota
  it('atvaizduoja pagrindinę informaciją', () => {
    render(<SimpleAboutMe data={mockAboutMeData} />)
    
    expect(screen.getByTestId('about-title')).toHaveTextContent(mockAboutMeData.title)
    expect(screen.getByTestId('about-description')).toHaveTextContent(mockAboutMeData.description)
  })
})
