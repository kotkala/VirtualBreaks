import React, { Component } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";
import Countdown from 'react-countdown';
import '../styles/summary.css';
import MusicPlayer from './MusicPlayer';

class Summary extends Component {
    // Tính thời gian ở múi giờ khác
    calculateTimeDifferentTimezone(timestamp, timeZone) {
        return new Date(timestamp).toLocaleString("en-US", {
            timeZone,
            timeZoneName: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    // Tạo URL cho mã QR
    generateQRCodeUrl(timestamp, name) {
        return `${window.location.protocol}//${window.location.host}/mobile/${timestamp}/${name}`;
    }

    render() {
        const { timestamp, name } = this.props.params;
        const query = new URLSearchParams(this.props.location.search);
        const timezones = query.get('timezones').split(',');
        const timestampInt = parseInt(timestamp);

        // Hàm render cho Countdown
        const rendererCountdown = ({ hours, minutes, seconds, completed }) => {
            if (completed) {
                return <span className="text-danger">00:00:00</span>;
            } else {
                const style = hours === 0 ? (minutes > 2 && minutes < 5 ? "text-warning" : (minutes < 2 ? "text-danger" : "text-white")) : "text-white";
                return <span className={style}>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>;
            }
        };

        return (
            <div className="full-height-container background-container py-5">
                <div className="container">
                    
                    <div className='row row-eq-height'>
                        
                        <div className='col-12 col-md-6 col-lg-4'>
                            
                            <div className='card card-countdown'>
                                <div className='card-body text-center'>
                                    <h5 className='card-title'>{name}!</h5>
                                    <div className="countdown">
                                        <Countdown
                                            date={timestampInt}
                                            daysInHours={true}
                                            renderer={rendererCountdown}
                                        />
                                    </div>
                                    <p className='card-text'>Phút cho đến khi kết thúc giờ nghỉ</p>
                                    <MusicPlayer />
                                    
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div className='card card-qrcode'>
                                <div className='card-body text-center'>
                                    <h5 className='card-title pb-3'>Quét mã!</h5>
                                    <div className='bg-white py-5'>
                                        <QRCode bgColor='#FFFFFF' fgColor='#212529' value={this.generateQRCodeUrl(timestampInt, name)} />
                                    </div>
                                    <p className='card-text pt-3'>Quét mã QR này bằng điện thoại thông minh của bạn để xem trang hẹn giờ di động</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div className='card card-custom'>
                                <div className='card-body'>
                                    <h5 className='card-title pb-3'>Lớp học sẽ bắt đầu lại vào lúc:</h5>
                                    {timezones.map((timezone, index) => (
                                        <p key={index} className='card-text'>
                                            <strong>{this.calculateTimeDifferentTimezone(timestampInt, timezone)} </strong><br /> {timezone.replace('/', ', ')}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Sử dụng hook useParams, useLocation và useNavigate để lấy tham số và vị trí
const SummaryWithParams = (props) => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    return <Summary {...props} params={params} location={location} navigate={navigate} />;
};

export default SummaryWithParams;
