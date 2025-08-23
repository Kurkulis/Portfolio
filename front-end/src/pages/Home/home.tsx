import { Container, Row, Col } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../sass/Home/home.scss";
import "../../sass/Home/home-responsive.scss";
import type { HomeData } from "../../types/types";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import { sectionMap } from "../../types/types";

const Home = ({ homeData }: { homeData: HomeData }) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const { language, toggleLanguage } = useLanguage();
  const { changeTheme } = useTheme();

  const handleNavClick = (label: string) => {
    const sectionId = sectionMap[label];
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="home-hero min-vh-100 d-flex align-items-center">
      <Container fluid className="px-3 px-md-4 px-lg-5">
        <Row
          className="align-items-center justify-content-center g-4 g-lg-5"
          ref={elementRef}
        >
          <Col
            xs={12}
            md={6}
            lg={5}
            xl={6}
            className="order-2 order-md-2 order-xl-1 offset-xl-1"
          >
            <div className={`home-text ${isVisible ? "animate-in" : ""}`}>
              <div
                className="home-greeting badge px-3 py-2 mb-3 rounded-pill"
                onClick={changeTheme}
                style={{ cursor: "pointer", transition: "all 0.3s ease" }}
              >
                {homeData.greeting}
              </div>
              <h1 className="home-title display-3 fw-bold mb-3 text-primary">
                {homeData.name}
                <span className="last-name">{" " + homeData.lastName}</span>
              </h1>
              <div className="home-subtitle h4 mb-4 fw-light">
                {homeData.title}
              </div>

              {/* Navigation Pills */}
              <nav className="home-nav mb-4">
                <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-center justify-content-xl-start">
                  {homeData.navItems.map((item) => (
                    <button
                      className={`btn btn-sm ${
                        item.active ? "btn-primary" : "btn-outline-primary"
                      } rounded-pill`}
                      key={item.label}
                      onClick={() => handleNavClick(item.label)}
                    >
                      {item.label}
                    </button>
                  ))}

                  {/* Language Toggle Button */}
                  <button
                    className="btn btn-sm btn-outline-light rounded-pill"
                    onClick={toggleLanguage}
                    title={
                      language === "en"
                        ? "Switch to Lithuanian"
                        : "Perjungti į anglų kalbą"
                    }
                  >
                    <i className="fas fa-globe me-1"></i>
                    {language === "en" ? "EN" : "LT"}
                  </button>
                </div>
              </nav>

              {/* Social Media Links */}
              <div className="home-socials d-flex justify-content-center justify-content-md-center justify-content-xl-start gap-3 mb-4">
                {homeData.socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-social-link btn btn-outline-primary btn-floating rounded-circle p-3"
                    title={social.name}
                  >
                    <i className={`fab ${social.icon} fs-5`}></i>
                  </a>
                ))}
              </div>
            </div>
          </Col>

          <Col
            xs={12}
            md={6}
            lg={7}
            xl={5}
            className="order-1 order-md-1 order-xl-2 d-flex justify-content-center"
          >
            <div className="home-image text-center">
              <div className="profile-photo-container position-relative">
                <img
                  src={`/Home/${homeData.photo}`}
                  alt="profile"
                  className={`profile-photo img-fluid shadow-lg`}
                />
                <div className="profile-photo-bg"></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
