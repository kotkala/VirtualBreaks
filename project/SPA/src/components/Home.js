import React from 'react';
import { useNavigate } from 'react-router-dom';
import octocatImage from '../images/octocat.png';
import '../styles/home.css';

const Home = () => {
    const navigate = useNavigate();

    // Hàm xử lý khi nhấn nút
    const onClick = () => {
        navigate('/settings');
    };

    return (
        <div className="full-height-container">
            <div className="bg-white text-center octocat-container">
                <img src={octocatImage} className="img-fluid" id="octocat-logo" alt="Octocat Logo" />
            </div>
            <div className='container py-5'>
                <div className='row text-center pb-5'>
                    <div className='col-12 text-white'>
                        <h1>Take a Break</h1>
                    </div>
                </div>
                <div className='row text-center pb-5 justify-content-center'>
                    <div className='col-8 text-white'>
                        <p className="lead">Ứng dụng mã nguồn mở này sẽ giúp bạn cung cấp các màn hình đếm ngược đẹp mắt cho các khoảng nghỉ trong các buổi đào tạo và hội thảo trực tuyến.</p>
                    </div>
                </div>
                <div className='row text-center'>
                    <div className='col-12 text-white'>
                        <button className="btn btn-light btn-lg" onClick={onClick}>Bắt đầu</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
