import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { observer } from "mobx-react";
import { NavbarViewModel } from "./navbarViewModel";
import "../../App.css";
// NavbarHeader was previously imported but not used; removed to avoid lint errors

// Type definition for component state
interface NavbarViewState {
    isCollapsed: boolean;
    // dropdown positioning for portal
    dropdownRect?: { top: number; left: number; width: number } | null;
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
        isCollapsed: false,
        dropdownRect: null,
    };

    private inputRef = React.createRef<HTMLInputElement>();

    updateDropdownPosition = () => {
        const input = this.inputRef.current;
        if (!input) {
            this.setState({ dropdownRect: null });
            return;
        }
        const rect = input.getBoundingClientRect();
        this.setState({ dropdownRect: { top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width } });
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDropdownPosition);
        window.addEventListener('scroll', this.updateDropdownPosition, true);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDropdownPosition);
        window.removeEventListener('scroll', this.updateDropdownPosition, true);
    }

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
        const { dropdownRect } = this.state;

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
                                    ref={this.inputRef}
                                    type="text"
                                    placeholder="Search poems and stories..."
                                    value={viewModel.searchQuery}
                                    onChange={(e) => {
                                        viewModel.setSearchQuery(e.target.value);
                                        // update the portal position whenever the query changes / results change
                                        // schedule after paint to ensure DOM rect is stable
                                        requestAnimationFrame(this.updateDropdownPosition);
                                    }}
                                    onFocus={() => requestAnimationFrame(this.updateDropdownPosition)}
                                    className="search-input"
                                />
                            </div>
                            {/* Render dropdown into a portal attached to document.body so it isn't clipped by stacking contexts */}
                            {viewModel.searchResults.length > 0 && typeof document !== 'undefined' && (
                                ReactDOM.createPortal(
                                    <div
                                        className="search-results"
                                        style={dropdownRect ? { position: 'absolute', top: dropdownRect.top + 'px', left: dropdownRect.left + 'px', width: dropdownRect.width + 'px' } : { position: 'absolute' }}
                                    >
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
                                    </div>,
                                    document.body
                                )
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
