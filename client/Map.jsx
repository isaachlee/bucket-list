var geocoder;
var map;
var currentLocation;

Map = React.createClass({

  initialize (location) {

    currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

    var mapOptions = {
      center: currentLocation,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    map = new google.maps.Map(document.getElementById("map-gic"),
        mapOptions);

    var infoWindowContent =   '<div class="info_content">' + "test" + '</div>';

    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    geocoder = new google.maps.Geocoder();

    var marker = new google.maps.Marker({
      position: currentLocation,
      map: map,
      icon: 'http://i.stack.imgur.com/Kbx0I.png'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
      });

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      });
      map.fitBounds(bounds);
    });
  },

  getLocation () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.initialize);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  },

  getDefaultProps: function () {
    return {
        initialZoom: 8,
        mapCenterLat: 43.6425569,
        mapCenterLng: -79.4073126,
    };
  },

  componentDidMount: function (rootNode) {
    this.getLocation();
    this.setState({map: map});
  },

  mapCenterLatLng: function () {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
  },

  render () {
    return (
      <div>
        <input id="pac-input" className="controls" type="text" placeholder="Search Box"></input>
        <div id="map-gic"></div>
        < DisplayEventForm />
      </div>

    )
    }
});


var EventForm = React.createClass({
  handleChange: function(event) {
    this.setState({value: event.target.value.substr(0, 140)});
  },

  codeAddress () {
    var address = document.getElementById("address").value;
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  },

  addLocation (event) {
    event.preventDefault();
    this.codeAddress();
    var eventNameVar = document.getElementById("locationName").value
    var eventAddressVar = document.getElementById("address").value
    MarkersList.insert({name: eventNameVar, address: eventAddressVar});
    console.log("MarkersList::")
    console.log(MarkersList);
  },

  render: function() {
    return (
      <form onSubmit= {this.addLocation}>
        {this.props.children}
      </form>
    );
  }
});

EventForm.Input = React.createClass({
  render() {
    return <input id={this.props.inputid} type="text" ref={this.props.inputref} onChange={this.handleChange} />
  }
});

EventForm.Label = React.createClass({
  render() {
    return(<label>{this.props.labeltext}</label>)
  }
});

EventForm.SubmitBut = React.createClass({
  render() {
      return(<input type="submit" value={this.props.submitvalue} />)
  }
});

var DisplayEventForm = React.createClass({

  addEvent () {
    var eventPropsVar = {}
    var Form = EventForm;
    return (
      <Form>
        <Form.Label labeltext={"Location Name: "} />
        <Form.Input inputid="locationName"inputref="location" />
        <Form.Label labeltext="Address" />
        <Form.Input inputid="address" inputref="address" />
        <Form.SubmitBut submitvalue="Add Location" />
      </Form>
    );
  },

  render () {
    return (
      <div id="eventbox">
        <this.addEvent/>
      </div>
    );
  }
});
