import React from 'react';
import StudentsList from "../StudentsList/StudentsList";
import Header from './Header';
import Footer from './Footer'
function Home(props) {
    return (
        <div className="page-container">
        <div className="content-wrap">
            <Header />
            <StudentsList />
        </div>
        <Footer />
      </div>
    );
}

export default Home;