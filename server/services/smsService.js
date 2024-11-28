import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BEEM_API_URL = 'https://apisms.beem.africa/v1/send';

export const sendSMS = async (phoneNumber, message) => {
  try {
    const response = await axios.post(
      BEEM_API_URL,
      {
        source_addr: 'INFO',
        schedule_time: '',
        encoding: 0,
        message,
        recipients: [{ recipient_id: 1, dest_addr: phoneNumber }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `${process.env.BEEM_API_KEY}:${process.env.BEEM_SECRET_KEY}`
          ).toString('base64')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw error;
  }
};