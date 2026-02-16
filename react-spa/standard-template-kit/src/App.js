import React, { useState, useEffect } from 'react';
import PageLoader from './helpers/PageLoader';
import Navigation from './components/navigation/Navigation';
import HeadlinesStyles from './styles/headlines';
import ParagraphsStyles from './styles/paragraphs';
import PagesStyles from './styles/pages';
import HeaderStyles from './styles/header';
import NavLevelsStyles from './styles/navLevels';
import TopNavStyles from './styles/topNavigation';
import LeftNavStyles from './styles/leftNavigation';
import './App.css';
import { GrUserAdmin, GrUserSettings, GrSearch, GrLogout, GrLanguage, GrFormDown, GrFormUp } from "react-icons/gr";
import {
    getAPIBase,
  getLanguages,
  getCurrentLanguage,
  changeLanguage,
  getRouterBasename,
  events
} from "./helpers/AppHelpers";

const ForwardedTopNav = React.forwardRef(Navigation);

function App() {

  useEffect(() => {
    const handleLinkClick = (event) => {
      let target = event.target;
      while (target && target !== document) {
        if (target.tagName === 'A') break;
        target = target.parentNode;
      }

      if (target && target.tagName === 'A') {
        const href = target.getAttribute('href');

        if (href) {
          const url = new URL(href, window.location.origin);
          const supportedLanguages = ['en', 'de'];
          const removeLanguagePrefix = (pathname) => {
            const parts = pathname.split('/');
            if (parts.length > 1 && supportedLanguages.includes(parts[2])) {
              parts.splice(2, 1);
              return parts.join('/') || '/';
            }
            return pathname;
          };

          const currentPath = removeLanguagePrefix(window.location.pathname);
          const targetPath = removeLanguagePrefix(url.pathname);

          const isSamePage = url.origin === window.location.origin &&
                         currentPath === targetPath;

          if (href.startsWith('#') || (isSamePage && url.hash)) {

            event.preventDefault();

            const elementId = href.startsWith('#') ? href.substring(1) : url.hash.substring(1);
            const element = document.getElementById(elementId);
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offset = 190;
            const scrollToPosition = elementPosition - offset;

            window.scrollTo({
              top: scrollToPosition,
              behavior: 'smooth',
            });
          }
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const isPagesApp = window.location.search.includes("mgnlPreview");
  const editMode = isPagesApp ? "editMode" : "";

  function renderLanguages() {
    const currentLanguage = getCurrentLanguage();
    const languages = getLanguages();
    return (
      <div className="languagesContainer">
        <GrLanguage/>
        <div
          className="currentLanguage"
          onClick={() => setLangDropdownOpen(prev => !prev)}
        >
          <span>{currentLanguage}</span>
          {langDropdownOpen ? <GrFormUp/> : <GrFormDown/>}
        </div>
        {langDropdownOpen && (
          <div className="languagesDropdown">
            {languages.map((lang) => (
              <span
                key={`lang-${lang}`}
                data-active={currentLanguage === lang}
                onClick={() => {
                  changeLanguage(lang);
                  setLangDropdownOpen(false);
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const headerRef = React.useRef(null);
  const topNavRef = React.useRef(null);
  const pageRef = React.useRef(null);

  const baseUrl = process.env.REACT_APP_MGNL_HOST_NEW;
  const apiBase = getAPIBase();
  const restPath = process.env.REACT_APP_MGNL_API_PAGES;
  const nodeName = process.env.REACT_APP_MGNL_APP_BASE;

  const [configProps, setConfigProps] = useState();
  const [userData, setUserData] = useState();
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    fetch(`${apiBase}${restPath}${nodeName}/Config-Pages/Main-Config/headerConfigComponent/@nodes`)
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setConfigProps(result);
      });
  }, [apiBase, restPath, nodeName]);

  const [showLogout, setShowLogout] = useState("false");

  useEffect(() => {
    setShowLogout(configProps?.showLogout)
  }, [configProps?.showLogout]);

  useEffect(() => {
    fetch(`${baseUrl}/rest/administration/users/_current`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        if (data?.login) {
          setIsUserLogged(true);
        }
      });
  }, []);

  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    function handlePopstate() {
      setPathname(window.location.pathname);
    }

    events.on('popstate', handlePopstate);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      events.removeListener('popstate', handlePopstate);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.querySelector('.globalSearch')) {
        const footer = document.querySelector('footer');
        if (footer) {
          footer.style.width='100% !important';
          footer.style.left='0px !important';
        }
      }
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  var leftNavInterval = setInterval(() => {

    const leftLinks = document.querySelectorAll('.leftHandNav .menu-item > button > a');

    function setActiveLHNLink(link) {
      leftLinks.forEach((link) => {
        link.classList.remove('active');
      });
      leftLinks.forEach((leftLink) => {
        leftLink.parentNode.parentNode.parentNode.parentNode.classList.remove('active');
      });
      link.classList.add('active');
      link.parentNode.parentNode.parentNode.parentNode.classList.add('active');
      link.parentNode.parentNode.classList.add('active');
    }

    const currentLocationWithoutHash = window.location.href.split('#')[0];

    const leftLink = Array.from(leftLinks).find(link => {
      if (link.href === window.location.href) {
        return link.href === window.location.href;
      } else if (link.href === currentLocationWithoutHash)
        return link.href === currentLocationWithoutHash;
    });
    if (leftLink) {
      setActiveLHNLink(leftLink);
    }

    const topLinks = document.querySelectorAll('.topNav .menu-item > button > a');

    function setActiveTopLink(link) {
      topLinks.forEach((link) => {
        link.classList.remove('active');
      });
      topLinks.forEach((topLink) => {
        topLink.parentNode.parentNode.parentNode.parentNode.classList.remove('active');
      });
      link.classList.add('active');
      link.parentNode.parentNode.parentNode.parentNode.classList.add('active');
    }

    const topLink = Array.from(topLinks).find(link => {
      if (link.href === window.location.href.replace('#', '/')) {
        return link.href === window.location.href.replace('#', '/');
      } else if (link.href === currentLocationWithoutHash)
        return link.href === currentLocationWithoutHash;
    });
    if (topLink) {
      setActiveTopLink(topLink);
    }

      var uls = document.querySelectorAll('.leftHandNav ul');
      for (var i = 0; i < uls.length; i++) {
        if (uls[i].querySelector('a.active')) {
            uls[i].style.display = 'block';
        }
      }

  }, 300);
  setTimeout(function( ) { clearInterval( leftNavInterval ); }, 6000);

  const handleClick = () => {

    if (!query || query.length < 2) {
      setErrorMessage("Mindestens 2 Zeichen eingeben");
      return;
    }

    setErrorMessage("");
    const href = (getRouterBasename() + `/Search-Pages/Global-Search?query=${query}`).replace("//", "/");
    window.history.pushState({}, "", href);
    events.emit("popstate");
    setQuery("");
  }

  const handleEnter = (value) => {

    if (!value || value.length < 2) {
      setErrorMessage("Mindestens 2 Zeichen eingeben");
      return;
    }

    setErrorMessage("");
    const href = (getRouterBasename() + `/Search-Pages/Global-Search?query=${value}`).replace("//", "/");
    window.history.pushState({}, "", href);
    events.emit("popstate");
    setQuery("");
  }

  if (editMode === "editMode") {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }

  setTimeout(() => {
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
    }
  }, 1000);

    return (
      <div className={`App ${editMode}`}>
        <PagesStyles/>
        <HeaderStyles/>
        <NavLevelsStyles/>
        <TopNavStyles/>
        <LeftNavStyles/>
        <HeadlinesStyles/>
        <ParagraphsStyles/>
        <header ref={headerRef}>
          <div className='header'>
            <div className='logo'>
              <a href={(getRouterBasename() + configProps?.logoPageLink).replace("//", "/").replace("Home/Home", "Home")}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", e.currentTarget.href);
                  events.emit("popstate");
                }}
              >
                <img alt="" src={require('./images/home/Logo.png') }/>
              </a>
            </div>
            <div className='rightHeader'>
              {renderLanguages()}
              <div className='userLinks'>
                {(configProps?.showAdminLink === true || configProps?.showAdminLink === "true") && (
                  <a href={configProps?.adminLink}>
                    {configProps?.adminLinkDisplayName || <GrUserAdmin />}
                  </a>
                )}
                {(configProps?.showUserLink === true || configProps?.showUserLink === "true") && (
                  <a href={configProps?.userLink}>
                    {configProps?.userLinkDisplayName || <GrUserSettings />}
                  </a>
                )}
              </div>
              <div className='flex headerSearch'>
                <input
                  type='text'
                  className='searchInput'
                  placeholder='Suche...'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleEnter(e.target.value);
                    }
                  }}
                />
                <button
                  type='button'
                  onClick={handleClick}
                ><GrSearch/></button>
                {errorMessage && (
                  <div className="searchError">
                    {errorMessage}
                  </div>
                )}
              </div>
              { showLogout === "false" || false ? null :
                <div className='logout'>
                  <div><a href='https://tuv-test.brandmaker.com/Logout.do'><GrLogout/></a></div>
                </div>
              }
            </div>
          </div>
        </header>
        {}
        <div className='pageContainer' ref={pageRef}>
          <PageLoader pathname={pathname} />
          {editMode !== "editMode" && (
            <footer>
              <div className='footerUp'>
                <h2 className='heading'>Unser Support für Dich</h2>
                <div className='description'>
                  Du hast Fragen rund ums Branding oder benötigst Hilfe bei Deinem Design?
                  <br/>Wir helfen Dir gerne!
                </div>
                <a className='link' href='#'>Kontaktiere uns</a>
              </div>
              <div className='footerDown'>
                <div className='footerLeft'>© TÜV Rheinland 2025</div>
                <div className='footerRight'>
                  <div>Impressum</div>
                  <div>AGB</div>
                  <div>Datenschutzerklärung</div>
                </div>
              </div>
            </footer>
          )}
        </div>

      </div>
    );
  }

export default App;
