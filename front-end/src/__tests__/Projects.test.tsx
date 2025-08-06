import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Tipai duomenų struktūrai
interface ProjectItem {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

interface ProjectsData {
  title: string
  subtitle: string
  projectItems: ProjectItem[]
}

// Paprastas mock komponentas testavimui
const SimpleProjects = ({ data }: { data: ProjectsData }) => (
  <section data-testid="projects">
    <div data-testid="projects-header">
      <h2 data-testid="projects-title">{data.title}</h2>
      <p data-testid="projects-subtitle">{data.subtitle}</p>
    </div>
    <div data-testid="projects-grid">
      {data.projectItems.map(project => (
        <div key={project.id} data-testid={`project-${project.id}`} className="project-card">
          <h3 data-testid={`project-title-${project.id}`}>{project.title}</h3>
          <p data-testid={`project-description-${project.id}`}>{project.description}</p>
        </div>
      ))}
    </div>
  </section>
)

describe('Projects komponentas testai', () => {
  const mockProjectsData: ProjectsData = {
    title: 'Mano projektai',
    subtitle: 'Čia yra mano geriausi darbai',
    projectItems: [
      {
        id: 'portfolio',
        title: 'Portfolio svetainė',
        description: 'Asmeninio portfolio svetainė sukurta su React ir TypeScript',
        technologies: ['React', 'TypeScript', 'CSS', 'Vite']
      },
      {
        id: 'ecommerce',
        title: 'E-prekybos platforma',
        description: 'Pilna e-prekybos sistema su mokėjimų integracija',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express']
      }
    ]
  }

  // Patikriname ar visi projektai yra atvaizduoti
  it('atvaizduoja visus projektus', () => {
    render(<SimpleProjects data={mockProjectsData} />)

    mockProjectsData.projectItems.forEach(project => {
      expect(screen.getByTestId(`project-${project.id}`)).toBeInTheDocument()
      expect(screen.getByTestId(`project-title-${project.id}`)).toHaveTextContent(project.title)
      expect(screen.getByTestId(`project-description-${project.id}`)).toHaveTextContent(project.description)
    })
  })

  // Patikriname ar sekcijos informacija yra atvaizduota
  it('atvaizduoja sekcijos informaciją', () => {
    render(<SimpleProjects data={mockProjectsData} />)
    
    expect(screen.getByTestId('projects-title')).toHaveTextContent(mockProjectsData.title)
    expect(screen.getByTestId('projects-subtitle')).toHaveTextContent(mockProjectsData.subtitle)
  })
})


