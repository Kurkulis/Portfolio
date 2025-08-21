export type ThemeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type Size = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary';

export const sectionMap: Record<string, string> = {
    'Home': 'home', 'About': 'about', 'Projects': 'projects', 'Contact': 'contact',
    'Pradžia': 'home', 'Apie': 'about', 'Projektai': 'projects', 'Kontaktai': 'contact'
};

export interface NavigationItem {
    name: string;
    href: string;
}

export interface NavigationData {
    title: string;
    navigationItems: string[];
}

export interface NavItem {
    label: string;
    active?: boolean;
}

export interface SocialIcon {
    name: string;
    url: string;
    icon: string;
}

export interface HomeData {
    greeting: string;
    name: string;
    title: string;
    navItems: NavItem[];
    socialIcons: SocialIcon[];
    photo: string;
    lastName: string;
}

export interface Education {
    institution: string;
    degree: string;
    startDate: number | string;
    endDate: number | string;
    description?: string; 
}

export interface JobDescription {
    name: string;
    descInfo: string;
}

export interface MainJob {
    position: string;
    time: string;
    description: JobDescription[];
}

export interface WorkExperience {
    mainJobs: MainJob[];
    otherJobsTitle: string;
    otherJobs: string[];
}

export interface Technology {
    name: string;
    icon: string;
}

export interface Technologies {
    tech1Name: string;
    frontend: Technology[];
    tech2Name: string;
    backend: Technology[];
    toolsName: string;
    tools: Technology[];
}

export interface AboutMeData {
    photo: string;
    name: string;
    description: string[];
    hobbiesTitle: string;
    hobbies: string[];
    educationTitle: string;
    education: Education[];
    workExperiencetitle: string;
    workExperience: WorkExperience;
    technologiesTitle: string;
    technologies: Technologies;
}

export interface ProjectItem {
    title: string;
    description: string;
    technologies: string[];
    image: string;
    link: string;
}

export interface ProjectsData {
    title: string;
    subtitle: string;
    look: string;
    projectItems: ProjectItem[];
}

export interface ContactInfo {
    label: string;
    value: string;
}

export interface ContactField {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
}

export interface ContactButton {
    text: string;
    working: string;
}

export interface ContactData {
    heading: string;
    subheading: string;
    left: {
        title: string;
        email: ContactInfo;
        phone: ContactInfo;
        social: {
            label: string;
            links: SocialIcon[];
        };
    };
    right: {
        title: string;
        fields: ContactField[];
        button: ContactButton;
        alertMessage: string;
        errorMessage: string;
        alternativeErrors: {
            fields: string;
        };
    };
}

export interface FormData {
    fullName: string;
    email: string;
    subject: string;
    message: string;
}

export interface FormErrors {
    fullName?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export interface AppData {
    navigation: NavigationData;
    home: HomeData;
    aboutMe: AboutMeData;
    projects: ProjectsData;
    contact: ContactData;
}

export interface NavBarProps {
    navigationData: NavigationData;
}

export interface HomeProps {
    homeData: HomeData;
}

export interface AboutMeProps {
    aboutMeData: AboutMeData;
}

export interface ProjectsProps {
    projectsData: ProjectsData;
}

export interface ContactProps {
    contactData: ContactData;
}

export interface LoadingSpinnerProps {
    size?: 'sm' | 'lg';
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    text?: string;
    fullScreen?: boolean;
}

export interface ResponsiveNavProps {
    sections: string[];
    activeSection: string;
    onSectionClick: (section: string) => void;
}

export interface ResponsiveImageOptions {
    imageSrc: string;
    breakpoint?: number;
}

export interface IntersectionOptions {
    threshold?: number;
    rootMargin?: string;
}