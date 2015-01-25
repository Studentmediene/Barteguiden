var Event = require('../models/Event')

// POST /api/events
exports.postEvents = function(req, res){
    var evnt = new Event();

    evnt.title = req.body.title;
    evnt.desc = req.body.desc;
    evnt.ownerId = req.user._id;

    evnt.save(function(err){
        if (err)
            res.send(err);

        res.json({message: 'Event added.', data: evnt});
    })
}

// GET /api/events
exports.getEvents = function(req, res){
    Event.find(function(err, events) {
        if(err)
            res.send(err);
        res.json(events);
    });
};

// GET /api/events/:event_id
exports.getEvent = function(req, res){
    Event.findById(req.params.event_id, function(err, evnt){
        if(err)
            res.send(err);
        res.json(evnt);
    });
};

// PUT /api/events/:event_id
exports.putEvent = function(req, res){
    Event.update({ownerId: req.user._id, _id:req.params.event_id},
                 function(err, raw){
                     if (err)
                         res.send(err);
                    
                     res.json({message: 'Event updated.'});
                 });
};

// DELETE /api/events/:event_id
exports.deleteEvent = function(req, res){
    Event.remove({ownerId: req.user._id, _id: req.params.event_id},
            function(err){
                if (err)
                    res.send(err);
                res.json({message: 'Event removed.'});
            });
};
