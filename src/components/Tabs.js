import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import AlbumList from './AlbumList';
import TasksList from './TasksList';
import PostList from './PostList';
import classnames from 'classnames';


const Tabs = ({user}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Nav tabs className="nav nav-pills nav-justified bg-light mb-3">
                <NavItem className="nav-item" >
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Posts
                            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Album
                            </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Tasks
                            </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <div className="row">
                        <div className="col-sm-12">
                            <PostList id={user.id} />
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div className="row">
                        <div className="col-sm-12">
                            <AlbumList id={user.id} />
                        </div>
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <div className="row">
                        <div className="col-sm-12">
                            <TasksList id={user.id} />
                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </div>

    )
};

export default Tabs;