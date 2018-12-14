const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {

    const choice = document.querySelector('input[name=os]:checked').value;
    const data = { os: choice };
    fetch('http://localhost:3000/poll', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': "application/json"
        })
    }).then( res => res.json())
    .then(data => console.log(data))
    .catch(err => res.send(err));
    e.preventDefault();
});
let dataPoints = [
    { label: 'Windows', y: 0},
    { label: 'MacOS', y: 0},
    { label: 'Linux', y: 0},
    { label: 'Other', y: 0}

];
const chartContainer = document.querySelector('#chartContainer');
if(chartContainer) {
    const chart = new CanvasJS.chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'OS Results'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('5c81f34e372661076c3e', {
      cluster: 'us2',
      forceTLS: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
        alert(JSON.stringify(data));
    });
}