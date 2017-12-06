import React, {Component} from 'react';
import {connect} from 'react-redux';
class App extends Component {
    render() {
        let dropDown, access
         document.title = "Invoices";
        if (this.props.location.pathname == '/') {
           


            dropDown = <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-title">
                        Invoices
                    </h3>

                    <div className="page-bar">
                        <ul className="page-breadcrumb breadcrumb">
                            <li>
                               <a>Invoices</a>
                                </li>
                            <li>
                            <a>List</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        }else if(this.props.location.pathname == '/add'){



            dropDown = <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-title">
                        Add Invoice
                    </h3>

                    <div className="page-bar">
                        <ul className="page-breadcrumb breadcrumb">
                            <li>
                               <a>Invoices</a>
                                </li>
                            <li>
                            <a>Add New</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        }
        access = this.props.children
        return <div>
            {dropDown}
            <div className="row">
                <div className="col-lg-12">
                    {access}


                </div>
            </div>
        </div>
    }
}
export default connect(store => store)(App);