import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer py-4 bg-dark">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-12 mb-lg-0">
                            <div className="copyright text-center text-sm text-muted text-lg-start">
                                © 2024, made with
                                <FontAwesomeIcon className='mx-1' icon={faHeart} />
                                by
                                <a href="" rel="noreferrer" className="font-weight-bold text mx-1 text-decoration-none text-white" target="_blank">Kim Long Tram</a> (<small>Icons made by <a href="https://www.freepik.com" title="Freepik" className="font-weight-bold text mx-1 text-decoration-none text-white" target="_blank"  rel="noreferrer">Freepik</a> and <a href="https://www.flaticon.com/authors/justicon" title="justicon" className="font-weight-bold text mx-1 text-decoration-none text-white" target="_blank" rel="noreferrer">Justicon</a>)</small>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}