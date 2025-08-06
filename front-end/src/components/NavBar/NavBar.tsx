import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { NavBarProps } from '../../types/types';
import { sectionMap } from '../../types/types';
import '../../sass/NavBar/NavBar.scss';


const NavBar: React.FC<NavBarProps> = ({ navigationData }) => {
    const { language, toggleLanguage } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Convert string array to NavigationItem objects
    const navigationItems = navigationData.navigationItems.map((item) => ({
        name: item,
        href: sectionMap[item] || item.toLowerCase()
    }));

    useEffect(() => {
        const handleScroll = () => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
                const shouldShow = window.scrollY > homeBottom - 200;
                setIsVisible(shouldShow);

                // Close mobile menu when scrolling back to home section
                if (!shouldShow && isMobileMenuOpen) {
                    setIsMobileMenuOpen(false);
                }
            }

            // Update active section based on scroll position
            for (let i = navigationItems.length - 1; i >= 0; i--) {
                const item = navigationItems[i];
                const sectionId = sectionMap[item.name];
                const section = document.getElementById(sectionId);
                if (section && window.scrollY >= section.offsetTop - 200) {
                    setActiveSection(item.name);
                    break;
                }
            }
        };

        // Call once on mount
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigationItems, isMobileMenuOpen]);

    const handleNavClick = (item: string) => {
        const sectionId = sectionMap[item];
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMobileMenuOpen(false); // Close mobile menu after navigation
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const navbar = document.querySelector('.navbar-collapse');
            const toggler = document.querySelector('.navbar-toggler');

            if (isMobileMenuOpen &&
                navbar &&
                !navbar.contains(event.target as Node) &&
                toggler &&
                !toggler.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    return (
        <nav className={`navbar navbar-expand-custom navbar-light bg-light fixed-top custom-navbar ${isVisible ? 'navbar-visible' : ''}`}>
            <div className="container-fluid">
                <div className="navbar-brand">{navigationData.title}</div>

                {/* Mobile toggle button */}
                <button
                    className={`navbar-toggler custom-toggler ${isMobileMenuOpen ? 'active' : ''}`}
                    type="button"
                    onClick={toggleMobileMenu}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Navigation menu */}
                <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        {navigationItems.map((item) => (
                            <li key={item.name} className="nav-item">
                                <a
                                    className={`nav-link ${activeSection === item.name ? 'active' : ''}`}
                                    onClick={() => handleNavClick(item.name)}
                                    href={`#${item.href}`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Language toggle button */}
                    <div className="navbar-nav ms-auto">
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={toggleLanguage}
                            title={`Switch to ${language === 'en' ? 'Lithuanian' : 'English'}`}
                        >
                            <i className="bi bi-globe me-1"></i>
                            {language === 'en' ? 'EN' : 'LT'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;