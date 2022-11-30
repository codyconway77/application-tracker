import React from "react";
import Header from "./Header";

const MainLayout = ({ children }: { children: React.ReactNode}): JSX.Element => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default MainLayout;