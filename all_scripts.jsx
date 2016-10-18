window.sharedUrl = 'http://cors.io/?u=http://104.199.147.85/candidates';

var qs = function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
};

var HeaderText = React.createClass({
    render: function(){
        return (
            <h4 className="page-head">Candidate Search Filters <span className="lighter-text">Applied filters ({this.props.filterCount})</span></h4>
        )
    }
});
var SearchBox = React.createClass({
    getInitialState: function() {
        return {searchText: ''}
    },
    handleClick: function(text) {
        this.props.onUpdate($('[name="search"]').val());
    },
    render: function(){
        return (
            <div className="search-box">
                <input name="search"
                       placeholder="Search by name"
                       className="form-control"
                       onBlur={this.handleClick}
                       type="text"/>
                <span onClick={this.handleClick} className="search-icon glyphicon glyphicon-search"></span>
            </div>
        )
    }
});

var SelectBox = React.createClass({
    getInitialState: function() {
        return {
            data: this.props.data
        }
    },
    handleChange: function(e) {
        var options = e.target.options;
        var value = [];
        var filterCount=0;
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
                filterCount++;
            }
        }
        if (value=='All') {
            filterCount--;
            this.props.onFilterUpdate(undefined, filterCount);
        }
        else {
            this.props.onFilterUpdate(value, filterCount);
        }
    },
    render: function(){
        var optionRows=[];
        optionRows = this.state.data.map(function (optVal) {
            return <option value={optVal}>{optVal}</option>;
        });
        return (
            <select className="form-control" updateCount={this.state.filterCount} onChange={this.handleChange} multiple={true}>
                {optionRows}
            </select>
        )
    }
});
var AddFilterLink = React.createClass({
    getInitialState: function () {
        return {
            showFilters: false,
            locationList: ["All","Mumbai", "Pune", "Prakasam", "Bengaluru Area", "Bengaluru", "Kolkata", "Chandigarh", "Gurgaon", "Chennai", "Noida", "Sydney South", "Khorda", "Faridabad", "Mysuru Area", "Ahmedabad", "New Delhi Area", "Ajmer", "New Delhi", "Indore", "Hyderabad", "Ghaziabad", "Belagavi", "Thiruvananthapuram", "Kozhikode", "London", "Hyderabad Area", "Kanchipuram", "Kanpur Nagar", "Pathankot"],
            companyList: ["All","ESPN", "Fractal Analytics", "Excelsoft Technologies Pvt. Ltd.", "smart and geek, ideagital agency", "LivSpace", "Samsung Electronics", "ResellerClub, Directi", "Vidyo", "School of Fish Technologies Pvt Ltd", "ASKME.com", "Delhivery", "Pegasystems", "SAP", "Vizury", "Rocket Science Innovations Private Limited (BuyT)", "Personagraph", "HealthGraph India", "Dwellbird", "Times Mobile", "Uninstall.io", "SanDisk", "www.harishsimha.com", "HESUS", "StudyPad", "Swiggy", "GeckoLife", "Postman (API Tools)", "Jabong Labs", "Sourcebits, Inc.", "Kiwi India Pvt Ltd", "Mindfire Solutions", "InMobi", "@WalmartLabs India", "Simplilearn", "Urban Ladder", "Philip's World of Mayajaal", "TinyOwl", "Amazon", "Housing.com", "LetsVenture", "KVP Business Solutions Pvt Ltd", "Summit PayCom Pvt Ltd", "Procter & Gamble", "MoneyTap", "Cleartrip.com", "ShopClues", "EFI", "HEICO INDIA", "Care.com", "MoveInSync Tech. Sol. Pvt Ltd.", "ibibo Group", "Flipkart", "CommonFloor.com", "EXILANT Technologies Private Limited", "SalezShark", "SuccessFactors, A SAP company", "Pramati Technologies Private Limited", "Myntra", "IndiaProperty.com", "MindTickle", "Webonise Lab", "Snapdeal", "KDE", "Veveo/Rovi", "Microsoft", "Collaboration Technology Group (CTG) Cisco", "Helpchat", "Goibibo", "Blue Jeans Network", "MakeMyTrip.com", "Jabong", "Practo", "GSN (TV & Games)", "Zivame.com", "Adobe Systems", "Tracxn!", "Flutura Business Solutions Pvt. Ltd.", "OlaCabs.com", "BankBazaar.com", "Citi", "Verizon Data Services", "Boomerang Commerce", "Goldman Sachs", "Ola (ANI Technologies Pvt Ltd)", "airtel", "ThoughtWorks", "PayPal", "LinkedIn", "Activesphere", "Intuit India", "Owner - Playing pixels", "Ecom Express Pvt. Ltd.", "Rain Concert Technologies (P) Ltd.", "[24]7 Innovation Labs", "Aarav Unmanned Systems Pvt. Ltd.", "Hindustan Unilever Limited", "IMARK SOFTWARE SOLUTIONS", "Ecolibrium Energy (P) Ltd.", "TradebooX", "Unbxd Inc", "Josh Technology Group", "Zomato", "Switch Technologies", "Quotient Technology (Formerly Coupons.com)", "Diageo", "Algoworks", "Flipkart.com", "ZS Associates"]
        };
    },
    companyUpdate: function(str, count) {
        this.props.onFilterCo(str, count);
    },
    locationUpdate: function(str, count) {
        this.props.onFilterLocation(str, count);
    },
    handleClick: function() {
        this.setState({ showFilters: true });
    },
    render: function(){
        return (
            <div>
                {this.state.showFilters?<SelectBox onFilterUpdate={this.locationUpdate} data={this.state.locationList}/>:null}
                {this.state.showFilters?<SelectBox onFilterUpdate={this.companyUpdate} data={this.state.companyList}/>:null}
                {this.state.showFilters?null:<a href="javascript:void(0);" className="btn-link link" onClick={this.handleClick}>+ Add a filter</a>}
            </div>
        )
    }
});

var Header = React.createClass({
    getInitialState: function () {
        return {
            filterLocationCount: 0,
            filterCompanyCount: 0,
            totalCount: 0
        }
    },
    filterUpdate: function(str) {
        var tempStr = 'query='+str;
        this.props.onFilterUpdate(tempStr);
    },

    filterCo: function(str, count) {
        var tempStr = 'current_company='+str;
        this.setState({
            filterCompanyCount: count,
            totalCount: count+this.state.filterLocationCount
        });
        this.props.onFilterUpdate(tempStr);
    },
    filterLocation: function(str, count) {
        var tempStr = 'current_location='+str;
        this.setState({
            filterLocationCount: count,
            totalCount: this.state.filterCompanyCount+count
        });
        this.props.onFilterUpdate(tempStr);
    },

    render: function(){
        var url = this.props.filterUrl;
        var filterCount = this.state.totalCount;
        return (
            <div>
                <div className="header-block aligner clearfix">
                    <HeaderText filterCount={filterCount}/>
                    <SearchBox filterUrl={url} onUpdate={this.filterUpdate} filterText={this.state.filterText}/>
                    <AddFilterLink filterUrl={url} onUpdate={this.filterUpdate} onFilterLocation={this.filterLocation} onFilterCo={this.filterCo}/>
                </div>
            </div>
        )
    }
});

var CandidateBox = React.createClass({
    render: function() {
        var totalExpYears = parseInt(this.props.totalExp/12, 10);
        var remainingMonths = this.props.totalExp%12;
        var expStr = "";
        if ( totalExpYears > 1) {
            expStr = totalExpYears + " years ";
        }
        if (remainingMonths > 0) {
            expStr = expStr + remainingMonths + " months ";
        }
        var current_date= new Date();
        var recentExpStr, past_date, differenceStr,difference=0;
        this.props.expObj.forEach(function(item, index){
            if (item.is_current) {
                past_date = new Date(item.start);
                difference = (current_date.getFullYear()*12 + current_date.getMonth()) - (past_date.getFullYear()*12 + past_date.getMonth());
            }
        });
        if ( difference > 11 ) {
            differenceStr = parseInt(difference/12,10) + " years "+difference%12 + " months ";
        }
        else {
            differenceStr = difference + " months ";
        }
        if (difference < 1) {
            recentExpStr=null;
        }
        else {
            recentExpStr = '( '+differenceStr+', since '+past_date.toLocaleString("en-us", { month: "short" })+' '+past_date.getFullYear()+')';
        }
        return (
            <div className="candidate-card clearfix">
                <img className="profile-pic" src={this.props.profileUrl}/>
                <div className="candidate-details">
                    <h3 className="candidate-head link">{this.props.firstName} {this.props.lastName}</h3>
                    <h5 className="candidate-sub-head">{this.props.currentRole} <span className="lighter-text">at</span> {this.props.currentCompany}</h5>
                    {recentExpStr?<p className="candidate-side-text gray-text">{recentExpStr}</p>:null}
                    <h5 className="candidate-sub-head">{this.props.currentLocation}</h5>
                    <h5 className="candidate-sub-head"><span className="lighter-text">Worked at </span>Practo, Amazon</h5>
                    <p className="candidate-side-text gray-text">{expStr} total experience</p>
                </div>
            </div>
        );
    }
});

var CandidatesList = React.createClass({
    getInitialState: function() {
        return {
            url: '',
            queryText: '',
            queryLocation: '',
            queryCompany: '',
            data: []
        };
    },

    loadCandidatesList: function(url) {
        this.setState({ url: url });
        $.ajax({
            url: url,
            type: "GET",
            //dataType: 'jsonp',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString())
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadCandidatesList(this.props.filterUrl);
    },

    //componentWillUnmount: function() {
    //    this.serverRequest.abort();
    //},

    render: function() {
        var rows = [];
        var countShown, countTotal;
        if ( !($.isEmptyObject(this.state.data)) ) {
            var responseJson = this.state.data;
            countShown = responseJson.count;
            countTotal = responseJson.total_count;
            rows = responseJson.candidates.map(function (candidate) {
                return (
                    <CandidateBox
                        firstName={candidate.first_name}
                        lastName={candidate.last_name}
                        currentRole={candidate.current_role}
                        currentCompany={candidate.current_company}
                        totalExp={candidate.total_experience}
                        currentLocation={candidate.current_location}
                        profileUrl={candidate.profile_picture}
                        expObj={candidate.experience}
                    />
                )
            });
        }
        return (
            <div className="candidates-list">
                <h5>Showing {countShown} of {countTotal}</h5>
                {rows}
            </div>
        );
    }
});

var CandidatesListPage = React.createClass({
    getInitialState: function () {
        console.log('http://104.199.147.85/candidates?'+window.location.hash);
        return {
            url: 'http://104.199.147.85/candidates?'+window.location.hash.substr(1)
        };
    },

    onUpdateUrl: function(newstr) {
        var tempUrl = this.state.url;
        var oldQsArr = tempUrl.split('?');
        var tempQs = qs(oldQsArr[1].split('&'));
        var newUrl = "";
        newUrl = oldQsArr[0]+'?';
        if ( newstr.split('=')[0] == "query") {
            newUrl= newUrl+'query='+newstr.split('=')[1]+'&';
        }
        else {
            if (tempQs["query"] != undefined) {
                newUrl=  newUrl+'query='+tempQs["query"]+'&';
            }
        }
        if ( newstr.split('=')[0] == "current_company" && newstr.split('=')[1] != 'undefined' ) {
            newUrl= newUrl+'current_company='+newstr.split('=')[1]+'&';
        }
        else {
            if (tempQs["current_company"] != undefined && newstr.split('=')[1] != 'undefined' ) {
                newUrl= newUrl+'current_company='+tempQs["current_company"]+'&';
            }
        }
        if ( newstr.split('=')[0] == "current_location" && newstr.split('=')[1] != 'undefined' ) {
            newUrl= newUrl+'current_location='+newstr.split('=')[1];
        }
        else {
            if (tempQs["current_location"] != undefined && newstr.split('=')[1] != 'undefined' ) {
                newUrl= newUrl+'current_location='+tempQs["current_location"];
            }
        }
        window.location.hash = newUrl.split('?')[1];
        this.setState({
           url: newUrl
        });
        this.refs.child.loadCandidatesList(newUrl);
    },

    render: function(){
        return (
            <div className="">
                <Header filterUrl={this.state.url} onFilterUpdate={this.onUpdateUrl} />
                <CandidatesList ref="child" filterUrl={this.state.url} onFilterUpdate={this.onUpdateUrl} />
            </div>
        );
    }
});

ReactDOM.render(
    <CandidatesListPage/>,
    document.getElementById('container')
);