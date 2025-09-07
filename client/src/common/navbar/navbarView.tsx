import React, { Component } from "react";
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
    state: NavbarViewState = {
        isCollapsed: true,
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
                                            <div className="search-result-type">{item.type}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="theme-toggle" onClick={onThemeToggle}>
                            {isDarkMode ? "☀️" : "🌙"}
                        </button>
                    </div>
                </div>
                <NavbarHeader viewModel={viewModel} />
            </div>
        );
    }
}

export { NavbarView };
