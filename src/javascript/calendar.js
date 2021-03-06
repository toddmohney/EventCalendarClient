var Event = React.createClass({
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
      <div className='event'>
        <h1>{ this.props.name }</h1>
        <p>{ this.props.description }</p>
        <p>{ this.props.location }</p>
        <div className='datetime'>
          From: { this.props.startDate }
          <br />
          To: { this.props.endDate }
          <br />
          Time Zone: { this.props.timeZone }
        </div>
      </div>
    );
  }
});

var Calendar = React.createClass({
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
  <Calendar source="http://localhost:3000/events" />,
  document.getElementById('calendar')
);

