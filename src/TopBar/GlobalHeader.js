import React, { useEffect, useState } from "react";

/*
    getJsonData, getExtraInfo, getListItems, event listeners, and toggle functions are to replace the functionality
    from this file "https://design.artsdatabanken.no/script/header.js".
    It is needed to build the header menu components that is used in all of Artsdatabanken. 
    We needed to do it this way instead of importing the script because importing the 
    script in a normal way made jquery stop working for some reason. It probably has something to do with the way this project
    is bundled together, and fixing this was at this time considered more expensive than just copying the content like this. 
    If things change in the original file we will need to manually update this code as well. 
*/

const getJsonData = async (url) => {
    const response = await fetch(url);
    return response?.json();
}

const getTitle = (item) => {
    return item.Heading || item.Title;
}

const getExtraInfo = (item) => {
    return item.Records.find((el) => {
        return el.Label === 'MenuInfoText';
    })?.Values;
}

const getTargetUrl = (item, baseUrl) => {
    const spesificUrl = item.Records.find((el) => {
        return el.Values[0].includes('http') || el.Values[0].includes('.no');
    })?.Values[0];
    return spesificUrl || baseUrl + item.Url
}

const getListItems = (itemList, baseUrl) => {
    return itemList.map((item) => {
        return (
            <li>
                <a className="header-mega-link-element" href={getTargetUrl(item, baseUrl)} target={item.Title === baseUrl ? '_self' : '_new'}>
                    <div className="header-mega-link-text">
                        <b className="header-site-name">{ getTitle(item) }</b>
                        <p className="header-site-description">{getExtraInfo(item)}</p>
                    </div>
                    <div className="contain-the-icon">
                        <div className="material-icons">{item.Title === baseUrl ? 'chevron_right' : 'open_in_new' }</div>
                    </div>
                </a>
            </li>
        )
    })
}

const GlobalHeader = (props) => {
    const menuId = 'dropdown-header-menu',
        menuUpIcon = 'menu-up-icon',
        menuDownIcon = 'menu-down-icon';

    const [headerMenus, setHeaderMenus] = useState();

    const isOpen = (id) => {
        return document.getElementById(id)?.style.display === 'block';
    }

    const setOpen = (id, shouldOpen) => {
        document.getElementById(id).style.display = shouldOpen ? 'block' : 'none';
        document.getElementById(menuUpIcon).style.display = shouldOpen ? 'inline-block' : 'none';
        document.getElementById(menuDownIcon).style.display = !shouldOpen ? 'inline-block' : 'none';
    }

    
    useEffect(() => {
        const closeMenu = (event) => {
            if (!document.getElementById('menu-button').contains(event.target)) {
                setOpen(menuId, false);
            }
        }
        
        getHeaderMenus();
        window.addEventListener('click', closeMenu);
        return () => {
            window.removeEventListener('click', closeMenu);
        }
    }, []);

    const toggleMenu = () => {
        setOpen(menuId, !isOpen(menuId));
    }
    
    const getHeaderMenus = async () => {
        const baseUrl = 'https://artsdatabanken.no';
        const data = await getJsonData('https://www.artsdatabanken.no/api/Content/341039');
        
        const menus = data?.Records?.map((el, index) => {
            return (
                <li id={ `dropdown-list-${index}` } className="dropdown-list">
                    <ul>
                        <span className="dropdown-list-title">{ el.Values }</span>
                        {getListItems(el.References, baseUrl)}
                    </ul>
                </li>
            )
        });

        setHeaderMenus(menus);
    }
        
    return (
        <header id="global-header" className="header">
                <a href="https://artsdatabanken.no" className="header-logo">
                    <img src="https://design.artsdatabanken.no/icons/adb-logo/Artsdatabanken_Logo-CMYK-H-Colour@2x.png" alt="Artsdatabanken" className="normal" />
                </a>
                <nav id="headermenu">
                    <button type='button' id='menu-button' className='dropdown-toggle' onClick={toggleMenu}>
                        Meny
                        <span className='material-icons dropicon' id={menuUpIcon} style={{ display: 'none' }}>expand_less</span>
                        <span className='material-icons dropicon' id={menuDownIcon}>expand_more</span>
                    </button>
                    <div id={menuId} style={{ display: 'none' }} className="dropdown-menu-artskart header-mega-menu">
                        <ul className='dropdown-menu-artskart'>
                            {headerMenus}
                        </ul>
                    </div>
                </nav>
        </header>
    )
}

export default GlobalHeader;
