import React, {  } from 'react';
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
