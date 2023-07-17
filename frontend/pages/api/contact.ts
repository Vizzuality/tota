import sendgridMail from '@sendgrid/mail';
import sendgridClient from '@sendgrid/client';
import type { NextApiRequest, NextApiResponse } from 'next';

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY_CONTACT);
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY_SUBSCRIPTION);

const Contact = (req: NextApiRequest, res: NextApiResponse): void => {
  if (req.method === 'POST') {
    const { email, message, topic } = req.body;

    // Saving contacts and emails in Sendgrid
    const list_ids = ['0ee4b8ab-2088-44c1-b7cc-5eab97a49fda'];

    const data = {
      list_ids,
      contacts: [
        {
          email,
        },
      ],
    };

    const request = {
      url: `/v3/marketing/contacts`,
      method: 'PUT' as const,
      body: data,
    };

    sendgridClient.request(request).then(
      () => {
        res.status(200).json({ status: 'success' });
      },
      (error) => {
        if (error.response) {
          res.status(400).json(error.response.body);
        }
      },
    );

    // Sending email to the user
    const msg = {
      to: 'hello@tota.com',
      from: 'no-reply@tota.com',
      subject: `Contact: ${topic}`,
      text: `A new message has been received from the website.\n\n
      Message: ${message}`,
      html: `<p>A new message has been received from the website.</p>
        <p><strong>Email</strong>: ${email}</p>
        <p><strong>Message</strong>: ${message}</p>`,
    };

    sendgridMail.send(msg).then(
      () => {
        res.status(200).json({ status: 'success' });
      },
      (error) => {
        if (error.response) {
          res.status(400).json(error.response.body);
        }
      },
    );
  } else {
    res.status(404).send(null);
  }
};

export default Contact;
