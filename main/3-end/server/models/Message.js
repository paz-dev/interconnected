const mongoose = require('mongoose');
const _ = require('lodash');
const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const mongoSchema2 = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  displayName: String,
  messageStr: String,
});

class MessageClass {
  static publicFields() {
    return ['id', 'displayName', 'email', 'messageStr', 'slug', 'isAdmin', 'timeStamp'];
  }

  static async postMessage({ googleId, email, googleToken, displayName, messageStr, timeStamp }) {
    const message = await this.findOne({ googleId }).select(MessageClass.publicFields().join(' '));

    if (message) {
      const modifier = {};

      if (googleToken.accessToken) {
        modifier.access_token = googleToken.accessToken;
      }

      if (googleToken.refreshToken) {
        modifier.refresh_token = googleToken.refreshToken;
      }

      if (_.isEmpty(modifier)) {
        return message;
      }

      await this.updateOne({ googleId }, { $set: modifier });

      return message;
    }

    const slug = await generateSlug(this, displayName);
    const messageCount = await this.find().countDocuments();

    const newMessage = await this.create({
      createdAt: new Date(),
      googleId,
      email,
      googleToken,
      displayName,
      messageStr,
      slug,
      isAdmin: messageCount === 0,
      timeStamp,
    });

    return _.pick(newMessage, MessageClass.publicFields());
  }
}

mongoSchema2.loadClass(MessageClass);

// const Message = mongoose.model('Message', mongoSchema2);

module.exports = mongoose.models.Message || mongoose.model('Message', mongoSchema2);
