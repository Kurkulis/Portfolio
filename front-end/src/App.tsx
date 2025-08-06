// npm install sass react-bootstrap bootstrap @fortawesome/fontawesome-free bootstrap-icons
import { useEffect, useState } from 'react'
import Home from './pages/Home/home'
import Contact from './pages/Contact/contact'
import AboutMe from './pages/AboutMe/aboutMe'
import Projects from './pages/Projects/projects'
import NavBar from './components/NavBar/NavBar'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import type { AppData } from './types/types'
import LoadingSpinner from './components/LoadingSpinner'

const AppContent = () => {
  const { language } = useLanguage();
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/data_${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load data_${language}.json`);
        }
        const jsonData = await response.json();
        setData(jsonData as AppData);
      } catch (error) {
        console.error('Error loading language data:', error);
        // Fallback to English
        try {
          const fallbackResponse = await fetch(`${import.meta.env.BASE_URL}data/data_en.json`);
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setData(fallbackData as AppData);
          }
        } catch (fallbackError) {
          console.error('Error loading fallback data:', fallbackError);
        }
      }
    };

    loadData();
  }, [language]);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <NavBar navigationData={data.navigation} />
      <div id="home">
        <Home homeData={data.home} />
      </div>
      <div id="about">
        <AboutMe aboutMeData={data.aboutMe} />
      </div>
      <div id="projects">
        <Projects projectsData={data.projects} />
      </div>
      <div id="contact">
        <Contact contactData={data.contact} />
      </div>
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
