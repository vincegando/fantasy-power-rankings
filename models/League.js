const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeagueSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  leagueId: {
    type: String,
    required: true
  },
  leagueName: {
    type: String,
    required: true
  },
  teams: [
    {
      teamName: {
        type: String,
        required: true
      },
      owners: [
        {
          name: {
            type: String,
            required: true
          }
        }
      ],
      standing: {
        type: Number,
        isRequired: true
      },
      record: {
        type: String,
        required: true
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  rankings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'rankings'
    }
  ]
})

module.exports = League = mongoose.model('leagues', LeagueSchema)
