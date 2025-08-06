import "bootstrap-icons/font/bootstrap-icons.css";
import '../../sass/AboutMe/aboutMe.scss';
import "../../sass/AboutMe/aboutMe-responsive.scss";
import type { AboutMeData } from '../../types/types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const AboutMe = ({ aboutMeData }: { aboutMeData: AboutMeData }) => {
    const { elementRef, isVisible } = useIntersectionObserver();

    return (
        <div className="aboutme-container container-fluid px-3 px-md-4 px-lg-5">
            {/* Header */}
            <div className="row">
                <div className="col-12" ref={elementRef}>
                    <h1 className={`aboutme-title text-center text-md-start mb-4 ${isVisible ? 'animate-in' : ''}`}>{aboutMeData.name}</h1>
                </div>
            </div>

            {/* Photo + About + Hobbies */}
            <div className="aboutme-top row g-3 g-md-4 mb-4 mb-md-5">
                <div className="aboutme-photo col-12 col-md-4 d-flex justify-content-center justify-content-md-start">
                    <div className="aboutme-photo-wrapper">
                        <img
                            src={`/About/${aboutMeData.photo}`}
                            alt="about me"
                            className={` rounded shadow-sm`}
                        />
                    </div>
                </div>
                <div className="aboutme-desc-hobbies col-12 col-md-8">
                    <div className="aboutme-description mb-3 mb-md-4">
                        {aboutMeData.description.map((line, i) => (
                            <p key={i} className="mb-2 text-muted">{line}</p>
                        ))}
                    </div>
                    <div className="aboutme-hobbies">
                        <h6 className="fw-bold mb-3 text-primary">{aboutMeData.hobbiesTitle}</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {aboutMeData.hobbies.map((hobby, i) => (
                                <div key={i} className="aboutme-hobby badge bg-light text-dark border px-3 py-2">
                                    <span className="dot me-2" /> {hobby}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Education & Work */}
            <div className="aboutme-middle row g-4 mb-4 mb-md-5">
                <div className="aboutme-education col-12 col-lg-6">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 mb-4 text-primary">
                                <i className="bi bi-mortarboard me-2"></i>{aboutMeData.educationTitle}
                            </h3>
                            <div className="aboutme-edu-list">
                                {aboutMeData.education.map((edu, i) => (
                                    <div key={i} className="aboutme-edu-item mb-3 p-3 bg-light rounded">
                                        <h6 className="fw-bold mb-1">{edu.institution}</h6>
                                        <div className="text-muted mb-1">{edu.degree}</div>
                                        <small className="text-secondary">
                                            {edu.startDate} - {edu.endDate}
                                        </small>
                                        <p className="mt-2">{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aboutme-work col-12 col-lg-6">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title h5 mb-4 text-primary">
                                <i className="bi bi-briefcase me-2"></i>{aboutMeData.workExperiencetitle}
                            </h3>
                            <div className="aboutme-mainjobs mb-4">
                                {aboutMeData.workExperience.mainJobs.map((job, i) => (
                                    <div key={i} className="aboutme-job mb-3 p-3 bg-light rounded">
                                        <h6 className="fw-bold mb-1">{job.position}</h6>
                                        <small className="text-secondary mb-2 d-block">{job.time}</small>
                                        <ul className="small mb-0 ps-3">
                                            {job.description.map((desc, j) => (
                                                <li key={j} className="mb-1">
                                                    <strong>{desc.name}:</strong> {desc.descInfo}
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                ))}
                            </div>
                            <div className="aboutme-otherjobs">
                                <h6 className="fw-bold mb-2">{aboutMeData.workExperience.otherJobsTitle}</h6>
                                <ul className="small mb-0 ps-3">
                                    {aboutMeData.workExperience.otherJobs.map((oj, i) => (
                                        <li key={i} className="mb-1 text-muted">{oj}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Technologies */}
            <div className="aboutme-tech">
                <div className="row g-4">
                    <div className="col-12 mb-3">
                        <h3 className="h5 text-center text-primary mb-4">
                            <i className="bi bi-code-slash me-2"></i>{aboutMeData.technologiesTitle}
                        </h3>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title aboutme-tech-title mb-3">
                                    <i className="bi bi-palette me-2"></i>{aboutMeData.technologies.tech1Name}
                                </h5>
                                <div className="aboutme-tech-row d-flex flex-wrap justify-content-center gap-2">
                                    {aboutMeData.technologies.frontend.map((t, i) => (
                                        <div key={i} className="aboutme-tech-item badge text-white px-3 py-2">
                                            <i className={`bi ${t.icon} me-1`}></i>
                                            <span>{t.name}</span>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title aboutme-tech-title mb-3">
                                    <i className="bi bi-server me-2"></i>{aboutMeData.technologies.tech2Name}
                                </h5>
                                <div className="aboutme-tech-row d-flex flex-wrap justify-content-center gap-2">
                                    {aboutMeData.technologies.backend.map((t, i) => (
                                        <div key={i} className="aboutme-tech-item badge text-white px-3 py-2">
                                            <i className={`bi ${t.icon} me-1`}></i>
                                            <span>{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title aboutme-tech-title mb-3">
                                    <i className="bi bi-tools me-2"></i>{aboutMeData.technologies.toolsName}
                                </h5>
                                <div className="aboutme-tech-row d-flex flex-wrap justify-content-center gap-2">
                                    {aboutMeData.technologies.tools.map((t, i) => (
                                        <div key={i} className="aboutme-tech-item badge text-white px-3 py-2">
                                            <i className={`bi ${t.icon} me-1`}></i>
                                            <span>{t.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;