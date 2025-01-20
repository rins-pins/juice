import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const authToken = req.headers.authorization?.split(' ')[1];
  if (!authToken) {
    return res.status(401).json({ message: 'No auth token provided' });
  }

  try {
    const { invitedParticipantEmail, flavor } = req.body;

    if (!invitedParticipantEmail || !flavor) {
      return res.status(400).json({ message: 'Email and flavor are required' });
    }

    // First, get the sender's email from their auth token
    const userRecords = await base('signups').select({
      filterByFormula: `{token} = '${authToken}'`,
      maxRecords: 1
    }).firstPage();

    if (userRecords.length === 0) {
      return res.status(404).json({ message: `Sender not found, ${authToken}` });
    }

    const senderEmail = (userRecords[0]?.fields?.email) || ""

    // Create the invite record
    const record = await base('Invites').create([
      {
        fields: {
          invitedParticipantEmail,
          sentFrom: senderEmail,
          flavor
        }
      }
    ]);

    return res.status(200).json({ success: true, record });
  } catch (error) {
    console.error('Invite creation error:', error);
    return res.status(500).json({ 
      message: error.message || 'Error creating invite',
      error: error.error || 'UNKNOWN_ERROR'
    });
  }
} 