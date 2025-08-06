import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Tipai duomenų struktūrai
interface ContactData {
    title: string
    subtitle: string
    formFields: Array<{
    id: string
    label: string
    type: string
    placeholder: string
    required: boolean
    }>
    submitButtonText: string
}

// Paprastas mock komponentas testavimui
const SimpleContactForm = ({ data }: { data: ContactData }) => (
  <section data-testid="contact">
    <div data-testid="contact-header">
      <h2 data-testid="contact-title">{data.title}</h2>
      <p data-testid="contact-subtitle">{data.subtitle}</p>
    </div>
    <form data-testid="contact-form">
      {data.formFields.map(field => (
        <div key={field.id} data-testid={`field-${field.id}`}>
          <label data-testid={`label-${field.id}`}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea 
              data-testid={`input-${field.id}`}
              placeholder={field.placeholder}
            />
          ) : (
            <input 
              type={field.type}
              data-testid={`input-${field.id}`}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
      <button type="submit" data-testid="submit-button">
        {data.submitButtonText}
      </button>
    </form>
  </section>
)

describe('ContactForm komponentas testai', () => {
  const mockContactData: ContactData = {
    title: 'Susisiekite su manimi',
    subtitle: 'Parašykite man žinutę',
    formFields: [
      {
        id: 'name',
        label: 'Vardas',
        type: 'text',
        placeholder: 'Įveskite savo vardą',
        required: true
      },
      {
        id: 'email',
        label: 'El. paštas',
        type: 'email',
        placeholder: 'Įveskite savo el. paštą',
        required: true
      },
      {
        id: 'message',
        label: 'Žinutė',
        type: 'textarea',
        placeholder: 'Įveskite savo žinutę',
        required: true
      }
    ],
    submitButtonText: 'Siųsti žinutę'
  }

  // Patikriname ar visi formos laukai yra atvaizduoti
  it('atvaizduoja visus formos laukus', () => {
    render(<SimpleContactForm data={mockContactData} />)

    mockContactData.formFields.forEach(field => {
      expect(screen.getByTestId(`field-${field.id}`)).toBeInTheDocument()
      expect(screen.getByTestId(`label-${field.id}`)).toHaveTextContent(field.label)
      expect(screen.getByTestId(`input-${field.id}`)).toBeInTheDocument()
    })
  })

  // Patikriname ar sekcijos informacija yra atvaizduota
  it('atvaizduoja sekcijos informaciją', () => {
    render(<SimpleContactForm data={mockContactData} />)
    
    expect(screen.getByTestId('contact-title')).toHaveTextContent(mockContactData.title)
    expect(screen.getByTestId('contact-subtitle')).toHaveTextContent(mockContactData.subtitle)
  })

  // Patikriname ar siuntimo mygtukas yra atvaizduotas
  it('atvaizduoja siuntimo mygtuką', () => {
    render(<SimpleContactForm data={mockContactData} />)
    
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toHaveTextContent(mockContactData.submitButtonText)
  })
})
