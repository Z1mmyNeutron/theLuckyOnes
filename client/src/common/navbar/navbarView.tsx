import React, { Component, useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { NavbarViewModel } from "./navbarViewModel";
import "../../App.css";
import { NavbarHeader } from "../navbar/navbarHeader.tsx";

// Type definition for component state
interface NavbarViewState {
    isCollapsed: boolean;
}

// Type definition for component props
interface NavbarViewProps {
    viewModel: NavbarViewModel;
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

@observer
class NavbarView extends Component<NavbarViewProps, NavbarViewState> {
    private shareDropdownRef = React.createRef<HTMLDivElement>();

    state: NavbarViewState = {
        isCollapsed: false,
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (event: MouseEvent) => {
        if (this.shareDropdownRef.current && !this.shareDropdownRef.current.contains(event.target as Node)) {
            this.props.viewModel.closeShareDropdown();
        }
    };

    handleClick = (url: string) => {
        if (url.startsWith("http")) {
            window.location.href = url;
        } else {
            this.props.viewModel.currentRoute = url;
        }
    };

    toggleCollapse = () => {
        this.setState(prevState => ({
            isCollapsed: !prevState.isCollapsed,
        }));
    };

    render() {
        const { viewModel, onThemeToggle, isDarkMode } = this.props;
        const { isCollapsed } = this.state;

        return (
            <div id="navbar">
                <div className="navbar-top">
                    <button className="collapse-button" onClick={this.toggleCollapse}>
                        {isCollapsed ? "☰" : "✕"}
                    </button>
                    <div className={`navbar-content ${isCollapsed ? "collapsed" : "show"}`}>
                        <div className="navbar-title">
                            <button className="navbar-title-button" onClick={() => this.handleClick("/")}>
                                {viewModel.name}
                            </button>
                        </div>
                        {viewModel.routes.map(route => (
                            <button key={route.name} onClick={() => this.handleClick(route.url)}>
                                {route.name}
                            </button>
                        ))}
                    </div>
                    <div className="navbar-controls">
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search poems and stories..."
                                    value={viewModel.searchQuery}
                                    onChange={(e) => viewModel.setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            {viewModel.searchResults.length > 0 && (
                                <div className="search-results">
                                    {viewModel.searchResults.map((item, index) => (
                                        <div
                                            key={index}
                                            className="search-result-item"
                                            onClick={() => viewModel.selectSearchResult(item)}
                                        >
                                            <div className="search-result-title">{item.title}</div>
                                            <div className="search-result-meta">
                                                <span className="search-result-type">{item.section}</span>
                                                <span className="search-result-preview">
                                                    {item.content.substring(0, 80)}...
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="share-container" ref={this.shareDropdownRef}>
                            <button className="share-button" onClick={() => viewModel.toggleShareDropdown()}>
                                📤
                            </button>
                            {viewModel.showShareDropdown && (
                                <div className="share-dropdown">
                                    <div className="share-dropdown-item" onClick={() => viewModel.shareToInstagram()}>
                                        <span className="share-icon">📷</span>
                                        <span>Instagram</span>
                                    </div>
                                    <div className="share-dropdown-item" onClick={() => viewModel.shareToPinterest()}>
                                        <span className="share-icon">📌</span>
                                        <span>Pinterest</span>
                                    </div>
                                    <div className="share-dropdown-item" onClick={() => viewModel.shareToTikTok()}>
                                        <span className="share-icon">🎵</span>
                                        <span>TikTok</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="theme-toggle" onClick={onThemeToggle}>
                            {isDarkMode ? "☀️" : "🌙"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export { NavbarView };
