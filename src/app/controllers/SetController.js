const Set = require('../models/Set');
const Flashcard = require('../models/Flashcard');
const { set } = require('mongoose');

class SetController {
    async show(req, res) {
       try {
            const set = await Set.findOne({ slug: req.params.slug }).lean();
            if(!set){
                return res.status(400).json({ error: 'ERROR!!!' });
            }

            const flashcards = await Flashcard.find({set_id: set._id }).lean();
            res.render('flashcard', { set, flashcards });

       } catch (error) {
            res.status(400).json({ error: 'ERROR!!!' });
       }
    }
}

module.exports = new SetController();
