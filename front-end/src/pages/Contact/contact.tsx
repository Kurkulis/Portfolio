import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import "../../sass/Contact/contact.scss";
import "../../sass/Contact/contact-responsive.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import type { ContactData } from '../../types/types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useState } from 'react';

const Contact = ({ contactData }: { contactData: ContactData }) => {
    const { elementRef, isVisible } = useIntersectionObserver();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState<'success' | 'danger'>('success');

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validacija
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
        setAlertMessage(contactData.right.alternativeErrors.fields);
        setAlertVariant('danger');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return;
    }
    
    setIsLoading(true);
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setAlertMessage(contactData.right.alertMessage);
            setAlertVariant('success');
            setShowAlert(true);
            setFormData({ fullName: '', email: '', subject: '', message: '' });
            setTimeout(() => setShowAlert(false), 5000);
        } else {
            const errorData = await response.json();
            setAlertMessage(errorData.message || contactData.right.errorMessage);
            setAlertVariant('danger');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        setAlertMessage('Network error. Please try again.');
        setAlertVariant('danger');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    } finally {
        setIsLoading(false);
    }
};

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="contact-page py-5">
            <Container fluid className="px-3 px-md-4 px-lg-5">
                {/* Header */}
                <Row className="mb-5">
                    <Col xs={12}>
                        <div className="text-center" ref={elementRef}>
                            <h1 className={`contact-heading display-3 fw-bold text-primary mb-3 ${isVisible ? 'animate-in' : ''}`}>
                                {contactData.heading}
                            </h1>
                            <p className={`contact-subheading lead mb-4 ${isVisible ? 'animate-in' : ''}`}>
                                {contactData.subheading}
                            </p>
                            <div className="title-decoration mx-auto mb-5"></div>
                        </div>
                    </Col>
                </Row>

                <Row className="g-4 g-lg-5">
                    {/* Left side - Contact Info */}
                    <Col xs={12} lg={5}>
                        <Card className="contact-info-card h-100 border-0 shadow-lg">
                            <Card.Body className="p-4 p-md-5">
                                <h2 className="h3 mb-4 text-primary fw-bold mb-5">
                                    <i className="bi bi-person-lines-fill me-3"></i>
                                    {contactData.left.title}
                                </h2>

                                {/* Email */}
                                <div className="contact-block mb-5">
                                    <div className="d-flex">
                                        <div className="contact-icon text-white rounded-circle me-3">
                                            <i className="bi bi-envelope-fill"></i>
                                        </div>
                                        <div className="contact-content flex-grow-1">
                                            <div className="contact-label fw-semibold mb-2">
                                                {contactData.left.email.label}
                                            </div>
                                            <div className="contact-value">
                                                <a href={`mailto:${contactData.left.email.value}`} className="text-decoration-none">
                                                    {contactData.left.email.value}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="contact-block mb-5">
                                    <div className="d-flex">
                                        <div className="contact-icon text-white rounded-circle me-3">
                                            <i className="bi bi-telephone-fill"></i>
                                        </div>
                                        <div className="contact-content flex-grow-1">
                                            <div className="contact-label fw-semibold mb-2">
                                                {contactData.left.phone.label}
                                            </div>
                                            <div className="contact-value">
                                                <a href={`tel:${contactData.left.phone.value}`} className="text-decoration-none">
                                                    {contactData.left.phone.value}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="contact-block mb-5">
                                    <div className="d-flex">
                                        <div className="contact-icon text-white rounded-circle me-3">
                                            <i className="bi bi-share-fill"></i>
                                        </div>
                                        <div className="contact-content flex-grow-1">
                                            <div className="contact-label fw-semibold mb-3">
                                                {contactData.left.social.label}
                                            </div>
                                            <div className="contact-socials">
                                                <div className="d-flex gap-2 flex-wrap social-icons-container">
                                                    {contactData.left.social.links.map((social, id) => (
                                                        <a
                                                            key={id}
                                                            href={social.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="contact-social-link btn btn-outline-primary btn-floating rounded-circle"
                                                            title={social.url.includes('linkedin') ? 'LinkedIn' :
                                                                social.url.includes('github') ? 'GitHub' : 'Social'}
                                                        >
                                                            <i className={`fab ${social.icon}`}></i>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Right side - Contact Form */}
                    <Col xs={12} lg={7}>
                        <Card className="contact-form-card h-100 border-0 shadow-lg">
                            <Card.Body className="p-4 p-md-5">
                                <h3 className="h4 mb-5 text-primary fw-bold">
                                    <i className="bi bi-chat-dots-fill me-3"></i>
                                    {contactData.right.title}
                                </h3>

                                {showAlert && (
                                    <Alert variant={alertVariant} className="mb-5">
                                        <i className={`bi ${alertVariant === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                                        {alertMessage}
                                    </Alert>
                                )}

                                <Form className="contact-form" onSubmit={handleSubmit}>
                                    <Row className="g-4">
                                        {contactData.right.fields.map((field, id) => (
                                            <Col
                                                key={id}
                                                xs={12}
                                                md={field.type === 'textarea' || field.name === 'subject' ? 12 : 6}
                                            >
                                                <Form.Group className="form-group">
                                                    <Form.Label className="fw-semibold">
                                                        {field.label}
                                                    </Form.Label>
                                                    {field.type === "textarea" ? (
                                                        <Form.Control
                                                            as="textarea"
                                                            rows={5}
                                                            name={field.name}
                                                            placeholder={field.placeholder}
                                                            className="form-control-lg"
                                                            value={formData[field.name as keyof typeof formData]}
                                                            onChange={handleInputChange}
                                                            style={{ resize: 'vertical' }}
                                                        />
                                                    ) : (
                                                        <Form.Control
                                                            type={field.type}
                                                            name={field.name}
                                                            placeholder={field.placeholder}
                                                            className="form-control-lg"
                                                            value={formData[field.name as keyof typeof formData]}
                                                            onChange={handleInputChange}
                                                        />
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        ))}
                                    </Row>

                                    <div className="text-center mt-5">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="contact-send-btn px-5 py-3 rounded-pill fw-bold position-relative"
                                            disabled={isLoading}
                                        >
                                            <i className="bi bi-send-fill me-2"></i>
                                            <span>{isLoading ? contactData.right.button.working : contactData.right.button.text}</span>
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Contact;