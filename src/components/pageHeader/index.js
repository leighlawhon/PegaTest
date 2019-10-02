import React from 'react';
import './pageHeader.scss';

export default class PageHeaderComponent extends React.Component {
  render() {
    return (
      <div className="container-fluid page-header" >
        <div className="row">
          <h1 className="col">{this.props.title}</h1>
        </div>
      </div>
    )
  }
}