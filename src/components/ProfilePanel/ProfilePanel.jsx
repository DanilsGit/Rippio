/* eslint-disable react/prop-types */
import './profilePanel.css'
import { NavLink } from 'react-router-dom';

function getLinkClass({ isActive }) {
    return isActive ? 'ProfileOption-activeLink' : 'ProfileOption-Link';
}

export function ProfilePanel({ links }) {
    return (
        <section className='ProfileOptions-linksContainer'>
            <nav>
                <ul>
                    {
                        links.map((link) => (
                            <li key={link.to}>
                                <NavLink className={getLinkClass} to={link.to}>
                                    <img src={link.icon} alt={link.to} />
                                    {link.text}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </section>
    )
}

