import React from 'react';
import Head from 'next/head';
import Twitter from '../components/twitter';
import DailyDownloads from '../components/graphs/DailyDownloads';
import DailyArticleOpens from '../components/graphs/DailyArticleOpens';
import DailyActiveUsers from '../components/graphs/DailyActiveUsers';
import DailyReturningUsers from '../components/graphs/DailyReturningUsers';
import MonthlyAU from '../components/graphs/MonthlyAU';
import WeeklyAU from '../components/graphs/WeeklyAU';
import ActiveUsersMonthly from '../components/graphs/ActiveUsersMonthly';
import ActiveUsersWeekly from '../components/graphs/ActiveUsersWeekly';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

class MainDisplay extends React.Component {

  /*  ----------------------CALLS FOR DATA POINT CARDS----------------------  */

  // gives data differences corresponding to index
  gimmeDiffs(index) {
    switch(index) {
      case 8: return this.diffHandler(this.props.data.chartdata[8][1].series[0][0].value, this.props.data.chartdata[8][1].series[0][1].value);
      case 9: return this.diffHandler(this.props.data.chartdata[9][1].series[0][0].value, this.props.data.chartdata[9][1].series[0][1].value);
      case 10: return this.diffHandler(this.props.data.chartdata[10][1][0].cumulative[1], this.props.data.chartdata[20][1][0].cumulative[1]);
      case 11: return this.diffHandler(this.props.data.chartdata[11][1].series[0][0].value, this.props.data.chartdata[11][1].series[0][1].value);
      case 12: return this.diffHandler(this.summer(this.props.data.chartdata[12][1].series[0].slice(1, 7)), this.summer(this.props.data.chartdata[12][1].series[0].slice(7)));
      case 13: return this.diffHandler(this.summer(this.props.data.chartdata[13][1].series[0].slice(1, 4)), this.summer(this.props.data.chartdata[13][1].series[0].slice(4)));
      case 14: return this.diffHandler(this.summer(this.props.data.chartdata[14][1].series[0].slice(1, 7)), this.summer(this.props.data.chartdata[14][1].series[0].slice(7)));
      case 15: return this.diffHandler(this.summer(this.props.data.chartdata[15][1].series[0].slice(1, 4)), this.summer(this.props.data.chartdata[15][1].series[0].slice(4)));
      case 16: return this.diffHandler(this.summer(this.props.data.chartdata[16][1].series[0].slice(1, 30)), this.summer(this.props.data.chartdata[16][1].series[0].slice(30)));
      case 17: return this.diffHandler(this.summer(this.props.data.chartdata[17][1].series[0].slice(1, 30)), this.summer(this.props.data.chartdata[17][1].series[0].slice(30)));
      // case 18: return this.diffHandler(this.props.data.chartdata[18][1][0].cumulative[1], this.props.data.chartdata[21][1][0].cumulative[1]);
      case 18: return "   ";
      case 19: return this.diffHandler(this.summer(this.props.data.chartdata[19][1].series[0].slice(1, 30)), this.summer(this.props.data.chartdata[19][1].series[0].slice(30)));
      default: return null;
    }
  }

  // gives data differences corresponding to index
  gimmeData(index) {
    switch(index) {
      case 8: return this.props.data.chartdata[8][1].series[0][1].value;
      case 9: return this.props.data.chartdata[9][1].series[0][1].value;
      case 10: return this.turnToPercent(this.props.data.chartdata[10][1][0].cumulative[1]);
      case 11: return this.props.data.chartdata[11][1].series[0][1].value;
      case 12: return this.summer(this.props.data.chartdata[12][1].series[0].slice(7));
      case 13: return this.summer(this.props.data.chartdata[13][1].series[0].slice(4));
      case 14: return this.summer(this.props.data.chartdata[14][1].series[0].slice(7));
      case 15: return this.summer(this.props.data.chartdata[15][1].series[0].slice(4));
      case 16: return this.summer(this.props.data.chartdata[16][1].series[0].slice(30));
      case 17: return this.summer(this.props.data.chartdata[17][1].series[0].slice(30));
      case 18: return this.findPercentDiff(this.summer(this.props.data.chartdata[18][1].series[0]), this.summer(this.props.data.chartdata[18][1].series[1]));
      case 19: return this.summer(this.props.data.chartdata[19][1].series[0].slice(30));
      default: return null;
    }
  }

  // display last updated time
  lastUpdated() {
    const now = new Date();
    let min = now.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }
    let updateTime = 'Last Update:    ' + now.getHours() + ":" + min + "    " + now.getDate() + "/" + now.getMonth();
    return updateTime;
  }

  // helper method for getting titles of cards
  getTitle(index) {
    return this.beautify(this.props.data.chartdata[index][0]);
  }

  findPercentDiff(oldVal, newVal) {
    return Math.trunc((newVal - oldVal)/oldVal * 100) + '%';
  }

  // turn value into percentage
  turnToPercent(val) {
    if (val < 1) {
      return Math.trunc(val * 100) + '%';
    }
    return Math.trunc(val) + '%';
  }

  // sum up all values in an array for data points 12-15
  summer(array) {
    var sum = 0;
    for(var i=0; i<array.length; i++) {
      sum+=array[i].value;
    }
    return sum;
  }

  // calculate % difference (index0) and handle text style (index1) upon data point updates
  diffHandler(oldVal, newVal) {
    const val = Math.trunc((newVal - oldVal)/oldVal * 100);
    const items = [];
    if (val > 0 && isFinite(val)) {
      items.push('+' + val + '%');
      items.push('text-success');
      items.push('fa fa-fw fa-arrow-up');
      return items;
    } else if (val < 0 && isFinite(val)) {
      items.push('-' + Math.trunc((Math.abs(newVal - oldVal))/oldVal * 100) + '%');
      items.push('text-danger');
      items.push('fa fa-fw fa-arrow-down')
      return items;
    } else {
      if (!isFinite(val)) {
        items.push('N/A');
      } else {
        items.push(val + '%');
      }
      items.push('text-social');
      items.push('');
      return items;
    }

  }

  // display follower data in thousands
  socialMod(val) {
    if (val > 999) {
      var dec = Math.floor(val/100) % 10;
      if (dec != 0) {
        return Math.floor(val/1000) + '.' + dec + 'k followers';
      }
      return Math.floor(val/1000) + 'k followers';
    }
  }

  // clean graph names
  beautify(str){
    return str.replace(/_/g, ' ');
  }

  render() {
    console.log('render');

    // console.log(this.props.data.instagram);
    //
    if (this.props.loading === true) {
      return (
        <div align="center">
          <h1>LOADING.... JAFA's Dashboard</h1>
          <img src="../static/images/appIcon.png" height="20%"/>
        </div>
      )
    }
    console.log("Here's the data!", this.props.data.chartdata);

    return (
      <div className="h-100 dashboard-ecommerce" style={{ background: '#1e1e2f', height: '100%'}}>
        {/* MAIN WRAPPER */}
        <div className="h-100 container-fluid dashboard-content" style={{height: '100%'}}>
          <div style={{height: '100%'}}>
            {/* ROW 1 */}
            <div className="h-100 row">
              <div className="col-xl-10">
                <div className="row" style={{ margin: 3, padding: '15px 0px 0px 0px'}}>
                  {/* SOCIAL MEDIA PANEL */}
                  <div className="col-xl-4">
                    <div className="special-card" style={{ background: '#1e1e2f' }}>
                      <img src="../static/images/jafaDashboardLogo.png" height="80px" vspace="15px" hspace="20px" />
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="card border-3 border-top border-top-primary" style={{ background: '#26293b' }}>
                      <div className="card-body">
                        <i className="fab fa-instagram fa-3x" style={{ color: '#ffffff' }} />
                        <span className="text-social float-right font-weight-bold">{this.socialMod(this.props.data.instagram)}</span>

                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="card border-3 border-top border-top-primary" style={{ background: '#26293b' }}>
                      <div className="card-body">
                        <i className="fab fa-twitter fa-3x" style={{ color: 'white' }} />
                        <span className="text-social float-right font-weight-bold">{this.socialMod(this.props.data.twitter)}</span>

                      </div>
                    </div>
                  </div>
                </div>

                {/* DATA POINT ROW */}

                <div className="row" style={{ top: 5, margin: 3 }}>

                  {/* DATA POINT 1 */}

                  <div className="col-xl-3">
                    <div className="card border-3 border-top border-top-primary" style={{ background: '#26293b' }}>
                      <div className="card-body">
                        <h5 className="text-muted">{this.getTitle(16)}</h5>
                        <div className="metric-value d-inline-block">
                          <h1 style={{ color: '#fff' }} className="mb-1">{this.gimmeData(16)}</h1>
                        </div>
                        <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                          <span className={this.gimmeDiffs(16)[1]}> {this.gimmeDiffs(16)[0]}
                            <i className={this.gimmeDiffs(16)[2]} />
                          </span>
                          <span className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DATA POINT 2 */}

                  <div className="col-xl-3">
                    <div className="card border-3 border-top border-top-primary" style={{ background: '#26293b' }}>
                      <div className="card-body">
                        <h5 className="text-muted">{this.getTitle(17)}</h5>
                        <div className="metric-value d-inline-block">
                          <h1 style={{ color: '#fff' }} className="mb-1">{this.gimmeData(17)}</h1>
                        </div>
                        <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                          <span className={this.gimmeDiffs(17)[1]}> {this.gimmeDiffs(17)[0]}
                            <i className={this.gimmeDiffs(17)[2]} />
                          </span>
                          <span className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DATA POINT 3 */}

                  <div className="col-xl-3">
                    <div className="card border-3 border-top border-top-primary" style={{ background: '#26293b' }}>
                      <div className="card-body">
                        <h5 className="text-muted">{this.getTitle(18)}</h5>
                        <div className="metric-value d-inline-block">
                          <h1 style={{ color: '#fff' }} className="mb-1">{this.gimmeData(18)}</h1>
                        </div>
                        <div className="metric-label d-inline-block float-right text-success font-weight-bold">
                          <span className={this.gimmeDiffs(18)[1]}> {this.gimmeDiffs(18)[0]}
                            <i className={this.gimmeDiffs(18)[2]} />
                          </span>
                          <span className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DATA POINT 4 */}

                  <div className="col-xl-3">
                    <div className="card border-3 border-top border-top-primary" style={{ background: '#26293b' }}>
                      <div className="card-body">
                        <h5 className="text-muted">{this.getTitle(19)}</h5>
                        <div className="metric-value d-inline-block">
                          <h1 style={{ color: '#fff' }} className="mb-1">{this.gimmeData(19)}</h1>
                        </div>
                        <div className="metric-label d-inline-block float-right text-danger font-weight-bold">
                          <span className={this.gimmeDiffs(19)[1]}> {this.gimmeDiffs(19)[0]}
                            <i className={this.gimmeDiffs(19)[2]} />
                          </span>
                          <span className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 2 */}

                <div className="row" style={{ margin: 3 }}>

                  {/* GRAPH 1 */}

                  <div className="col-xl-6">
                    <div className="card" style={{ background: '#26293b', height:'100%'}}>
                      <h5 className="card-header" style={{ background: '#26293b' }}>{this.getTitle(4)}</h5>
                      <div className="card-body" style={{ background: '#26293b' }}>
                        <WeeklyAU
                          data={this.props.data.chartdata[4]}
                        />
                      </div>
                    </div>
                  </div>

                  {/* GRAPH 2 */}

                  <div className="col-xl-6">
                    <div className="card" style={{ background: '#26293b' }}>
                      <h5 className="card-header" style={{ background: '#26293b' }}>{this.getTitle(5)}</h5>
                      <div className="card-body" style={{ background: '#26293b' }}>
                        <MonthlyAU
                          data={this.props.data.chartdata[5]}
                        />
                      </div>
                      {/* <div className="card-footer" style={{ background: '#26293b' }}>
                        <p className="display-7 font-weight-bold">
                          <span className="text-primary d-inline-block">$26,000</span>
                          <span className="text-success float-right">+9.45%</span>
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* ROW 3 */}

                <div className="row" style={{ margin: 3 }}>

                  {/* GRAPH 3 */}


                  <div className="col-xl-6">
                    <div className="card" style={{ background: '#26293b' }}>
                      <h5 className="card-header" style={{ background: '#26293b' }}>{this.getTitle(6)}</h5>
                      <div className="card-body" style={{ background: '#26293b' }}>
                        <ActiveUsersWeekly
                          data={this.props.data.chartdata[6]}
                        />
                      </div>
                    </div>
                  </div>


                  {/* GRAPH 4 */}


                  <div className="col-xl-6">
                    <div className="card" style={{ background: '#26293b' }}>
                      <h5 className="card-header" style={{ background: '#26293b' }}>{this.getTitle(7)}</h5>
                      <div className="card-body" style={{ background: '#26293b' }}>
                        <ActiveUsersMonthly
                          data={this.props.data.chartdata[7]}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12">

                <div className="h-75 row no-gutters">
                  {/* TWITTER LIVE FEED */}
                  <TwitterTimelineEmbed
                     sourceType="profile"
                     screenName="jafa"
                     theme="dark"
                     linkColor="#FC7D01"
                     borderColor="#E84E0E"
                     autoHeight="true"
                  />
                </div>
                <div className="h-25 row no-gutters" style={{height: '100%'}}>
                  {/* LAST UPDATED DATE AND TIME */}
                  <span className="text-social align-center float-right font-weight-bold">{this.lastUpdated()}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* END WRAPPER */}
      </div>
    );
  }
}
export default MainDisplay;
