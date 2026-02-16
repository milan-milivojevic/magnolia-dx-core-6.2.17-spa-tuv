import React, { useEffect } from 'react';
import { EditableArea } from '@magnolia/react-editor';
import '../css.css';
import LeftHandNav from '../components/navigation/LeftHandNav';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { isPublicInstance } from '../helpers/AppHelpers';

const ForwardedLeftHandNav = React.forwardRef(LeftHandNav);

function HomePage (props) {
  const {title, bannerSection, mainSection, footerSection } = props;

  const leftNavRef = React.useRef(null);

  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";
  const isPublic = isPublicInstance();  
    
  // useEffect(() => {
  //   let intervalId;
  //   const duration = 5000;
  //   const intervalTime = 500;

  //   const generateHrefFromUrl = (url) => {
  //     if (!url.includes('Home')) return null;
    
  //     const [leftPart, rest] = url.split('Home');
  //     const rightPart = rest.split('/')[1];
    
  //     if (!leftPart || !rightPart) return null;
    
  //     const instance = isPublic ? "cmsPublic" : "cmsAuthor";
  //     const segments = leftPart.split('/').filter(Boolean);
  //     const closestSegment = segments[segments.length - 1] || "";
  //     const language = closestSegment !== instance && closestSegment.length === 2 ? "/"+closestSegment : "";

  //     return `/${instance}${language}/Home/${rightPart}`;
  //   };    

  //   const checkAndHighlightElement = () => {

  //     const allElements = document.querySelectorAll('li.level-0 > button > a');
  //     allElements.forEach((el) => {
  //       el.style.color = '#181818';
  //     });

  //     const currentUrl = window.location.pathname; 
  //     const generatedHref = generateHrefFromUrl(currentUrl);

  //     if (generatedHref) {

  //       const targetElement = document.querySelector(`li.level-0 > button > a[href="${generatedHref}"]`);

  //       if (targetElement) {
  //         targetElement.style.color ='#1B3380';
  //       }
  //     }
  //   };

  //   intervalId = setInterval(checkAndHighlightElement, intervalTime);

  //   const timeoutId = setTimeout(() => {
  //     clearInterval(intervalId);
  //   }, duration);

  //   return () => {
  //     clearInterval(intervalId);
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  setTimeout(() => {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }, 1000);  

  return (
    <HelmetProvider>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      { (editMode !== "editMode") &&
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
      <div className='homePageTuv'>
        <ForwardedLeftHandNav ref={leftNavRef}></ForwardedLeftHandNav>
        <div className='homePage'>
          <div className='bannerSection'>{bannerSection && <EditableArea content={bannerSection} />}</div>
          <div>{mainSection && <EditableArea content={mainSection} />}</div>
          <div>{footerSection && <EditableArea content={footerSection} />}</div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default HomePage;