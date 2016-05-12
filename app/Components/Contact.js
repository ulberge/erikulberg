import React, { Component } from 'react';
import classnames from 'classnames';

import { className } from './Contact.less';

export default class Contact extends Component {
  render() {
    return (
        <div className={classnames(className, 'container')}>
            <form action="https://formspree.io/ulberge@gmail.com" method="POST" className="col-md-offset-3 col-md-6">
                <div className="form-group">
                    <label htmlFor="name">Name*</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder=""/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address*</label>
                    <input type="email" className="form-control" id="email" name="_replyto" placeholder=""/>
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject*</label>
                    <input type="text" className="form-control" id="subject" name="subject" placeholder=""/>
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message*</label>
                    <textarea type="text" rows="6" className="form-control" id="message" name="message" placeholder=""></textarea>
                </div>
                <button type="submit" className="btn btn-default">Send</button>
            </form>
        </div>
    );
  }
}
