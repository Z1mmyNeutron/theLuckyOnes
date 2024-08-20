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
        const { viewModel } = this.props;
        const { isCollapsed } = this.state;

        return (
            <div id="navbar">
                <button className="collapse-button" onClick={this.toggleCollapse}>
                    {isCollapsed ? "☰" : "✕"}
                </button>
                <div className={`navbar-content ${isCollapsed ? "" : "show"}`}>
                    {viewModel.routes.map(route => (
                        <button key={route.name} onClick={() => this.handleClick(route.url)}>
                            {route.name}
                        </button>
                    ))}
                </div>
                <NavbarHeader viewModel={viewModel} />
            </div>
        );
    }
}

export { NavbarView };
