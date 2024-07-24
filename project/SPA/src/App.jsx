import React from 'react';
import { Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { PageLayout } from "./components/PageLayout";
import Home from "./components/Home";
import Settings from "./components/Settings";
import Summary from "./components/Summary";
import Mobile from "./components/Mobile";

// import "./styles/App.css";

const App = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <PageLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="summary/:timestamp/:name" element={<Summary />} />
                    <Route path="mobile/:timestamp/:name" element={<Mobile />} />
                </Routes>
            </PageLayout>
        </MsalProvider>
    );
};

export default App;
