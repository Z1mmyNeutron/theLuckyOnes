import React from "react";
import { NavbarViewModel } from "./navbarViewModel";
import "../../App.css";  // Make sure this CSS file includes the styles for .navbar-header

// Link component
function Link(href: string, text: string) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );
}

// Type definition for component props
interface NavbarHeaderProps {
    viewModel: NavbarViewModel;
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ viewModel }) => {
    return (
        <div className="navbar-header">
            <div className="header-content">
                <h1 className="book-title">{viewModel.name}</h1>
                <h2 className="author-name">{viewModel.author}</h2>
                <div className="purchase-link">
                    {Link(viewModel.link, viewModel.linkText)}
                </div>
            </div>
        </div>
    );
};

export { NavbarHeader };
