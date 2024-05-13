import React from 'react';
import '../../style/footer.css'

const Footer = () => {
    const logout = () => {
        // Implement logout functionality
    };

    const connect = () => {
        // Implement connect functionality
        return true; // Example return value, replace with actual logic
    };

    const sendEmail = (email) => {
        // Implement send email functionality
    };

    return (
        <footer id="footer">
            <div className="footer__container">
                <div className="footer_about">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '10%', maxWidth: '100vw', marginLeft: '2%' }}>
                            <img src="https://asset.brandfetch.io/id6Imppd3r/idSbeSSTGX.png" style={{ width: '100%' }} alt="" loading="lazy" />
                        </div>
                        <span style={{ marginLeft: '10px' }}>Amdocs</span>
                    </div>
                    <p>Grow your career with us
We touch the lives of billions of people every day, enabling a better connected world.</p>
                </div>
                <div className="employees__categories">
                    <strong>Categories</strong>
                    <br />
                    <div className="categories">
                        <ul>
                            <li><a href="/home"><b> Home Page</b></a></li>
                            <li><a href="/employee"><b> employeesList</b></a></li>
                            <li><a href="/employee"><b> addEmployee</b></a></li>
                            <li><a href="/"><b> Connect</b></a></li>
                            <li><a href="/logout" className="active" onClick={logout} style={{ display: connect() ? 'block' : 'none' }}> Logout</a></li>
                        </ul>
                    </div>
                </div>
              
            </div>
            <div className="copyright">
                <p>&#169; 2024 Amdocs | built by <strong>Yehudit Ashlag.</strong> </p>
                <div className="share">
                    <div><i className="fab fa-facebook-f"></i></div>
                    <div><i className="fab fa-linkedin-in"></i></div>
                    <div><i className="fab fa-twitter"></i></div>
                    <div><i className="fab fa-google-plus-g"></i></div>
                    <div><i className="fab fa-github"></i></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
