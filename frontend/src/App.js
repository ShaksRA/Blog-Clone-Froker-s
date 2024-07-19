import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" exact component={BlogList} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
