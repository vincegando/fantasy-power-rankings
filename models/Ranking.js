const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RankingSchema = new Schema({
  leagueId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rankings: [
    {
      rank: {
        type: Number,
        required: true
      },
      teamName: {
        type: String,
        required: true
      },
      record: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = Ranking = mongoose.model('rankings', RankingSchema)
