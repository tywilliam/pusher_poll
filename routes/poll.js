const express = require('express');

const router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '672227',
    key: '5c81f34e372661076c3e',
    secret: 'fc53d7cf3e654a0f29fa',
    cluster: 'us2',
    encrypted: true
});

router.get('/', (req, res) => {
    res.send('POLL');
} );
router.post('/', (req, res) => {
    if(req.body) {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });
}
    return res.json({ success: true, message: 'Thank you for voting' })
});
module.exports = router;