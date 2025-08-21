import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import '../../sass/Projects/projects.scss';
import '../../sass/Projects/projects-responsive.scss';
import type { ProjectsData } from '../../types/types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Projects = ({ projectsData }: { projectsData: ProjectsData }) => {
    const { elementRef, isVisible } = useIntersectionObserver();

    return (
        <div className="projects-container py-5">
            <Container fluid className="px-3 px-md-4 px-lg-5">
                {/* Header */}
                <Row className="mb-5">
                    <Col xs={12}>
                        <div className="text-center" ref={elementRef}>
                            <h1 className={`projects-title display-3 fw-bold text-primary mb-3 ${isVisible ? 'animate-in' : ''}`}>
                                {projectsData.title}
                            </h1>
                            <p className={`projects-subtitle h5 mb-4 ${isVisible ? 'animate-in animate-delay-1' : ''}`}>
                                {projectsData.subtitle}</p>
                            <div className="title-decoration mx-auto"></div>
                        </div>
                    </Col>
                </Row>

                {/* Projects Grid */}
                <Row className="g-4 mb-5">
                    {projectsData.projectItems.map((project, index) => (
                        <Col key={index} xs={12} md={6} lg={6}>
                            <Card className="project-card h-100 border-0 shadow-sm overflow-hidden">
                                <div className="project-image-container position-relative">
                                    <Card.Img 
                                        variant="top" 
                                        src={`/Project/${project.image}`} 
                                        alt={project.title}
                                        className="project-image"
                                    />
                                    <div className="project-overlay d-flex align-items-center justify-content-center">
                                        <Button 
                                            variant="light" 
                                            className="view-project-btn rounded-pill px-4"
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <i className="bi bi-eye me-2"></i>{projectsData.look}
                                        </Button>
                                    </div>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="h5 mb-3 text-primary">
                                        {project.title}
                                    </Card.Title>
                                    <Card.Text className="mb-3 flex-grow-1">
                                        {project.description}
                                    </Card.Text>
                                    <div className="project-technologies mb-3">
                                        <div className="d-flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <Badge 
                                                    key={techIndex} 
                                                    bg="primary-subtle" 
                                                    text="primary"
                                                    className="tech-tag px-2 py-1"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="project-actions d-flex gap-2">
                                        {/* <Button 
                                            variant="primary" 
                                            size="sm"
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-grow-1"
                                        >
                                            <i className="bi bi-box-arrow-up-right me-1"></i>
                                            Live Demo
                                        </Button> */}
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            className="flex-grow-1"
                                            href={project.link}
                                        >
                                            <i className="bi bi-github me-1"></i>
                                            Code
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Projects;