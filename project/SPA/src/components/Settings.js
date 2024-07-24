import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment-timezone';
import octocatImage from '../images/octocat.png';
import '../styles/settings.css';

class Settings extends Component {
    state = {
        currentTime: new Date(),
        defaultBreaks: [
            { name: 'Coffee Break', duration: 15, icon: 'coffee-cup.png', selected: false, timezones: ["Asia/Ho_Chi_Minh"] },
            { name: 'Lunch Break', duration: 60, icon: 'burger.png', selected: false, timezones: ["Asia/Ho_Chi_Minh"] },
            { name: 'Lab Time', targetTime: '14:00', icon: 'microscope.png', selected: false, timezones: ["Asia/Ho_Chi_Minh"] }
        ],
        warning: null,
        editingIconIndex: null
    };

    fileInputRef = React.createRef();

    // Hàm thêm phút vào thời gian hiện tại
    addMinutesToCurrentDate = (minutes) => {
        const newTime = new Date();
        newTime.setMinutes(newTime.getMinutes() + minutes);
        return newTime;
    };

    // Hàm xử lý khi nhấn vào một khoảng nghỉ
    handleClickBreak = (index) => {
        const newBreaks = this.state.defaultBreaks.map((item, i) => ({
            ...item,
            selected: i === index
        }));
        this.setState({ defaultBreaks: newBreaks, warning: null });
    };

    // Hàm xử lý khi rời khỏi ô chỉnh sửa thời gian
    handleBlurEditable = (index, event) => {
        const newBreaks = [...this.state.defaultBreaks];
        let value = event.target.innerText.trim();
        if (value === '' || parseInt(value, 10) < 1) {
            event.target.innerText = '1';
            newBreaks[index].duration = 1;
        } else if (parseInt(value, 10) > 1440) {
            event.target.innerText = '1440';
            newBreaks[index].duration = 1440;
        } else {
            newBreaks[index].duration = parseInt(value, 10);
        }
        this.setState({ defaultBreaks: newBreaks, warning: null });
    };

    // Hàm xử lý khi rời khỏi ô chỉnh sửa tên khoảng nghỉ
    handleBlurEditableName = (index, event) => {
        const newBreaks = [...this.state.defaultBreaks];
        const value = event.target.innerText.trim();
        newBreaks[index].name = value;
        this.setState({ defaultBreaks: newBreaks, warning: null });
    };

    // Hàm xử lý khi thay đổi múi giờ
    handleTimezonesChange = (index, selectedOptions) => {
        const newBreaks = [...this.state.defaultBreaks];
        newBreaks[index].timezones = selectedOptions.map(option => option.value);
        this.setState({ defaultBreaks: newBreaks });
    };

    // Hàm xử lý khi nhấn vào biểu tượng để thay đổi
    handleIconClick = (index) => {
        this.setState({ editingIconIndex: index }, () => {
            this.fileInputRef.current.click();
        });
    };

    // Hàm xử lý khi thay đổi biểu tượng
    handleIconChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newBreaks = [...this.state.defaultBreaks];
                newBreaks[this.state.editingIconIndex].icon = e.target.result;
                this.setState({ defaultBreaks: newBreaks });
            };
            reader.readAsDataURL(file);
        }
    };

    // Hàm xử lý khi thay đổi thời gian đích cho Lab Time
    handleTimeChange = (index, event) => {
        const newBreaks = [...this.state.defaultBreaks];
        newBreaks[index].targetTime = event.target.value;
        this.setState({ defaultBreaks: newBreaks });
    };

    // Hàm xử lý khi nhấn vào nút bắt đầu khoảng nghỉ
    handleClickStartBreak = () => {
        const selectedBreak = this.state.defaultBreaks.find(item => item.selected);
        if (selectedBreak) {
            // Kiểm tra múi giờ hợp lệ
            if (!selectedBreak.timezones || selectedBreak.timezones.length === 0 || selectedBreak.timezones.some(tz => !moment.tz.names().includes(tz))) {
                this.setState({ warning: 'Vui lòng chọn múi giờ hợp lệ trước khi bắt đầu nghỉ.' });
                return;
            }

            // Kiểm tra thời gian hợp lệ (loại trừ Lab Time)
            if (selectedBreak.name !== 'Lab Time' && (!selectedBreak.duration || selectedBreak.duration < 1 || selectedBreak.duration > 1440)) {
                this.setState({ warning: 'Vui lòng chọn thời gian hợp lệ trước khi bắt đầu nghỉ.' });
                return;
            }

            let endingTimestamp;
            if (selectedBreak.name === 'Lab Time') {
                const [hours, minutes] = selectedBreak.targetTime.split(':');
                const now = new Date();
                const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
                if (targetTime < now) {
                    targetTime.setDate(targetTime.getDate() + 1);
                }
                endingTimestamp = targetTime.getTime();
            } else {
                const newTime = this.addMinutesToCurrentDate(selectedBreak.duration);
                endingTimestamp = newTime.getTime();
            }
            const breakName = selectedBreak.name;
            const timezones = selectedBreak.timezones.join(',');
            this.props.navigate(`/summary/${endingTimestamp}/${breakName}?timezones=${timezones}`);
        }
    };

    // Hàm xử lý khi nhập thời gian nghỉ
    handleDurationInput = (event) => {
        const input = event.target.innerText;
        if (!/^\d*$/.test(input)) {
            event.target.innerText = input.replace(/\D/g, '');
        }
        if (parseInt(input, 10) > 1440) {
            event.target.innerText = '1440';
        }
    };

    render() {
        const timezoneOptions = moment.tz.names().map(tz => ({ label: tz, value: tz }));

        const customStyles = {
            control: (provided) => ({
                ...provided,
                backgroundColor: '#212529',
                borderColor: '#4d5053',
                color: '#fff'
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: '#212529',
                color: '#fff'
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#4d5053' : '#212529',
                color: '#fff',
                '&:hover': { backgroundColor: '#4d5053' }
            }),
            multiValue: (provided) => ({
                ...provided,
                backgroundColor: '#4d5053',
                color: '#fff'
            }),
            multiValueLabel: (provided) => ({ color: '#fff' }),
            multiValueRemove: (provided) => ({
                color: '#fff',
                ':hover': { backgroundColor: '#4d5053', color: '#fff' }
            }),
            singleValue: (provided) => ({ color: '#fff' }),
            input: (provided) => ({
                ...provided,
                color: '#fff'
            }),
            placeholder: (provided) => ({
                ...provided,
                color: '#fff'
            })
        };

        const breaks = this.state.defaultBreaks.map((item, index) => {
            let endTime;
            if (item.name === 'Lab Time') {
                endTime = item.targetTime;
            } else {
                const newTime = this.addMinutesToCurrentDate(item.duration);
                endTime = newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            }

            return (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                    <div className={`card card-break mb-3 ${item.selected ? "selected" : ""}`} onClick={() => this.handleClickBreak(index)}>
                        <div className="row g-0">
                            <div className="col-md-4 break-icon" onClick={() => this.handleIconClick(index)}>
                                <img src={item.icon.startsWith('data:') ? item.icon : require(`../images/icons/${item.icon}`)} alt={item.name} />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5
                                        className="card-title editable"
                                        contentEditable={item.selected}
                                        suppressContentEditableWarning
                                        onBlur={(e) => this.handleBlurEditableName(index, e)}
                                    >
                                        {item.name}
                                    </h5>
                                    {item.name === 'Lab Time' ? (
                                        <div className="form-group">
                                            <label htmlFor={`target-time-${index}`}>Thời gian đích:</label>
                                            <input
                                                type="time"
                                                id={`target-time-${index}`}
                                                value={item.targetTime}
                                                onChange={(e) => this.handleTimeChange(index, e)}
                                                className="form-control"
                                            />
                                        </div>
                                    ) : (
                                        <p className="card-text">
                                            <span
                                                className="editable"
                                                contentEditable={item.selected}
                                                suppressContentEditableWarning
                                                onBlur={(e) => this.handleBlurEditable(index, e)}
                                                onInput={this.handleDurationInput}
                                            >
                                                {item.duration}
                                            </span> Phút
                                        </p>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor={`timezones-${index}`}>Chọn múi giờ:</label>
                                        <Select
                                            options={timezoneOptions}
                                            onChange={(selectedOptions) => this.handleTimezonesChange(index, selectedOptions)}
                                            value={timezoneOptions.filter(option => item.timezones.includes(option.value))}
                                            styles={customStyles}
                                            isMulti
                                        />
                                    </div>
                                    <p className="card-text"><small className="text-muted">Nó sẽ kết thúc vào lúc {endTime}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        const currentTimeString = this.state.currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

        return (
            <div className="full-height-container">
                <div className="bg-white text-center octocat-container">
                    <img src={octocatImage} className="img-fluid" id="octocat-logo" alt="Octocat Logo" />
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 text-white text-center pb-5">
                            <h1>Bây giờ là {currentTimeString}. Đã đến giờ nghỉ chưa?</h1>
                        </div>
                    </div>
                    <div className="row text-center pb-5">
                        {breaks}
                    </div>
                    {this.state.warning && (
                        <div className="row text-center pb-3">
                            <div className="col-12 text-danger">
                                <p>{this.state.warning}</p>
                            </div>
                        </div>
                    )}
                    <div className="row text-center pb-5">
                        <div className="col-12 text-center">
                            <button className="btn btn-light btn-lg" onClick={this.handleClickStartBreak}>Bắt đầu nghỉ</button>
                        </div>
                    </div>
                </div>
                <input
                    type="file"
                    ref={this.fileInputRef}
                    style={{ display: 'none' }}
                    onChange={this.handleIconChange}
                />
            </div>
        );
    }
}

// Sử dụng hook useNavigate để điều hướng
const SettingsWithNavigate = (props) => {
    const navigate = useNavigate();
    return <Settings {...props} navigate={navigate} />;
};

export default SettingsWithNavigate;
