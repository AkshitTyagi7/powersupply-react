/* Create Home Screen */
import React from 'react';
import { Link } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000/summary');


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        user: this.props.user,
        data: {

        },
        discomData: [],
        delhiGeneration: [],
        statesDrawl:[]
        
        };
    }
    componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log('got reply! ', dataFromServer['data']);
            this.setState({ data: dataFromServer['data']['summary'],
        discomData: dataFromServer['data']['discomDrawl'],
        delhiGeneration: dataFromServer['data']['delhiGeneration'],
        statesDrawl: dataFromServer['data']['stateDrawl'] });
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ user: nextProps.user });
    }
    
    render() {
        const { user } = this.state;
     

        return (
        <><div>
            <div className='Top'>
                <h1>DELHI POWER SUMMARY</h1>
                <span className='violationText'>ATC/TTC Violation</span>
                <input type="submit" name="ctl00$ContentPlaceHolder3$BTNATC" value="NORMAL" className='greenBox'></input>
                </div>                <table className='topTable'>
                    <tr>
                        <th>DELHI LOAD</th>
                        <th>SCHEDULE</th>
                        <th>DRAWL</th>
                        <th>CURRENT REVISION</th>
                        <th>MAX LOAD TODAY</th>
                        <th>MAX LOAD YESTERDAY</th>
                    </tr>

                    <tr>
                        <td>{this.state.data['load']}</td>
                        <td>{this.state.data['schedule']}</td>
                        <td>{this.state.data['drawl']}</td>
                        <td>{this.state.data['currentRevision']}</td>
                        <td>{this.state.data['maxLoadToday']}</td>
                        <td>{this.state.data['maxLoadYesterday']}</td>
                    </tr>


                </table>

                <table className='topTable'>
                    <tr>
                        <th>FREQUENCY</th>
                        <th>UI RATE</th>
                        <th>OD/UD</th>
                        <th>DELHI GENERATION</th>
                        <th>MIN LOAD TODAY</th>
                        <th>MIN LOAD YESTERDAY</th>
                    </tr>

                    <tr>
                        <td>{this.state.data['frequency']}</td>
                        <td>{this.state.data['uiRate']}</td>
                        <td>{this.state.data['od/ud']}</td>
                        <td>{this.state.data['delhiGeneration']}</td>
                        <td>{this.state.data['minLoadToday']}</td>
                        <td>{this.state.data['minLoadYesterday']}</td>
                    </tr>


                </table>
            </div><p></p>
            <div className='row'>
                <div className='tableColumn'>
                    <p className='tableHeading'>DISCOM DRAWL (14:04:44 Hrs)</p>
            <table className="table">
                    <thead>
                        <tr>
                            <th>Discom</th>
                            <th>Schedule</th>
                            <th>Drawl</th>
                            <th>Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.discomData.map((row) => (
                            <tr key={row.discom}>
                                <td>{row['discom']}</td>
                                <td>{row['schedule']}</td>
                                <td>{row['drawl']}</td>
                                <td>{row['OD']}</td>
                            </tr>
                        ))}
                        {/*Calculate toatl as discom is char and schedule, drawl, od is int */}
                        <tr>
                            <td>Total</td>
                            <td>{this.state.discomData.reduce((a, b) => a + parseInt(b['schedule']), 0)}</td>
                            <td>{this.state.discomData.reduce((a, b) => a + parseInt(b['drawl']), 0)}</td>
                            <td>{this.state.discomData.reduce((a, b) => a + parseInt(b['OD']), 0)}</td>
                        </tr>

                    </tbody>
                </table>
                </div>

                <div className='tableColumn'>
                    <p className='tableHeading'>DELHI GENERATION ( 14:05:13 Hrs)</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>GENCO</th>
                            <th>Schedule</th>
                            <th>Actual</th>
                            <th>UI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.delhiGeneration.map((row) => (
                            <tr key={row.discom}>
                                <td>{row['GENCO']}</td>
                                <td>{row['schedule']}</td>
                                <td>{row['actual']}</td>
                                <td>{row['UI']}</td>
                            </tr>
                        ))}
                        {/*Calculate toatl as discom is char and schedule, drawl, od is int */}
                        <tr>
                            <td>Total</td>
                            <td>{this.state.delhiGeneration.reduce((a, b) => a + parseInt(b['schedule']), 0)}</td>
                            <td>{this.state.delhiGeneration.reduce((a, b) => a + parseInt(b['actual']), 0)}</td>
                            <td>{this.state.delhiGeneration.reduce((a, b) => a + parseInt(b['UI']), 0)}</td>
                        </tr>

                    </tbody>
                </table>
                </div>

                <div className='tableColumn'>
                    <p className='tableHeading'>STATES DRAWL ( 14:04:31
Hrs)</p>

                <table className="table">
                    <thead>
                        <tr>
                            <th>GENCO</th>
                            <th>Schedule</th>
                            <th>Actual</th>
                            <th>UI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.statesDrawl.map((row) => (
                            <tr key={row.discom}>
                                <td>{row['state']}</td>
                                <td>{row['schedule']}</td>
                                <td>{row['drawl']}</td>
                                <td>{row['OD']}</td>
                            </tr>
                        ))}
                        {/*Calculate toatl as discom is char and schedule, drawl, od is int */}
                        <tr>
                            <td>Total</td>
                            <td>{this.state.statesDrawl.reduce((a, b) => a + parseInt(b['schedule']), 0)}</td>
                            <td>{this.state.statesDrawl.reduce((a, b) => a + parseInt(b['drawl']), 0)}</td>
                            <td>{this.state.statesDrawl.reduce((a, b) => a + parseInt(b['OD']), 0)}</td>
                        </tr>

                    </tbody>
                </table>
              </div>

            </div><p></p>
                
                </>
        );
    }
    }

export default Home;