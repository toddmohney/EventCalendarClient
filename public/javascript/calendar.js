var Event = React.createClass({displayName: "Event",
  getInitialState: function() {
    return {
      id: null,
      applicationId: null,
      organizerId: null,
      name: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      timeZone: "",
      cancelled: false,
      createdAt: "",
      updatedAt: ""
    };
  },

  render: function() {
    return (
      React.createElement("div", {className: "event"}, 
        React.createElement("h1", null,  this.props.name), 
        React.createElement("p", null,  this.props.description), 
        React.createElement("p", null,  this.props.location), 
        React.createElement("div", {className: "datetime"}, 
          "From: ",  this.props.startDate, 
          React.createElement("br", null), 
          "To: ",  this.props.endDate, 
          React.createElement("br", null), 
          "Time Zone: ",  this.props.timeZone
        )
      )
    );
  }
});

var Calendar = React.createClass({displayName: "Calendar",
  getInitialState: function() {
    return { events: [] };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      if (this.isMounted()) {
        this.setState({ events: result });
      }
    }.bind(this));
  },

  render: function() {
    var events = [];

    for(var i=0; i < this.state.events.length; i++) {
      event = this.state.events[i];
      event.key = i;
      eventElement = React.createElement(Event, event)
      eventListItem = React.createElement('li', { className: 'calendar-item' }, eventElement)
      events.push(eventListItem);
    }

    return React.DOM.ul({ className: 'calendar-items' }, events);
  }
});

React.render(
  React.createElement(Calendar, {source: "http://localhost:3000/events"}),
  document.getElementById('calendar')
);

