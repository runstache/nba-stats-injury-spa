//const API_ROOT = 'http://host.docker.internal/nbaapi/api';

const API_ROOT = '/api';

var teamApp = new Vue({

  el: '#injuryContainer',
  data: {
    teams: null,
    selectedTeam: 0,
    injuries: null,
    roster: null
  },
  methods: {
    onChange(event) {
      axios.get(API_ROOT + '/teams/' + event.target.value + '/injuries')
        .then(result => {
          this.injuries = result.data;
          axios.get(API_ROOT + '/teams/' + event.target.value + '/roster')
              .then(reply => {
                this.roster = reply.data;
              }).catch(err => console.log(err));
        }).catch(err => console.log(err));
        
    },
    onActivate(event) {
      axios.post(API_ROOT + '/injuries', {
        id: parseInt(event.target.value),
        injuryStatus: 'ACTIVE'
      }).then((response) => {
        axios.get(API_ROOT + '/teams/' + teamApp.selectedTeam + '/injuries')
            .then(injuryReply => teamApp.injuries = injuryReply.data)
            .catch(err => console.log(err));
        axios.get(API_ROOT + '/teams/' + teamApp.selectedTeam + '/roster')
            .then(rosterReply => teamApp.roster = rosterReply.data)
            .catch(err => console.log(err));    
      }).catch(err => console.log(err));
    },
    onDeactivate(event) {
      axios.post(API_ROOT + '/injuries', {
        id: parseInt(event.target.value),
        injuryStatus: 'OUT'
      }).then((response) => {
        axios.get(API_ROOT + '/teams/' + teamApp.selectedTeam + '/injuries')
            .then(injuryReply => teamApp.injuries = injuryReply.data)
            .catch(err => console.log(err));
        axios.get(API_ROOT + '/teams/' + teamApp.selectedTeam + '/roster')
            .then(rosterReply => teamApp.roster = rosterReply.data)
            .catch(err => console.log(err));    
      }).catch(err => console.log(err));
    },
    onRosterDeactivate(event) {
      axios.post(API_ROOT + '/injuries', {
        playerId: parseInt(event.target.value),
        injuryStatus: 'OUT'
      }).then((response) => {
        axios.get(API_ROOT + '/teams/' + teamApp.selectedTeam + '/injuries')
            .then(injuryReply => teamApp.injuries = injuryReply.data)
            .catch(err => console.log(err));
        axios.get(API_ROOT + '/teams/' + teamApp.selectedTeam + '/roster')
            .then(rosterReply => teamApp.roster = rosterReply.data)
            .catch(err => console.log(err));    
      }).catch(err => console.log(err));
    }
  },
  mounted() {    
    axios.get(API_ROOT + '/teams')
      .then(result => {
        this.teams = result.data;        
      }).catch(err => console.log(err))
  }
});
