var drops = {
    createDrop: function(req, res) {
        res.json({
            id: 1,
            lat: 2,
            long: 3,
            note: 'This is the note section!',
            user: 'bobbybrown',
            createdDateTime: new Date('1-2-2016'), //TODO: how to handle datetimes
            category: 'sports'
        });
    },
    getAllDrops: function(req, res) {
        res.json([{
            id: 1,
            lat: 2,
            long: 3,
            note: 'This is the note section!',
            user: 'xoxolovbunny',
            createdDateTime: new Date('1-2-2016'),
            category: 'sports'
        }, {
            id: 2,
            lat: 22,
            long: 33,
            note: 'This is the note section for drop 2!',
            user: 'sknyforeal',
            createdDateTime: new Date('1-2-2016'),
            category: 'automotive'
        }]);
    },
    getDropsForUser: function(req, res) {
      //TODO: privacy- should these be public always
        res.json([{
            id: 2,
            lat: 22,
            long: 33,
            note: 'someones drop: This is the note section for drop 2!',
            user: 'sknyforeal',
            createdDateTime: new Date('1-2-2016'),
            category: 'dinner'
        }]);
    }
};
module.exports = drops;
